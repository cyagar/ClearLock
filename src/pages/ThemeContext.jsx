import { createContext, useState, useEffect, useContext } from "react";

// Create a Context for the theme
export const ThemeContext = createContext();

// Create a ThemeProvider component
export const ThemeProvider = ({ children }) => {
  // Initialize theme state from localStorage or default to light
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  });

  // Use a useEffect hook to apply the data-theme attribute to the html element
  // and save the theme preference to localStorage whenever the theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem("theme", theme);
  }, [theme]); // Rerun this effect whenever the theme state changes

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Provide the theme and toggleTheme function to the children components
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for easy access to the theme context
export const useTheme = () => useContext(ThemeContext);