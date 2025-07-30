import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "./pages/ThemeContext.jsx";
import Home from "./pages/Home";
import Timer from "./pages/Timer";
import Goals from "./pages/Goals";
import HomeIcon from "./assets/homeReal.png";
import TimerIcon from "./assets/timerReal.png";
import GoalsIcon from "./assets/goalsReal.png";
import "./App.css";

function App() {
  
  // Use custom hook to access theme context, which provides current theme and a function to toggle it
  const { theme, toggleTheme } = useTheme();
  // Timer logic that is in App.jsx so it can always runs no matter where in the app
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isTimerDone, setIsTimerDone] = useState(false);
  const [isTimerBreak, setIsTimerBreak] = useState(false);
  // To store the id returned by setInterval
  const intervalRef = useRef(null);
  // Tracks if the timer session has been initiated (this is so the initial info screen only appears once)
  const [initiatedSession, setInitiatedSession] = useState(false);

  // React effect that runs when [isRunning] changes
  useEffect(() => {
    // Pressed start
    if (isRunning && intervalRef.current === null) {
      // Store id and run the following every 1000 miliseconds (1 second)
      intervalRef.current = setInterval(() => {
        // Update timeLeft state using previous state value
        setTimeLeft((prev) => {
          // Time done
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setIsRunning(false);
            setIsTimerDone(true);
            return 0;
          }
          // Time remaning, subtract one
          return prev - 1;
        });
      }, 1000);
    }
    // Cleanup function for useEffect, will run before next run or on unmount
    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [isRunning]);

  return (
    // Enables client-side routing, listens to URL changes and displays components based on current route
    <Router>
      {/* Main container for entire app, conditionally apply dark mode class */}
      <div className={`app-container ${theme === "dark" ? "dark-mode" : ""}`}>
        {/* Theme toggle button */}
        <button onClick={toggleTheme} className="theme-toggle-button">
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        {/* Defines routes for the app */}
        <Routes>
          {/* If URL path is exactly / then render Home compenent */}
          <Route path="/" element={<Home />} />
          {/* If URL path is exactly /timer then render timer compenent, passing in timer state and functions */}
          <Route
            path="/timer"
            element={
              <Timer
                timeLeft={timeLeft}
                setTimeLeft={setTimeLeft}
                isRunning={isRunning}
                setIsRunning={setIsRunning}
                intervalRef={intervalRef}
                initiatedSession={initiatedSession}
                setInitiatedSession={setInitiatedSession}
                isTimerDone={isTimerDone}
                setIsTimerDone={setIsTimerDone}
                isTimerBreak={isTimerBreak}
                setIsTimerBreak={setIsTimerBreak}
              />
            }
          />
          {/* If URL path is exactly /goals then render Goals compenent */}
          <Route path="/goals" element={<Goals />} />
        </Routes>
        {/* Bottom navigation bar, each Link updates the URL and triggers corresponding Route to render correct page */}
        <nav className="bottom-nav">
          <NavLink to="/timer">
            <img src={TimerIcon} alt="Timer" className="nav-icon" />
          </NavLink>
          <NavLink to="/">
            <img src={HomeIcon} alt="Home" className="nav-icon" />
          </NavLink>
          <NavLink to="/goals">
            <img src={GoalsIcon} alt="Goals" className="nav-icon" />
          </NavLink>
        </nav>
      </div>
    </Router>
  );
}

export default App;