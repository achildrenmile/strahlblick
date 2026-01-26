import { useCallback } from 'react';
import jsPDF from 'jspdf';
import { useI18n } from '../i18n';
import { useApp } from '../context/AppContext';
import { formatDistance, formatPowerDensity, generateDistanceTable } from '../utils/calculations';

export function usePdfExport() {
  const { t, language } = useI18n();
  const { inputs, result } = useApp();

  const exportPdf = useCallback(() => {
    if (!result) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 20;

    // Title
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text(t.exportPdfTitle, pageWidth / 2, y, { align: 'center' });
    y += 10;

    // Subtitle
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Strahlblick - ' + t.appSubtitle, pageWidth / 2, y, { align: 'center' });
    y += 15;

    // Date
    doc.setFontSize(10);
    doc.text(`${t.exportPdfGenerated}: ${new Date().toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US')}`, 20, y);
    y += 15;

    // Parameters section
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(t.exportPdfParameters, 20, y);
    y += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    const params = [
      [`${t.transmitPower}:`, `${inputs.transmitPower} W`],
      [`${t.dutyCycle}:`, `${inputs.dutyCycle}%`],
      [`${t.frequency}:`, `${inputs.frequency} MHz`],
      [`${t.antennaGain}:`, `${inputs.antennaGain} dBi`],
      [`${t.feedlineLoss}:`, `${inputs.feedlineLoss} dB`],
      [`${t.antennaHeight}:`, `${inputs.antennaHeight} m`],
      [`${t.evaluationDistance}:`, `${inputs.evaluationDistance ?? '-'} m`],
    ];

    params.forEach(([label, value]) => {
      doc.text(label, 25, y);
      doc.text(value, 100, y);
      y += 6;
    });

    y += 10;

    // Results section
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(t.exportPdfResults, 20, y);
    y += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    const results = [
      [`${t.eirpWatts}:`, `${result.eirpWatts.toFixed(2)} W (${result.eirpDbw.toFixed(2)} dBW)`],
      [`${t.averagePower}:`, `${result.averagePowerWatts.toFixed(2)} W`],
      [`${t.wavelength}:`, `${result.wavelength.toFixed(2)} m`],
      [`${t.nearFieldBoundary}:`, formatDistance(result.nearFieldBoundary)],
      ['', ''],
      [`${t.safetyDistance} (${t.generalPublic}):`, formatDistance(result.safetyDistanceGeneralPublic)],
      [`${t.safetyDistance} (${t.occupational}):`, formatDistance(result.safetyDistanceOccupational)],
      ['', ''],
      [`${t.icnirpLimit} (${t.generalPublic}):`, `${result.icnirpLimitGeneralPublic} W/m²`],
      [`${t.icnirpLimit} (${t.occupational}):`, `${result.icnirpLimitOccupational} W/m²`],
    ];

    if (result.powerDensityAtDistance !== undefined && inputs.evaluationDistance) {
      results.push(['', '']);
      results.push([
        `${t.powerDensityAt} ${inputs.evaluationDistance} m:`,
        formatPowerDensity(result.powerDensityAtDistance)
      ]);
      results.push([
        `${t.complianceRatio} (${t.generalPublic}):`,
        `${(result.complianceRatioGeneralPublic * 100).toFixed(1)}% - ${result.isCompliantGeneralPublic ? t.compliant : t.notCompliant}`
      ]);
      results.push([
        `${t.complianceRatio} (${t.occupational}):`,
        `${(result.complianceRatioOccupational * 100).toFixed(1)}% - ${result.isCompliantOccupational ? t.compliant : t.notCompliant}`
      ]);
    }

    results.forEach(([label, value]) => {
      if (label === '' && value === '') {
        y += 3;
      } else {
        doc.text(label, 25, y);
        doc.text(value, 100, y);
        y += 6;
      }
    });

    y += 10;

    // Distance table
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(t.distanceTable, 20, y);
    y += 8;

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');

    // Table header
    doc.text(t.distance, 25, y);
    doc.text(t.powerDensity, 60, y);
    doc.text(t.generalPublic, 110, y);
    doc.text(t.occupational, 150, y);
    y += 6;

    doc.setFont('helvetica', 'normal');

    const tableData = generateDistanceTable(result.eirpWatts, inputs.frequency);
    tableData.forEach((row) => {
      doc.text(`${row.distance} m`, 25, y);
      doc.text(formatPowerDensity(row.powerDensity), 60, y);
      doc.text(`${(row.complianceRatioGeneralPublic * 100).toFixed(1)}%`, 110, y);
      doc.text(`${(row.complianceRatioOccupational * 100).toFixed(1)}%`, 150, y);
      y += 5;
    });

    y += 15;

    // Disclaimer
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    const disclaimer = doc.splitTextToSize(t.exportPdfDisclaimer, pageWidth - 40);
    doc.text(disclaimer, 20, y);

    y += 15;

    // Reference
    doc.setFont('helvetica', 'normal');
    doc.text(`${t.basedOn}: ${t.icnirpReference}`, 20, y);

    // Save
    const fileName = `strahlblick-report-${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
  }, [t, language, inputs, result]);

  return { exportPdf };
}
