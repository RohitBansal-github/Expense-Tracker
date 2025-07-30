# 💰 Expense Tracker

## 📋 Project Description

The Expense Tracker is a modern, full-stack web application designed to help users effectively manage and monitor their personal finances. Built with Next.js, this application provides a user-friendly interface to track income and expenses, categorize transactions, and visualize financial data. It leverages serverless PostgreSQL with Drizzle ORM for robust data management and integrates Clerk for secure user authentication, ensuring your financial data is both organized and protected.

## ✨ Features

*   **Secure User Authentication**: Powered by Clerk, allowing users to sign up, log in, and manage their accounts securely.
*   **Expense & Income Tracking**: Easily add, edit, and delete expense and income records with detailed information.
*   **Category Management**: Organize transactions into custom categories, enhanced with emoji support for better visual identification.
*   **Financial Dashboard**: Get a quick overview of your financial health with interactive charts and summaries (powered by Recharts).
*   **Data Persistence**: Securely store your financial data using Drizzle ORM with a PostgreSQL database (optimized for serverless environments like Neon DB).
*   **Responsive Design**: A user interface built with Radix UI and Tailwind CSS that adapts seamlessly to various screen sizes.
*   **Dark Mode Support**: Toggle between light and dark themes for a personalized viewing experience.
*   **Notifications**: Instant feedback and alerts using Sonner toasts for user actions.
*   **Developer-Friendly Database Tools**: Scripts for pushing schema changes and accessing a Drizzle Studio for database introspection.

## 📁 Project Structure

This project follows a standard Next.js application structure, leveraging the `app` directory for routing and components.

```
expense-tracker/
├── public/                 # Static assets (images, fonts, etc.)
├── app/                    # Next.js App Router (pages, layouts, API routes)
│   ├── (auth)/             # Authentication related pages (e.g., sign-in, sign-up)
│   ├── (dashboard)/        # Main application dashboard and features
│   ├── api/                # API routes for backend logic
│   └── globals.css         # Global styles
├── components/             # Reusable React components
├── lib/                    # Utility functions, database configurations, helpers
│   ├── db/                 # Drizzle ORM schema and database connection
│   ├── utils.ts            # General utility functions
│   └── ...
├── node_modules/           # Installed npm packages
├── .env.example            # Example environment variables
├── next.config.mjs         # Next.js configuration
├── package.json            # Project dependencies and scripts
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## ⚙️ Installation & Setup

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (LTS version recommended)
*   npm (comes with Node.js)
*   A PostgreSQL database (e.g., local PostgreSQL, ElephantSQL, Neon.tech).

### Steps

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/expense-tracker.git
    cd expense-tracker
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env.local` file in the root of the project based on `.env.example`. You will need to provide:
    *   `DATABASE_URL`: Your PostgreSQL connection string.
    *   `CLERK_SECRET_KEY`: Your Clerk API secret key.
    *   `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Your Clerk public key.
    *   Other Clerk-related environment variables as per Clerk documentation.

    Example `.env.local`:
    ```
    DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"
    CLERK_SECRET_KEY="sk_test_..."
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
    ```

4.  **Push Database Schema:**
    This command will sync your Drizzle ORM schema with your PostgreSQL database.
    ```bash
    npm run db:push
    ```
    You can also use `npm run db:studio` to open Drizzle Studio for a visual representation and interaction with your database schema.

## 🚀 How to Run

### Development Mode

To run the application in development mode with hot-reloading:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Production Build

To build the application for production:

```bash
npm run build
```

### Start Production Server

To start the built production server:

```bash
npm run start
```

## 💡 Examples

Once the application is running, you can:

1.  **Sign Up/Log In**: Create a new account or log in using your Clerk credentials.
2.  **Add Expenses/Income**: Navigate to the "Add Transaction" section to record new financial entries. You can specify the amount, description, date, and category (with emoji selection!).
3.  **View Dashboard**: See your financial summary, including total income, total expenses, and a breakdown of spending by category, often presented with charts for easy understanding.
4.  **Manage Categories**: Create new categories or modify existing ones to perfectly fit your financial tracking needs.

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the ISC License. See the `LICENSE` file (if present, or inferred from `package.json`) for more details.

## 📞 Contact

For any questions, suggestions, or support, please open an issue in the GitHub repository or reach out to the repository maintainer.
