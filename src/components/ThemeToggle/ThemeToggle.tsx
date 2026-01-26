import { Moon, Sun } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';

export function ThemeToggle() {
  const { theme, toggleTheme } = useApp();
  const { t } = useI18n();

  return (
    <button
      onClick={toggleTheme}
      className="
        p-2 rounded-lg
        text-gray-600 dark:text-gray-400
        hover:bg-gray-100 dark:hover:bg-gray-800
        transition-colors
      "
      aria-label={theme === 'dark' ? t.lightMode : t.darkMode}
      title={theme === 'dark' ? t.lightMode : t.darkMode}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
}
