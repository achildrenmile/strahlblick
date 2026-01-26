import { ScenarioPreset } from '../types';

/**
 * Scenario presets for common amateur radio setups
 */
export const scenarioPresets: ScenarioPreset[] = [
  {
    id: 'qrp',
    nameKey: 'scenarioQRP',
    descriptionKey: 'scenarioQRPDesc',
    inputs: {
      transmitPower: 5,
      dutyCycle: 40,
      frequency: 14.074,
      antennaGain: 2.15,
      feedlineLoss: 0.5,
      antennaHeight: 3,
      evaluationDistance: 2,
    }
  },
  {
    id: 'homeHF',
    nameKey: 'scenarioHomeHF',
    descriptionKey: 'scenarioHomeHFDesc',
    inputs: {
      transmitPower: 100,
      dutyCycle: 40,
      frequency: 14.175,
      antennaGain: 6,
      feedlineLoss: 1.5,
      antennaHeight: 12,
      evaluationDistance: 5,
    }
  },
  {
    id: 'contest',
    nameKey: 'scenarioContest',
    descriptionKey: 'scenarioContestDesc',
    inputs: {
      transmitPower: 750,
      dutyCycle: 50,
      frequency: 14.175,
      antennaGain: 11,
      feedlineLoss: 2,
      antennaHeight: 20,
      evaluationDistance: 10,
    }
  },
  {
    id: 'vhfMobile',
    nameKey: 'scenarioVHFMobile',
    descriptionKey: 'scenarioVHFMobileDesc',
    inputs: {
      transmitPower: 50,
      dutyCycle: 100,
      frequency: 145,
      antennaGain: 3,
      feedlineLoss: 1,
      antennaHeight: 1.5,
      evaluationDistance: 1,
    }
  },
  {
    id: 'uhfHandheld',
    nameKey: 'scenarioUHFHandheld',
    descriptionKey: 'scenarioUHFHandheldDesc',
    inputs: {
      transmitPower: 5,
      dutyCycle: 100,
      frequency: 435,
      antennaGain: 2,
      feedlineLoss: 0,
      antennaHeight: 1.5,
      evaluationDistance: 0.3,
    }
  },
  {
    id: 'eme',
    nameKey: 'scenarioEME',
    descriptionKey: 'scenarioEMEDesc',
    inputs: {
      transmitPower: 1000,
      dutyCycle: 50,
      frequency: 144,
      antennaGain: 18,
      feedlineLoss: 1,
      antennaHeight: 25,
      evaluationDistance: 15,
    }
  },
];

export function getScenarioPreset(id: string): ScenarioPreset | undefined {
  return scenarioPresets.find(p => p.id === id);
}
