import { AntennaPreset } from '../types';

export const antennaPresets: AntennaPreset[] = [
  {
    id: 'dipole',
    nameKey: 'antennaDipole',
    gain: 2.15,
    description: 'λ/2 Dipole - Reference antenna'
  },
  {
    id: 'vertical',
    nameKey: 'antennaVertical',
    gain: 0,
    description: 'λ/4 Vertical with ground plane'
  },
  {
    id: 'gp',
    nameKey: 'antennaGP',
    gain: -1,
    description: '5/8λ Ground Plane'
  },
  {
    id: 'endfed',
    nameKey: 'antennaEndFed',
    gain: 2.0,
    description: 'End-Fed Half-Wave'
  },
  {
    id: 'loop',
    nameKey: 'antennaLoop',
    gain: -1.5,
    description: 'Small magnetic loop'
  },
  {
    id: 'yagi3',
    nameKey: 'antennaYagi3',
    gain: 6,
    description: '3-Element Yagi-Uda'
  },
  {
    id: 'yagi5',
    nameKey: 'antennaYagi5',
    gain: 9,
    description: '5-Element Yagi-Uda'
  },
  {
    id: 'yagi7',
    nameKey: 'antennaYagi7',
    gain: 11,
    description: '7-Element Yagi-Uda'
  },
  {
    id: 'quad',
    nameKey: 'antennaQuad',
    gain: 8,
    description: '2-Element Quad'
  },
  {
    id: 'beam',
    nameKey: 'antennaBeam',
    gain: 12,
    description: 'Large beam antenna'
  },
];

export const powerPresets = [5, 10, 25, 50, 100, 200, 400, 750, 1000];

export function getAntennaPreset(id: string): AntennaPreset | undefined {
  return antennaPresets.find(p => p.id === id);
}
