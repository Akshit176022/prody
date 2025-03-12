from django.db import models
from django.conf import settings
from accounts.models import CustomUser
import random


def generate_unique_team_id():
    return f'#PDTM{random.randint(100000, 999999)}'


class Event(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    abstract_link = models.URLField(blank=True)
    poster = models.ImageField(upload_to='posters/', blank=True)
    date_time = models.DateTimeField()
    registered_users = models.ManyToManyField(
        CustomUser, related_name='reg_users', blank=True)
    is_live = models.BooleanField(default=False)
    is_completed = models.BooleanField(default=False)
    is_team_event = models.BooleanField(default=False)
    registered_teams = models.ManyToManyField(
        'Team', related_name='events_registered', blank=True)
    max_members = models.IntegerField(default=4)  # New field

    def __str__(self):
        return self.name


class Team(models.Model):
    team_id = models.CharField(
        max_length=12, unique=True, default=generate_unique_team_id)
    name = models.CharField(max_length=100)
    registered_events = models.ManyToManyField(
        'Event', related_name='teams', blank=True)
    registered_users = models.ManyToManyField(
        CustomUser, related_name='reg_users_teams', blank=True)

    def __str__(self):
        return self.name


class Sponsor(models.Model):
    name = models.CharField(max_length=100)
    tier = models.CharField(max_length=100)
    description = models.TextField()
    logo = models.ImageField(upload_to='sponsors-logo/', blank=True)

    def __str__(self):
        return self.name


class FAQ(models.Model):
    question = models.CharField(max_length=100)
    answer = models.CharField(max_length=100)

    def __str__(self):
        return self.question


class ContactUs(models.Model):
    name = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    phone = models.CharField(max_length=20, default='N/A')
    image = models.ImageField(upload_to='contactus_images/', blank=True)

    def __str__(self):
        return self.name
