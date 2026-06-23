# Todo API

A small authenticated Todo REST API built with AdonisJS, Lucid, VineJS, Bouncer, and SQLite.

## Project status

The API currently supports:

- User registration and login with database-backed access tokens
- Authenticated profile lookup
- Authenticated todo CRUD routes
- Owner-only authorization for todo deletion
- Request validation with VineJS
- Functional tests for health, auth, and todos
- A Hoppscotch collection in `hoppscotch.json`

## Requirements

- Node.js
- npm

## Getting started

Install dependencies:

```sh
npm install
```

Create an environment file and generate the application key:

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

The app uses SQLite by default. The local database file is stored at:

```txt
tmp/db.sqlite3
```

The schema includes:

- `users`
- `auth_access_tokens`
- `todos`

Todos have a `user_id` foreign key. At the moment, todo deletion is restricted to the owner, while listing, showing, creating, and updating todos only require an authenticated user.

## Authentication

Authenticated routes expect a bearer token:

```sh
Authorization: Bearer <token>
```

Register a user:

```http
POST /register
```

```json
{
  "fullName": "Ada Lovelace",
  "email": "ada@example.com",
  "password": "password123",
  "passwordConfirmation": "password123"
}
```

`fullName` may be `null`. `email` must be unique. `password` must be 8 to 32 characters and match `passwordConfirmation`.

Log in:

```http
POST /login
```

```json
{
  "email": "ada@example.com",
  "password": "password123"
}
```

Both registration and login return an access token. Use that token on protected routes:

```sh
curl http://localhost:3333/profile \
  -H "Authorization: Bearer <token>"
```

## API endpoints

### Public

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/` | Health check. Returns `{ "hello": "world" }`. |
| `POST` | `/register` | Create a user and return the new user plus an access token. |
| `POST` | `/login` | Verify credentials and return an access token. |

### Protected

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/profile` | Return the authenticated user profile. |
| `POST` | `/logout` | Revoke the current access token. |
| `GET` | `/todos` | List todos. |
| `POST` | `/todos` | Create a todo. |
| `GET` | `/todos/:id` | Fetch a todo by id. |
| `PUT` | `/todos/:id` | Update a todo by id. |
| `DELETE` | `/todos/:id` | Delete a todo by id. Requires ownership. |

Create todo body:

```json
{
  "title": "Buy groceries",
  "completed": false
}
```

`title` is required and must be 3 to 255 characters after trimming. `completed` is optional.

Update todo body:

```json
{
  "title": "Buy groceries and snacks",
  "completed": true
}
```

The update route accepts `title` and `completed` from the request body.

## Response notes

- `POST /register` responds with `{ "user": ..., "token": "..." }`.
- `POST /login` responds with `{ "token": "..." }`.
- `GET /profile` uses the app serializer and responds with a `data` wrapper.
- Todo routes currently return Lucid model objects or arrays directly.
- `DELETE /todos/:id` returns `204 No Content` when successful.
- Validation errors return `422 Unprocessable Entity`.
- Missing or invalid authentication returns `401 Unauthorized`.
- Deleting another user's todo returns `403 Forbidden`.

## Tests

Run all tests with:

```sh
npm test
```

The functional suite covers:

- `GET /` health check
- User registration and login
- Authenticated todo list, create, show, update, and delete
- Validation for too-short todo titles
- Rejection of anonymous todo access
- Owner-only todo deletion

The test environment uses `.env.test`.

## API collection

Import `hoppscotch.json` into Hoppscotch to exercise the current API routes locally.
