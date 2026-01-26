import { FileDown } from 'lucide-react';
import { useI18n } from '../../i18n';
import { usePdfExport } from '../../hooks/usePdfExport';
import { Button } from '../shared';

export function PdfExportButton() {
  const { t } = useI18n();
  const { exportPdf } = usePdfExport();

  return (
    <Button
      variant="secondary"
      onClick={exportPdf}
      icon={<FileDown className="w-4 h-4" />}
    >
      {t.exportPdf}
    </Button>
  );
}
