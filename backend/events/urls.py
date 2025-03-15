from django.urls import path
from .views import EventListView, EventDetailView, SponsorListView, SponsorDetailView, ContactUsListView, ContactUsDetailView, FAQListView, FAQDetailView
from .views import create_team, join_team, join_team_event, user_events

urlpatterns = [
    path('events/', EventListView.as_view(), name='event-list'),
    path('events/<int:pk>/', EventDetailView.as_view(), name='event-detail'),
    path('sponsors/', SponsorListView.as_view(), name='sponsor-list'),
    path('sponsors/<int:pk>/', SponsorDetailView.as_view(), name='sponsor-detail'),
    path('contactus/', ContactUsListView.as_view(), name='contactus-list'),
    path('contactus/<int:pk>/', ContactUsDetailView.as_view(),
         name='contactus-detail'),
    path('faqs/', FAQListView.as_view(), name='faq-list'),
    path('faqs/<int:pk>/', FAQDetailView.as_view(), name='faq-detail'),


    path('user-events/', user_events, name='user_events'),
    path('create-team/', create_team, name='create-team'),
    path('join-team/', join_team, name='join-team'),
    path('join-team-event/<int:event_id>/', join_team_event,
         name='join-team-event'),



]
