import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { useI18n } from '../../i18n';
import { LegalModal } from '../LegalModal/LegalModal';

export function Footer() {
  const { t } = useI18n();
  const [legalModal, setLegalModal] = useState<'imprint' | 'privacy' | null>(null);

  return (
    <>
      <footer className="py-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
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
                href="https://github.com/lintec-at/strahlblick"
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
      </footer>

      {legalModal && (
        <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />
      )}
    </>
  );
}
