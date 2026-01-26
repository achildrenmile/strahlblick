import { useI18n } from '../../i18n';
import { useApp } from '../../context/AppContext';
import { scenarioPresets } from '../../data/scenarioPresets';
import { Translations } from '../../i18n/translations';

export function ScenarioSelector() {
  const { t } = useI18n();
  const { setInputs, inputs } = useApp();

  const handleScenarioSelect = (scenarioId: string) => {
    const scenario = scenarioPresets.find((s) => s.id === scenarioId);
    if (scenario && scenario.inputs) {
      setInputs({
        ...inputs,
        ...scenario.inputs,
      });
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {t.scenarioPresets}
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {scenarioPresets.map((scenario) => (
          <button
            key={scenario.id}
            onClick={() => handleScenarioSelect(scenario.id)}
            className="
              p-3 text-left rounded-lg border
              bg-white dark:bg-gray-800
              border-gray-200 dark:border-gray-700
              hover:border-blue-500 dark:hover:border-blue-400
              hover:bg-blue-50 dark:hover:bg-blue-900/20
              transition-colors
            "
          >
            <div className="font-medium text-sm text-gray-900 dark:text-gray-100">
              {t[scenario.nameKey as keyof Translations]}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {t[scenario.descriptionKey as keyof Translations]}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
