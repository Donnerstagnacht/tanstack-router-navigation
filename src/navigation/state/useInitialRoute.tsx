import { useEffect } from 'react';

// Custom hook to set initial route based on window location
export function useInitialRoute(
  setCurrentPrimaryRoute: React.Dispatch<React.SetStateAction<string | null>>
) {
  useEffect(() => {
    const path = window.location.pathname;
    const route = path === '/' ? 'home' : path.split('/')[1];
    setCurrentPrimaryRoute(route);
  }, [setCurrentPrimaryRoute]);
}
