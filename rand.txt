# Use Python 3.12.3 as the base image
FROM python:3.12.3

# Set the working directory
WORKDIR /app

# Copy the backend code
COPY . .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Run database migrations
RUN python manage.py migrate

# Collect static files (if needed)
RUN python manage.py collectstatic --noinput

# Expose Django port
EXPOSE 8000

# Start Django with Gunicorn
CMD ["gunicorn", "core.wsgi:application", "--bind", "0.0.0.0:8000"]
