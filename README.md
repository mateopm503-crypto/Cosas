# Curricular Mesh App

A comprehensive web application for visualizing and managing circular meshes for university courses (malla curricular).

## Features

- **Interactive Mesh**: View courses arranged by semester.
- **Course Details**: Click on a course to see prerequisites, dependents, and descriptions.
- **Progress Tracking**: Mark courses as approved; the state is saved locally.
- **Chatbot Assistant**: Ask questions about courses and prerequisites.
- **Visual Indicators**: Colors indicate course status (approved, locked, available) and categories.

## Tech Stack

- **Client**: React, Vite, TypeScript
- **Server**: Node.js, Express, TypeScript

## getting Started

### Prerequisites

- Node.js installed on your machine.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies for server:**
    ```bash
    cd server
    npm install
    ```

3.  **Install dependencies for client:**
    ```bash
    cd ../client
    npm install
    ```

### Running the App

1.  **Start the Server:**
    From the `server` directory:
    ```bash
    npm run dev
    ```
    The server typically runs on port 3000 (or as configured).

2.  **Start the Client:**
    From the `client` directory:
    ```bash
    npm run dev
    ```
    Open the URL shown in the terminal (usually `http://localhost:5173`) in your browser.

## Contributing

Feel free to open issues or submit pull requests!
