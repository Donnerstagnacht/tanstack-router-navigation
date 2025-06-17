'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

// Define our theme types for better type safety
export type ThemeType = 'dark' | 'light' | 'system';
export type SystemThemeType = 'dark' | 'light';

export interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  systemTheme: SystemThemeType;
  isDark: boolean;
  isMounted: boolean;
}

// Create context with explicit undefined type for better type safety
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeType;
  storageKey?: string;
}

/**
 * Hook that tracks the system's color scheme preference
 * @returns The current system theme ('dark' | 'light')
 */
function useSystemTheme(): SystemThemeType {
  // Default to light to prevent hydration issues
  const [systemTheme, setSystemTheme] = useState<SystemThemeType>('light');

  useEffect(() => {
    // Query for dark mode preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Set initial value based on system preference
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');

    // Handler for preference changes
    const handleChange = (event: MediaQueryListEvent): void => {
      setSystemTheme(event.matches ? 'dark' : 'light');
    };

    // Subscribe to changes
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup on unmount
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return systemTheme;
}

/**
 * Unified ThemeProvider component that:
 * 1. Manages theme state
 * 2. Syncs with localStorage
 * 3. Applies theme classes to document
 * 4. Handles system theme detection
 */
export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'theme',
}: ThemeProviderProps): React.ReactElement {
  // Get system theme preference
  const systemTheme = useSystemTheme();

  // State to track the current theme selection
  const [theme, setThemeState] = useState<ThemeType>(defaultTheme);

  // Track whether component is mounted to prevent hydration mismatch
  const [mounted, setMounted] = useState<boolean>(false);

  // Initialize theme from localStorage when component mounts
  useEffect(() => {
    // Safely retrieve theme from storage with type validation
    const getThemeFromStorage = (): ThemeType => {
      try {
        const storedValue = localStorage.getItem(storageKey);

        // Validate that the stored value is a valid theme
        if (storedValue === 'light' || storedValue === 'dark' || storedValue === 'system') {
          return storedValue;
        }
      } catch (error) {
        console.error('Failed to read theme from localStorage:', error);
      }

      return defaultTheme;
    };

    // Set the theme from storage or default
    setThemeState(getThemeFromStorage());

    // Mark as mounted after initialization
    setMounted(true);
  }, [defaultTheme, storageKey]);

  // Update localStorage and apply theme class when theme changes
  useEffect(() => {
    if (!mounted) return;

    // Update localStorage
    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {
      console.error('Failed to save theme to localStorage:', error);
    }

    // Apply theme class to document
    const root = document.documentElement;
    root.classList.remove('light', 'dark');

    const resolvedTheme = theme === 'system' ? systemTheme : theme;
    root.classList.add(resolvedTheme);
  }, [theme, systemTheme, mounted, storageKey]);

  // Wrapper for setting theme to maintain type safety
  const setTheme = (newTheme: ThemeType): void => {
    setThemeState(newTheme);
  };

  // Determine if the current theme is dark
  const isDark = theme === 'dark' || (theme === 'system' && systemTheme === 'dark');

  // Create context value
  const value: ThemeContextType = {
    theme,
    setTheme,
    systemTheme,
    isDark,
    isMounted: mounted,
  };

  // Use a placeholder value before mounting to prevent hydration mismatch
  if (!mounted) {
    return (
      <ThemeContext.Provider
        value={{
          theme: 'system',
          setTheme: () => {},
          systemTheme: 'light',
          isDark: false,
          isMounted: false,
        }}
      >
        {children}
      </ThemeContext.Provider>
    );
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Hook to access the current theme context
 * @throws Error if used outside of ThemeProvider
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
