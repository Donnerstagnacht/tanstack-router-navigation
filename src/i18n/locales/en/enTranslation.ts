import type { DeepReplace } from '@/lib/utils';

const enTranslation = {
  home: {
    welcomeTitle: 'Welcome to Polity',
    welcomeSubtitle: 'A TanStack Router Demo with Dynamic Navigation',
    cards: {
      navigation: {
        title: 'Navigation Demo',
        description: 'Experience our dynamic navigation with different layouts',
        content: 'Test different navigation types, priorities, and screen configurations.',
        button: 'Show Navigation Demo',
      },
      features: {
        title: 'Features',
        description: 'Main features of this application',
        items: [
          'Dynamic, configurable navigation',
          'Reactive layouts for mobile and desktop devices',
          'Keyboard navigation with shortcuts',
          'Command palette (Press ⌘K)',
          'Theme switching (light/dark)',
        ],
      },
      techStack: {
        title: 'Tech Stack',
        description: 'Technologies used',
        frontend: 'Frontend:',
        styling: 'Styling:',
        tooling: 'Tooling:',
        button: 'Start Demo',
      },
      test: 'fdf',
    },
  },
  navigation: {
    primary: {
      home: 'Home',
      dashboard: 'Dashboard',
      messages: 'Messages',
      settings: 'Settings',
      files: 'Files',
      projects: 'Projects',
      calendar: 'Calendar',
      notifications: 'Notifications',
    },
    secondary: {
      projects: {
        tasks: 'Tasks',
        tests: 'Tests',
      },
      dashboard: {
        analytics: 'Analytics',
        reports: 'Reports',
      },
    },
    toggles: {
      theme: {
        title: 'Theme',
        light: 'Light mode',
        dark: 'Dark mode',
        system: 'System theme',
      },
      language: {
        title: 'Change language',
        english: 'English',
        german: 'Deutsch',
        moreLanguages: 'More languages...',
        changeSuccess: 'Language changed to English',
        changeDescription: 'Your language preference has been updated to English.',
      },
      state: {
        asButton: 'Button view',
        asButtonList: 'Button list view',
        asLabeledButtonList: 'Labeled button list view',
      },
    },
  },
  navigationDemo: {
    title: 'Dynamic Navigation Demo',
    description: 'Test different navigation configurations',
    screenType: {
      title: 'Screen Type',
      mobile: 'Mobile',
      desktop: 'Desktop',
      automatic: 'Automatic',
      description: 'Switches between mobile and desktop based on screen width',
    },
    commandPalette: {
      title: 'Command Palette',
      placeholder: 'Search commands...',
    },
    themeSettings: {
      title: 'Theme Settings',
      description:
        'The theme automatically syncs with your system preference. You can also manually set it.',
    },
    priority: {
      title: 'Priority',
      primary: 'Primary',
      secondary: 'Secondary',
      combined: 'Combined',
    },
    currentConfig: {
      title: 'Current Configuration',
      state: 'State',
      priority: 'Priority',
      screen: 'Screen',
    },
    stateSwitcher: {
      title: 'State Switcher Behavior',
      asButton: {
        title: 'asButton:',
        description: 'State icons appear horizontally in the fullscreen overlay',
      },
      asButtonList: {
        title: 'asButtonList:',
        description: '"More" icon that expands to show state icons on hover/tap',
      },
      asLabeledButtonList: {
        title: 'asLabeledButtonList:',
        description: 'State icons displayed horizontally in footer',
      },
    },
    sampleContent: {
      title: 'Sample Content',
      description: 'This content demonstrates how the navigation affects page layout',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
  },
  commandDialog: {
    placeholder: 'Type a command or search...',
    noResults: 'No results found.',
    groups: {
      primaryNavigation: 'Primary Navigation',
      secondaryNavigation: 'Secondary Navigation',
      settings: 'Settings',
    },
    items: {
      changeTheme: 'Change theme',
      keyboardShortcuts: 'Keyboard shortcuts',
    },
  },
};

export default enTranslation;

export type I18nLocale = DeepReplace<typeof enTranslation, [string, string]>;
