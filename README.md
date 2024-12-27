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
git clone https://github.com/yourusername/lostsaga-auth.git
cd lostsaga-auth
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
/lostsaga-auth
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

## Contributing

Feel free to fork the repository and submit pull requests. If you encounter any issues, please open a bug report or submit a feature request.

To contribute, follow these steps:

1. Fork the repository.
2. Clone your forked repository.
3. Create a new branch for your feature or fix.
4. Make your changes and commit them.
5. Push your changes to your forked repository.
6. Submit a pull request to the main repository.

---

## Contact

For further questions or collaboration, you can contact the project maintainer:

- **Email**: your-email@example.com
- **GitHub**: [your-github-profile](https://github.com/yourusername)

---

## Acknowledgements

- Special thanks to the developers of Next.js for creating an amazing React framework.
- Thanks to SQL Server for providing robust and scalable database solutions.

---

Feel free to contribute or raise issues in the repository!
```

### Breakdown of the Sections:

1. **Project Title & Description**: Provides a clear explanation of what the project does.
2. **Features**: Highlights the main features available on the web application.
3. **Prerequisites**: Lists the software and services you need installed to run the project.
4. **Setup Instructions**: Detailed step-by-step guide to setting up the project locally.
5. **Project Structure**: Provides an overview of the file organization and the purpose of different directories/files.
6. **Technologies Used**: Brief overview of the core technologies used in the project.
7. **Running Tests**: Information on how to manually test the functionality, since no automated tests are included in this case.
8. **License**: Specifies the licensing terms (MIT License in this case).
9. **Contributing**: Explains how others can contribute to the project.
10. **Contact**: Provides a way for others to contact you or the project maintainer.
11. **Acknowledgements**: Credits and thanks to libraries, tools, and frameworks used in the project.

---

This should provide a comprehensive README for your project, making it easy for others to understand, set up, and contribute.
