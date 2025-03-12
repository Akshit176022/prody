# accounts/serializers.py

from rest_framework import serializers
from .models import CustomUser
from events.serializers import EventSerializer, TeamSerializer

import random
# from .tasks import send_verification_email

BRANCH_CHOICES = (
    ('', 'Choose Your Branch'),
    ("Civil Engineering", 'Civil Engineering'),
    ('Mechanical Engineering', 'Mechanical Engineering'),
    ('Electrical Engineering', 'Electrical Engineering'),
    ('Electronics And Communication Engineering',
        'Electronics And Communication Engineering'),
    ('ECE Dual', 'ECE Dual'),
    ('Chemical Engineering', 'Chemical Engineering'),
    ('Computer Science Engineering', 'Computer Science Engineering'),
    ('CSE Dual', 'CSE Dual'),
    ('Material Science', 'Material Science'),
    ('Engineering Physics', 'Engineering Physics'),
    ('Mathematics And Computing', 'Mathematics And Computing'),
    ('Other', 'Other'),
)


class UserSerializer(serializers.ModelSerializer):
    branch = serializers.ChoiceField(choices=BRANCH_CHOICES)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password',
                  'user_id', 'branch', 'roll_no']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        branch = validated_data.pop('branch', None)
        user = self.Meta.model(**validated_data)

        if branch is not None:
            user.branch = branch

        if password is not None:
            user.set_password(password)

        user_id = self.generate_unique_user_id()
        user.user_id = user_id
        user.save()
        return user

    def generate_unique_user_id(self):
        user_id = f'#PY{random.randint(100000000, 999999999)}'
        while CustomUser.objects.filter(user_id=user_id).exists():
            user_id = f'#PY{random.randint(100000000, 999999999)}'
        return user_id


class FullUserSerializer(serializers.ModelSerializer):
    date_joined = serializers.DateTimeField(
        format='%Y-%m-%d %H:%M:%S', read_only=True)
    registered_events = serializers.SerializerMethodField()
    registered_teams = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = '__all__'

    def get_registered_events(self, instance):
        is_live_events = EventSerializer(
            instance.registered_events.filter(is_live=True), many=True).data
        is_completed_events = EventSerializer(
            instance.registered_events.filter(is_completed=True), many=True).data
        is_upcoming_events = EventSerializer(
            instance.registered_events.filter(is_live=False, is_completed=False), many=True).data

        return {
            'is_live_events': is_live_events,
            'is_completed_events': is_completed_events,
            'is_upcoming_events': is_upcoming_events,
        }

    def get_registered_teams(self, instance):
        return TeamSerializer(instance.registered_teams.all(), many=True).data

    def to_representation(self, instance):
        data = super().to_representation(instance)

        excluded_fields = ['password', 'is_superuser', 'id', 'last_login',
                           'is_staff', 'is_active', 'groups', 'user_permissions']
        for field in excluded_fields:
            data.pop(field, None)

        data['registered_events'] = self.get_registered_events(instance)
        data['registered_teams'] = self.get_registered_teams(instance)

        return data
