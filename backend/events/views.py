from rest_framework import generics
from .models import Event, Sponsor, ContactUs, FAQ,Workshop
from .serializers import EventSerializer, SponsorSerializer, ContactUsSerializer, FAQSerializer, TeamSerializer,EventRegistrationSerializer, Team, CustomUser, WorkshopSerializer
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import AuthenticationFailed

from django.http import JsonResponse
from accounts.models import CustomUser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import jwt

from rest_framework.views import APIView




class EventListView(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class EventDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class SponsorListView(generics.ListCreateAPIView):
    queryset = Sponsor.objects.all()
    serializer_class = SponsorSerializer


class SponsorDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Sponsor.objects.all()
    serializer_class = SponsorSerializer


class ContactUsListView(generics.ListCreateAPIView):
    queryset = ContactUs.objects.all()
    serializer_class = ContactUsSerializer


class ContactUsDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ContactUs.objects.all()
    serializer_class = ContactUsSerializer


class FAQListView(generics.ListCreateAPIView):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer


class FAQDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer


class TeamView(generics.ListCreateAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer


class TeamDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer


@api_view(['POST'])
def register_event(request, event_id):
    if request.method == 'POST':
        serializer = EventRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user_id = serializer.validated_data['user_id']
            try:
                user = CustomUser.objects.get(user_id=user_id)
                event = Event.objects.get(id=event_id)
                if user.registered_events.filter(id=event_id).exists():
                    return Response({'error': 'User is already registered for this event'}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    user.registered_events.add(event)
                    # Update the registered_users field of the event
                    event.registered_users.add(user)
                    return Response({'message': 'Event registered successfully'}, status=status.HTTP_201_CREATED)
            except CustomUser.DoesNotExist:
                return Response({'error': 'User with provided user_id does not exist'}, status=status.HTTP_400_BAD_REQUEST)
            except Event.DoesNotExist:
                return Response({'error': 'Event with provided event_id does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response({'error': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def user_events(request):
    user_id = request.data.get('user_id', None)

    if not user_id:
        return Response({'error': 'user_id is required in the request data'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = CustomUser.objects.get(user_id=user_id)
        events = user.registered_events.all()
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except CustomUser.DoesNotExist:
        return Response({'error': 'User with provided user_id does not exist'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def register_team(request, team_id):
    if request.method == 'POST':
        serializer = EventRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user_id = serializer.validated_data['user_id']
            try:
                user = CustomUser.objects.get(user_id=user_id)
                team = Team.objects.get(id=team_id)
                if user.registered_teams.filter(id=team_id).exists():
                    return Response({'error': 'User is already registered for this event'}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    user.registered_teams.add(team)
                    # Update the registered_users field of the event
                    team.registered_users.add(user)
                    return Response({'message': 'Event registered successfully'}, status=status.HTTP_201_CREATED)
            except CustomUser.DoesNotExist:
                return Response({'error': 'User with provided user_id does not exist'}, status=status.HTTP_400_BAD_REQUEST)
            except Team.DoesNotExist:
                return Response({'error': 'Event with provided event_id does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response({'error': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)




@api_view(['POST'])
def join_team(request):
    if request.method == 'POST':
        event_id = request.data.get('event_id')
        team_id = request.data.get('team_id')
        user_id = request.data.get('user_id')

        if not event_id:
            return Response({'error': 'Event ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        if not team_id:
            return Response({'error': 'Team ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        if not user_id:
            return Response({'error': 'User ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            event = Event.objects.get(pk=event_id)
        except Event.DoesNotExist:
            return Response({'error': 'Event does not exist'}, status=status.HTTP_404_NOT_FOUND)

        try:
            team = Team.objects.get(team_id=team_id)
        except Team.DoesNotExist:
            return Response({'error': 'Team does not exist'}, status=status.HTTP_404_NOT_FOUND)

        try:
            user = CustomUser.objects.get(user_id=user_id)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        # Check if team has reached its max members for this event
        if team.registered_users.count() >= event.max_members:
            return Response({'error': 'Team limit reached for this event'}, status=status.HTTP_400_BAD_REQUEST)



        # Check if user is already in the team
        if user in team.registered_users.all():
            return Response({'error': 'User is already in this team'}, status=status.HTTP_400_BAD_REQUEST)

        # Check if user has already joined another team for this event
        if user.registered_teams.filter(registered_events=event).exists():
            return Response({'error': 'User has already joined a team for this event'}, status=status.HTTP_400_BAD_REQUEST)

        # Add user to the team
        team.registered_users.add(user)

        # Register team for the event if not already registered
        event.registered_teams.add(team)
        team.registered_events.add(event)

        # Add user to event's registered_users
        event.registered_users.add(user)

        # Add event to user's registered_events
        user.registered_events.add(event)
        print("event",event)
        # Add team to user's registered_teams
        user.registered_teams.add(team)

        # Update user's team-event mapping
        user.register_for_team(team, event)

        return Response({'message': 'User successfully joined the team and registered for the event.'}, status=status.HTTP_200_OK)

# @api_view(['POST'])
# def create_team(request):
#     if request.method == 'POST':
#         serializer = TeamSerializer(data=request.data)
#         if serializer.is_valid():
#             team = serializer.save()  # Save the team instance
#             return Response({'team_id': team.team_id}, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def create_team(request):
    if request.method == 'POST':
        user_id = request.data.pop('user_id', None)
        event_id = request.data.pop('event_id', None)

        if not user_id:
            return Response({'error': 'User ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        if not event_id:
            return Response({'error': 'Event ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = CustomUser.objects.get(user_id=user_id)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        try:
            event = Event.objects.get(id=event_id)
        except Event.DoesNotExist:
            return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)

        # Check if user has already created a team for this event
        if event.registered_teams.filter(registered_users=user).exists():
            return Response({'error': 'User has already created a team for this event'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = TeamSerializer(data=request.data)
        if serializer.is_valid():
            team = serializer.save()  # Create team instance

            # Add team to the event's registered_teams
            event.registered_teams.add(team)

            # Add user to the team's registered_users
            team.registered_users.add(user)

            team.registered_events.add(event)

            # Add the team to the user's registered_teams
            user.registered_teams.add(team)

            # Add user to event's registered_users
            event.registered_users.add(user)

            # Add event to user's registered_events
            user.registered_events.add(event)

            # Update user's team-event mapping
            user.register_for_team(team, event)

            return Response({'team_id': team.team_id}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
def join_team_event(request):
    if request.method == 'POST':
        event_id = request.data.get('event_id')
        team_id = request.data.get('team_id')
        user_id = request.data.get('user_id')

        if not team_id:
            return Response({'error': 'Team ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        if not user_id:
            return Response({'error': 'User ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            event = Event.objects.get(pk=event_id)
        except Event.DoesNotExist:
            return Response({'error': 'Event does not exist'}, status=status.HTTP_404_NOT_FOUND)

        try:
            team = Team.objects.get(team_id=team_id)
        except Team.DoesNotExist:
            return Response({'error': 'Team does not exist'}, status=status.HTTP_404_NOT_FOUND)

        try:
            user = CustomUser.objects.get(user_id=user_id)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        # Check if user is already in the team
        if user in team.registered_users.all():
            return Response({'error': 'User is already in this team'}, status=status.HTTP_400_BAD_REQUEST)

        # Check if user has already joined another team for this event
        if user.registered_teams.filter(registered_events=event).exists():
            return Response({'error': 'User has already joined a team for this event'}, status=status.HTTP_400_BAD_REQUEST)

        # Add user to the team
        team.registered_users.add(user)

        # Register team for the event if not already registered
        event.registered_teams.add(team)
        team.registered_events.add(event)

        # Add user to event's registered_users
        event.registered_users.add(user)

        # Add event to user's registered_events
        user.registered_events.add(event)
        print("event",event)
        # Add team to user's registered_teams
        user.registered_teams.add(team)

        # Update user's team-event mapping
        user.register_for_team(team, event)

        return Response({'message': 'User successfully joined the team and registered for the event.'}, status=status.HTTP_200_OK)


class WorkshopList(generics.ListAPIView):
    queryset = Workshop.objects.all()
    serializer_class = WorkshopSerializer

class WorkshopDetail(generics.RetrieveAPIView):
    queryset = Workshop.objects.all()
    serializer_class = WorkshopSerializer

class RegisterForWorkshop(APIView):
    def post(self, request, *args, **kwargs):
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

        workshop_id = request.data.get("workshop_id")
        if not workshop_id:
            return Response(
                {"error": "workshop_id is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        workshop = get_object_or_404(Workshop, id=workshop_id)
        
        if workshop.registered_participants.count() >= workshop.max_participants:
            return Response(
                {"error": "Workshop is full."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if user in workshop.registered_participants.all():
            return Response(
                {"error": "You are already registered for this workshop."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        workshop.registered_participants.add(user)

        return Response(
            {"message": "Successfully registered for the workshop."},
            status=status.HTTP_200_OK,
        )