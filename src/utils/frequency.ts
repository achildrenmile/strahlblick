/**
 * Format frequency for display
 *
 * @param frequencyMHz - Frequency in MHz
 * @returns Formatted string with appropriate unit
 */
export function formatFrequency(frequencyMHz: number): string {
  if (frequencyMHz >= 1000) {
    return `${(frequencyMHz / 1000).toFixed(3)} GHz`;
  } else if (frequencyMHz >= 1) {
    return `${frequencyMHz.toFixed(3)} MHz`;
  } else {
    return `${(frequencyMHz * 1000).toFixed(3)} kHz`;
  }
}

/**
 * Format frequency in short form
 *
 * @param frequencyMHz - Frequency in MHz
 * @returns Short formatted string
 */
export function formatFrequencyShort(frequencyMHz: number): string {
  if (frequencyMHz >= 1000) {
    return `${(frequencyMHz / 1000).toFixed(1)}G`;
  } else if (frequencyMHz >= 1) {
    return `${frequencyMHz.toFixed(1)}M`;
  } else {
    return `${(frequencyMHz * 1000).toFixed(0)}k`;
  }
}

/**
 * Parse frequency input string to MHz
 * Supports formats: "14.074 MHz", "14.074m", "14074 kHz", "14074k", "1.2 GHz", "1.2g"
 *
 * @param input - User input string
 * @returns Frequency in MHz, or null if invalid
 */
export function parseFrequency(input: string): number | null {
  const cleanInput = input.trim().toLowerCase();

  // Try to extract number and unit
  const match = cleanInput.match(/^([\d.,]+)\s*(ghz?|mhz?|khz?|g|m|k)?$/i);
  if (!match) return null;

  // Parse the number (handle both . and , as decimal separator)
  const numStr = match[1].replace(',', '.');
  const num = parseFloat(numStr);
  if (isNaN(num)) return null;

  // Convert to MHz based on unit
  const unit = match[2]?.toLowerCase() || 'm';

  if (unit.startsWith('g')) {
    return num * 1000; // GHz to MHz
  } else if (unit.startsWith('k')) {
    return num / 1000; // kHz to MHz
  } else {
    return num; // MHz (default)
  }
}

/**
 * Get wavelength string from frequency
 *
 * @param frequencyMHz - Frequency in MHz
 * @returns Wavelength band name (e.g., "20m", "2m", "70cm")
 */
export function getWavelengthBand(frequencyMHz: number): string {
  const wavelengthM = 299.792458 / frequencyMHz;

  if (wavelengthM >= 100) {
    return `${Math.round(wavelengthM)}m`;
  } else if (wavelengthM >= 1) {
    return `${Math.round(wavelengthM)}m`;
  } else {
    return `${Math.round(wavelengthM * 100)}cm`;
  }
}
