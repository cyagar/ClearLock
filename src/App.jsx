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
import HomeWhite from "./assets/homeWhite.png";
import TimerWhite from "./assets/timerWhite.png";
import GoalsWhite from "./assets/goalsWhite.png";

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
  const targetTimeRef = useRef(null)
  // Tracks if the timer session has been initiated (this is so the initial info screen only appears once)
  const [initiatedSession, setInitiatedSession] = useState(false);

// React effect that runs when [isRunning] changes
  useEffect(() => {
    // Timer is running
    if (isRunning) {
      // Set the target end time based on the current timeLeft
      // This works for starting, resuming, or starting a break
      targetTimeRef.current = Date.now() + timeLeft * 1000;
      // Clear any old interval (just in case)
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        // Calculate the actual remaining time
        const remainingMilliseconds = targetTimeRef.current - Date.now();
        const remainingSeconds = Math.round(remainingMilliseconds / 1000);
        // Check if timer is done
        if (remainingSeconds <= 0) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsRunning(false);
          setIsTimerDone(true);
          setTimeLeft(0);
        } else {
          // Update the state with the correct time
          setTimeLeft(remainingSeconds);
        }
      }, 500); // Check every 500ms for a responsive UI
    }
    // Timer is paused
    else {
      // Clear interval when paused
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    // Cleanup function for when the component unmounts
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning]); // This effect *only* needs to run when isRunning changes

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
        <nav className={`bottom-nav ${theme === "dark" ? "dark-mode" : ""}`}>
          {theme === "light" ? (
            <>
              <NavLink to="/timer">
                <img src={TimerIcon} alt="Timer" className="nav-icon" />
              </NavLink>
              <NavLink to="/">
                <img src={HomeIcon} alt="Home" className="nav-icon" />
              </NavLink>
              <NavLink to="/goals">
                <img src={GoalsIcon} alt="Goals" className="nav-icon" />
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/timer">
                <img src={TimerWhite} alt="Timer" className="nav-icon" />
              </NavLink>
              <NavLink to="/">
                <img src={HomeWhite} alt="Home" className="nav-icon" />
              </NavLink>
              <NavLink to="/goals">
                <img src={GoalsWhite} alt="Goals" className="nav-icon" />
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </Router>
  );
}

export default App;