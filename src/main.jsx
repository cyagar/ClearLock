// It's like a "debug mode" wrapper
import { StrictMode } from "react";
// Create a root to display React components inside a browser DOM node
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// Finds div id root in index.html and creates a React "root" inside that element where the app will live
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* React renders the whole app inside the #root div, starting with <App />. */}
    <App />
  </StrictMode>
);