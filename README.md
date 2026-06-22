# Todo API

A small Todo REST API built with AdonisJS, Lucid, VineJS, and SQLite.

## Requirements

- Node.js
- npm

## Getting Started

Install dependencies:

```sh
npm install
```

Create your environment file:

```sh
cp .env.example .env
node ace generate:key
```

Run the database migrations:

```sh
node ace migration:run
```

Start the development server:

```sh
npm run dev
```

By default, the API runs at `http://localhost:3333`.

## Scripts

```sh
npm run dev        # Start the development server with HMR
npm run build      # Build the application
npm start          # Run the built server
npm test           # Run the test suite
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript checks
npm run format     # Format files with Prettier
```

## Database

The app uses SQLite by default. The database file is stored at:

```txt
tmp/db.sqlite3
```

The schema includes:

- `users`
- `auth_access_tokens`
- `todos`

## API Endpoints

### Health

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/` | Server health check |

### Todos

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/todos` | List all todos |
| `POST` | `/todos` | Create a todo |
| `GET` | `/todos/:id` | Fetch a todo |
| `PUT` | `/todos/:id` | Update a todo |
| `DELETE` | `/todos/:id` | Delete a todo |

Create todo body:

```json
{
  "title": "Buy groceries",
  "completed": false
}
```

`title` is required and must be between 3 and 255 characters. `completed` is optional.

### Authentication

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/api/v1/auth/signup` | Create an account and return an access token |
| `POST` | `/api/v1/auth/login` | Log in and return an access token |
| `GET` | `/api/v1/account/profile` | Return the authenticated user profile |
| `POST` | `/api/v1/account/logout` | Revoke the current access token |

Signup body:

```json
{
  "fullName": "Ada Lovelace",
  "email": "ada@example.com",
  "password": "password123",
  "passwordConfirmation": "password123"
}
```

Login body:

```json
{
  "email": "ada@example.com",
  "password": "password123"
}
```

Authenticated routes expect a bearer token:

```sh
curl http://localhost:3333/api/v1/account/profile \
  -H "Authorization: Bearer <token>"
```

## Tests

Run all tests with:

```sh
npm test
```

The test environment uses an in-memory session driver from `.env.test`.
