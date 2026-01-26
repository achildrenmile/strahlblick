import { CalculationInputs, CalculationResult, DistanceTableRow } from '../types';
import { getIcnirpLimits } from './icnirp';

/**
 * Speed of light in m/s
 */
const SPEED_OF_LIGHT = 299792458;

/**
 * Convert MHz to wavelength in meters
 */
export function frequencyToWavelength(frequencyMHz: number): number {
  return SPEED_OF_LIGHT / (frequencyMHz * 1e6);
}

/**
 * Calculate EIRP (Effective Isotropic Radiated Power)
 *
 * Formula: EIRP = P_tx × 10^((G_ant - L_feed) / 10)
 *
 * @param transmitPowerWatts - Transmitter power in Watts
 * @param antennaGainDbi - Antenna gain in dBi
 * @param feedlineLossDb - Feedline loss in dB
 * @returns EIRP in Watts
 */
export function calculateEirp(
  transmitPowerWatts: number,
  antennaGainDbi: number,
  feedlineLossDb: number
): number {
  const netGainDb = antennaGainDbi - feedlineLossDb;
  return transmitPowerWatts * Math.pow(10, netGainDb / 10);
}

/**
 * Convert Watts to dBW
 */
export function wattsToDbw(watts: number): number {
  return 10 * Math.log10(watts);
}

/**
 * Calculate power density at a given distance (far-field approximation)
 *
 * Formula: S = EIRP / (4 × π × d²)
 *
 * @param eirpWatts - EIRP in Watts
 * @param distanceMeters - Distance in meters
 * @returns Power density in W/m²
 */
export function calculatePowerDensity(
  eirpWatts: number,
  distanceMeters: number
): number {
  if (distanceMeters <= 0) return Infinity;
  return eirpWatts / (4 * Math.PI * distanceMeters * distanceMeters);
}

/**
 * Calculate safety distance for a given power density limit
 *
 * Formula: d = √(EIRP / (4 × π × S_limit))
 *
 * @param eirpWatts - EIRP in Watts
 * @param powerDensityLimitWm2 - Power density limit in W/m²
 * @returns Safety distance in meters
 */
export function calculateSafetyDistance(
  eirpWatts: number,
  powerDensityLimitWm2: number
): number {
  if (powerDensityLimitWm2 <= 0) return Infinity;
  return Math.sqrt(eirpWatts / (4 * Math.PI * powerDensityLimitWm2));
}

/**
 * Calculate near-field boundary (Fraunhofer distance)
 *
 * Formula: d_nf = 2D²/λ
 *
 * For typical amateur antennas, D is approximated as:
 * - Dipole/wire: λ/2
 * - Yagi: approximately aperture length
 * - Vertical: λ/4
 *
 * Simplified estimation: d_nf ≈ λ/2π for electrically small antennas
 * For larger antennas, we use 2D²/λ where D ≈ 0.5λ for typical dipoles
 *
 * @param wavelengthMeters - Wavelength in meters
 * @param antennaApertureDiameter - Antenna aperture diameter in meters (optional)
 * @returns Near-field boundary in meters
 */
export function calculateNearFieldBoundary(
  wavelengthMeters: number,
  antennaApertureDiameter?: number
): number {
  // For typical wire antennas, use D = λ/2 (half-wave dipole)
  const D = antennaApertureDiameter ?? wavelengthMeters / 2;

  // Fraunhofer distance: 2D²/λ
  const fraunhoferDistance = (2 * D * D) / wavelengthMeters;

  // Minimum is λ/(2π) - reactive near field boundary
  const reactiveNearField = wavelengthMeters / (2 * Math.PI);

  return Math.max(fraunhoferDistance, reactiveNearField);
}

/**
 * Calculate average power considering duty cycle
 *
 * @param peakPowerWatts - Peak transmit power in Watts
 * @param dutyCyclePercent - Duty cycle as percentage (0-100)
 * @returns Average power in Watts
 */
export function calculateAveragePower(
  peakPowerWatts: number,
  dutyCyclePercent: number
): number {
  return peakPowerWatts * (dutyCyclePercent / 100);
}

/**
 * Main calculation function - performs all RF exposure calculations
 *
 * @param inputs - Calculation input parameters
 * @returns Complete calculation results
 */
