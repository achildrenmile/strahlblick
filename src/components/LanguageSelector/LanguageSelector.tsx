import { Globe } from 'lucide-react';
import { useI18n } from '../../i18n';
import { Language } from '../../types';

const languageNames: Record<Language, string> = {
  de: 'DE',
  en: 'EN',
};

export function LanguageSelector() {
  const { language, setLanguage } = useI18n();

  const toggleLanguage = () => {
    setLanguage(language === 'de' ? 'en' : 'de');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-sm font-medium
        bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300
        hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      title={language === 'de' ? 'Switch to English' : 'Auf Deutsch wechseln'}
    >
      <Globe className="w-4 h-4" />
      <span>{languageNames[language]}</span>
    </button>
  );
}
