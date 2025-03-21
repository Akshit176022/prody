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
from django.core.mail import send_mail
from django.conf import settings
from django.urls import reverse
from rest_framework.exceptions import AuthenticationFailed
from django.http import HttpResponse

logger = logging.getLogger(__name__)

def generate_verification_token(user):
    payload = {
        'user_id': user.user_id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24),  # Token valid for 24 hours
        'iat': datetime.datetime.utcnow()
    }
    return jwt.encode(payload, 'secret', algorithm='HS256')


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save(is_verified=False)  # Set is_verified to False

        # Generate verification token
        token = generate_verification_token(user)

        # Create email verification link
        verification_link = request.build_absolute_uri(
            reverse('verify-email') + f"?token={token}"
        )

        # Send email
        send_mail(
            subject="Verify Your Email",
            message=f"Click the link to verify your email: {verification_link}",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            fail_silently=False,
        )

        return Response({
            'message': 'User registered successfully. Please check your email to verify your account.',
            'user_data': serializer.data
        }, status=status.HTTP_201_CREATED)


class VerifyEmailView(APIView):
    def get(self, request):
        token = request.GET.get('token')

        if not token:
            return self.html_response("Invalid or missing token!", "red")

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
            user = CustomUser.objects.filter(user_id=payload['user_id']).first()
            if not user:
                return self.html_response("User not found!", "red")

            if user.is_verified:
                return self.html_response("Your account is already verified!", "blue")

            # Mark user as verified
            user.is_verified = True
            user.save()

            return self.html_response("Email verified successfully! You can now log in.", "green")

        except jwt.ExpiredSignatureError:
            return self.html_response("Verification link expired!", "red")
        except jwt.DecodeError:
            return self.html_response("Invalid token!", "red")

    def html_response(self, message, color):
        """Helper function to generate styled HTML response"""
        return HttpResponse(f"""
            <html>
            <head>
                <title>Email Verification</title>
                <style>
                    body {{
                        font-family: Arial, sans-serif;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        background-color: #f4f4f4;
                    }}
                    .container {{
                        text-align: center;
                        background: white;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                    }}
                    h1 {{
                        color: {color};
                    }}
                    a {{
                        display: inline-block;
                        margin-top: 10px;
                        padding: 8px 16px;
                        background: #007bff;
                        color: white;
                        text-decoration: none;
                        border-radius: 5px;
                    }}
                    a:hover {{
                        background: #0056b3;
                    }}
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>{message}</h1>
                </div>
            </body>
            </html>
        """, content_type="text/html")
# class RegisterView(APIView):
#     def post(self, request):
#         serializer = UserSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response({'message': 'User registered successfully', 'user_data': serializer.data}, status=status.HTTP_200_OK)


# class LoginView(APIView):
#     def post(self, request):
#         email = request.data['email']
#         password = request.data['password']

#         user = CustomUser.objects.filter(email=email).first()

#         if user is None:
#             raise AuthenticationFailed('User not found!')

#         if not user.check_password(password):
#             raise AuthenticationFailed('Incorrect password!')

#         payload = {
#             'user_id': user.user_id,
#             'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7),
#             'iat': datetime.datetime.utcnow()
#         }

#         token = jwt.encode(payload, 'secret',
#                            algorithm='HS256')

#         response = Response()

#         response.set_cookie(key='jwt', value=token, httponly=True)
#         response.data = {
#             'jwt': token
#         }

#         response['Authorization'] = token

#         return response

class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = CustomUser.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')

        if not user.is_verified:
            raise AuthenticationFailed('Your email is not verified! Please check your email.')

        payload = {
            'user_id': user.user_id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')

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
        token = request.headers.get('Authorization') or request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = CustomUser.objects.filter(user_id=payload['user_id']).first()
        if not user:
            raise AuthenticationFailed('Unauthenticated!')

        registered_events = user.registered_events.all()
        events_data = []

        for event in registered_events:
            event_data = {
                'id': event.id,
                'name': event.name,
                'description': event.description,
                'poster': event.poster,
                'is_live': event.is_live,
                'is_completed': event.is_completed,
                'is_team_event': event.is_team_event,
                'registered_users': list(event.registered_users.values_list('user_id', flat=True)),
                'registered_teams': list(event.registered_teams.values_list('team_id', flat=True)),
                'team_members': []
            }

            if event.is_team_event:
                team = user.registered_teams.filter(registered_events=event).first()
                if team:
                    event_data['team_id'] = team.team_id
                    event_data['team_members'] = list(team.registered_users.values_list('user_id', flat=True))

            events_data.append(event_data)

        return Response({"registered_events": events_data}, status=status.HTTP_200_OK)


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')

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
        user.register_individual(event)
        # serialized_events = FullUserSerializer(user).data['registered_events']

        return Response({'message': 'User registered for the event successfully', }, status=status.HTTP_200_OK)
