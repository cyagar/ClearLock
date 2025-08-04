Markdown

# ClearLock

A minimalist productivity web application that combines a focused Pomodoro-style timer with a simple home screen and to-do list. ClearLock helps you stay in the zone, manage your tasks, and make every minute count.

## ✨ Features

* **Focus Timer:** A 25-minute Pomodoro-style timer to help you work in focused bursts, with a short 5-minute break period when a session is complete.
* **Persistent To-Do List:** A to-do list where you can add, edit, mark as complete, or delete tasks. Your list is saved locally in your browser, so your goals are always there when you return.
* **Inspirational Quotes:** A motivational quote and the current time displayed on the home screen to keep you inspired.
* **Theme Toggle:** A simple button to switch between light and dark modes for a comfortable viewing experience.
* **Responsive Design:** The application is fully responsive and optimized for both desktop and mobile devices.

## 🚀 Live Demo

You can view a live version of the application here:

[[](https://clearlock.netlify.app/)]

## 🛠️ Technologies Used

* **Frontend:**
    * [**React**](https://reactjs.org/): A JavaScript library for building user interfaces.
    * [**Vite**](https://vitejs.dev/): A fast frontend build tool.
    * [**React Router**](https://reactrouter.com/): For client-side routing between pages.
* **Styling:**
    * CSS with custom properties (CSS variables) for a maintainable and toggleable theme.
* **Other:**
    * [**uuid**](https://www.npmjs.com/package/uuid): A library for generating unique IDs for the to-do list items.

## 💻 Getting Started

To run the project locally, follow these steps:

### Prerequisites

* Node.js (LTS version recommended)
* npm (or yarn/pnpm)

### Installation

1.  Clone the repository:
    ```bash
    git clone [https://github.com/](https://github.com/)[your-username]/[your-repo-name].git
    ```
2.  Navigate to the project directory:
    ```bash
    cd clearlock
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```

The application should now be running at `http://localhost:5173/` (or another port if specified by Vite).

## 📝 Usage

* **Home Page:** Displays the current time and a random inspirational quote.
* **Timer Page:** Click the lock icon to start a 25-minute focus session. Use the "Start/Pause" button to control the timer. When a session is complete, you can take a 5-minute break or start another session.
* **Goals Page:** Use the input field to add new tasks. You can use the buttons next to each task to edit, mark as complete, or delete it.
