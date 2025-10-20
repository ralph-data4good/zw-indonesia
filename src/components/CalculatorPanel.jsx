import { useTranslation } from '../lib/i18n';
import { formatNumber } from '../lib/utils';

export default function CalculatorPanel({ inputs, onChange, onReset }) {
  const { t } = useTranslation();

  const handleInputChange = (key, value) => {
    onChange({ ...inputs, [key]: value });
  };

  const handleCompositionChange = (key, value) => {
    onChange({
      ...inputs,
      composition: {
        ...inputs.composition,
        [key]: value / 100
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">{t('calc.inputs')}</h3>

        {/* Population */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('calc.population')}
          </label>
          <input
            type="number"
            value={inputs.population}
            onChange={(e) => handleInputChange('population', Number(e.target.value))}
            className="input"
            min="0"
            step="1000000"
          />
          <p className="text-xs text-gray-500 mt-1">
            {formatNumber(inputs.population)} people
          </p>
        </div>

        {/* Waste per capita */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('calc.wgpPerCapita')}
          </label>
          <input
            type="number"
            value={inputs.wgpPerCapita}
            onChange={(e) => handleInputChange('wgpPerCapita', Number(e.target.value))}
            className="input"
            min="0"
            max="5"
            step="0.1"
          />
        </div>

        {/* Current diversion */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('calc.currentDiversion')}
          </label>
          <input
            type="range"
            value={inputs.currentDiversion}
            onChange={(e) => handleInputChange('currentDiversion', Number(e.target.value))}
            className="w-full"
            min="0"
            max="100"
            step="1"
          />
          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>0%</span>
            <span className="font-semibold">{inputs.currentDiversion}%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Target diversion */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('calc.targetDiversion')}
          </label>
          <input
            type="range"
            value={inputs.targetDiversion}
            onChange={(e) => handleInputChange('targetDiversion', Number(e.target.value))}
            className="w-full"
            min="0"
            max="100"
            step="1"
          />
          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>0%</span>
            <span className="font-semibold">{inputs.targetDiversion}%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Composition */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {t('calc.composition')}
          </label>
          <div className="space-y-3">
            {Object.entries(inputs.composition).map(([key, value]) => (
              <div key={key}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="capitalize">{key}</span>
                  <span className="font-medium">{Math.round(value * 100)}%</span>
                </div>
                <input
                  type="range"
                  value={value * 100}
                  onChange={(e) => handleCompositionChange(key, Number(e.target.value))}
                  className="w-full"
                  min="0"
                  max="100"
                  step="1"
                />
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Total: {Math.round(Object.values(inputs.composition).reduce((a, b) => a + b, 0) * 100)}%
          </p>
        </div>

        <button
          onClick={onReset}
          className="btn btn-outline w-full"
        >
          {t('calc.reset')}
        </button>
      </div>
    </div>
  );
}

