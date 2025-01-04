export {};

declare global {
  interface Window {
    api: {
      getTheme: () => Promise<string>;
      saveTheme: (theme: string) => void;
    };
  }
}
