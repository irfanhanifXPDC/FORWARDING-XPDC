import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { translations, SUPPORTED_LANGS } from "@/i18n/translations";

const AppContext = createContext(null);

const THEME_KEY = "xpdc-theme";
const LANG_KEY = "xpdc-lang";

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return localStorage.getItem(THEME_KEY) || "dark";
  });

  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return "en";
    const stored = localStorage.getItem(LANG_KEY);
    return SUPPORTED_LANGS.includes(stored) ? stored : "en";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  const toggleLang = useCallback(() => {
    setLang((l) => (l === "en" ? "id" : "en"));
  }, []);

  const t = useMemo(() => translations[lang], [lang]);

  const value = useMemo(
    () => ({ theme, lang, t, toggleTheme, toggleLang, setTheme, setLang }),
    [theme, lang, t, toggleTheme, toggleLang]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
