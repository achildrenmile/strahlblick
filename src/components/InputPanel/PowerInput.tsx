import { useI18n } from '../../i18n';
import { useApp } from '../../context/AppContext';
import { Input } from '../shared';
import { powerPresets } from '../../data/antennaPresets';

export function PowerInput() {
  const { t } = useI18n();
  const { inputs, updateInput } = useApp();

  return (
    <div className="space-y-3">
      <Input
        label={t.transmitPower}
        type="number"
        min={0}
        max={10000}
        step={1}
        value={inputs.transmitPower}
        onChange={(e) => updateInput('transmitPower', Number(e.target.value))}
        unit={t.transmitPowerUnit}
      />
      <div className="flex flex-wrap gap-2">
        {powerPresets.map((power) => (
          <button
            key={power}
            onClick={() => updateInput('transmitPower', power)}
            className={`
              px-2.5 py-1 text-xs font-medium rounded-md
              transition-colors
              ${inputs.transmitPower === power
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }
            `}
          >
            {power}W
          </button>
        ))}
      </div>
    </div>
  );
}
