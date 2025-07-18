// @ts-ignore
// eslint-disable-next-line no-undef
/* global console */
import en from './en';
import fa from './fa';

const translations = {
  en,
  fa,
};

import AsyncStorage from '@react-native-async-storage/async-storage';

let currentLocale = 'en';
let languageChangeCallbacks: (() => void)[] = [];

// Load saved locale on initialization
const loadSavedLocale = async () => {
  try {
    const savedLocale = await AsyncStorage.getItem('app_language');
    if (savedLocale) {
      currentLocale = savedLocale;
    }
  } catch (error) {
    console.log('Error loading saved locale:', error);
  }
};

// Initialize locale loading
loadSavedLocale();

const i18n = {
  locale: currentLocale,
  translations,
  
  // Add callback for language changes
  onLanguageChange: (callback: () => void) => {
    languageChangeCallbacks.push(callback);
    return () => {
      const index = languageChangeCallbacks.indexOf(callback);
      if (index > -1) {
        languageChangeCallbacks.splice(index, 1);
      }
    };
  },
  
  t: (key: string, options?: any) => {
    const keys = key.split('.');
    let value = (translations as any)[currentLocale] || translations.en;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English
        value = translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key; // Return the key if translation not found
          }
        }
        break;
      }
    }
    
    if (typeof value === 'string' && options) {
      // Simple interpolation for {{key}} patterns
      return value.replace(/\{\{(\w+)\}\}/g, (match, key) => {
        return options[key] || match;
      });
    }
    
    return typeof value === 'string' ? value : key;
  },
  
  setLocale: async (locale: string) => {
    if (currentLocale !== locale) {
      currentLocale = locale;
      i18n.locale = locale;
      
      // Save locale preference
      try {
        await AsyncStorage.setItem('app_language', locale);
      } catch (error) {
        console.log('Error saving locale:', error);
      }
      
      // Notify all listeners about the language change
      languageChangeCallbacks.forEach(callback => callback());
    }
  },
  
  // Get current locale
  getLocale: () => currentLocale,
  
  // Check if current locale is RTL
  isRTL: () => currentLocale === 'fa',
  
  // Get available locales
  getAvailableLocales: () => Object.keys(translations),
  
  // Get locale display name
  getLocaleDisplayName: (locale: string) => {
    const displayNames = {
      en: 'English',
      fa: 'فارسی'
    };
    return displayNames[locale as keyof typeof displayNames] || locale;
  }
};

export default i18n; 