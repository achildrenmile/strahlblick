import { Globe } from 'lucide-react';
import { useI18n } from '../../i18n';
import { Language } from '../../types';

export function LanguageSelector() {
  const { language, setLanguage, t } = useI18n();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language);
  };

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-gray-500 dark:text-gray-400" />
      <select
        value={language}
        onChange={handleChange}
        className="
          text-sm
          bg-transparent
          border-none
          text-gray-700 dark:text-gray-300
          cursor-pointer
          focus:outline-none focus:ring-0
          pr-6
        "
        aria-label={t.language}
      >
        <option value="de">{t.german}</option>
        <option value="en">{t.english}</option>
      </select>
    </div>
  );
}
