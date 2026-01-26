import { useState } from 'react';
import { AlertCircle, ExternalLink } from 'lucide-react';
import { useI18n } from '../../i18n';
import { LegalModal } from '../LegalModal/LegalModal';

export function Footer() {
  const { t } = useI18n();
  const [legalModal, setLegalModal] = useState<'imprint' | 'privacy' | null>(null);

  return (
    <>
      <footer className="mt-8 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        {/* Disclaimer Section */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-amber-500" />
            <div>
              <p className="font-medium text-gray-700 dark:text-gray-300">{t.disclaimer}</p>
              <p className="mt-1">{t.disclaimerText}</p>
              <p className="mt-2">
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
              </p>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="border-t border-gray-200 dark:border-gray-700 py-4 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>{t.footerText}</span>
              <span className="hidden sm:inline">•</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLegalModal('imprint')}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {t.imprint}
                </button>
                <span>|</span>
                <button
                  onClick={() => setLegalModal('privacy')}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {t.privacy}
                </button>
                <span>|</span>
                <a
                  href="https://github.com/achildrenmile/strahlblick"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                >
                  GitHub
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {legalModal && (
        <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />
      )}
    </>
  );
}
