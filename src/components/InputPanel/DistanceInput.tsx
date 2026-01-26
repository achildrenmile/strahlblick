import { useI18n } from '../../i18n';
import { useApp } from '../../context/AppContext';
import { Input, Slider } from '../shared';

export function DistanceInput() {
  const { t } = useI18n();
  const { inputs, updateInput } = useApp();

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Input
          label={t.antennaHeight}
          type="number"
          min={0}
          max={100}
          step={0.5}
          value={inputs.antennaHeight}
          onChange={(e) => updateInput('antennaHeight', Number(e.target.value))}
          unit={t.antennaHeightUnit}
        />
        <Input
          label={t.evaluationDistance}
          type="number"
          min={0.1}
          max={100}
          step={0.1}
          value={inputs.evaluationDistance ?? 3}
          onChange={(e) => updateInput('evaluationDistance', Number(e.target.value))}
          unit={t.evaluationDistanceUnit}
        />
      </div>
      <Slider
        label={t.evaluationDistance}
        min={0.1}
        max={50}
        step={0.1}
        value={inputs.evaluationDistance ?? 3}
        onChange={(e) => updateInput('evaluationDistance', Number(e.target.value))}
        unit="m"
      />
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {t.evaluationDistanceDescription}
      </p>
    </div>
  );
}
