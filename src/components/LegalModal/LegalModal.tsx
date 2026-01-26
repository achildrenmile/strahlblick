import { X } from 'lucide-react';
import { useEffect } from 'react';
import { useI18n } from '../../i18n';

interface LegalModalProps {
  type: 'imprint' | 'privacy';
  onClose: () => void;
}

export function LegalModal({ type, onClose }: LegalModalProps) {
  const { t } = useI18n();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {type === 'imprint' ? t.imprintTitle : t.privacyTitle}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={t.close}
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 overflow-y-auto max-h-[calc(90vh-80px)]">
          {type === 'imprint' ? <ImprintContent /> : <PrivacyContent />}
        </div>
      </div>
    </div>
  );
}

function ImprintContent() {
  const { t } = useI18n();

  return (
    <div className="space-y-6 text-gray-700 dark:text-gray-300">
      <p className="text-sm text-gray-500 dark:text-gray-400">{t.imprintInfo}</p>

      <section>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {t.imprintOperator}
        </h3>
        <div className="space-y-1">
          <p className="font-medium">{t.imprintOperatorName}</p>
          <p>{t.imprintOperatorCallsign}</p>
          <p>{t.imprintOperatorAddress}</p>
          <p>{t.imprintOperatorCountry}</p>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {t.imprintContact}
        </h3>
        <a
          href={`mailto:${t.imprintContactEmail}`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          {t.imprintContactEmail}
        </a>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {t.imprintLiabilityTitle}
        </h3>
        <p>{t.imprintLiabilityText}</p>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {t.imprintCopyrightTitle}
        </h3>
        <p>{t.imprintCopyrightText}</p>
      </section>
    </div>
  );
}

function PrivacyContent() {
  const { t } = useI18n();

  return (
    <div className="space-y-6 text-gray-700 dark:text-gray-300">
      <p>{t.privacyIntro}</p>

      <section>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {t.privacyNoDataTitle}
        </h3>
        <p className="mb-2">{t.privacyNoDataText}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{t.privacyNoDataList}</p>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {t.privacyLocalStorageTitle}
        </h3>
        <p>{t.privacyLocalStorageText}</p>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {t.privacyCloudflareTitle}
        </h3>
        <p>{t.privacyCloudflareText}</p>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {t.privacyContactTitle}
        </h3>
        <p className="mb-2">{t.privacyContactText}</p>
        <a
          href={`mailto:${t.imprintContactEmail}`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          {t.imprintContactEmail}
        </a>
      </section>
    </div>
  );
}
