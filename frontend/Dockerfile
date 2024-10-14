# Runtime as parent image
FROM node:20

# Set working directory inside the container
WORKDIR /client

# Copy package.json and package-lock.json if available
COPY package*.json ./

# Install app dependencies
RUN npm install dependencies

# Copy rest of the app code
COPY . .

# Exposed ports
EXPOSE 3001

# Command to start the app
CMD [ "npm", "start", "node" ]