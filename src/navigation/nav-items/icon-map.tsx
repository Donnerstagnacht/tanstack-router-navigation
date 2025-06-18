import React from 'react';
import {
  AreaChart,
  Bell,
  Bookmark,
  Calendar,
  File,
  FileText,
  FolderOpen,
  Heart,
  Home,
  Keyboard,
  Laptop,
  LayoutDashboard,
  LineChart,
  Mail,
  MessageSquare,
  Moon,
  Search,
  Settings,
  Sun,
  User,
} from 'lucide-react';

/**
 * Centralized icon mapping for the application
 * Maps string icon names to their corresponding Lucide React components
 */
export const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home,
  Settings,
  User,
  Mail,
  Search,
  Bell,
  Heart,
  Bookmark,
  LayoutDashboard,
  File,
  FolderOpen,
  Calendar,
  MessageSquare,
  Moon,
  Sun,
  Laptop,
  Keyboard,
  LineChart,
  FileText,
  AreaChart,
};

/**
 * Helper function to get the correct icon component by name
 * @param iconName The name of the icon to retrieve
 * @returns The corresponding icon component or a fallback
 */
export function getIconComponent(iconName: string) {
  return iconMap[iconName] || Search; // Fallback to Search icon if the name doesn't match
}
