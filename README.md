# Task API

A simple RESTful Task Management API built with Express.js.

## Features

- Get all tasks
- Get a task by ID
- Create a new task
- Update a task
- Delete a task
- Swagger API Documentation

## Technologies Used

- Node.js
- Express.js
- Swagger UI
- swagger-jsdoc

## Installation

```bash
npm install
```

## Run the Project

```bash
node index.js
```

Server:

```
http://localhost:3000
```

Swagger Documentation:

```
http://localhost:3000/api-docs
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /tasks | Get all tasks |
| GET | /tasks/{id} | Get task by ID |
| POST | /tasks | Create task |
| PUT | /tasks/{id} | Update task |
| DELETE | /tasks/{id} | Delete task |

