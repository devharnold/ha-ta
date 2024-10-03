#Official node.js runtime as parent image
FROM node:18

#Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

#Expose the port the app runs on
EXPOSE 3001

# Command to start the app
CMD ["npm", "start"]