# ToDo App

A simple ToDo application built with React Native and Expo, using Appwrite as the backend.

## Features

*   User registration and login.
*   Add new tasks with a title and description (protected).
*   View pending tasks (protected).
*   View completed tasks (protected).
*   Mark pending tasks as completed (protected).
*   Move completed tasks back to pending (protected).
*   Delete completed tasks (protected).
*   Sort tasks by creation date (ascending/descending) (protected).
*   User feedback via toast messages.
*   Logout functionality.

## Tech Stack

*   React Native
*   Expo (with Expo Router for navigation)
*   Appwrite (Backend, Authentication & Database)
*   React Context API (for Authentication State)
*   JavaScript

## Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/KristiyanHristov04/Todo-App-React-Native.git
    cd todo-app
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Configure Appwrite:**
    Create a `.env` file in the root directory and add your Appwrite credentials:
    ```env
    // filepath: .env
    EXPO_PUBLIC_API_ENDPOINT=<YOUR_APPWRITE_API_ENDPOINT>
    EXPO_PUBLIC_PROJECT_ID=<YOUR_APPWRITE_PROJECT_ID>
    ```
    Replace `<YOUR_APPWRITE_API_ENDPOINT>` and `<YOUR_APPWRITE_PROJECT_ID>` with your actual Appwrite instance details. You can find these in your Appwrite project settings.

## Running the App

Use the Expo CLI to run the application:

*   **Start the development server:**
    ```bash
    npm start
    ```
    This will open the Expo Dev Tools in your browser. You can then choose to run the app on:
    *   An Android emulator/device (`npm run android`)
    *   An iOS simulator/device (`npm run ios`)
    *   Web browser (`npm run web`)

## Project Structure

*   **`app/`**: Contains the screen components managed by Expo Router.
    *   **`(auth)/`**: Screens related to authentication (`login.jsx`, `register.jsx`). Uses a separate layout (`_layout.jsx`).
    *   **`(protected)/`**: Screens accessible only after authentication (`index.jsx`, `create.jsx`, `done.jsx`, `logout.jsx`). Uses a separate layout (`_layout.jsx`) that enforces authentication.
    *   [`_layout.jsx`](app/_layout.jsx): Root layout for the application.
*   **`assets/`**: Static assets like icons and splash screens.
*   **`contexts/`**: Contains React Context providers, like [`AuthContext.jsx`](contexts/AuthContext.jsx) for managing authentication state.
*   **`hooks/`**: Custom React Hooks, such as [`useAuth.jsx`](hooks/useAuth.jsx) for accessing authentication context.
*   **`schemas/`**: Contains Yup validation schemas for forms, like [`loginSchema.js`](schemas/loginSchema.js) and [`registerSchema.js`](schemas/registerSchema.js).
*   **`utils/`**: Utility functions, like [`formatDate.js`](utils/formatDate.js).
*   **`appwrite.js`**: Appwrite client configuration and exports ([`appwrite.js`](appwrite.js)).
*   **`package.json`**: Project dependencies and scripts ([`package.json`](package.json)).
*   **`.env`**: Environment variables for Appwrite configuration (if used, otherwise configuration is in `appwrite.js`).

![todo1-resize](https://github.com/user-attachments/assets/ca0369f1-037a-461b-ac1d-90abe27101a0)
<br>
![todo2](https://github.com/user-attachments/assets/30c9b5ab-3e6a-4fd4-8816-044b41d7b325)
<br>
![todo3](https://github.com/user-attachments/assets/59efa745-26b7-478e-aa91-779ad7e57459)
<br>
![todo4](https://github.com/user-attachments/assets/273cd7d8-1314-44eb-a781-f9dfe2c2cd43)
<br>
![todo5](https://github.com/user-attachments/assets/670a22df-2630-44db-bea5-06f00cfaade3)
<br>
![todo6](https://github.com/user-attachments/assets/dfbeec2c-36a9-4f6d-99c9-6d4c08b651e6)
<br>
![todo7](https://github.com/user-attachments/assets/a8252998-3b24-4e59-9ec9-b1adcea2e057)
