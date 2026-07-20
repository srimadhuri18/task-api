# Task API

A RESTful Task Management API built with Express.js, PostgreSQL, Docker, and Swagger.

## Features

- Create, Read, Update and Delete tasks (CRUD)
- PostgreSQL database
- Dockerized PostgreSQL
- Docker Compose support
- Swagger API documentation
- Environment variables using dotenv

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Docker
- Docker Compose
- Swagger UI
- pg
- dotenv

## Installation

### Clone the repository

```bash
git clone <repository-url>
cd task-api
```

### Install dependencies

```bash
npm install
```

### Configure environment

Create a `.env` file.

```env
DATABASE_URL=postgres://postgres:postgres123@localhost:5432/taskdb
PORT=3000
```

### Start PostgreSQL

```bash
docker compose up -d
```

### Run the server

```bash
node index.js
```

## API Documentation

Open:

http://localhost:3000/api-docs

## Available Endpoints

- GET /tasks
- GET /tasks/:id
- POST /tasks
- PUT /tasks/:id
- DELETE /tasks/:id

## Database

Table:

tasks

Columns:

- id
- title
- done

## Persistence

Data is stored in a Docker volume and remains available after restarting the container.