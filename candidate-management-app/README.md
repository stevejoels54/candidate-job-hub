````markdown
# Candidate Management App

This is a React application for managing candidate information. The app uses TypeScript, Ant Design (antd) for UI components, Redux for state management, and Redux Saga middleware for handling side effects such as API calls. Axios is used for making HTTP requests to the server.

## Prerequisites

- Node.js (version 18 or above)
- npm or yarn

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/stevejoels54/candidate-job-hub.git
cd candidate-job-hub
cd candidate-management-app
```
````

### 2. Install Dependencies

Using npm:

```bash
npm install
```

Using yarn:

```bash
yarn install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory and add the following environment variable:

```bash
VITE_APP_BASE_URL=http://localhost:5000
```

For production, ensure the `.env.production` file contains the correct production base URL:

```bash
VITE_APP_BASE_URL=http://your-production-server-url
```

### 4. Run the Development Server

Using npm:

```bash
npm run dev
```

Using yarn:

```bash
yarn dev
```

This will start the development server and you can access the application at `http://localhost:5173`.

### 5. Build for Production

Using npm:

```bash
npm run build
```

Using yarn:

```bash
yarn build
```

The production build will be available in the `dist` folder.

### 6. Preview the Production Build

Using npm:

```bash
npm run serve
```

Using yarn:

```bash
yarn serve
```

This will preview the production build at `http://localhost:5173`.

## Project Structure

- `src/`: Contains the main source code of the application.
  - `components/`: Reusable UI components.
  - `pages/`: Application pages.
  - `layout/`: Application layout
  - `config/`: Config files for Redux-related files and axios services.
    - `initialState`: Redux initial state
    - `sagas/`: Redux Saga files.
    - `reducers/`: Redux reducers.
    - `actions/`: Redux actions.
    - `store/`: Redux store configuration.
    - `services/`: Axios service for API calls.
  - `App.tsx`: Main application component.
  - `App.css`: Main application css.
  - `index.css`: Body css.
  - `index.tsx`: Entry point of the application.

## State Management

The app uses Redux for state management and Redux Saga for handling side effects. The state is managed in a centralized store and components can access the state using `useSelector` and dispatch actions using `useDispatch`.

## Making API Calls

The app uses Axios for making HTTP requests. The base URL for the API is configured using environment variables. In the Redux Saga files, you can access the base URL as follows:

```typescript
const baseUrl = import.meta.env.VITE_APP_BASE_URL;
```

Example of an API call using Axios in a saga:

```typescript
import { takeLatest, put, fork } from "@redux-saga/core/effects";
import { actions } from "../actions";
import { AxiosResponse } from "axios";
import axios from "axios";

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

// function to get all candidates
function* getCandidates() {
  try {
    const response: AxiosResponse = yield axios.get(
      `${baseUrl}/api/candidates`
    );
    yield put({
      type: actions.GET_CANDIDATES_SUCCESS,
      candidates: response.data,
    });
  } catch (error) {
    yield put({ type: actions.GET_CANDIDATES_ERROR, error });
  }
}
```

## UI Components

The app uses Ant Design (antd) for UI components. You can import and use antd components as follows:

```typescript
import { Button, Table } from "antd";

const MyComponent = () => (
  <div>
    <Button type="primary">Add Candidate</Button>
    <Table dataSource={data} columns={columns} />
  </div>
);
```

## Available Scripts

In the project directory, you can run:

### `npm run dev` or `yarn dev`

Runs the app in development mode.

### `npm run build` or `yarn build`

Builds the app for production to the `dist` folder.

### `npm run serve` or `yarn serve`

Serves the production build locally.

### `npm run lint` or `yarn lint`

Lints the project for code quality.

## Learn More

To learn more about the tools and libraries used in this project, check out the following documentation:

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Ant Design](https://ant.design/)
- [Redux](https://redux.js.org/)
- [Redux Saga](https://redux-saga.js.org/)
- [Axios](https://axios-http.com/)

---
