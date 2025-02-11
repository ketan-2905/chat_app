"use client"
import { usePathname } from 'next/navigation';
import React, { createContext, useState, useContext, useEffect, PropsWithChildren } from 'react';

interface ThemeContextProps{
  theme: string;
  toggleTheme: () => void;
}

const defaultThemeContext: ThemeContextProps = {
  theme: "dark",
  toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeContextProps>(defaultThemeContext);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  // Initialize state with localStorage value or default
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  const route = usePathname();

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.classList.remove("dark")
    document.body.classList.remove('light')
    document.body.classList.add(theme)
  }, [theme, route]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
