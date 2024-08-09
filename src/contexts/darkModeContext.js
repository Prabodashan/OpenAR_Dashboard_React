import { createContext, useEffect, useState } from "react";

export const DarkModeContext = createContext();

export const DarkModeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

  const toggle = (action) => {
    switch (action.type) {
      case "LIGHT": {
        setDarkMode(false);
        break;
      }
      case "DARK": {
        setDarkMode(false);
        break;
      }
      case "TOGGLE": {
        setDarkMode(!darkMode);
        break;
      }
      default:
        return;
    }
  };

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
};
