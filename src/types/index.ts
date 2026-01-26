export type Language = 'de' | 'en';

export type ExposureCategory = 'general_public' | 'occupational';

export interface CalculationInputs {
  transmitPower: number;        // Watts
  dutyCycle: number;            // 0-100 (percentage)
  frequency: number;            // MHz
  antennaGain: number;          // dBi
  feedlineLoss: number;         // dB
  antennaHeight: number;        // meters
  evaluationDistance?: number;  // meters (optional, for specific distance calculation)
}

export interface CalculationResult {
  eirpWatts: number;
  eirpDbw: number;
  averagePowerWatts: number;
  safetyDistanceGeneralPublic: number;  // meters
  safetyDistanceOccupational: number;   // meters
  powerDensityAtDistance?: number;      // W/m² (if evaluationDistance provided)
  icnirpLimitGeneralPublic: number;     // W/m²
  icnirpLimitOccupational: number;      // W/m²
  complianceRatioGeneralPublic: number; // < 1.0 = compliant
  complianceRatioOccupational: number;  // < 1.0 = compliant
  isCompliantGeneralPublic: boolean;
  isCompliantOccupational: boolean;
  isNearField: boolean;
  nearFieldBoundary: number;            // meters
  wavelength: number;                   // meters
}

export interface BandConfiguration {
  id: string;
  inputs: CalculationInputs;
  result: CalculationResult | null;
}

export interface MultiBandResult {
  totalExposureRatioGeneralPublic: number;
  totalExposureRatioOccupational: number;
  isCompliantGeneralPublic: boolean;
  isCompliantOccupational: boolean;
  bands: BandConfiguration[];
}

export interface AntennaPreset {
  id: string;
  nameKey: string;          // i18n key
  gain: number;             // dBi
  description?: string;
}

export interface ModePreset {
  id: string;
  nameKey: string;          // i18n key
  dutyCycle: number;        // percentage (0-100)
  description?: string;
}

export interface ScenarioPreset {
  id: string;
  nameKey: string;          // i18n key
  descriptionKey: string;   // i18n key
  inputs: Partial<CalculationInputs>;
}

export interface FrequencyBand {
  id: string;
  nameKey: string;
  frequency: number;        // MHz (center frequency)
  wavelength: string;       // e.g., "20m"
}

export interface DistanceTableRow {
  distance: number;         // meters
  powerDensity: number;     // W/m²
  limitGeneralPublic: number;
  limitOccupational: number;
  complianceRatioGeneralPublic: number;
  complianceRatioOccupational: number;
}

export interface AppState {
  theme: 'light' | 'dark';
  inputs: CalculationInputs;
  multiBand: BandConfiguration[];
  showMultiBand: boolean;
}
