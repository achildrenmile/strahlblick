import { useI18n } from '../../i18n';
import { useApp } from '../../context/AppContext';
import { Slider } from '../shared';
import { modePresets } from '../../data/modePresets';
import { Translations } from '../../i18n/translations';

export function DutyCycleInput() {
  const { t } = useI18n();
  const { inputs, updateInput } = useApp();

  const handleModeSelect = (dutyCycle: number) => {
    updateInput('dutyCycle', dutyCycle);
  };

  return (
    <div className="space-y-3">
      <Slider
        label={t.dutyCycle}
        min={1}
        max={100}
        step={1}
        value={inputs.dutyCycle}
        onChange={(e) => updateInput('dutyCycle', Number(e.target.value))}
        unit="%"
      />
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {t.dutyCycleDescription}
      </p>
      <div className="flex flex-wrap gap-2">
        {modePresets.slice(0, 6).map((mode) => (
          <button
            key={mode.id}
            onClick={() => handleModeSelect(mode.dutyCycle)}
            className={`
              px-2.5 py-1 text-xs font-medium rounded-md
              transition-colors
              ${inputs.dutyCycle === mode.dutyCycle
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }
            `}
            title={`${mode.dutyCycle}%`}
          >
            {t[mode.nameKey as keyof Translations]}
          </button>
        ))}
      </div>
    </div>
  );
}
