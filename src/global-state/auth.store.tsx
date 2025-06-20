import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useEffect } from 'react';

// Define the authentication store state interface
interface AuthState {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

// Create the authentication store with persistence
export const useAuthStore = create<AuthState>()(
  persist(
    immer(set => ({
      isAuthenticated: false,
      login: () =>
        set(state => {
          state.isAuthenticated = true;
        }),
      logout: () =>
        set(state => {
          state.isAuthenticated = false;
        }),
    })),
    {
      name: 'auth-storage', // unique name for localStorage
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({ isAuthenticated: state.isAuthenticated }), // only persist isAuthenticated
    }
  )
);

// Auth initializer hook to handle auth initialization and lifecycle
export const useAuthInitializer = (options?: {
  onInitialized?: (isAuthenticated: boolean) => void;
  autoLogin?: boolean;
  storageKey?: string;
}) => {
  const { isAuthenticated, login, logout } = useAuthStore();
  const storageKey = options?.storageKey || 'auth-storage';

  useEffect(() => {
    // Explicitly check persistent storage
    const storedAuth = localStorage.getItem(storageKey);

    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth);
        const storedIsAuthenticated = authData?.state?.isAuthenticated;

        // If the stored authentication status differs from current state, update it
        if (storedIsAuthenticated !== undefined && storedIsAuthenticated !== isAuthenticated) {
          if (storedIsAuthenticated) {
            login();
          } else {
            logout();
          }
        }

        // Check for token expiration if present in the future
        // const token = authData?.state?.token;
        // if (token) {
        //   // Example token validation logic
        //   // const isTokenValid = validateToken(token);
        //   // if (!isTokenValid) {
        //   //   logout();
        //   // }
        // }
      } catch (error) {
        console.error('Failed to parse auth storage', error);
        // If storage is corrupted, reset it
        localStorage.removeItem(storageKey);
      }
    }

    // Call the onInitialized callback if provided
    if (options?.onInitialized) {
      options.onInitialized(isAuthenticated);
    }

    // Auto-login functionality if enabled (for development or testing)
    if (options?.autoLogin && !isAuthenticated) {
      login();
    }
  }, [isAuthenticated, login, logout, storageKey, options?.autoLogin, options?.onInitialized]);

  return { isAuthenticated };
};
