# LostSaga Authentication Web

This is a simple web application for handling user authentication in LostSaga. The website includes the following features:
- **Register Page**: Allows new users to sign up.
- **Login Page**: Allows registered users to log in.
- **Dashboard Page**: After logging in, users are redirected to their dashboard.

---

## Features

- **User Registration**: Register new users by providing basic information like email and password.
- **User Login**: Existing users can log in using their credentials.
- **User Dashboard**: A dashboard page that displays user-specific information (extendable as per your project needs).

---

## Prerequisites

Before getting started with this project, ensure that you have the following installed:

- **Node.js** (LTS version): [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js)
- **SQL Server** for the database.

---

## Setup Instructions

### 1. Clone the Repository

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/Hexamouse/web_auth.git)
cd web_auth
```

### 2. Install Dependencies

Install all the necessary dependencies using `npm`:

```bash
npm install
```

This will install all required libraries and packages.

### 3. Configure Database Connection

You need to configure the database connection to your SQL Server. Follow these steps:

1. Open the `next.config.js` file in the root directory.
2. Update the following configuration to match your database setup:
   - **Host (IPv4)**: Enter your database server's IP address or hostname.
   - **Username**: Enter the username for your SQL Server.
   - **Password**: Enter the password for the SQL Server username.

Additionally, update the `.env` file in the root directory with the necessary environment variables. Ensure that any required settings (such as database credentials) are properly configured.

### 4. Run the Application

After you have completed the configuration, you can start the application locally. Run the following command in your terminal:

```bash
npm run dev
```

The application will start on `http://localhost:3000` by default. Open this URL in your browser to access the web app.

---

## Project Structure

Here's an overview of the project structure:

```
/web_auth
│
├── /components       # Reusable UI components (e.g., buttons, forms, etc.)
├── /pages           # Next.js pages (login, register, dashboard)
├── /public          # Static assets (images, icons, etc.)
├── /styles          # Global CSS and styles
├── next.config.js   # Configuration file (database settings, etc.)
├── .env             # Environment variables
├── package.json     # Project metadata and dependencies
└── README.md        # Project documentation
```

---

## Technologies Used

- **Next.js**: A React framework for building server-side rendered (SSR) applications.
- **Node.js**: JavaScript runtime used for backend and server-side rendering.
- **SQL Server**: Used as the database for storing user authentication data.
- **npm**: Package manager for managing dependencies and scripts.

---

## Running Tests

This project does not currently have automated tests. However, you can manually verify the functionality by visiting the following pages:

- **Register Page**: `/register`
- **Login Page**: `/login`
- **Dashboard Page**: `/dashboard`

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

## Acknowledgements

- **LostSaga Game**: This project is inspired by the LostSaga game.
- **Next.js**: A powerful React framework used for building web applications with server-side rendering (SSR) and static site generation (SSG).

---
