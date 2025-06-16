import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ThemeProvider } from '@/components/navigation/toggles/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { DynamicNavigation } from '@/components/navigation/dynamic-navigation'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from '@/components/ui/command'
import { Badge } from '@/components/ui/badge'
import React, { useState, useEffect } from 'react'
import { ScreenContext } from '@/contexts/screen-context'
import { 
  Search, 
  Home, 
  Settings, 
  User, 
  Mail, 
  Bell, 
  Heart, 
  Bookmark, 
  LayoutDashboard, 
  File, 
  FolderOpen, 
  Calendar, 
  MessageSquare, 
  Moon,
  Keyboard,
  Laptop,
  Sun
} from 'lucide-react'
import { getShortcutForItem } from '@/lib/keyboard-navigation'
import { useNavigationKeyboard } from '@/hooks/use-navigation-keyboard'

// Helper function to get the correct icon component
function getIconComponent(iconName: string) {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
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
    Keyboard
  };
  
  return iconMap[iconName] || Search; // Fallback to Search icon if the name doesn't match
}

export const Route = createRootRoute({
  component: () => {
    // State for navigation configuration
    const [state, setState] = useState<"asButton" | "asButtonList" | "asLabeledButtonList">("asButton");
    const [priority, setPriority] = useState<"primary" | "secondary" | "combined">("primary");
    const [screen, setScreen] = useState<"mobile" | "desktop" | "automatic">("automatic");
    const [open, setOpen] = useState(false);
  
    // Define navigation items for primary navigation
    const primaryNavItems = [
      { id: "home", label: "Home", icon: "Home" },
      { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard" },
      { id: "messages", label: "Messages", icon: "MessageSquare", badge: 5 },
      { id: "settings", label: "Settings", icon: "Settings" },
      { id: "files", label: "Files", icon: "File" },
      { id: "projects", label: "Projects", icon: "FolderOpen" },
      { id: "calendar", label: "Calendar", icon: "Calendar" },
      { id: "notifications", label: "Notifications", icon: "Bell", badge: 2 },
    ];

    // Define navigation items for secondary navigation
    const secondaryNavItems = [
      { id: "files", label: "Files", icon: "File" },
      { id: "projects", label: "Projects", icon: "FolderOpen" },
      { id: "calendar", label: "Calendar", icon: "Calendar" },
      { id: "notifications", label: "Notifications", icon: "Bell", badge: 2 },
    ];
    
    // Add command dialog open effect with keyboard shortcut
    useEffect(() => {
      const down = (e: KeyboardEvent) => {
        // Ctrl+K or Cmd+K to toggle command dialog
        if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          setOpen((open) => !open);
          return;
        }
      };

      document.addEventListener("keydown", down);
      return () => document.removeEventListener("keydown", down);
    }, []);
    
    // Use our custom hook for handling navigation shortcuts
    useNavigationKeyboard({
      isActive: open,
      onNavigate: (itemId: string) => {
        const item = [...primaryNavItems, ...secondaryNavItems].find(item => item.id === itemId);
        if (item) {
          console.log(`Navigating to ${item.label}`);
          setOpen(false);
          
          // Navigate to the appropriate route
          window.location.href = `/${item.id === 'home' ? '' : item.id}`;
          
          // Toggle priority based on navigation item if it exists in both
          const inPrimary = primaryNavItems.some(i => i.id === item.id);
          const inSecondary = secondaryNavItems.some(i => i.id === item.id);
          if (inPrimary && !inSecondary) {
            setPriority("primary");
          } else if (inSecondary && !inPrimary) {
            setPriority("secondary");
          }
        }
      },
      onThemeToggle: () => {
        console.log("Changing theme");
        setOpen(false);
      },
      onKeyboardShortcutsOpen: () => {
        console.log("Opening keyboard shortcuts");
        setOpen(false);
      },
      onClose: () => setOpen(false),
      items: [...primaryNavItems, ...secondaryNavItems]
    });
    
    // Auto-detect screen type on window resize
    useEffect(() => {
      const handleResize = () => {
        if (screen !== "automatic") return;
        const isMobile = window.innerWidth < 768;
        setScreen(isMobile ? "mobile" : "desktop");
      };
      
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [screen, setScreen]);
    
    const getMarginClass = () => {
      const isMobileDevice = typeof window !== "undefined" && window.innerWidth < 768;
      const isEffectivelyMobile = screen === "mobile" || (screen === "automatic" && isMobileDevice);
      const isEffectivelyDesktop = screen === "desktop" || (screen === "automatic" && !isMobileDevice);
      
      // Mobile navigation
      if (isEffectivelyMobile && (state === "asButtonList" || state === "asLabeledButtonList")) {
        if (priority === "combined") {
          return "mt-20 mb-20"; // Space for both bars
        }
        return priority === "primary" ? "mb-20" : "mt-20" // Bottom space for primary, top space for secondary
      }

      // Desktop side navigation
      if (isEffectivelyDesktop) {
        if (state === "asButton") return "";
        if (state === "asButtonList") {
          if (priority === "combined") {
            return "ml-16 mr-16"; // Space for both side bars
          }
          return priority === "primary" ? "ml-16" : "mr-16";
        }
        if (state === "asLabeledButtonList") {
          if (priority === "combined") {
            return "ml-64 mr-64"; // Space for both labeled side bars
          }
          return priority === "primary" ? "ml-64" : "mr-64";
        }
      }

      return "";
    };

    return (
        <ThemeProvider defaultTheme="system" storageKey="theme">
          <ScreenContext.Provider value={{ screen, setScreen, priority, setPriority }}>
            <div className="min-h-screen bg-background">
              {(priority === "primary" || priority === "combined") && (
                <DynamicNavigation 
                  state={state} 
                  priority="primary" 
                  screen={screen} 
                  onStateChange={(newState) => {
                    setState(newState);
                    console.log(`State changed to ${newState}`);
                  }}
                  userName="John Doe"
                  avatarUrl="/placeholder-user.jpg"
                  onUserClick={() => console.log("User profile clicked")}
                  navigationItems={primaryNavItems}
                />
              )}
              
              {(priority === "secondary" || priority === "combined") && (
                <DynamicNavigation 
                  state={state} 
                  priority="secondary" 
                  screen={screen} 
                  onStateChange={(newState) => {
                    setState(newState);
                    console.log(`State changed to ${newState}`);
                  }}
                  userName="John Doe"
                  avatarUrl="/placeholder-user.jpg"
                  onUserClick={() => console.log("User profile clicked")}
                  navigationItems={secondaryNavItems}
                />
              )}

              <main className={`transition-all duration-300 ${getMarginClass()}`}>
                <Outlet />
              </main>

              {/* Command Dialog for global search */}
              <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Primary Navigation">
                    {primaryNavItems.map((item) => {
                      const IconComponent = getIconComponent(item.icon);
                      return (
                        <CommandItem 
                          key={item.id}
                          onSelect={() => {
                            console.log(`Navigating to ${item.label}`);
                            // Navigate to the appropriate route
                            window.location.href = `/${item.id === 'home' ? '' : item.id}`;
                          }}
                        >
                          <div className="flex items-center">
                            <IconComponent className="mr-2 h-4 w-4" />
                            <span>{item.label}</span>
                            {item.badge && (
                              <Badge className="ml-2" variant="secondary">{item.badge}</Badge>
                            )}
                          </div>
                          <CommandShortcut>{getShortcutForItem(item.id).display}</CommandShortcut>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                  {priority === "combined" && (
                    <>
                      <CommandSeparator />
                      <CommandGroup heading="Secondary Navigation">
                        {secondaryNavItems.map((item) => {
                          const IconComponent = getIconComponent(item.icon);
                          return (
                            <CommandItem 
                              key={item.id}
                              onSelect={() => {
                                console.log(`Navigating to ${item.label}`);
                                // Navigate to the appropriate route
                                window.location.href = `/${item.id}`;
                              }}
                            >
                              <div className="flex items-center">
                                <IconComponent className="mr-2 h-4 w-4" />
                                <span>{item.label}</span>
                                {item.badge && (
                                  <Badge className="ml-2" variant="secondary">{item.badge}</Badge>
                                )}
                              </div>
                              <CommandShortcut>{getShortcutForItem(item.id).display}</CommandShortcut>
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    </>
                  )}
                  <CommandSeparator />
                  <CommandGroup heading="Settings">
                    <CommandItem onSelect={() => console.log("Changing theme")}>
                      <Moon className="mr-2 h-4 w-4" />
                      Change theme
                      <CommandShortcut>{getShortcutForItem("theme").display}</CommandShortcut>
                    </CommandItem>
                    <CommandItem onSelect={() => console.log("Opening keyboard shortcuts")}>
                      <Keyboard className="mr-2 h-4 w-4" />
                      Keyboard shortcuts
                      <CommandShortcut>{getShortcutForItem("keyboard").display}</CommandShortcut>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </CommandDialog>
            </div>
          </ScreenContext.Provider>
            <Toaster richColors position='top-right' />
            <TanStackRouterDevtools />
          </ThemeProvider>
    );
  },
})
