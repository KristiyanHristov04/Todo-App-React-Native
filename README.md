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

![img01](https://github.com/user-attachments/assets/7aa8426f-a190-4294-b38e-73a0c145a8ea)
<br>
![img02](https://github.com/user-attachments/assets/7f2ed371-f5e9-4c85-8ca6-a82184d5af4e)
<br>
![img03](https://github.com/user-attachments/assets/a35e4385-9699-4911-92b3-4366b020d766)
<br>
![img04](https://github.com/user-attachments/assets/05bc776d-4506-469a-b5dc-4c20261c16bb)
<br>
![img05](https://github.com/user-attachments/assets/7b386f65-001d-4d39-9e20-f4865091a509)
<br>
![img06](https://github.com/user-attachments/assets/4b8fa6f5-90de-4fdd-8d3e-3609d47620ff)
<br>
![img07](https://github.com/user-attachments/assets/4404eb82-ae99-4bc4-a056-5239d2786b30)
<br>
![img10](https://github.com/user-attachments/assets/2391d039-c9c2-45dc-8651-da60a7259333)
<br>
![img08](https://github.com/user-attachments/assets/ce617c4e-ac6c-4f8d-96d4-9f160cc215ce)


