import { useI18n } from '../../i18n';
import { useApp } from '../../context/AppContext';
import { Input, Select } from '../shared';
import { frequencyBands } from '../../data/frequencyBands';
import { getWavelengthBand } from '../../utils/frequency';

export function FrequencyInput() {
  const { t } = useI18n();
  const { inputs, updateInput } = useApp();

  const bandOptions = frequencyBands.map((band) => ({
    value: band.id,
    label: `${band.wavelength} (${band.frequency} MHz)`,
  }));

  const currentBand = frequencyBands.find(
    (b) => Math.abs(b.frequency - inputs.frequency) / b.frequency < 0.1
  );

  const handleBandSelect = (bandId: string) => {
    const band = frequencyBands.find((b) => b.id === bandId);
    if (band) {
      updateInput('frequency', band.frequency);
    }
  };

  const wavelength = getWavelengthBand(inputs.frequency);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Input
          label={t.frequency}
          type="number"
          min={0.1}
          max={50000}
          step={0.001}
          value={inputs.frequency}
          onChange={(e) => updateInput('frequency', Number(e.target.value))}
          unit={t.frequencyUnit}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t.wavelength}
          </label>
          <div className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-md text-gray-900 dark:text-gray-100">
            {wavelength}
          </div>
        </div>
      </div>
      <Select
        label={t.band}
        options={bandOptions}
        value={currentBand?.id || ''}
        onChange={(e) => handleBandSelect(e.target.value)}
        placeholder={t.selectPreset}
      />
    </div>
  );
}
