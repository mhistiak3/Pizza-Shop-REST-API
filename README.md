# Pizza Shop REST API

This project is a RESTful API for a pizza shop, built using Node.js, Express, and MongoDB. It provides endpoints to manage users and pizzas, including functionalities for registration, login, and CRUD operations for pizzas.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- User Registration
- User Login
- CRUD operations for pizzas
- Secure authentication with JWT
- Data validation

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mhistiak3/Pizza-Shop-REST-API.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Pizza-Shop-REST-API
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your MongoDB URI and JWT secret:
   ```env
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

5. Start the server:
   ```bash
   npm start
   ```

## Usage

Once the server is running, you can use an API client like Postman to test the endpoints.

## API Endpoints

### User Routes

- **Register a user**: `POST /api/register`
- **Login a user**: `POST /api/login`
- **Logout a user**: `POST /api/logout`
- **Who am I**: `GET /api/me`
- **Refresh Token**: `GET /api/refresh`

### Pizza Routes

- **Add a new pizza**: `POST /api/products`
- **Update a pizza**: `PUT /api/products/:id`
- **Get all pizzas**: `GET /api/products`
- **Get a single pizza**: `GET /api/products/:id`
- **Delete a pizza**: `DELETE /api/products/:id`

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- dotenv
- joi
- multer
- esm

## Contributing

Contributions are welcome! Please fork the repository and create a pull request.

