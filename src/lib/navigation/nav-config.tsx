import { iconMap } from '@/lib/icons/icon-map';
import { useTranslation } from 'react-i18next';

// Define a type for navigation items with type-safe icon names
export type NavItem = {
  id: string;
  label: string;
  icon: keyof typeof iconMap;
  href: string;
  badge?: number;
  onClick?: () => void;
};

// This function factory creates navigation items with router integration
export const createNavItems = (router: any, setCurrentPrimaryRoute?: (route: string) => void) => {
  const { t } = useTranslation();
  
  // Define navigation items for primary navigation with TanStack Router integration
  const primaryNavItems: NavItem[] = [
    { 
      id: "home", 
      label: t('navigation.primary.home'), 
      icon: "Home", 
      href: "/", 
      onClick: () => {
        router.navigate({ to: "/" });
        if (setCurrentPrimaryRoute) setCurrentPrimaryRoute("home");
      }
    },    { 
      id: "dashboard", 
      label: t('navigation.primary.dashboard'), 
      icon: "LayoutDashboard", 
      href: "/dashboard", 
      onClick: () => {
        router.navigate({ to: "/dashboard" });
        if (setCurrentPrimaryRoute) setCurrentPrimaryRoute("dashboard");
      }
    },
    { 
      id: "messages", 
      label: t('navigation.primary.messages'), 
      icon: "MessageSquare", 
      badge: 5, 
      href: "/messages", 
      onClick: () => {
        router.navigate({ to: "/messages" });
        if (setCurrentPrimaryRoute) setCurrentPrimaryRoute("messages");
      }
    },
    { 
      id: "settings", 
      label: t('navigation.primary.settings'), 
      icon: "Settings", 
      href: "/settings", 
      onClick: () => {
        router.navigate({ to: "/settings" });
        if (setCurrentPrimaryRoute) setCurrentPrimaryRoute("settings");
      }
    },
    { 
      id: "files", 
      label: t('navigation.primary.files'), 
      icon: "File", 
      href: "/files", 
      onClick: () => {
        router.navigate({ to: "/files" });
        if (setCurrentPrimaryRoute) setCurrentPrimaryRoute("files");
      }
    },
    { 
      id: "projects", 
      label: t('navigation.primary.projects'), 
      icon: "FolderOpen", 
      href: "/projects", 
      onClick: () => {
        router.navigate({ to: "/projects" });
        if (setCurrentPrimaryRoute) setCurrentPrimaryRoute("projects");
      }
    },
    { 
      id: "calendar", 
      label: t('navigation.primary.calendar'), 
      icon: "Calendar", 
      href: "/calendar", 
      onClick: () => {
        router.navigate({ to: "/calendar" });
        if (setCurrentPrimaryRoute) setCurrentPrimaryRoute("calendar");
      }
    },
    { 
      id: "notifications", 
      label: t('navigation.primary.notifications'), 
      icon: "Bell", 
      badge: 2, 
      href: "/notifications", 
      onClick: () => {
        router.navigate({ to: "/notifications" });
        if (setCurrentPrimaryRoute) setCurrentPrimaryRoute("notifications");
      }
    },
  ];
  // Define route-specific secondary navigation items
  const projectSecondaryNavItems: NavItem[] = [
    { 
      id: "tasks", 
      label: t('navigation.secondary.projects.tasks'), 
      icon: "File", 
      badge: 3, 
      href: "/projects/tasks", 
      onClick: () => router.navigate({ to: "/projects/tasks" }) 
    },
    { 
      id: "tests", 
      label: t('navigation.secondary.projects.tests'), 
      icon: "FolderOpen", 
      badge: 2, 
      href: "/projects/tests", 
      onClick: () => router.navigate({ to: "/projects/tests" }) 
    }
  ];
  
  // Define dashboard secondary navigation items
  const dashboardSecondaryNavItems: NavItem[] = [
    { 
      id: "analytics", 
      label: t('navigation.secondary.dashboard.analytics'), 
      icon: "LineChart", 
      href: "/dashboard/analytics", 
      onClick: () => router.navigate({ to: "/dashboard/analytics" }) 
    },
    { 
      id: "reports", 
      label: t('navigation.secondary.dashboard.reports'), 
      icon: "AreaChart", 
      href: "/dashboard/reports", 
      onClick: () => router.navigate({ to: "/dashboard/reports" }) 
    }
  ];

  return {
    primaryNavItems,
    projectSecondaryNavItems,
    dashboardSecondaryNavItems,
    
    // Utility function to get secondary items based on current route
    getSecondaryNavItems: (currentPrimaryRoute: string | null) => {
      switch(currentPrimaryRoute) {
        case "projects":
          return projectSecondaryNavItems;
        case "dashboard":
          return dashboardSecondaryNavItems;
        default:
          return null;
      }
    }
  };
};
