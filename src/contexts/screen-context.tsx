import { createContext, useContext } from 'react';

type ScreenType = "mobile" | "desktop" | "automatic";
type PriorityType = "primary" | "secondary" | "combined";

interface ScreenContextType {
  screen: ScreenType;
  setScreen: (screenType: ScreenType) => void;
  priority: PriorityType;
  setPriority: (priorityType: PriorityType) => void;
}

export const ScreenContext = createContext<ScreenContextType | undefined>(undefined);

export function useScreenContext() {
  const context = useContext(ScreenContext);
  if (context === undefined) {
    throw new Error('useScreenContext must be used within a ScreenProvider');
  }
  return context;
}
