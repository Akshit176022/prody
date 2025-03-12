from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import CustomUser
from events.models import Event, Team
from .serializers import UserSerializer, FullUserSerializer
import logging
from rest_framework.exceptions import AuthenticationFailed
import jwt
import datetime

logger = logging.getLogger(__name__)


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'User registered successfully', 'user_data': serializer.data}, status=status.HTTP_200_OK)


class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = CustomUser.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')

        payload = {
            'user_id': user.user_id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret',
                           algorithm='HS256')

        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'jwt': token
        }

        response['Authorization'] = token

        return response


class UserView(APIView):

    def get(self, request):
        # Retrieve the token from the headers
        token = request.headers.get(
            'Authorization') or request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        # token = token.split(' ')[1]

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = CustomUser.objects.filter(user_id=payload['user_id']).first()
        serializer = FullUserSerializer(user)
        return Response({"user": serializer.data})


class UserEventsView(APIView):

    def get(self, request):
        token = request.headers.get(
            'Authorization') or request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = CustomUser.objects.filter(user_id=payload['user_id']).first()
        serializer = FullUserSerializer(user)
        return Response({"registed_events": serializer.data["registered_events"]})


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')

        # Remove the JWT token from Authorization header
        if 'Authorization' in request.headers:
            del request.headers['Authorization']

        response.data = {
            'message': 'success'
        }
        return response


class DeployTestView(APIView):
    def get(self, request):
        # print(f"logger {request.user}")
        logger.debug(f'User: {request.user}')
        return Response({'message': 'Cors deployed test'})


class RegisterEventView(APIView):
    def post(self, request, event_id):

        token = request.headers.get(
            'Authorization') or request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = CustomUser.objects.filter(user_id=payload['user_id']).first()
        if not user:
            raise AuthenticationFailed('Unauthenticated!')

        event = Event.objects.filter(id=event_id).first()
        if not event:
            return Response({'message': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)

        if event.is_completed:
            return Response({'message': 'Event registration is closed'}, status=status.HTTP_400_BAD_REQUEST)

        if user in event.registered_users.all():
            return Response({'message': 'User is already registered for the event'}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the event is a team event
        if event.is_team_event:
            team_id = request.data.get('team_id')

            if team_id:
                team = Team.objects.filter(
                    team_id=team_id, registered_events=event).first()
                if team:
                    if team.registered_users.count() >= event.max_members:
                        return Response({'message': 'Team is already full, cannot join'}, status=status.HTTP_400_BAD_REQUEST)

                    if user.registered_teams.filter(registered_events=event).exists():
                        return Response({'message': 'User is already part of a team for this event'}, status=status.HTTP_400_BAD_REQUEST)

                    team.registered_users.add(user)
                    user.registered_teams.add(team)
                    user.register_for_event(event)
                    event.registered_users.add(user)

                    return Response({'message': 'User joined the team successfully'}, status=status.HTTP_200_OK)
                else:
                    return Response({'message': 'Invalid team_id or team not found for the event'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                team_name = request.data.get('team_name')

                if not team_name:
                    return Response({'message': 'Team name is required for team event ... or enter the team_id to join a team'}, status=status.HTTP_400_BAD_REQUEST)

                if user.registered_teams.filter(registered_events=event).exists():
                    return Response({'message': 'User is already part of a team for this event'}, status=status.HTTP_400_BAD_REQUEST)

                team = Team.objects.create(name=team_name)

                team.registered_events.add(event)
                team.registered_users.add(user)

                user.registered_teams.add(team)
                user.register_for_event(event)

                event.registered_users.add(user)
                event.registered_teams.add(team)
                return Response({'message': 'Team created and user added successfully', "team_id": team.team_id}, status=status.HTTP_200_OK)

        event.registered_users.add(user)
        user.register_for_event(event)
        # serialized_events = FullUserSerializer(user).data['registered_events']

        return Response({'message': 'User registered for the event successfully', }, status=status.HTTP_200_OK)
