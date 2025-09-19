/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useMemo, useState } from 'react';
import { DEFAULT_THEME_ID, orderedThemeIds, themes, themesById } from '../theme/themes';

const STORAGE_KEY = 'theme';
const isBrowser = typeof window !== 'undefined';

export const ThemeContext = createContext();

const hexToRgb = (hexValue) => {
  if (!hexValue) return '0 0 0';
  let hex = hexValue.replace('#', '');
  if (hex.length === 3) {
    hex = hex.split('').map((char) => char + char).join('');
  }
  const numeric = parseInt(hex, 16);
  const r = (numeric >> 16) & 255;
  const g = (numeric >> 8) & 255;
  const b = numeric & 255;
  return `${r} ${g} ${b}`;
};

const applyThemeToDocument = (themeId) => {
  if (!isBrowser) return;

  const theme = themesById[themeId] ?? themesById[DEFAULT_THEME_ID];
  const root = document.documentElement;

  // Reset previous theme classes and set the new one
  orderedThemeIds.forEach((id) => {
    root.classList.remove(`theme-${id}`);
  });
  root.classList.add(`theme-${theme.id}`);
  root.setAttribute('data-theme', theme.id);
  root.style.setProperty('color-scheme', theme.isDark ? 'dark' : 'light');

  if (theme.isDark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  // Palette-based CSS variables (used by Tailwind)
  Object.entries(theme.palette).forEach(([group, shades]) => {
    Object.entries(shades).forEach(([shade, hex]) => {
      const rgbValue = hexToRgb(hex);
      root.style.setProperty(`--color-${group}-${shade}`, rgbValue);
      root.style.setProperty(`--color-${group}-${shade}-hex`, hex);

      if (group === 'accent') {
        root.style.setProperty(`--color-purple-${shade}`, rgbValue);
        root.style.setProperty(`--color-purple-${shade}-hex`, hex);
      }
    });
  });

  // Theme tokens (backgrounds, text, borders, etc.)
  Object.entries(theme.tokens).forEach(([token, value]) => {
    root.style.setProperty(`--${token}`, value);
  });

  if (theme.tokens['bg-secondary']) {
    root.style.setProperty('--tw-ring-offset-color', theme.tokens['bg-secondary']);
  }
};

const getInitialThemeId = () => {
  if (!isBrowser) {
    return DEFAULT_THEME_ID;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && themesById[stored]) {
      return stored;
    }
  } catch (error) {
    console.warn('Unable to access stored theme preference.', error);
  }

  if (isBrowser && window.matchMedia('(prefers-color-scheme: dark)').matches && themesById.dark) {
    return 'dark';
  }

  return DEFAULT_THEME_ID;
};

export const ThemeProvider = ({ children }) => {
  const [themeId, setThemeId] = useState(getInitialThemeId);

  useEffect(() => {
    applyThemeToDocument(themeId);

    if (!isBrowser) {
      return;
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, themeId);
    } catch (error) {
      console.warn('Unable to save theme preference.', error);
    }
  }, [themeId]);

  const value = useMemo(() => {
    const currentTheme = themesById[themeId] ?? themesById[DEFAULT_THEME_ID];

    const setTheme = (nextThemeId) => {
      if (!themesById[nextThemeId]) return;
      setThemeId(nextThemeId);
    };

    const cycleTheme = () => {
      const currentIndex = orderedThemeIds.indexOf(currentTheme.id);
      const nextIndex = (currentIndex + 1) % orderedThemeIds.length;
      setThemeId(orderedThemeIds[nextIndex]);
    };

    return {
      theme: currentTheme.id,
      themeId: currentTheme.id,
      setTheme,
      toggleTheme: cycleTheme,
      availableThemes: themes,
      currentTheme,
      isDark: Boolean(currentTheme.isDark),
      isLight: !currentTheme.isDark,
    };
  }, [themeId]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
