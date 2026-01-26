import { BookOpen, Zap, Radio, Shield, Clock, Calculator } from 'lucide-react';
import { useI18n } from '../../i18n';
import { Collapsible } from '../shared';

export function EducationalContent() {
  const { t } = useI18n();

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
        <BookOpen className="w-5 h-5" />
        {t.education}
      </h2>

      <Collapsible
        title={t.whatIsEirp}
        icon={<Zap className="w-4 h-4 text-yellow-500" />}
      >
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {t.whatIsEirpContent}
        </p>
        <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-md font-mono text-sm">
          {t.formulaEirp}
        </div>
      </Collapsible>

      <Collapsible
        title={t.nearVsFarField}
        icon={<Radio className="w-4 h-4 text-blue-500" />}
      >
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {t.nearVsFarFieldContent}
        </p>
        <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-md font-mono text-sm">
          d_nf = 2D² / λ
        </div>
      </Collapsible>

      <Collapsible
        title={t.icnirpGuidelines}
        icon={<Shield className="w-4 h-4 text-green-500" />}
      >
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {t.icnirpGuidelinesContent}
        </p>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-600">
                <th className="text-left py-2 px-2">{t.frequency}</th>
                <th className="text-right py-2 px-2">{t.generalPublic}</th>
                <th className="text-right py-2 px-2">{t.occupational}</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-gray-400">
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <td className="py-2 px-2">10–400 MHz</td>
                <td className="text-right py-2 px-2">2 W/m²</td>
                <td className="text-right py-2 px-2">10 W/m²</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <td className="py-2 px-2">400–2000 MHz</td>
                <td className="text-right py-2 px-2">f/200 W/m²</td>
                <td className="text-right py-2 px-2">f/40 W/m²</td>
              </tr>
              <tr>
                <td className="py-2 px-2">&gt;2000 MHz</td>
                <td className="text-right py-2 px-2">10 W/m²</td>
                <td className="text-right py-2 px-2">50 W/m²</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Collapsible>

      <Collapsible
        title={t.dutyCycleImportance}
        icon={<Clock className="w-4 h-4 text-orange-500" />}
      >
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {t.dutyCycleImportanceContent}
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
          <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
            <span className="font-medium">CW:</span> ~40%
          </div>
          <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
            <span className="font-medium">SSB:</span> ~20%
          </div>
          <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
            <span className="font-medium">FM:</span> 100%
          </div>
          <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
            <span className="font-medium">FT8:</span> ~50%
          </div>
        </div>
      </Collapsible>

      <Collapsible
        title={t.safetyMeasures}
        icon={<Shield className="w-4 h-4 text-red-500" />}
      >
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {t.safetyMeasuresContent}
        </p>
      </Collapsible>

      <Collapsible
        title={t.formulas}
        icon={<Calculator className="w-4 h-4 text-purple-500" />}
      >
        <div className="space-y-3 text-sm">
          <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
            <p className="font-medium text-gray-900 dark:text-gray-100 mb-1">EIRP:</p>
            <code className="font-mono">{t.formulaEirp}</code>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
            <p className="font-medium text-gray-900 dark:text-gray-100 mb-1">{t.powerDensity}:</p>
            <code className="font-mono">{t.formulaPowerDensity}</code>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
            <p className="font-medium text-gray-900 dark:text-gray-100 mb-1">{t.safetyDistance}:</p>
            <code className="font-mono">{t.formulaSafetyDistance}</code>
          </div>
        </div>
      </Collapsible>
    </div>
  );
}
