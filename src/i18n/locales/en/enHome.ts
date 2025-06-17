import type { DeepReplace } from "@/lib/utils";

const enHome = {
  welcomeTitle: "Welcome to Polity",
  welcomeSubtitle: "A TanStack Router Demo with Dynamic Navigation",
  cards: {
    navigation: {
      title: "Navigation Demo",
      description: "Experience our dynamic navigation with different layouts",
      content: "Test different navigation types, priorities, and screen configurations.",
      button: "Show Navigation Demo"
    },
    features: {
      title: "Features",
      description: "Main features of this application",
      items: [
        "Dynamic, configurable navigation",
        "Reactive layouts for mobile and desktop devices",
        "Keyboard navigation with shortcuts",
        "Command palette (Press ⌘K)",
        "Theme switching (light/dark)"
      ]
    },
    techStack: {
      title: "Tech Stack",
      description: "Technologies used",
      frontend: "Frontend:",
      styling: "Styling:",
      tooling: "Tooling:",
      button: "Start Demo"
    },
    test: "fdf"
  }
};

export default enHome;

export type I18nLocale = DeepReplace<typeof enHome, [string, string]>;

