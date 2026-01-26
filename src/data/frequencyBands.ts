import { FrequencyBand } from '../types';

/**
 * Amateur radio frequency bands
 */
export const frequencyBands: FrequencyBand[] = [
  { id: '2200m', nameKey: '2200m', frequency: 0.1365, wavelength: '2200m' },
  { id: '630m', nameKey: '630m', frequency: 0.4725, wavelength: '630m' },
  { id: '160m', nameKey: '160m', frequency: 1.85, wavelength: '160m' },
  { id: '80m', nameKey: '80m', frequency: 3.65, wavelength: '80m' },
  { id: '60m', nameKey: '60m', frequency: 5.35, wavelength: '60m' },
  { id: '40m', nameKey: '40m', frequency: 7.1, wavelength: '40m' },
  { id: '30m', nameKey: '30m', frequency: 10.125, wavelength: '30m' },
  { id: '20m', nameKey: '20m', frequency: 14.175, wavelength: '20m' },
  { id: '17m', nameKey: '17m', frequency: 18.1, wavelength: '17m' },
  { id: '15m', nameKey: '15m', frequency: 21.225, wavelength: '15m' },
  { id: '12m', nameKey: '12m', frequency: 24.94, wavelength: '12m' },
  { id: '10m', nameKey: '10m', frequency: 28.5, wavelength: '10m' },
  { id: '6m', nameKey: '6m', frequency: 51, wavelength: '6m' },
  { id: '4m', nameKey: '4m', frequency: 70.2, wavelength: '4m' },
  { id: '2m', nameKey: '2m', frequency: 145, wavelength: '2m' },
  { id: '70cm', nameKey: '70cm', frequency: 435, wavelength: '70cm' },
  { id: '23cm', nameKey: '23cm', frequency: 1296, wavelength: '23cm' },
  { id: '13cm', nameKey: '13cm', frequency: 2320, wavelength: '13cm' },
  { id: '9cm', nameKey: '9cm', frequency: 3400, wavelength: '9cm' },
  { id: '6cm', nameKey: '6cm', frequency: 5760, wavelength: '6cm' },
  { id: '3cm', nameKey: '3cm', frequency: 10368, wavelength: '3cm' },
];

export function getFrequencyBand(id: string): FrequencyBand | undefined {
  return frequencyBands.find(b => b.id === id);
}

export function findBandByFrequency(frequencyMHz: number): FrequencyBand | undefined {
  // Find the closest band
  let closest: FrequencyBand | undefined;
  let minDiff = Infinity;

  for (const band of frequencyBands) {
    const diff = Math.abs(band.frequency - frequencyMHz);
    const relDiff = diff / band.frequency;
    // Within 10% of center frequency
    if (relDiff < 0.1 && diff < minDiff) {
      minDiff = diff;
      closest = band;
    }
  }

  return closest;
}
