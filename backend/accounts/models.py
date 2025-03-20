from django.contrib.auth.models import AbstractUser
from django.db import models
import random


def generate_default_user_id():
    return f'#PY{random.randint(100000000, 999999999)}'


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

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    user_id = models.CharField(
        max_length=12, unique=True, default=generate_default_user_id
    )
    registered_events = models.ManyToManyField(
        "events.Event", related_name="reg_users", blank=True
    )
    registered_teams = models.ManyToManyField(
        "events.Team", related_name="reg_users_teams", blank=True
    )
    is_verified = models.BooleanField(default=False)
    roll_no = models.CharField(max_length=20, null=True, blank=True, default="0")
    branch = models.CharField(
        max_length=100, choices=BRANCH_CHOICES, null=True, blank=True, default="Other"
    )
    prody_points = models.IntegerField(default=0)

    team_event_mapping = models.JSONField(default=list, blank=True)

    def __str__(self):
        return f"{self.username} - {self.user_id}"

    def register_for_event(self, event):
        self.registered_events.add(event)

    def register_individual(self, event):
        self.registered_events.add(event)

        if not isinstance(self.team_event_mapping, list):
            self.team_event_mapping = []

        # Create a dictionary for the event
        individual_event_entry = {
            "event": {
                "id": event.id,
                "name": event.name,
                "abstract_link": event.abstract_link,
                "is_team_event": event.is_team_event,
                "max_members": event.max_members,
            },
            "team": None,  # No team since it's an individual event
        }

        # Append the new entry
        self.team_event_mapping.append(individual_event_entry)

        # Save changes
        self.save(update_fields=['team_event_mapping'])

    def register_for_team(self, team, event):
        self.registered_teams.add(team)

        if not isinstance(self.team_event_mapping, list):
            self.team_event_mapping = []    

        # Create a dictionary with event and team details
        team_event_entry = {
            "event": {
                "id": event.id,
                "name": event.name,
                "abstract_link": event.abstract_link,
                "is_team_event": event.is_team_event,
                "max_members": event.max_members,
            },
            "team": {
                "id": team.team_id,
                "name": team.name,
            }
        }

        # Append the new entry to the list
        self.team_event_mapping.append(team_event_entry)

        self.save(update_fields=['team_event_mapping'])


    def clear_registered_events(self):
        for event in self.registered_events.all():
            event.registered_users.remove(self)

    def verify_email(self):
        self.is_verified = True
        self.save()
        
