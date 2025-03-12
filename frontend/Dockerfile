# Use latest Node.js version
FROM node:lts

# Set working directory
WORKDIR /app

# Copy the frontend code
COPY . .

# Install dependencies
RUN npm install

# Build Next.js app
RUN npm run build

# Expose Next.js port
EXPOSE 3000

# Start Next.js server
CMD ["npm", "start"]

