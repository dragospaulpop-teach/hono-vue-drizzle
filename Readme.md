
# Hono + Vue + Drizzle App Setup Instructions

This guide provides step-by-step instructions on how to set up and run a web application using Hono for the backend, Vue for the frontend, and Drizzle for managing smart contract interactions on the blockchain.

## Prerequisites

Before starting, ensure you have `pnpm` installed globally. If not, you can install it using the following command:

```bash
npm install --global pnpm
```

## Installation Steps

### Setting Up the Client

1. **Navigate to the Client Directory:**

```bash
cd client
```

2. **Install Dependencies:**

```bash
npm install
```

### Setting Up the Server

1. **Navigate to the Server Directory:**

```bash
cd server
```

2. **Install Dependencies:**

```bash
pnpm install
```

## Database Migration

To create the database schema, run the following command in the server directory:

```bash
pnpm tsx src/migrate.ts
```

## Running the Application

### Starting the Client

In the client directory, start the application with:

```bash
npm run dev
```

### Starting the Server

In the server directory, start the application with:

```bash
npm run dev
```

## Modifying the Database Schema

Whenever you modify the database schema, follow these steps to regenerate the schema and migrate:

1. **Generate the New Schema:**

```bash
pnpm drizzle-kit generate:sqlite
```

2. **Migrate the Database:**

```bash
pnpm tsx src/migrate.ts
```

## Notes

- Ensure you are in the correct directory (`client` or `server`) before running the commands.
- For any modifications to the database schema, remember to regenerate and migrate to apply the changes.
