import { AlertCircle, ExternalLink } from 'lucide-react';
import { useI18n } from '../../i18n';

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="
      mt-8 py-6
      border-t border-gray-200 dark:border-gray-700
      bg-gray-50 dark:bg-gray-900
    ">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-700 dark:text-gray-300">{t.disclaimer}</p>
              <p className="mt-1">{t.disclaimerText}</p>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-wrap items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div>
            {t.basedOn}:{' '}
            <a
              href="https://www.icnirp.org/en/activities/news/news-article/rf-guidelines-2020-published.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
            >
              {t.icnirpReference}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div>
            © {new Date().getFullYear()} Strahlblick
          </div>
        </div>
      </div>
    </footer>
  );
}
