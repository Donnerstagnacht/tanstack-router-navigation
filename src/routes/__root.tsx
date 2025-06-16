import { Outlet, createRootRoute, useRouter } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ThemeProvider } from '@/components/navigation/toggles/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { DynamicNavigation } from '@/components/navigation/dynamic-navigation'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from '@/components/ui/command'
import { Badge } from '@/components/ui/badge'
import { useState, useEffect } from 'react'
import { ScreenProvider, useScreenContext } from '@/contexts/screen-context'
import { Moon, Keyboard } from 'lucide-react'
import { getShortcutForItem } from '@/lib/keyboard-navigation'
import { useNavigationKeyboard } from '@/hooks/use-navigation-keyboard'
import { getIconComponent, iconMap } from '@/lib/icons/icon-map'

export const Route = createRootRoute({
  component: () => {
    return (
      <ThemeProvider defaultTheme="system" storageKey="theme">
        <ScreenProvider>
          <RootContent />
          <Toaster richColors position='top-right' />
          <TanStackRouterDevtools />
        </ScreenProvider>
      </ThemeProvider>
    );
  },
})

function RootContent() {
  // State for navigation configuration
  const [state, setState] = useState<"asButton" | "asButtonList" | "asLabeledButtonList">("asButtonList");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  // Get screen and priority from context
  const { screen, priority, setPriority } = useScreenContext();
  // Track current route to determine which secondary nav items to display
  const [currentPrimaryRoute, setCurrentPrimaryRoute] = useState<string | null>(null);
  
  // Define navigation items for primary navigation with TanStack Router integration
  const primaryNavItems = [
    { id: "home", label: "Home", icon: "Home", href: "/", onClick: () => {
      router.navigate({ to: "/" });
      setCurrentPrimaryRoute("home");
    }},
    { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard", href: "/dashboard", onClick: () => {
      router.navigate({ to: "/dashboard" });
      setCurrentPrimaryRoute("dashboard");
    }},
    { id: "messages", label: "Messages", icon: "MessageSquare", badge: 5, href: "/messages", onClick: () => {
      router.navigate({ to: "/messages" });
      setCurrentPrimaryRoute("messages");
    }},
    { id: "settings", label: "Settings", icon: "Settings", href: "/settings", onClick: () => {
      router.navigate({ to: "/settings" });
      setCurrentPrimaryRoute("settings");
    }},
    { id: "files", label: "Files", icon: "File", href: "/files", onClick: () => {
      router.navigate({ to: "/files" });
      setCurrentPrimaryRoute("files");
    }},
    { id: "projects", label: "Projects", icon: "FolderOpen", href: "/projects", onClick: () => {
      router.navigate({ to: "/projects" });
      setCurrentPrimaryRoute("projects");
    }},
    { id: "calendar", label: "Calendar", icon: "Calendar", href: "/calendar", onClick: () => {
      router.navigate({ to: "/calendar" });
      setCurrentPrimaryRoute("calendar");
    }},
    { id: "notifications", label: "Notifications", icon: "Bell", badge: 2, href: "/notifications", onClick: () => {
      router.navigate({ to: "/notifications" });
      setCurrentPrimaryRoute("notifications");
    }},
  ];
    // Define a type for navigation items with type-safe icon names
  type NavItem = {
    id: string;
    label: string;
    icon: keyof typeof iconMap;
    href: string;
    badge?: number;
    onClick: () => void;
  };

  // Define route-specific secondary navigation items
  const projectSecondaryNavItems: NavItem[] = [
    { id: "tasks", label: "Tasks", icon: "File", badge: 3, href: "/projects/tasks", onClick: () => router.navigate({ to: "/projects/tasks" }) },
    { id: "tests", label: "Tests", icon: "FolderOpen", badge: 2, href: "/projects/tests", onClick: () => router.navigate({ to: "/projects/tests" }) }
  ];
  
  // Define dashboard secondary navigation items
  const dashboardSecondaryNavItems: NavItem[] = [
    { id: "analytics", label: "Analytics", icon: "LineChart", href: "/dashboard/analytics", onClick: () => router.navigate({ to: "/dashboard/analytics" }) },
    { id: "reports", label: "Reports", icon: "AreaChart", href: "/dashboard/reports", onClick: () => router.navigate({ to: "/dashboard/reports" }) }
  ];
  
  // Determine which secondary items to show based on current route
  const getSecondaryNavItems = () => {
    switch(currentPrimaryRoute) {
      case "projects":
        return projectSecondaryNavItems;
      case "dashboard":
        return dashboardSecondaryNavItems;
      default:
        return null;
    }
  };
    const secondaryNavItems = getSecondaryNavItems();
  
  // Set initial route based on current path
  useEffect(() => {
    const path = window.location.pathname;
    const route = path === '/' ? 'home' : path.split('/')[1];
    setCurrentPrimaryRoute(route);
  }, []);
    
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
    }, []);    // Use our custom hook for handling navigation shortcuts
    useNavigationKeyboard({
      isActive: open,
      onNavigate: (itemId: string) => {
        const allItems = [...primaryNavItems, ...(secondaryNavItems || [])];
        const item = allItems.find(item => item.id === itemId);
        if (item) {
          console.log(`Navigating to ${item.label}`);
          setOpen(false);
          
          // Navigate to the appropriate route using TanStack Router
          if (item.onClick) {
            item.onClick();
          } else {
            const route = itemId === 'home' ? '/' : `/${itemId}`;
            router.navigate({ to: route });
          }
          
          // Toggle priority based on navigation item if it exists in both
          const inPrimary = primaryNavItems.some(i => i.id === item.id);
          const inSecondary = secondaryNavItems ? secondaryNavItems.some(i => i.id === item.id) : false;
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
      },      onClose: () => setOpen(false),
      items: [...primaryNavItems, ...(secondaryNavItems || [])]
    });
    
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
                {secondaryNavItems && (priority === "secondary" || priority === "combined") && (
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
                  <CommandGroup heading="Primary Navigation">                    {primaryNavItems.map((item) => {
                      const IconComponent = getIconComponent(item.icon);
                      return (                        <CommandItem 
                          key={item.id}
                          onSelect={() => {
                            console.log(`Navigating to ${item.label}`);
                            // Navigate to the appropriate route using TanStack Router
                            if (item.onClick) {
                              item.onClick();
                            } else {
                              const route = item.id === 'home' ? '/' : `/${item.id}`;
                              router.navigate({ to: route });
                            }
                            setOpen(false);
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
                  </CommandGroup>                  {priority === "combined" && secondaryNavItems && (
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
                                // Navigate to the appropriate route using TanStack Router
                                if (item.onClick) {
                                  item.onClick();
                                } else {
                                  router.navigate({ to: item.href });
                                }
                                setOpen(false);
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
                    </CommandItem>                  </CommandGroup>
                </CommandList>
              </CommandDialog>
            </div>
    );
}
