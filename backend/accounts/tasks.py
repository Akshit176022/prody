# # tasks.py

# from celery import shared_task
# from .models import CustomUser
# from django.core.mail import send_mail, EmailMessage, get_connection
# from core import settings
# from django.contrib.auth.tokens import default_token_generator
# from django.utils.http import urlsafe_base64_encode
# from django.contrib.auth.tokens import default_token_generator
# from django.contrib.auth import get_user_model


# @shared_task(bind=True)
# def test_func(self):
#     for i in range(10):
#         print(i)
#     return "Done"


# @shared_task(bind=True)
# def send_mail_func(self):
#     users = CustomUser.objects.filter(
#         email__in=["aggarwalmehul26@gmail.com", "21BMA003@nith.ac.in"]
#     )
#     if users:
#         mail_subject = "Hi! Celery Testing"
#         message = "Hi {username}. This is the celery test mail"
#         recipients = [(user.username, user.email) for user in users]

#         email_messages = [
#             EmailMessage(
#                 subject=mail_subject,
#                 body=message.format(username=username),
#                 from_email=settings.EMAIL_HOST_USER,
#                 to=[email],
#             )
#             for username, email in recipients
#         ]

#         connection = get_connection()
#         connection.send_messages(email_messages)

#         return f"Sent {len(email_messages)} emails"

#     return "No matching users found"


# @shared_task
# def send_verification_email(user_id):
#     user = CustomUser.objects.get(id=user_id)
#     token = default_token_generator.make_token(user)
#     # Replace with your actual domain
#     verification_link = f"http://localhost:8000/api/verify/{token}/"

#     mail_subject = "Verify Your Email"
#     message = f"Click the link below to verify your email:\n\n{verification_link}"
#     to_email = user.email

#     # Use Django's EmailMessage to send the email
#     email = EmailMessage(
#         subject=mail_subject,
#         body=message,
#         from_email=settings.EMAIL_HOST_USER,
#         to=[to_email],
#     )
#     email.send()

#     return f"Sent verification email to {to_email}"
