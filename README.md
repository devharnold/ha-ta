# HA-TA (H Arnold & Nerd - Travel Assistant)

A travel assistant web app that helps users easily find the best options for traveling. The app is developed using JavaScript's Node.js.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [API Documentation](#api-documentation)
5. [Authentication](#authentication)
6. [License](#license)

## Project Overview

HA-TA (H Arnold & Nerd - Travel Assistant) is a comprehensive travel assistant application designed to help users find the best deals and options for their travel needs. By integrating various airline APIs, HA-TA provides a seamless experience for planning and booking travel. The project follows a microservices architecture with a Node.js backend, MySQL for data storage, and a Vue.js frontend, emphasizing clean, tested, and maintainable code.

## Features

- **User Management**: Allows users to register, log in, and manage their profiles.
- **Flight Search**: Enables users to search and book flights from various airlines.
- **Hotel Search**: Find the best hotel deals based on user preferences.
- **Bus Travel Options**: Search for bus travel options between destinations.
- **Responsive Design**: Frontend built with Vue.js for a smooth and intuitive user experience.
- **API Integration**: Integrated with Amadeus for flight offers and other travel-related services.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Frontend**: Vue.js
- **Version Control**: Git
- **API Integration**: Amadeus for Developers Flight Offers API
- **Authentication**: BasicAuth for secure access
- **Unit Tests**: Mocha.js and Chai

## API Documentation

### User Module

- **POST /api/users/register**: Registers a new user.
- **POST /api/users/login**: Logs in a user.
- **GET /api/users/profile**: Retrieves user profile details.

### Flights Module

- **GET /api/flights/search-flights**: Searches for available flights based on user input.
- **POST /api/flights/book-flights**: Books a flight for the user.

## Authentication

BasicAuth is used for authentication. Ensure the `Authorization` header is set with the correct credentials when accessing protected endpoints.

Example:

```http
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
```

Make sure all tests pass before pushing any changes. Code should be clean, maintainable, and well-documented.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Happy coding with HA-TA - Your Effective Travel Assistant!

---
