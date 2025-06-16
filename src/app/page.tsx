import * as React from "react"
import { DynamicNavigation } from "@/components/navigation/dynamic-navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
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
} from "lucide-react"
import { useNavigationKeyboard } from "@/hooks/use-navigation-keyboard"
import { getShortcutForItem } from "@/lib/keyboard-navigation"
import {ThemeToggle} from "@/components/navigation/toggles/theme-toggle"

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

export default function NavigationDemo() {
  const [state, setState] = React.useState<"asButton" | "asButtonList" | "asLabeledButtonList">("asButton")
  const [priority, setPriority] = React.useState<"primary" | "secondary" | "combined">("primary")
  const [screen, setScreen] = React.useState<"mobile" | "desktop" | "automatic">("automatic")
  const [open, setOpen] = React.useState(false)
  
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
  ]

  // Define navigation items for secondary navigation
  const secondaryNavItems = [
    { id: "files", label: "Files", icon: "File" },
    { id: "projects", label: "Projects", icon: "FolderOpen" },
    { id: "calendar", label: "Calendar", icon: "Calendar" },
    { id: "notifications", label: "Notifications", icon: "Bell", badge: 2 },
  ]
  
  // Add command dialog open effect with keyboard shortcut
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K to toggle command dialog
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
        return
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])
  
  // Use our custom hook for handling navigation shortcuts
  useNavigationKeyboard({
    isActive: open,
    onNavigate: (itemId: string) => {
      const item = [...primaryNavItems, ...secondaryNavItems].find(item => item.id === itemId)
      if (item) {
        console.log(`Navigating to ${item.label}`)
        setOpen(false)
      }
    },
    onThemeToggle: () => {
      console.log("Changing theme")
      setOpen(false)
    },
    onKeyboardShortcutsOpen: () => {
      console.log("Opening keyboard shortcuts")
      setOpen(false)
    },
    onClose: () => setOpen(false),
    items: [...primaryNavItems, ...secondaryNavItems]
  })
  
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
      if (state === "asButton") return ""
      if (state === "asButtonList") {
        if (priority === "combined") {
          return "ml-16 mr-16"; // Space for both side bars
        }
        return priority === "primary" ? "ml-16" : "mr-16"
      }
      if (state === "asLabeledButtonList") {
        if (priority === "combined") {
          return "ml-64 mr-64"; // Space for both labeled side bars
        }
        return priority === "primary" ? "ml-64" : "mr-64"
      }
    }

    return ""
  }

  return (
    <div className="min-h-screen bg-background">
      {(priority === "primary" || priority === "combined") && (
        <DynamicNavigation 
          state={state} 
          priority="primary" 
          screen={screen} 
          onStateChange={setState}
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
          onStateChange={setState}
          userName="John Doe"
          avatarUrl="/placeholder-user.jpg"
          onUserClick={() => console.log("User profile clicked")}
          navigationItems={secondaryNavItems}
        />
      )}

      <main className={`transition-all duration-300 ${getMarginClass()}`}>
        <div className="container mx-auto p-8">
          <Card className="mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Dynamic Navigation Demo</CardTitle>
                <CardDescription>
                  Test different navigation configurations. State switcher behavior changes based on current state.
                </CardDescription>
              </div>
              <ThemeToggle />
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Screen Type</h3>
                <div className="flex gap-2 flex-wrap">
                  <Button variant={screen === "mobile" ? "default" : "outline"} onClick={() => setScreen("mobile")}>
                    Mobile
                  </Button>
                  <Button variant={screen === "desktop" ? "default" : "outline"} onClick={() => setScreen("desktop")}>
                    Desktop
                  </Button>
                  <Button variant={screen === "automatic" ? "default" : "outline"} onClick={() => setScreen("automatic")}>
                    Automatic
                  </Button>
                </div>
                {screen === "automatic" && (
                  <div className="text-sm text-muted-foreground mt-2 flex items-center">
                    <Badge variant="outline" className="mr-2">Automatic</Badge>
                    <span>Switches between mobile and desktop based on screen width</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-3">Command Palette</h3>
                <div>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-sm text-muted-foreground" 
                    onClick={() => setOpen(true)}
                  >
                    <Search className="mr-2 h-4 w-4" />
                    <span>Search commands...</span>
                    <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                      <span className="text-xs">⌘</span>K
                    </kbd>
                  </Button>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-3">Theme Settings</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      The theme automatically syncs with your system preference. You can also manually set it.
                    </p>
                  </div>
                  <ThemeToggle />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Priority</h3>
                <div className="flex gap-2">
                  <Button
                    variant={priority === "primary" ? "default" : "outline"}
                    onClick={() => setPriority("primary")}
                  >
                    Primary
                  </Button>
                  <Button
                    variant={priority === "secondary" ? "default" : "outline"}
                    onClick={() => setPriority("secondary")}
                  >
                    Secondary
                  </Button>
                  <Button
                    variant={priority === "combined" ? "default" : "outline"}
                    onClick={() => setPriority("combined")}
                  >
                    Combined
                  </Button>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-3">Current Configuration</h3>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="secondary">State: {state}</Badge>
                  <Badge variant="secondary">Priority: {priority}</Badge>
                  <Badge variant="secondary">Screen: {screen}</Badge>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-3">State Switcher Behavior</h3>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>
                    <strong>asButton:</strong> State icons appear horizontally in the fullscreen overlay
                  </p>
                  <p>
                    <strong>asButtonList:</strong> "More" icon that expands to show state icons on hover/tap
                  </p>
                  <p>
                    <strong>asLabeledButtonList:</strong> State icons displayed horizontally in footer
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle>Sample Content {i + 1}</CardTitle>
                  <CardDescription>This content demonstrates how the navigation affects page layout</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
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
                  onSelect={() => console.log(`Navigating to ${item.label}`)}
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
                      onSelect={() => console.log(`Navigating to ${item.label}`)}
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
  )
}
