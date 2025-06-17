import type { I18nLocale } from '../en/enTranslation';

const deTranslation: I18nLocale = {
  home: {
    welcomeTitle: 'Willkommen bei Polity',
    welcomeSubtitle: 'Eine TanStack Router Demo mit dynamischer Navigation',
    cards: {
      navigation: {
        title: 'Navigation Demo',
        description: 'Erleben Sie unsere dynamische Navigation mit verschiedenen Layouts',
        content:
          'Testen Sie verschiedene Navigationstypen, Prioritäten und Bildschirmkonfigurationen.',
        button: 'Navigation Demo anzeigen',
      },
      features: {
        title: 'Features',
        description: 'Hauptfunktionen dieser Anwendung',
        items: [
          'Dynamische, konfigurierbare Navigation',
          'Reaktive Layouts für mobile und Desktop-Geräte',
          'Tastaturnavigation mit Shortcuts',
          'Kommandopalette (Drücken Sie ⌘K)',
          'Themenwechsel (hell/dunkel)',
        ],
      },
      techStack: {
        title: 'Tech-Stack',
        description: 'Verwendete Technologien',
        frontend: 'Frontend:',
        styling: 'Styling:',
        tooling: 'Tooling:',
        button: 'Demo starten',
      },
      test: 'fdf',
    },
  },
  navigation: {
    primary: {
      home: 'Startseite',
      dashboard: 'Dashboard',
      messages: 'Nachrichten',
      settings: 'Einstellungen',
      files: 'Dateien',
      projects: 'Projekte',
      calendar: 'Kalender',
      notifications: 'Benachrichtigungen',
    },
    secondary: {
      projects: {
        tasks: 'Aufgaben',
        tests: 'Tests',
      },
      dashboard: {
        analytics: 'Analytik',
        reports: 'Berichte',
      },
    },
    toggles: {
      theme: {
        title: 'Theme',
        light: 'Licht-Modus',
        dark: 'Dunkel-Modus',
        system: 'System-Theme',
      },
      language: {
        title: 'Sprache ändern',
        english: 'English',
        german: 'Deutsch',
        moreLanguages: 'Weitere Sprachen...',
        changeSuccess: 'Sprache geändert zu Deutsch',
        changeDescription: 'Ihre Spracheinstellung wurde zu Deutsch aktualisiert.',
      },
      state: {
        asButton: 'Button-Ansicht',
        asButtonList: 'Button-Listen-Ansicht',
        asLabeledButtonList: 'Beschriftete Button-Listen-Ansicht',
      },
    },
  },
  navigationDemo: {
    title: 'Dynamische Navigations-Demo',
    description: 'Testen Sie verschiedene Navigations-Konfigurationen',
    screenType: {
      title: 'Bildschirmtyp',
      mobile: 'Mobil',
      desktop: 'Desktop',
      automatic: 'Automatisch',
      description: 'Wechselt zwischen mobilem und Desktop-Modus basierend auf der Bildschirmbreite',
    },
    commandPalette: {
      title: 'Befehlspalette',
      placeholder: 'Befehle suchen...',
    },
    themeSettings: {
      title: 'Theme-Einstellungen',
      description:
        'Das Theme synchronisiert automatisch mit Ihrer Systemeinstellung. Sie können es auch manuell ändern.',
    },
    priority: {
      title: 'Priorität',
      primary: 'Primär',
      secondary: 'Sekundär',
      combined: 'Kombiniert',
    },
    currentConfig: {
      title: 'Aktuelle Konfiguration',
      state: 'Status',
      priority: 'Priorität',
      screen: 'Bildschirm',
    },
    stateSwitcher: {
      title: 'Status-Wechsler Verhalten',
      asButton: {
        title: 'asButton:',
        description: 'Status-Icons erscheinen horizontal im Vollbildoverlay',
      },
      asButtonList: {
        title: 'asButtonList:',
        description: '"Mehr"-Symbol, das bei Hover/Tap Status-Icons anzeigt',
      },
      asLabeledButtonList: {
        title: 'asLabeledButtonList:',
        description: 'Status-Icons werden horizontal in der Fußzeile angezeigt',
      },
    },
    sampleContent: {
      title: 'Beispielinhalt',
      description: 'Dieser Inhalt demonstriert, wie die Navigation das Seitenlayout beeinflusst',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
  },
  commandDialog: {
    placeholder: 'Geben Sie einen Befehl ein oder suchen Sie...',
    noResults: 'Keine Ergebnisse gefunden.',
    groups: {
      primaryNavigation: 'Primäre Navigation',
      secondaryNavigation: 'Sekundäre Navigation',
      settings: 'Einstellungen',
    },
    items: {
      changeTheme: 'Theme ändern',
      keyboardShortcuts: 'Tastenkürzel',
    },
  },
};

export default deTranslation;
