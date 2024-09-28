import { ThemeProvider } from "next-themes";
import { QueryProvider } from "./queryProvider";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <ThemeProvider
        defaultTheme="dark"
        storageKey="ani_fire_theme_storage"
        enableSystem
        attribute="class"
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </QueryProvider>
  );
};
