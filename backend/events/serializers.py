from .models import Team
from rest_framework import serializers
from .models import Event, Team, Sponsor, ContactUs, FAQ
import random
from accounts.models import CustomUser


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class TeamSerializer(serializers.ModelSerializer):
    registered_events = serializers.SerializerMethodField()

    class Meta:
        model = Team
        fields = ['id', 'team_id', 'name', 'registered_events']

    def get_registered_events(self, instance):
        first_event = instance.registered_events.first()
        if first_event:
            return {
                'id': first_event.id,
                'name': first_event.name,
            }
        return None


class SponsorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sponsor
        fields = '__all__'


class ContactUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactUs
        fields = '__all__'


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = '__all__'


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['name', 'registered_events', 'registered_users']

    def create(self, validated_data):
        registered_events_data = validated_data.pop('registered_events', [])
        registered_users_data = validated_data.pop('registered_users', [])

        team = Team.objects.create(**validated_data)

        for event_data in registered_events_data:
            # Assuming event_data is a dictionary
            event_id = event_data.get('id')
            if event_id is not None:
                event = Event.objects.get(pk=event_id)
                team.registered_events.add(event)

        for user_data in registered_users_data:
            # Assuming user_data is a dictionary
            user_id = user_data.get('user_id')
            if user_id is not None:
                user = CustomUser.objects.get(user_id=user_id)
                team.registered_users.add(user)

        return team

    def generate_unique_team_id(self):
        return f'#PDTM{random.randint(100000, 999999)}'


class EventRegistrationSerializer(serializers.Serializer):
    user_id = serializers.CharField(max_length=12)


class EventSelectionField(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        return Event.objects.filter(is_completed=False)

    def to_representation(self, value):
        return {'id': value.id, 'name': value.name}


class JoinTeamEventSerializer(serializers.Serializer):
    team_id = serializers.CharField(max_length=12)
    events = serializers.PrimaryKeyRelatedField(
        queryset=Event.objects.all(), many=True)
