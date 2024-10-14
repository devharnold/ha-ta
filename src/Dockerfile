# Official node.js runtime as parent image
FROM node:18

# Set the working directory inside the container
WORKDIR /src

# Copy package.json and package-lock (if available)
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Exposed ports
EXPOSE 3001

# Command to start the app
CMD [ "node", "server.js" ]