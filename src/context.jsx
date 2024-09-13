import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const getInitianDarkMode = () => {
  const prefersedMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  console.log(prefersedMode);
  return prefersedMode;
};

export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitianDarkMode());
  const [searchTerm, setSearchTerm] = useState("cat");

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    const body = document.querySelector("body");
    body.classList.toggle("dark-theme", newDarkTheme);
  };

  useEffect(() => {
    document.body.classList.add("dark-theme", isDarkTheme);
  }, [setIsDarkTheme]);

  return (
    <AppContext.Provider
      value={{ isDarkTheme, toggleDarkTheme, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
