import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// Finds div id root in index.html and creates a React "root" inside that element where the app will live
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);