export function calculateExposure(inputs: CalculationInputs): CalculationResult {
  const {
    transmitPower,
    dutyCycle,
    frequency,
    antennaGain,
    feedlineLoss,
    evaluationDistance
  } = inputs;

  // Calculate wavelength
  const wavelength = frequencyToWavelength(frequency);

  // Calculate average power with duty cycle
  const averagePowerWatts = calculateAveragePower(transmitPower, dutyCycle);

  // Calculate EIRP using average power
  const eirpWatts = calculateEirp(averagePowerWatts, antennaGain, feedlineLoss);
  const eirpDbw = wattsToDbw(eirpWatts);

  // Get ICNIRP limits for this frequency
  const icnirpLimits = getIcnirpLimits(frequency);

  // Calculate safety distances
  const safetyDistanceGeneralPublic = calculateSafetyDistance(
    eirpWatts,
    icnirpLimits.generalPublic
  );
  const safetyDistanceOccupational = calculateSafetyDistance(
    eirpWatts,
    icnirpLimits.occupational
  );

  // Calculate near-field boundary
  const nearFieldBoundary = calculateNearFieldBoundary(wavelength);

  // Calculate power density at evaluation distance if provided
  let powerDensityAtDistance: number | undefined;
  let complianceRatioGeneralPublic: number;
  let complianceRatioOccupational: number;

  if (evaluationDistance !== undefined && evaluationDistance > 0) {
    powerDensityAtDistance = calculatePowerDensity(eirpWatts, evaluationDistance);
    complianceRatioGeneralPublic = powerDensityAtDistance / icnirpLimits.generalPublic;
    complianceRatioOccupational = powerDensityAtDistance / icnirpLimits.occupational;
  } else {
    // Use safety distance to calculate compliance at 1 meter as default reference
    const powerDensityAt1m = calculatePowerDensity(eirpWatts, 1);
    complianceRatioGeneralPublic = powerDensityAt1m / icnirpLimits.generalPublic;
    complianceRatioOccupational = powerDensityAt1m / icnirpLimits.occupational;
  }

  // Determine if we're in near field
  const isNearField = evaluationDistance !== undefined &&
    evaluationDistance < nearFieldBoundary;

  return {
    eirpWatts,
    eirpDbw,
    averagePowerWatts,
    safetyDistanceGeneralPublic,
    safetyDistanceOccupational,
    powerDensityAtDistance,
    icnirpLimitGeneralPublic: icnirpLimits.generalPublic,
    icnirpLimitOccupational: icnirpLimits.occupational,
    complianceRatioGeneralPublic,
    complianceRatioOccupational,
    isCompliantGeneralPublic: complianceRatioGeneralPublic <= 1,
    isCompliantOccupational: complianceRatioOccupational <= 1,
    isNearField,
    nearFieldBoundary,
    wavelength
  };
}

/**
 * Calculate cumulative exposure ratio for multiple bands
 *
 * According to ICNIRP guidelines, when exposed to multiple frequencies,
 * the sum of the ratios (S_i / S_limit_i) must be ≤ 1
 *
 * @param results - Array of calculation results for each band
 * @param evaluationDistance - Distance at which to evaluate
 * @returns Total exposure ratio and compliance status
 */
export function calculateCumulativeExposure(
  results: CalculationResult[],
  evaluationDistance: number
): {
  totalRatioGeneralPublic: number;
  totalRatioOccupational: number;
  isCompliantGeneralPublic: boolean;
  isCompliantOccupational: boolean;
} {
  let totalRatioGeneralPublic = 0;
  let totalRatioOccupational = 0;

  for (const result of results) {
    const powerDensity = calculatePowerDensity(result.eirpWatts, evaluationDistance);
    totalRatioGeneralPublic += powerDensity / result.icnirpLimitGeneralPublic;
    totalRatioOccupational += powerDensity / result.icnirpLimitOccupational;
  }

  return {
    totalRatioGeneralPublic,
    totalRatioOccupational,
    isCompliantGeneralPublic: totalRatioGeneralPublic <= 1,
    isCompliantOccupational: totalRatioOccupational <= 1
  };
}

/**
 * Generate distance table data
 *
 * @param eirpWatts - EIRP in Watts
 * @param frequencyMHz - Frequency in MHz
 * @param distances - Array of distances to calculate (defaults to standard distances)
 * @returns Array of distance table rows
 */
export function generateDistanceTable(
  eirpWatts: number,
  frequencyMHz: number,
  distances: number[] = [0.5, 1, 2, 3, 5, 10, 20]
): DistanceTableRow[] {
  const icnirpLimits = getIcnirpLimits(frequencyMHz);

  return distances.map(distance => {
    const powerDensity = calculatePowerDensity(eirpWatts, distance);
    return {
      distance,
      powerDensity,
      limitGeneralPublic: icnirpLimits.generalPublic,
      limitOccupational: icnirpLimits.occupational,
      complianceRatioGeneralPublic: powerDensity / icnirpLimits.generalPublic,
      complianceRatioOccupational: powerDensity / icnirpLimits.occupational
    };
  });
}

/**
 * Format power density with appropriate unit
 */
export function formatPowerDensity(powerDensityWm2: number): string {
  if (powerDensityWm2 >= 1) {
    return `${powerDensityWm2.toFixed(2)} W/m²`;
  } else if (powerDensityWm2 >= 0.001) {
    return `${(powerDensityWm2 * 1000).toFixed(2)} mW/m²`;
  } else {
    return `${(powerDensityWm2 * 1000000).toFixed(2)} µW/m²`;
  }
}

/**
 * Format distance with appropriate precision
 */
export function formatDistance(meters: number): string {
  if (meters >= 100) {
    return `${meters.toFixed(0)} m`;
  } else if (meters >= 10) {
    return `${meters.toFixed(1)} m`;
  } else if (meters >= 1) {
    return `${meters.toFixed(2)} m`;
  } else {
    return `${(meters * 100).toFixed(1)} cm`;
  }
}
