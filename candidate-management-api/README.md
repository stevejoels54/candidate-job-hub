````markdown
# Candidate Management Backend

This is the backend for the Candidate Management system. It supports both SQL and NoSQL databases and provides APIs to manage candidate information.

## Prerequisites

- Node.js (version 18 or above) and npm
- PostgreSQL (for SQL database)
- MongoDB (for NoSQL database)
- Redis (for caching)

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/stevejoels54/candidate-job-hub.git
cd candidate-job-hub
cd candidate-management-api
```
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the `candidate-management-api` directory and add the following environment variables:

```bash
# database type
DATABASE_TYPE=SQL
# DATABASE_TYPE=NoSQL

# SQL database URLs
SQL_DATABASE_URL=postgres://postgres:password@localhost:5432/candidate_db_prod
SQL_DATABASE_DIALECT=postgres

SQL_DATABASE_URL_TEST=postgres://postgres:password@localhost:5432/candidate_db_test
SQL_DATABASE_DIALECT_TEST=postgres

# NoSQL database URLs
NOSQL_DATABASE_URL=mongodb://username:password@localhost:27017/candidate_db_prod
NOSQL_DATABASE_URL_TEST=mongodb+srv://username:password@cluster0.mongodb.net/

# common settings
DB_SSL=true

# redis production
REDIS_URL=redis://redis:password@localhost:6379

# environment
NODE_ENV=development
# NODE_ENV=production
# NODE_ENV=test

# server
PORT=5000
HOST=localhost
```

### 4. Create Databases

```bash
psql -U postgres
CREATE DATABASE candidate_db_prod;
CREATE DATABASE candidate_db_test;
```

### 5. Run the Server

- Development

```bash
npm run dev
```

- Production

```bash
npm run build
npm start
```

### 6. Run Tests

- Make sure the environment is set to test in the .env file:

```bash
NODE_ENV=test
```

- Then, run the tests:

```bash
npm test
```

## File Structure

The project structure is organized as follows:

```
candidate-management-api/
├── src/
│   ├── __tests__/
│   │   ├── candidateController.test.ts   # Tests for the candidate controller
|   |   ├── setup.ts                      # set up the test environment
│   │   └── teardown.ts                   # clean up the test environment
│   ├── config/
│   │   ├── database/
│   │   │   ├── nosql.ts                  # Mongoose DB connection
│   │   │   ├── sql.ts                    # Sequelize DB connection
│   │   │   └── index.ts                  # connectDB logic
│   │   └── winston.ts                    # Configuration for logging with Winston
│   ├── controllers/
│   │   └── candidateController.ts        # Candidate controller
│   ├── dataAccess/
│   │   ├── sqlDataAccess.ts              # SQL data access logic
│   │   └── noSqlDataAccess.ts            # NoSQL data access logic
│   ├── middleware/
│   │   └── validate.ts                   # Joi request object validation
│   ├── models/
│   │   ├── sql/
│   │   │   └── Candidate.ts              # SQL Candidate model
│   │   └── nosql/
│   │       └── Candidate.ts              # NoSQL Candidate model
│   ├── routes/
│   │   └── candidateRoutes.ts            # Candidate routes
│   ├── services/
│   │   ├── candidateService.ts           # Candidate service class
│   │   └── serviceLoader.ts              # Logic to select the right data access method based on DB type
│   ├── types/
│   │   └── index.ts                      # General types for functions and candidate objects
│   ├── utils/
│   │   └── redisClient.ts                # Redis client setup
│   ├── validators/
│   │   └── candidateValidator.ts         # Joi validator for candidate
│   └── app.ts                            # Main application setup
├── package.json
├── jest.config.json
├── tsconfig.json
└── README.md
```

### Description of Key Files and Directories

- `src/__tests__/`: Contains test files for various parts of the application.
- `src/config/`: Configuration files for the database and logging.
- `src/controllers/`: Contains the candidate controller which handles incoming HTTP requests.
- `src/dataAccess/`: Data access logic for SQL and NoSQL databases.
- `src/middleware/`: Middleware functions, including request validation.
- `src/models/`: Database models for SQL and NoSQL databases.
- `src/routes/`: Defines the API routes.
- `src/services/`: Business logic layer, including candidate services.
- `src/types/`: Type definitions used throughout the application.
- `src/utils/`: Utility functions and helpers, such as the Redis client setup.
- `src/validators/`: Validation logic using Joi.

## Running Tests with Jest

Tests are written using Jest and are located in the `src/__tests__/` directory. To ensure a proper test environment:

1. Set the environment to `test` in the `.env` file:

   ```bash
   NODE_ENV=test
   ```

2. Run the tests using the following command:

   ```bash
   npm test
   ```

### setup.ts and teardown.ts

The `setup.ts` and `teardown.ts` files are used to set up and clean up the test environment. They should be configured to connect to the test database, seed any necessary data, and clean up after tests.

Example setup:

```typescript
// setup.ts
import { connectDB, closeDB } from "./config/database";

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await closeDB();
});
```

Example teardown:

```typescript
// teardown.ts
import { connectDB, closeDB } from "./config/database";

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await closeDB();
});
```

To use these files in your tests, you can require them at the beginning of your test files:

```typescript
import "../setup";
import "../teardown";
```

## Environment Variables

### Description

- `DATABASE_TYPE`: Specifies the type of database to use (SQL or NoSQL).
- `SQL_DATABASE_URL`: Connection string for the SQL database (production).
- `SQL_DATABASE_DIALECT`: SQL database dialect (e.g., postgres, mysql).
- `SQL_DATABASE_URL_TEST`: Connection string for the SQL database (test).
- `SQL_DATABASE_DIALECT_TEST`: SQL database dialect for testing.
- `NOSQL_DATABASE_URL`: Connection string for the NoSQL database (production).
- `NOSQL_DATABASE_URL_TEST`: Connection string for the NoSQL database (test).
- `DB_SSL`: Whether to use SSL for database connections.
- `REDIS_URL`: Connection string for Redis.
- `NODE_ENV`: Environment setting (development, production, test).
- `PORT`: Port on which the server will run.
- `HOST`: Hostname for the server.

### Choosing the Right `NODE_ENV`

- **Development**: Set `NODE_ENV=development` to enable development-specific settings and logging.
- **Production**: Set `NODE_ENV=production` for production deployments with optimized settings.
- **Test**: Set `NODE_ENV=test` to configure the environment for running tests with separate databases and settings.

## API Endpoints

- POST /api/candidates - Add a new candidate

- PUT /api/candidates - Update an existing candidate

- GET /api/candidates/:email - Get a candidate by email

- GET /api/candidates - Get all candidates

- DELETE /api/candidates/:email - Delete a candidate by email

---
