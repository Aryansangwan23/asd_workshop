# ASD Workshop Product API

A modular, clean-architecture Express.js REST API that manages products persisted in `db.json` with built-in in-memory caching and request logging.

## Features

- **CRUD Operations**: Complete endpoints to Create, Read, Update, and Delete products.
- **In-Memory Cache**: Automatic 60-second TTL caching on `GET` requests with automatic invalidation on mutations (`POST`, `PUT`, `PATCH`, `DELETE`).
- **Input Validation**: Strict request body validation ensuring valid name and non-negative price.
- **Request Logging**: Middleware tracking incoming requests, status codes, and execution duration.
- **Automated Tests**: Built-in test suite using Node.js native test runner (`node --test`).

## Getting Started

### Installation

```bash
npm install
```

### Running Locally

```bash
# Start server in production mode
npm start

# Start server in development mode (with nodemon)
npm run dev
```

The API listens on port `3000` by default (or the port defined by `process.env.PORT`).

### Running Tests

```bash
npm test
```

## API Endpoints

### 1. Health Check
- **`GET /health`**
- Returns `{ "status": "ok" }`

### 2. Products

| Method | Endpoint | Description | Cache Behavior |
| :--- | :--- | :--- | :--- |
| `GET` | `/products` | Retrieve all products | Cached (60s TTL) |
| `GET` | `/products/:id` | Retrieve single product by ID | Cached (60s TTL) |
| `POST` | `/products` | Create a new product | Invalidates Cache |
| `PUT` | `/products/:id` | Full update of existing product | Invalidates Cache |
| `PATCH` | `/products/:id` | Partial update of existing product | Invalidates Cache |
| `DELETE`| `/products/:id` | Delete product by ID | Invalidates Cache |

### Sample Request (`POST /products`)

```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Mechanical Keyboard", "price": 89.99}'
```

### Response (`201 Created`)

```json
{
  "name": "Mechanical Keyboard",
  "price": 89.99,
  "id": 5
}
```
# asd_workshop
# asd_workshop
