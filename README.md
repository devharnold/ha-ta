# ha-ta
A travel assistant web app that will allow users to easily find the best options when travelling; may it be airlines, bus travel or even when in search for hotels. The app is developed using JavaScript's Node.js


# H arnold & nerd - Travel Assistant

Welcome to the ETA (Effective Travel Assistant) project! This is a comprehensive travel assistant application designed to help users find the best deals and options for their travel needs. Utilizing various airlines and hotel APIs, ha-ta provides a seamless experience for planning and booking travel.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Usage](#usage)
6. [API Documentation](#api-documentation)
7. [Authentication](#authentication)
8. [Contributing](#contributing)
9. [License](#license)

## Project Overview

H arnold is a multi-purpose travel assistant that integrates with multiple airlines and hotel APIs to offer users the best travel deals. The project follows a microservices architecture with a Node.js backend, MySQL and Redis for data storage, and a React.js frontend. The application emphasizes clean, tested, and maintainable code.

## Features

- **User Management**: Registration, login, and profile management.
- **Flight Search**: Search and book flights from various airlines.
- **Hotel Search**: Find and reserve hotels with the best deals.
- **Multi-API Integration**: Seamless integration with different airline and hotel APIs.
- **Authentication**: BasicAuth implementation for secure access.
- **Responsive Design**: Frontend built with React.js for a smooth user experience.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MySQL, Redis
- **Frontend**: React.js
- **Version Control**: Git
- **API Integration**: Various airline and hotel APIs
- **Authentication**: BasicAuth

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/eta-travel-assistant.git
   cd eta-travel-assistant
   ```

2. **Backend Setup**:
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Set up environment variables:
     Create a `.env` file based on `.env.example` and fill in your configuration.
   - Start the server:
     ```bash
     npm start
     ```

3. **Frontend Setup**:
   - Navigate to the frontend directory:
     ```bash
     cd ../frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the React development server:
     ```bash
     npm start
     ```

4. **Database Setup**:
   - Ensure MySQL and Redis are installed and running.
   - Run the database migrations and seed data as needed.

## Usage

- Access the application via `http://localhost:3000` for the frontend.
- Use tools like Postman or curl to interact with the backend APIs.

## API Documentation

### User Module

- **POST /api/users/register**: Register a new user.
- **POST /api/users/login**: Login a user.
- **GET /api/users/profile**: Get user profile details.

### Flights Module

- **GET /api/flights/search**: Search for flights.
- **POST /api/flights/book**: Book a flight.

### Hotels Module

- **GET /api/hotels/search**: Search for hotels.
- **POST /api/hotels/book**: Book a hotel.

## Authentication

BasicAuth is used for authentication. Ensure the `Authorization` header is set with the correct credentials for protected endpoints.

Example:
```http
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
```

## Contributing

1. **Fork the repository**.
2. **Create a new branch** for each feature or module:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit your changes**:
   ```bash
   git commit -m 'Add some feature'
   ```
4. **Push to the branch**:
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open a pull request**.

Ensure all tests and mocks pass before pushing any changes. Code should be clean and well-documented.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

H arnold & nerd - Travel Assistant Happy coding!