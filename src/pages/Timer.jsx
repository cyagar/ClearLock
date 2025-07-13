import { useState } from "react";
import "./Timer.css";

// Recieve timer props from App.jsx
function Timer({
  timeLeft,
  setTimeLeft,
  isRunning,
  setIsRunning,
  intervalRef,
}) {
  // Session complete and break states
  const [sessionComplete, setSessionComplete] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [showGuidedAdvice, setShowGuidedAdvice] = useState(false);

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
    setTimeLeft(0.1 * 60);
    setIsRunning(false);
    setSessionComplete(false);
    setIsBreak(false);
  };

  // Timer done logic
  if (timeLeft === 0 && !sessionComplete) {
    setSessionComplete(true);
    setIsRunning(false);
  }

  // Break button logic
  const handleBreak = () => {
    setTimeLeft(0.2 * 60);
    setSessionComplete(false);
    setIsRunning(true);
    setIsBreak(true);
  };

  // Go again button logic
  const handleGoAgain = () => {
    setTimeLeft(0.1 * 60);
    setSessionComplete(false);
    setIsRunning(true);
    setIsBreak(false);
  };

  return (
    <div className="timer-container">
      {/* Only show this tip if not in break, or if session hasn't finished */}
      {!sessionComplete && !isBreak && (
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
                onClick={(e) => e.stopPropagation()} /* keep clicks inside */
              >
                <p>
                  If you're on mobile, enable <strong>iOS Guided Access</strong>{" "}
                  (or <strong>Android App Pinning</strong>) to keep ClearLock on
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
      {sessionComplete ? (
        <>
          {/* Display completed session text or completed break text */}
          <h2 className="congrats-text">
            {isBreak
              ? "Break's over, get ready for another ClearLock session!"
              : "ClearLock session complete, well done!"}
          </h2>
          {/* On completed break screen display only the start session button */}
          <div className="button-row">
            {isBreak ? (
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
  );
}

export default Timer;