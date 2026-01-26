import { RotateCcw } from 'lucide-react';
import { useI18n } from '../../i18n';
import { useApp } from '../../context/AppContext';
import { Card, Button } from '../shared';
import { PowerInput } from './PowerInput';
import { DutyCycleInput } from './DutyCycleInput';
import { FrequencyInput } from './FrequencyInput';
import { AntennaInput } from './AntennaInput';
import { DistanceInput } from './DistanceInput';
import { ScenarioSelector } from '../PresetSelector/ScenarioSelector';

export function InputPanel() {
  const { t } = useI18n();
  const { resetInputs } = useApp();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {t.presets}
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={resetInputs}
          icon={<RotateCcw className="w-4 h-4" />}
        >
          {t.reset}
        </Button>
      </div>

      <ScenarioSelector />

      <Card>
        <div className="space-y-6">
          <PowerInput />
          <DutyCycleInput />
          <FrequencyInput />
          <AntennaInput />
          <DistanceInput />
        </div>
      </Card>
    </div>
  );
}
