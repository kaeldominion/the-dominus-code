"use client";

import { ReactNode, createContext, useContext, useState, useEffect, useRef, RefObject } from "react";

type Mode = "realist" | "dominus";

interface AppContextType {
  mode: Mode;
  setMode: (mode: Mode) => void;
  toggleMode: () => void;
  audioEnabled: boolean;
  setAudioEnabled: (enabled: boolean) => void;
  forewordAudioRef: RefObject<HTMLAudioElement | null> | null;
  setForewordAudioRef: (ref: RefObject<HTMLAudioElement | null> | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within Providers");
  }
  return context;
}

export function Providers({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("realist");
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [forewordAudioRef, setForewordAudioRef] = useState<RefObject<HTMLAudioElement | null> | null>(null);

  useEffect(() => {
    setMounted(true);
    // Load saved preferences
    const savedMode = localStorage.getItem("dominus-mode") as Mode;
    if (savedMode) setMode(savedMode);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("dominus-mode", mode);
      document.documentElement.setAttribute("data-mode", mode);
    }
  }, [mode, mounted]);

  const toggleMode = () => {
    setMode((prev) => (prev === "realist" ? "dominus" : "realist"));
  };

  if (!mounted) {
    return null;
  }

  return (
    <AppContext.Provider
      value={{
        mode,
        setMode,
        toggleMode,
        audioEnabled,
        setAudioEnabled,
        forewordAudioRef,
        setForewordAudioRef,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

