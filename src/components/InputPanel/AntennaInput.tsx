import { useI18n } from '../../i18n';
import { useApp } from '../../context/AppContext';
import { Input, Select } from '../shared';
import { antennaPresets } from '../../data/antennaPresets';
import { Translations } from '../../i18n/translations';

export function AntennaInput() {
  const { t } = useI18n();
  const { inputs, updateInput } = useApp();

  const antennaOptions = antennaPresets.map((preset) => ({
    value: preset.id,
    label: `${t[preset.nameKey as keyof Translations]} (${preset.gain >= 0 ? '+' : ''}${preset.gain} dBi)`,
  }));

  const currentPreset = antennaPresets.find(
    (p) => Math.abs(p.gain - inputs.antennaGain) < 0.1
  );

  const handlePresetSelect = (presetId: string) => {
    const preset = antennaPresets.find((p) => p.id === presetId);
    if (preset) {
      updateInput('antennaGain', preset.gain);
    }
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Input
          label={t.antennaGain}
          type="number"
          min={-10}
          max={30}
          step={0.1}
          value={inputs.antennaGain}
          onChange={(e) => updateInput('antennaGain', Number(e.target.value))}
          unit={t.antennaGainUnit}
        />
        <Input
          label={t.feedlineLoss}
          type="number"
          min={0}
          max={20}
          step={0.1}
          value={inputs.feedlineLoss}
          onChange={(e) => updateInput('feedlineLoss', Number(e.target.value))}
          unit={t.feedlineLossUnit}
        />
      </div>
      <Select
        label={t.antennaPresets}
        options={antennaOptions}
        value={currentPreset?.id || ''}
        onChange={(e) => handlePresetSelect(e.target.value)}
        placeholder={t.selectPreset}
      />
    </div>
  );
}
