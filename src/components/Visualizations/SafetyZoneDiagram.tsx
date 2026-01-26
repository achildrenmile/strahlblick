import { useMemo } from 'react';
import { useI18n } from '../../i18n';
import { useApp } from '../../context/AppContext';
import { Card } from '../shared';
import { formatDistance } from '../../utils/calculations';

export function SafetyZoneDiagram() {
  const { t } = useI18n();
  const { result, inputs, theme } = useApp();

  const diagram = useMemo(() => {
    if (!result) return null;

    const width = 400;
    const height = 300;
    const centerX = width / 2;
    const centerY = height / 2;

    // Calculate scale - max radius is the larger safety distance + some margin
    const maxDistance = Math.max(
      result.safetyDistanceGeneralPublic,
      result.safetyDistanceOccupational,
      inputs.evaluationDistance || 0
    );
    const scale = (Math.min(width, height) / 2 - 40) / maxDistance;

    const publicRadius = result.safetyDistanceGeneralPublic * scale;
    const occupationalRadius = result.safetyDistanceOccupational * scale;
    const evalRadius = inputs.evaluationDistance ? inputs.evaluationDistance * scale : 0;

    const isDark = theme === 'dark';

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        {/* Background */}
        <rect
          width={width}
          height={height}
          fill={isDark ? '#1f2937' : '#f9fafb'}
          rx={8}
        />

        {/* Grid circles */}
        {[0.25, 0.5, 0.75, 1].map((fraction) => (
          <circle
            key={fraction}
            cx={centerX}
            cy={centerY}
            r={maxDistance * scale * fraction}
            fill="none"
            stroke={isDark ? '#374151' : '#e5e7eb'}
            strokeWidth={1}
            strokeDasharray="4,4"
          />
        ))}

        {/* General public zone (outer) */}
        <circle
          cx={centerX}
          cy={centerY}
          r={publicRadius}
          fill="#a855f7"
          fillOpacity={0.2}
          stroke="#a855f7"
          strokeWidth={2}
        />

        {/* Occupational zone (inner) */}
        <circle
          cx={centerX}
          cy={centerY}
          r={occupationalRadius}
          fill="#3b82f6"
          fillOpacity={0.3}
          stroke="#3b82f6"
          strokeWidth={2}
        />

        {/* Antenna point */}
        <circle
          cx={centerX}
          cy={centerY}
          r={6}
          fill="#ef4444"
        />

        {/* Evaluation distance marker */}
        {evalRadius > 0 && (
          <>
            <circle
              cx={centerX}
              cy={centerY}
              r={evalRadius}
              fill="none"
              stroke={isDark ? '#f59e0b' : '#d97706'}
              strokeWidth={2}
              strokeDasharray="8,4"
            />
            <circle
              cx={centerX + evalRadius}
              cy={centerY}
              r={4}
              fill={isDark ? '#f59e0b' : '#d97706'}
            />
          </>
        )}

        {/* Labels */}
        <text
          x={centerX}
          y={centerY - publicRadius - 8}
          textAnchor="middle"
          fill="#a855f7"
          fontSize={12}
          fontWeight={500}
        >
          {formatDistance(result.safetyDistanceGeneralPublic)}
        </text>
        <text
          x={centerX}
          y={centerY - occupationalRadius - 8}
          textAnchor="middle"
          fill="#3b82f6"
          fontSize={12}
          fontWeight={500}
        >
          {formatDistance(result.safetyDistanceOccupational)}
        </text>

        {/* Scale label */}
        <text
          x={width - 10}
          y={height - 10}
          textAnchor="end"
          fill={isDark ? '#9ca3af' : '#6b7280'}
          fontSize={10}
        >
          max: {formatDistance(maxDistance)}
        </text>
      </svg>
    );
  }, [result, inputs.evaluationDistance, theme]);

  if (!result) return null;

  return (
    <Card title={t.safetyZones}>
      {diagram}
      <div className="mt-4 flex flex-wrap gap-4 justify-center text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-purple-500" />
          <span className="text-gray-600 dark:text-gray-400">{t.generalPublic}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-500" />
          <span className="text-gray-600 dark:text-gray-400">{t.occupational}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-500" />
          <span className="text-gray-600 dark:text-gray-400">Antenne</span>
        </div>
        {inputs.evaluationDistance && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-amber-500" />
            <span className="text-gray-600 dark:text-gray-400">{t.evaluationDistance}</span>
          </div>
        )}
      </div>
    </Card>
  );
}
