import en from './en';
import fa from './fa';

const translations = {
  en,
  fa,
};

let currentLocale = 'en';

const i18n = {
  locale: currentLocale,
  translations,
  
  t: (key: string, options?: any) => {
    const keys = key.split('.');
    let value = translations[currentLocale] || translations.en;
    
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
  
  setLocale: (locale: string) => {
    currentLocale = locale;
    i18n.locale = locale;
  }
};

export default i18n; 