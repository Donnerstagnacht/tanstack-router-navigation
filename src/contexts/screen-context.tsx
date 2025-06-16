import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type ScreenType = "mobile" | "desktop" | "automatic";
type PriorityType = "primary" | "secondary" | "combined";

interface ScreenContextType {
  screen: ScreenType;
  setScreen: (screenType: ScreenType) => void;
  priority: PriorityType;
  setPriority: (priorityType: PriorityType) => void;
  isMobile: boolean;
  effectiveScreen: ScreenType;
}

export const ScreenContext = createContext<ScreenContextType | undefined>(undefined);

const MOBILE_BREAKPOINT = 768;

export function ScreenProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState<ScreenType>("automatic");
  const [priority, setPriority] = useState<PriorityType>("primary");
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      
      // Automatisch screen type setzen wenn "automatic" gewählt ist
      if (screen === "automatic") {
        // Screen type wird durch isMobile bestimmt, aber nicht direkt gesetzt
        // um die "automatic" Einstellung zu behalten
      }
    };
    
    // Initiale Werte setzen
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [screen]);
  // Berechne den aktuellen effektiven screen type
  const getEffectiveScreen = () => screen === "automatic" ? (isMobile ? "mobile" : "desktop") : screen;

  return (
    <ScreenContext.Provider value={{
      screen,
      setScreen,
      priority,
      setPriority,
      isMobile,
      effectiveScreen: getEffectiveScreen(),
    }}>
      {children}
    </ScreenContext.Provider>
  );
}

export function useScreenContext() {
  const context = useContext(ScreenContext);
  if (context === undefined) {
    throw new Error('useScreenContext must be used within a ScreenProvider');
  }
  return context;
}
