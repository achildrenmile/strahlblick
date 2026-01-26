import { Plus, Trash2, AlertTriangle, CheckCircle } from 'lucide-react';
import { useI18n } from '../../i18n';
import { useApp } from '../../context/AppContext';
import { Card, Button, Input, Select, Badge } from '../shared';
import { frequencyBands } from '../../data/frequencyBands';
import { antennaPresets } from '../../data/antennaPresets';
import { modePresets } from '../../data/modePresets';
import { calculateCumulativeExposure } from '../../utils/calculations';
import { Translations } from '../../i18n/translations';

export function MultiBandPanel() {
  const { t } = useI18n();
  const {
    multiBandConfigs,
    addBandConfig,
    removeBandConfig,
    updateBandConfig,
    showMultiBand,
    setShowMultiBand,
    inputs,
  } = useApp();

  // Calculate cumulative exposure
  const cumulativeResult = multiBandConfigs.length > 0 && inputs.evaluationDistance
    ? calculateCumulativeExposure(
        multiBandConfigs.filter(c => c.result).map(c => c.result!),
        inputs.evaluationDistance
      )
    : null;

  const bandOptions = frequencyBands.map((band) => ({
    value: band.id,
    label: `${band.wavelength} (${band.frequency} MHz)`,
  }));

  if (!showMultiBand) {
    return (
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100">
              {t.multiBand}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t.cumulativeRatio}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setShowMultiBand(true);
              if (multiBandConfigs.length === 0) {
                addBandConfig();
              }
            }}
            icon={<Plus className="w-4 h-4" />}
          >
            {t.addBand}
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900 dark:text-gray-100">
            {t.multiBand}
          </h3>
          <Button
            variant="primary"
            size="sm"
            onClick={addBandConfig}
            icon={<Plus className="w-4 h-4" />}
          >
            {t.addBand}
          </Button>
        </div>

        {/* Band configurations */}
        <div className="space-y-4">
          {multiBandConfigs.map((config, index) => (
            <div
              key={config.id}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {t.band} {index + 1}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeBandConfig(config.id)}
                  icon={<Trash2 className="w-4 h-4 text-red-500" />}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Select
                  label={t.frequency}
                  options={bandOptions}
                  value={frequencyBands.find(
                    b => Math.abs(b.frequency - config.inputs.frequency) / b.frequency < 0.1
                  )?.id || ''}
                  onChange={(e) => {
                    const band = frequencyBands.find(b => b.id === e.target.value);
                    if (band) {
                      updateBandConfig(config.id, { frequency: band.frequency });
                    }
                  }}
                />
                <Input
                  label={t.transmitPower}
                  type="number"
                  min={1}
                  max={10000}
                  value={config.inputs.transmitPower}
                  onChange={(e) => updateBandConfig(config.id, { transmitPower: Number(e.target.value) })}
                  unit="W"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Select
                  label={t.modePresets}
                  options={modePresets.map(m => ({
                    value: m.id,
                    label: `${t[m.nameKey as keyof Translations]} (${m.dutyCycle}%)`
                  }))}
                  value={modePresets.find(m => m.dutyCycle === config.inputs.dutyCycle)?.id || ''}
                  onChange={(e) => {
                    const mode = modePresets.find(m => m.id === e.target.value);
                    if (mode) {
                      updateBandConfig(config.id, { dutyCycle: mode.dutyCycle });
                    }
                  }}
                />
                <Select
                  label={t.antennaPresets}
                  options={antennaPresets.map(a => ({
                    value: a.id,
                    label: `${t[a.nameKey as keyof Translations]} (${a.gain >= 0 ? '+' : ''}${a.gain} dBi)`
                  }))}
                  value={antennaPresets.find(a => Math.abs(a.gain - config.inputs.antennaGain) < 0.1)?.id || ''}
                  onChange={(e) => {
                    const antenna = antennaPresets.find(a => a.id === e.target.value);
                    if (antenna) {
                      updateBandConfig(config.id, { antennaGain: antenna.gain });
                    }
                  }}
                />
              </div>

              {config.result && (
                <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    EIRP: {config.result.eirpWatts.toFixed(1)} W |
                    {t.complianceRatio}: {(config.result.complianceRatioGeneralPublic * 100).toFixed(1)}%
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Cumulative result */}
        {cumulativeResult && (
          <div className={`
            p-4 rounded-lg
            ${cumulativeResult.isCompliantGeneralPublic
              ? 'bg-green-50 dark:bg-green-900/30'
              : 'bg-red-50 dark:bg-red-900/30'
            }
          `}>
            <div className="flex items-center gap-2 mb-2">
              {cumulativeResult.isCompliantGeneralPublic ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-red-500" />
              )}
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {t.totalExposure}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t.generalPublic}</p>
                <Badge
                  variant={cumulativeResult.isCompliantGeneralPublic ? 'success' : 'danger'}
                >
                  {(cumulativeResult.totalRatioGeneralPublic * 100).toFixed(1)}%
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t.occupational}</p>
                <Badge
                  variant={cumulativeResult.isCompliantOccupational ? 'success' : 'danger'}
                >
                  {(cumulativeResult.totalRatioOccupational * 100).toFixed(1)}%
                </Badge>
              </div>
            </div>
          </div>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowMultiBand(false)}
          className="w-full"
        >
          {t.collapse}
        </Button>
      </div>
    </Card>
  );
}
