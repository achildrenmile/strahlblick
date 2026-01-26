import { AlertTriangle, CheckCircle, XCircle, Zap } from 'lucide-react';
import { useI18n } from '../../i18n';
import { useApp } from '../../context/AppContext';
import { Card, Badge } from '../shared';
import { formatDistance, formatPowerDensity } from '../../utils/calculations';

export function ResultsPanel() {
  const { t } = useI18n();
  const { result, inputs } = useApp();

  if (!result) return null;

  const getComplianceIcon = (isCompliant: boolean) => {
    return isCompliant ? (
      <CheckCircle className="w-5 h-5 text-green-500" />
    ) : (
      <XCircle className="w-5 h-5 text-red-500" />
    );
  };

  const getComplianceBadge = (isCompliant: boolean, ratio: number) => {
    if (isCompliant) {
      return (
        <Badge variant="success">
          {t.compliant} ({(ratio * 100).toFixed(1)}%)
        </Badge>
      );
    }
    return (
      <Badge variant="danger">
        {t.notCompliant} ({(ratio * 100).toFixed(1)}%)
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {t.results}
      </h2>

      {/* EIRP Card */}
      <Card>
        <div className="flex items-start gap-4">
          <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
            <Zap className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 dark:text-gray-100">
              {t.eirp}
            </h3>
            <div className="mt-2 grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {result.eirpWatts.toFixed(1)} W
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {result.eirpDbw.toFixed(1)} dBW
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t.averagePower}
                </p>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {result.averagePowerWatts.toFixed(1)} W
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  ({inputs.dutyCycle}% {t.dutyCycle})
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Safety Distance Card */}
      <Card>
        <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-4">
          {t.safetyDistance}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/30">
            <p className="text-sm text-purple-700 dark:text-purple-300">
              {t.generalPublic}
            </p>
            <p className="text-xl font-bold text-purple-900 dark:text-purple-100">
              {formatDistance(result.safetyDistanceGeneralPublic)}
            </p>
            <p className="text-xs text-purple-600 dark:text-purple-400">
              {t.icnirpLimit}: {result.icnirpLimitGeneralPublic} W/m²
            </p>
          </div>
          <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              {t.occupational}
            </p>
            <p className="text-xl font-bold text-blue-900 dark:text-blue-100">
              {formatDistance(result.safetyDistanceOccupational)}
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400">
              {t.icnirpLimit}: {result.icnirpLimitOccupational} W/m²
            </p>
          </div>
        </div>
      </Card>

      {/* Compliance Card */}
      {inputs.evaluationDistance && (
        <Card>
          <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-4">
            {t.compliance} {t.atDistance} {inputs.evaluationDistance} m
          </h3>

          {result.isNearField && (
            <div className="mb-4 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/30 flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  {t.nearFieldWarning}
                </p>
                <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                  {t.nearFieldBoundary}: {formatDistance(result.nearFieldBoundary)}
                </p>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getComplianceIcon(result.isCompliantGeneralPublic)}
                <span className="text-gray-700 dark:text-gray-300">
                  {t.generalPublic}
                </span>
              </div>
              {getComplianceBadge(result.isCompliantGeneralPublic, result.complianceRatioGeneralPublic)}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getComplianceIcon(result.isCompliantOccupational)}
                <span className="text-gray-700 dark:text-gray-300">
                  {t.occupational}
                </span>
              </div>
              {getComplianceBadge(result.isCompliantOccupational, result.complianceRatioOccupational)}
            </div>
          </div>

          {result.powerDensityAtDistance !== undefined && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t.powerDensityAt} {inputs.evaluationDistance} m:
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {formatPowerDensity(result.powerDensityAtDistance)}
              </p>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
