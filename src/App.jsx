import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Home from "./pages/Home";
import Timer from "./pages/Timer";
import Goals from "./pages/Goals";
import "./App.css";

function App() {
  // Timer logic that always runs no matter where in the app
  const [timeLeft, setTimeLeft] = useState(0.1 * 60);
  const [isRunning, setIsRunning] = useState(false);
  // To store the id returned by setInterval
  const intervalRef = useRef(null);

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
      {/* Main container for entire app */}
      <div className="app-container">
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
              />
            }
          />
          {/* If URL path is exactly /goals then render Goals compenent */}
          <Route path="/goals" element={<Goals />} />
        </Routes>
        {/* Bottom navigation bar, each Link updates the URL and triggers corresponding Route to render correct page */}
        <nav className="bottom-nav">
          <Link to="/timer">Timer</Link>
          <Link to="/">Home</Link>
          <Link to="/goals">Goals</Link>
        </nav>
      </div>
    </Router>
  );
}

export default App;