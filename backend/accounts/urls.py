from django.urls import path
from .views import RegisterView, LoginView, UserView, UserEventsView, LogoutView, DeployTestView, RegisterEventView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('user/', UserView.as_view()),
    path('user-events/', UserEventsView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('deploy-test/', DeployTestView.as_view(), name='deploy-test'),
    path('register-event/<int:event_id>/',
         RegisterEventView.as_view(), name='register-event'),

]
