import { Radio } from 'lucide-react';
import { useI18n } from '../../i18n';
import { useConfig } from '../../hooks/useConfig';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { LanguageSelector } from '../LanguageSelector/LanguageSelector';

export function Header() {
  const { t } = useI18n();
  const { config } = useConfig();

  return (
    <header className="
      bg-white dark:bg-gray-800
      border-b border-gray-200 dark:border-gray-700
      shadow-sm
    ">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Parent Site Logo */}
            {config?.parentSiteLogo && config?.parentSiteUrl && (
              <a
                href={config.parentSiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0"
              >
                <img
                  src={config.parentSiteLogo}
                  alt={config.parentSiteName || 'Parent Site'}
                  className="h-[80px] sm:h-[150px] w-auto"
                />
              </a>
            )}

            {/* App Logo and Title */}
            <div className="flex items-center gap-3">
              <div className="
                p-2 rounded-lg
                bg-blue-100 dark:bg-blue-900
                text-blue-600 dark:text-blue-400
              ">
                <Radio className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {t.appTitle}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t.appSubtitle}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
