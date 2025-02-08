"use client"
import React, { createContext, useState, useContext, useEffect, PropsWithChildren } from 'react';

interface ThemeContextProps{
  theme: string,
  toggleTheme: ()=>void
}

const defaulthemeContext = {
  theme: "dark",
  toggleTheme: ()=>{},
}

const ThemeContext = createContext<ThemeContextProps>(defaulthemeContext);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme; // Apply theme class to body element
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
