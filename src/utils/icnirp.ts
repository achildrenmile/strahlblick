/**
 * ICNIRP Reference Levels for RF Electromagnetic Field Exposure
 * Based on ICNIRP Guidelines 2020
 *
 * General Public limits are for unrestricted exposure
 * Occupational limits are for controlled environments (approximately 5x higher)
 */

export interface IcnirpLimits {
  generalPublic: number;  // W/m²
  occupational: number;   // W/m²
}

/**
 * Get ICNIRP power density reference levels for a given frequency
 *
 * General Public Limits:
 * - 0.1-10 MHz: 2 W/m² (thermal effects)
 * - 10-400 MHz: 2 W/m² (whole body absorption)
 * - 400-2000 MHz: f/200 W/m² (localized absorption)
 * - 2-300 GHz: 10 W/m²
 *
 * Occupational limits are approximately 5× higher
 *
 * @param frequencyMHz - Frequency in MHz
 * @returns Power density limits in W/m²
 */
export function getIcnirpLimits(frequencyMHz: number): IcnirpLimits {
  let generalPublic: number;

  if (frequencyMHz < 0.1) {
    // Below 100 kHz - not typically relevant for amateur radio
    // Using conservative estimate
    generalPublic = 2;
  } else if (frequencyMHz < 10) {
    // 0.1 - 10 MHz (LF/MF bands)
    generalPublic = 2;
  } else if (frequencyMHz <= 400) {
    // 10 - 400 MHz (HF, VHF, lower UHF)
    // This covers most amateur HF and VHF bands
    generalPublic = 2;
  } else if (frequencyMHz <= 2000) {
    // 400 - 2000 MHz (UHF)
    // Limit increases with frequency: f/200 W/m²
    generalPublic = frequencyMHz / 200;
  } else {
    // Above 2000 MHz (SHF, EHF)
    generalPublic = 10;
  }

  // Occupational limits are 5× higher
  const occupational = generalPublic * 5;

  return {
    generalPublic,
    occupational
  };
}

/**
 * Get ICNIRP limit description for display
 */
export function getIcnirpLimitDescription(frequencyMHz: number, language: 'de' | 'en'): string {
  if (language === 'de') {
    if (frequencyMHz <= 400) {
      return '2 W/m² (10-400 MHz)';
    } else if (frequencyMHz <= 2000) {
      return `${(frequencyMHz / 200).toFixed(2)} W/m² (f/200)`;
    } else {
      return '10 W/m² (>2 GHz)';
    }
  } else {
    if (frequencyMHz <= 400) {
      return '2 W/m² (10-400 MHz)';
    } else if (frequencyMHz <= 2000) {
      return `${(frequencyMHz / 200).toFixed(2)} W/m² (f/200)`;
    } else {
      return '10 W/m² (>2 GHz)';
    }
  }
}

/**
 * Amateur radio frequency bands with typical center frequencies
 */
export const AMATEUR_BANDS = [
  { id: '160m', name: '160m', frequency: 1.85, wavelength: '160m' },
  { id: '80m', name: '80m', frequency: 3.65, wavelength: '80m' },
  { id: '60m', name: '60m', frequency: 5.35, wavelength: '60m' },
  { id: '40m', name: '40m', frequency: 7.1, wavelength: '40m' },
  { id: '30m', name: '30m', frequency: 10.125, wavelength: '30m' },
  { id: '20m', name: '20m', frequency: 14.175, wavelength: '20m' },
  { id: '17m', name: '17m', frequency: 18.1, wavelength: '17m' },
  { id: '15m', name: '15m', frequency: 21.225, wavelength: '15m' },
  { id: '12m', name: '12m', frequency: 24.94, wavelength: '12m' },
  { id: '10m', name: '10m', frequency: 28.5, wavelength: '10m' },
  { id: '6m', name: '6m', frequency: 51, wavelength: '6m' },
  { id: '2m', name: '2m', frequency: 145, wavelength: '2m' },
  { id: '70cm', name: '70cm', frequency: 435, wavelength: '70cm' },
  { id: '23cm', name: '23cm', frequency: 1296, wavelength: '23cm' },
  { id: '13cm', name: '13cm', frequency: 2320, wavelength: '13cm' },
] as const;

export type AmateurbandId = typeof AMATEUR_BANDS[number]['id'];
