import type { I18nLocale } from "../en/enTranslation";

const deTranslation: I18nLocale = {
  home: {
    welcomeTitle: "Willkommen bei Polity",
    welcomeSubtitle: "Eine TanStack Router Demo mit dynamischer Navigation",
    cards: {
      navigation: {
        title: "Navigation Demo",
        description: "Erleben Sie unsere dynamische Navigation mit verschiedenen Layouts",
        content: "Testen Sie verschiedene Navigationstypen, Prioritäten und Bildschirmkonfigurationen.",
        button: "Navigation Demo anzeigen"
      },
      features: {
        title: "Features",
        description: "Hauptfunktionen dieser Anwendung",
        items: [
          "Dynamische, konfigurierbare Navigation",
          "Reaktive Layouts für mobile und Desktop-Geräte",
          "Tastaturnavigation mit Shortcuts",
          "Kommandopalette (Drücken Sie ⌘K)",
          "Themenwechsel (hell/dunkel)"
        ]
      },
      techStack: {
        title: "Tech-Stack",
        description: "Verwendete Technologien",
        frontend: "Frontend:",
        styling: "Styling:",
        tooling: "Tooling:",
        button: "Demo starten"
      },
      test: "fdf"
    }
  },
  navigation: {
    primary: {
      home: "Startseite",
      dashboard: "Dashboard",
      messages: "Nachrichten",
      settings: "Einstellungen", 
      files: "Dateien",
      projects: "Projekte",
      calendar: "Kalender",
      notifications: "Benachrichtigungen"
    },
    secondary: {
      projects: {
        tasks: "Aufgaben",
        tests: "Tests"
      },
      dashboard: {
        analytics: "Analytik",
        reports: "Berichte"
      }
    }
  }
};

export default deTranslation;
