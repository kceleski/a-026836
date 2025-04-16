
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AppSettings {
  darkMode: boolean;
  compactMode: boolean;
  locale: string;
  language: string;
  dateFormat: string;
  currencyFormat: string;
  notifications: {
    enabled: boolean;
    sound: boolean;
    desktop: boolean;
  };
  analytics: {
    enabled: boolean;
    detailedTracking: boolean;
  };
}

interface AppSettingsContextType {
  settings: AppSettings;
  updateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
  updateNestedSetting: <K extends keyof AppSettings, NK extends keyof AppSettings[K]>(
    key: K, 
    nestedKey: NK, 
    value: AppSettings[K][NK]
  ) => void;
  resetSettings: () => void;
}

const defaultSettings: AppSettings = {
  darkMode: false,
  compactMode: false,
  locale: 'fr-FR',
  language: 'fr',
  dateFormat: 'dd/MM/yyyy',
  currencyFormat: 'EUR',
  notifications: {
    enabled: true,
    sound: true,
    desktop: false,
  },
  analytics: {
    enabled: true,
    detailedTracking: false,
  }
};

const AppSettingsContext = createContext<AppSettingsContextType | undefined>(undefined);

export const useAppSettings = () => {
  const context = useContext(AppSettingsContext);
  if (!context) {
    throw new Error('useAppSettings must be used within an AppSettingsProvider');
  }
  return context;
};

interface AppSettingsProviderProps {
  children: React.ReactNode;
}

export const AppSettingsProvider: React.FC<AppSettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(() => {
    // Load settings from localStorage or use defaults
    try {
      const savedSettings = localStorage.getItem('app_settings');
      return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
    } catch (error) {
      console.error('Failed to load settings:', error);
      return defaultSettings;
    }
  });

  useEffect(() => {
    // Save settings to localStorage whenever they change
    try {
      localStorage.setItem('app_settings', JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  }, [settings]);

  // Update a top-level setting
  const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Update a nested setting
  const updateNestedSetting = <K extends keyof AppSettings, NK extends keyof AppSettings[K]>(
    key: K, 
    nestedKey: NK, 
    value: AppSettings[K][NK]
  ) => {
    setSettings(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [nestedKey]: value
      }
    }));
  };

  // Reset all settings to default
  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  // Apply dark mode if enabled
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.darkMode]);

  return (
    <AppSettingsContext.Provider value={{ settings, updateSetting, updateNestedSetting, resetSettings }}>
      {children}
    </AppSettingsContext.Provider>
  );
};

export default AppSettingsProvider;
