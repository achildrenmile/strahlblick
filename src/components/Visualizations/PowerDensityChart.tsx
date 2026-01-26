import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import { useI18n } from '../../i18n';
import { useApp } from '../../context/AppContext';
import { Card } from '../shared';
import { calculatePowerDensity } from '../../utils/calculations';

export function PowerDensityChart() {
  const { t } = useI18n();
  const { result, inputs, theme } = useApp();

  const chartData = useMemo(() => {
    if (!result) return [];

    const distances = [];
    for (let d = 0.5; d <= 30; d += 0.5) {
      distances.push(d);
    }

    return distances.map((distance) => ({
      distance,
      powerDensity: calculatePowerDensity(result.eirpWatts, distance),
    }));
  }, [result]);

  if (!result) return null;

  const isDark = theme === 'dark';

  return (
    <Card title={t.powerDensityChart}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? '#374151' : '#e5e7eb'}
          />
          <XAxis
            dataKey="distance"
            label={{
              value: `${t.distance} (m)`,
              position: 'bottom',
              offset: 0,
              fill: isDark ? '#9ca3af' : '#6b7280',
            }}
            tick={{ fill: isDark ? '#9ca3af' : '#6b7280' }}
            stroke={isDark ? '#4b5563' : '#d1d5db'}
          />
          <YAxis
            scale="log"
            domain={['auto', 'auto']}
            label={{
              value: 'W/m²',
              angle: -90,
              position: 'insideLeft',
              fill: isDark ? '#9ca3af' : '#6b7280',
            }}
            tick={{ fill: isDark ? '#9ca3af' : '#6b7280' }}
            stroke={isDark ? '#4b5563' : '#d1d5db'}
            tickFormatter={(value) => value.toFixed(2)}
          />
          <Tooltip
            formatter={(value: number) => [`${value.toFixed(3)} W/m²`, t.powerDensity]}
            labelFormatter={(label) => `${label} m`}
            contentStyle={{
              backgroundColor: isDark ? '#1f2937' : '#ffffff',
              border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
              borderRadius: '0.375rem',
              color: isDark ? '#f3f4f6' : '#111827',
            }}
          />
          <Legend
            wrapperStyle={{
              color: isDark ? '#9ca3af' : '#6b7280',
            }}
          />

          {/* ICNIRP limit lines */}
          <ReferenceLine
            y={result.icnirpLimitGeneralPublic}
            stroke="#a855f7"
            strokeDasharray="5 5"
            label={{
              value: t.generalPublic,
              position: 'right',
              fill: '#a855f7',
              fontSize: 10,
            }}
          />
          <ReferenceLine
            y={result.icnirpLimitOccupational}
            stroke="#3b82f6"
            strokeDasharray="5 5"
            label={{
              value: t.occupational,
              position: 'right',
              fill: '#3b82f6',
              fontSize: 10,
            }}
          />

          {/* Evaluation distance marker */}
          {inputs.evaluationDistance && (
            <ReferenceLine
              x={inputs.evaluationDistance}
              stroke="#f59e0b"
              strokeDasharray="3 3"
            />
          )}

          <Line
            type="monotone"
            dataKey="powerDensity"
            stroke="#ef4444"
            strokeWidth={2}
            dot={false}
            name={t.powerDensity}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
