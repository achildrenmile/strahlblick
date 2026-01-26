import { useI18n } from '../../i18n';
import { useApp } from '../../context/AppContext';
import { Card } from '../shared';
import { generateDistanceTable, formatPowerDensity } from '../../utils/calculations';

export function DistanceTable() {
  const { t } = useI18n();
  const { result, inputs } = useApp();

  if (!result) return null;

  const tableData = generateDistanceTable(result.eirpWatts, inputs.frequency);

  const getRowColor = (complianceRatio: number) => {
    if (complianceRatio <= 1) {
      return 'bg-green-50 dark:bg-green-900/20';
    } else if (complianceRatio <= 5) {
      return 'bg-yellow-50 dark:bg-yellow-900/20';
    }
    return 'bg-red-50 dark:bg-red-900/20';
  };

  return (
    <Card title={t.distanceTable}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm table-fixed">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-2 px-2 font-medium text-gray-700 dark:text-gray-300 w-16">
                {t.distance}
              </th>
              <th className="text-right py-2 px-2 font-medium text-gray-700 dark:text-gray-300 w-28">
                {t.powerDensity}
              </th>
              <th className="text-right py-2 px-2 font-medium text-gray-700 dark:text-gray-300 w-20">
                {t.generalPublic}
              </th>
              <th className="text-right py-2 px-2 font-medium text-gray-700 dark:text-gray-300 w-20">
                {t.occupational}
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr
                key={row.distance}
                className={`
                  border-b border-gray-100 dark:border-gray-700
                  ${getRowColor(row.complianceRatioGeneralPublic)}
                `}
              >
                <td className="py-2 px-2 font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">
                  {row.distance} m
                </td>
                <td className="py-2 px-2 text-right text-gray-700 dark:text-gray-300 whitespace-nowrap">
                  {formatPowerDensity(row.powerDensity)}
                </td>
                <td className="py-2 px-2 text-right">
                  <span className={`
                    font-medium whitespace-nowrap
                    ${row.complianceRatioGeneralPublic <= 1
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                    }
                  `}>
                    {(row.complianceRatioGeneralPublic * 100).toFixed(1)}%
                  </span>
                </td>
                <td className="py-2 px-2 text-right">
                  <span className={`
                    font-medium whitespace-nowrap
                    ${row.complianceRatioOccupational <= 1
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                    }
                  `}>
                    {(row.complianceRatioOccupational * 100).toFixed(1)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
