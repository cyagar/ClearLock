import { useState, useEffect } from "react";
import "./Timer.css";
import LockIcon from "../assets/lockReal.png";

// Recieve timer props from App.jsx
function Timer({
  timeLeft,
  setTimeLeft,
  isRunning,
  setIsRunning,
  intervalRef,
  initiatedSession,
  setInitiatedSession,
  isTimerDone,
  setIsTimerDone,
  isTimerBreak,
  setIsTimerBreak,
}) {
  
  // For the guided access info button
  const [showGuidedAdvice, setShowGuidedAdvice] = useState(false);
  // For fade-in animation of the timer content
  const [fadeIn, setFadeIn] = useState(false);

  // Effect to trigger the fade-in animation after the content is mounted
  useEffect(() => {
    if (initiatedSession) {
      // Small delay to ensure the element is in the DOM before animation starts
      const timer = setTimeout(() => {
        setFadeIn(true);
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [initiatedSession]);

  // Format timer in desired MM:SS style
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const padMins = String(mins).padStart(2, "0");
    const padSecs = String(secs).padStart(2, "0");
    return `${padMins}:${padSecs}`;
  }

  // Start/pause button click
  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  // Restart button logic
  const clearTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTimeLeft(25 * 60);
    setIsRunning(false);
    setIsTimerDone(false);
    setIsTimerBreak(false);
  };

  // Break button logic
  const handleBreak = () => {
    setTimeLeft(5 * 60);
    setIsTimerDone(false);
    setIsRunning(true);
    setIsTimerBreak(true);
  };

  // Go again button logic
  const handleGoAgain = () => {
    setTimeLeft(25 * 60);
    setIsTimerDone(false);
    setIsRunning(true);
    setIsTimerBreak(false);
  };

  // Handle click on the initial image to show the timer
  const handleInitiateSessionClick = () => {
    setInitiatedSession(true);
    setIsRunning(true);
    setIsTimerDone(false);
    setIsTimerBreak(false);
  };

  return (
    <div className="timer-container">
      {/* Show initial image/text OR the timer content */}
      {!initiatedSession ? (
        // The clickable intro screen the user sees when landing on the page
        <div className="initial-timer-screen">
          {/* Inner div for the image and info text */}
          <div
            className="initial-timer-screen-content"
            onClick={handleInitiateSessionClick}
          >
            <img
              src={LockIcon}
              alt="Initiate Clear Lock Session"
              className="initiate-image"
            />
            <h2 className="initiate-text">Start ClearLock Session</h2>
          </div>
          <p className="info-text">
            Tap the lock to begin your 25-minute focus session. When it ends,
            take a 5-minute break or go again. Repeat to stay in the zone and
            get things done. Let's get started, make every minute count!
          </p>
        </div>
      ) : (
        // Main timer content fades in
        <div className={`timer-content ${fadeIn ? "fade-in" : ""}`}>
          {/* Only show this tip if not in break, or if session hasn't finished */}
          {!isTimerDone && !isTimerBreak && (
            <>
              <button
                className="guided-access-btn"
                onClick={() => setShowGuidedAdvice(true)}
              >
                Guided Access Tip
              </button>

              {showGuidedAdvice && (
                <div
                  className="guided-access-overlay"
                  onClick={() => setShowGuidedAdvice(false)}
                >
                  <div
                    className="guided-access-dialog"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <p>
                      If you're on mobile, enable{" "}
                      <strong>iOS Guided Access</strong> (or{" "}
                      <strong>Android App Pinning</strong>) to keep ClearLock on
                      screen and avoid distractions.
                    </p>
                    <button
                      className="close-btn"
                      onClick={() => setShowGuidedAdvice(false)}
                    >
                      Got it
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
          {/* When session is complete, go to completed screen */}
          {isTimerDone ? (
            <>
              {/* Display completed session text or completed break text */}
              <h2 className="congrats-text">
                {isTimerBreak
                  ? "Break's over, get ready for another ClearLock session!"
                  : "ClearLock session complete, well done!"}
              </h2>
              {/* On completed break screen display only the start session button */}
              <div className="button-row">
                {isTimerBreak ? (
                  <button className="start-button" onClick={handleGoAgain}>
                    Start Session
                  </button>
                ) : (
                  // On completed session screen display break button and go again button
                  <>
                    <button className="break-button" onClick={handleBreak}>
                      5-Minute Break
                    </button>
                    <button className="start-button" onClick={handleGoAgain}>
                      Go Again
                    </button>
                  </>
                )}
              </div>
            </>
          ) : (
            // When session is running, display standard timer screen
            <>
              <h1 className="timer-display">{formatTime(timeLeft)}</h1>
              <div className="button-row">
                <button className="start-button" onClick={toggleTimer}>
                  {isRunning ? "Pause" : "Start"}
                </button>
                <button className="restart-button" onClick={clearTimer}>
                  Restart
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Timer;