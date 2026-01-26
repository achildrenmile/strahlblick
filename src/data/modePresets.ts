import { ModePreset } from '../types';

/**
 * Operating mode presets with typical duty cycles
 *
 * Duty cycle represents the average power output as a percentage
 * of peak power during normal operation.
 */
export const modePresets: ModePreset[] = [
  {
    id: 'cw',
    nameKey: 'modeCW',
    dutyCycle: 40,
    description: 'Continuous Wave telegraphy - key down ~40% during QSO'
  },
  {
    id: 'ssb',
    nameKey: 'modeSSB',
    dutyCycle: 20,
    description: 'Single Sideband voice - speech pauses reduce average'
  },
  {
    id: 'fm',
    nameKey: 'modeFM',
    dutyCycle: 100,
    description: 'Frequency Modulation - constant carrier during TX'
  },
  {
    id: 'am',
    nameKey: 'modeAM',
    dutyCycle: 100,
    description: 'Amplitude Modulation - constant carrier'
  },
  {
    id: 'ft8',
    nameKey: 'modeFT8',
    dutyCycle: 50,
    description: 'FT8 digital mode - 15s TX, 15s RX cycles'
  },
  {
    id: 'ft4',
    nameKey: 'modeFT4',
    dutyCycle: 50,
    description: 'FT4 digital mode - faster FT8 variant'
  },
  {
    id: 'rtty',
    nameKey: 'modeRTTY',
    dutyCycle: 100,
    description: 'Radio Teletype - continuous during TX'
  },
  {
    id: 'psk',
    nameKey: 'modePSK',
    dutyCycle: 100,
    description: 'Phase Shift Keying - continuous during TX'
  },
  {
    id: 'sstv',
    nameKey: 'modeSSTV',
    dutyCycle: 100,
    description: 'Slow Scan Television - continuous during image TX'
  },
  {
    id: 'digital',
    nameKey: 'modeDigital',
    dutyCycle: 50,
    description: 'General digital modes - estimate'
  },
];

export function getModePreset(id: string): ModePreset | undefined {
  return modePresets.find(p => p.id === id);
}
