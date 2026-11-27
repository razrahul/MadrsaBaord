import type { ReactNode } from "react";
import { PreferencesProvider } from "./PreferencesContext";

export function AppProviders({ children }: { children: ReactNode }) {
  return <PreferencesProvider>{children}</PreferencesProvider>;
}
