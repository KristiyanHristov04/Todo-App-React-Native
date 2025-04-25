````markdown
# ToDo App

A simple ToDo application built with React Native and Expo, using Appwrite as the backend.

## Features

*   Add new tasks with a title and description.
*   View pending tasks.
*   View completed tasks.
*   Mark pending tasks as completed.
*   Move completed tasks back to pending.
*   Delete completed tasks.
*   Sort tasks by creation date (ascending/descending).
*   User feedback via toast messages.

## Tech Stack

*   React Native
*   Expo (with Expo Router for navigation)
*   Appwrite (Backend & Database)
*   JavaScript

## Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
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

*   **`app/`**: Contains the screen components managed by Expo Router ([`_layout.jsx`](app/_layout.jsx), [`index.jsx`](app/index.jsx), [`create.jsx`](app/create.jsx), [`done.jsx`](app/done.jsx)).
*   **`assets/`**: Static assets like icons and splash screens.
*   **`utils/`**: Utility functions, like [`formatDate.js`](utils/formatDate.js).
*   **`appwrite.js`**: Appwrite client configuration and exports ([`appwrite.js`](appwrite.js)).
*   **`package.json`**: Project dependencies and scripts ([`package.json`](package.json)).
*   **`.env`**: Environment variables for Appwrite configuration ([`.env`](.env)).
````