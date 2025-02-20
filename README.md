# Warehouse Application

This is a warehouse management application built with Angular for the frontend and NodeJS for the backend.

## Prerequisites

- Node.js and npm installed (You can download them from [here](https://nodejs.org/en/download/))

## Running the Application Locally

### Backend

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm run start:dev
   ```

   The backend server should now be running on `http://localhost:3000`.

### Frontend

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the application:

   ```bash
   npm start
   ```

   The application should now be running on `http://localhost:4200`.

## Database Initialization

I use SQLite as a database for this test application. Currently, a script populates the database with seed data automatically when the backend starts. This approach is intended only for quick testing and demonstration purposes.

> Note: In a production environment, database migrations and seed scripts should be managed separately (e.g., via a dedicated migration tool and a controlled deployment process) rather than automatically running when the backend starts.

## Tests

For the frontend application, we have written unit tests covering the key components and services. Our current test coverage exceeds 70%, ensuring a reasonable level of confidence in the UI functionality.

> Note: This coverage reflects the test scope for the front-end portion only. As a next improvement, more comprehensive end-to-end and integration tests could be added to verify the entire system’s behavior in production-like scenarios.

### Frontend Tests

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Run the tests:

   ```bash
   npm run test
   ```

## Project Structure

### Backend

The backend is built with Node and follows a modular structure. Key directories and files include:

- **app.js** - the main entry point of the express application. configures middleware, connects routes, and starts the server.

- **controllers/** - houses the logic for handling requests and responses. Each controller (e.g., products.controller.js, shipments.controller.js) defines how specific routes process data, interact with models, and return results.

- **middlewares/** - contains custom middleware functions (e.g., error handling in error-handler.middleware.js). Middleware runs in the request/response cycle for logging, validation, error handling, etc.

- **models/** - defines Sequelize models (e.g., product.model.js, shipment-record.model.js). Each model maps to a database table, specifying fields, data types, and relationships. routes/ Organizes Express route definitions (products.routes.js, shipments.routes.js). Each file maps URLs to the corresponding controller methods.

- **services/** - holds additional business logic or helper functions (e.g., products.service.js), which controllers can call to keep them lean and focused on request/response handling.

- **db.js** - automatically created and seeded on server startup (for demonstration purposes).

- **routes.js** - an entry file for hooking up the top-level routes (e.g., app.use('/products', productRoutes)), centralizing route imports before adding them to app.js.

### Frontend

The frontend is built with Angular and follows a component-based architecture. Key directories and files include:

- **src/app/components/** - reusable or shared UI features.

- **src/app/interceptors/** - contains Angular HTTP interceptors (e.g., api-url.interceptor), which handle adding base URLs or showing loaders for all HTTP requests.

- **src/app/models/** - holds TypeScript interfaces and enums, such as WarehouseItem, Shipment, and related types.

- **src/app/pages/** - higher-level screens or pages in the application:

- **items-list/:** - displays a list of products (items), handles adding them to shipments, editing, and deleting.

- **shipments-list/:** - displays a list of existing shipments, with options to update statuses or view details (if implemented).

- **loader.service.ts:** - manages a global loading indicator (spinner).

- **toast.service.ts:** - handles showing toast notifications in the bottom-right corner.

- **coverage/** - automatically generated folder containing test coverage reports after running `ng test --code-coverage`.
