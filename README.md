# Social Media Backend

This is a Node.js + Express-based backend for a simple social media application. It supports features like user authentication, friend requests, suggestions, and more.

## Table of Contents

- [Features](#features)
- [Tech Stacks](#tech-stack)
- [API Design](#api-design)
- [Setup](#features)

## Features

- User signup and login
- Secure password handling using bcrypt
- JWT-based authentication middleware
- Friend request system (send, respond)
- Friend list retrieval
- Friend suggestions based on mutuals or non-friends
- Sequelize ORM with MySQL

## Tech Stack

- **Backend:** Node.js, Express.js
- **Authentication:** JWT, bcrypt
- **Database:** MySQL with Sequelize ORM
- **Validation:** Custom middleware and db validations

## API Design

| **Endpoint**     | **Method** | **Description**                                                                     | **Request Body**                                                                                             | **Response**                                                                                                                                                                           | **Postman Collection**                                |
| ---------------- | ---------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `/signup`        | POST       | Register a new user                                                                 | `json<br>{ "name": "John Doe", "email": "john@example.com", "password": "password123" }`                     | **Success:** `201 Created`<br>`{ "message": "Signup successful" }`<br>**Error:** `400 Bad Request`<br>`{ "error": "Validation failed for input fields" }`                              | `http://localhost:PORT/api/v1/auth/signup`            |
| `/login`         | POST       | Login with email and password                                                       | `json<br>{ "email": "john@example.com", "password": "password123" }`                                         | **Success:** `200 OK`<br>`{ "token": "fake-jwt-token" }`<br>**Error:** `401 Unauthorized`<br>`{ "error": "Invalid credentials" }`                                                      | `http://localhost:PORT/api/v1/auth/login`             |
| `/getprofile`    | GET        | Get the profile of the authenticated user                                           | **Headers:** `x-access-token:  <JWT>`<br>**No request body**                                                 | **Success:** `200 OK`<br>`{ "id": 1, "name": "John Doe", "email": "john@example.com", "bio": "This is a bio" }`<br>**Error:** `401 Unauthorized`<br>`{ "error": "No token provided" }` | `http://localhost:PORT/api/v1/user/getprofile`        |
| `/updateProfile` | PATCH      | Update the authenticated user's profile                                             | **Headers:** `x-access-token:  <JWT>`<br>**Request Body:**<br>`{ "name": "New Name", "bio": "Updated bio" }` | **Success:** `200 OK`<br>`{ "message": "Profile updated successfully" }`<br>**Error:** `400 Bad Request`<br>`{ "error": "Validation failed" }`                                         | `http://localhost:PORT/api/v1/user/updateProfile`     |
| `/`              | GET        | Get a list of all users excluding logged user                                       | **Headers:** `x-access-token:  <JWT>`<br>**No request body**                                                 | **Success:** `200 OK`<br>`[{ "id": 1, "name": "Jane Doe", "email": "jane@example.com" }, ... ]`<br>**Error:** `401 Unauthorized`<br>`{ "error": "No token provided" }`                 | `http://localhost:PORT/api/v1/user`                   |
| `/search`        | GET        | Search for a user by name                                                           | **Headers:** `x-access-token: <JWT>`<br>**Query Param:** `?name=John`                                        | **Success:** `200 OK`<br>`[{ "id": 1, "name": "John Doe", "email": "john@example.com" }]`<br>**Error:** `400 Bad Request`<br>`{ "error": "Invalid search query" }`                     | `http://localhost:PORT/api/v1/user/search?name=Rahul` |
| `/request/:id`   | POST       | Send a friend request to a user                                                     | **Headers:** `x-access-token: <JWT>`<br>**No request body**                                                  | **Success:** `200 OK`<br>`{ "message": "Friend request sent successfully" }`<br>**Error:** `404 Not Found`<br>`{ "error": "User not found" }`                                          | `http://localhost:PORT/api/v1/friend/request/2`       |
| `/respond/:id`   | POST       | Respond to a pending friend request                                                 | **Headers:** `x-access-token: <JWT>`<br>**Request Body:**<br>`{ "action": "accepted/rejected" }`             | **Success:** `200 OK`<br>`{ "message": "Friend request responded successfully" }`<br>**Error:** `400 Bad Request`<br>`{ "error": "Invalid response" }`                                 | `http://localhost:PORT/api/v1/friend/respond/23`      |
| `/getFriends`    | GET        | Get the list of friends for the authenticated user                                  | **Headers:** `x-access-token: <JWT>`<br>**No request body**                                                  | **Success:** `200 OK`<br>`[{ "id": 1, "name": "Jane Doe", "email": "jane@example.com" }, ... ]`<br>**Error:** `401 Unauthorized`<br>`{ "error": "No token provided" }`                 | `http://localhost:PORT/api/v1/friend/getFriends`      |
| `/suggestions`   | GET        | Get friend suggestions for the authenticated user excluding himself and his friends | **Headers:** `x-access-token: <JWT>`<br>**No request body**                                                  | **Success:** `200 OK`<br>`[{ "id": 2, "name": "John Smith", "email": "johnsmith@example.com" }, ... ]`<br>**Error:** `401 Unauthorized`<br>`{ "error": "No token provided" }`          | `http://localhost:PORT/api/v1/friend/suggestions`     |

## Setup the project

- Clone the repository

  ```
  git clone git@github.com:Vkpro55/Social_Media_Backend.git
  ```

- In the root directory create a `.env` file and put following env variables.
  ```
    PORT= <PORT number of your choice> For Example: PORT= 3000 || 5000 || 8000
  ```
- Install the dependencies:
  ```
    npm install
  ```
- Indise the `src/config` folder, create a file named as `config.json` and write the following code:

  ```
    {
      "development": {
       "username": "root",
       "password": null,
       "database": "database_development",
       "host": "127.0.0.1",
       "dialect": "mysql"
      },
      "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql"
      },
      "production": {
        "username": "root",
        "password": null,
        "database": "database_production",
        "host": "127.0.0.1",
        "dialect": "mysql"
      }
    }
  ```

- Go inside the `src` folder and run following command:

  ```
    npx sequelize init
  ```

- If you are setting up your development environment, then write the username and password of your db and in dialect mention the type of database your are using. For Example:
  ```
    one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle'
  ```
- Go inside the `src` folder and run following command:

  ```
    npx sequelize db:create
  ```

- If you are setting up the test or production environment, then specify the host(Url where your DB is hosted).

- Start the development server:
  ```
    npm start
  ```
