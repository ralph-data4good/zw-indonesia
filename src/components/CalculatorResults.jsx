import { Share2, Download } from 'lucide-react';
import { useTranslation } from '../lib/i18n';
import { formatNumber, copyToClipboard, downloadJSON, buildQueryString } from '../lib/utils';

export default function CalculatorResults({ results, inputs, onShare }) {
  const { t } = useTranslation();

  const handleShare = async () => {
    const params = buildQueryString({
      pop: inputs.population,
      wgp: inputs.wgpPerCapita,
      target: inputs.targetDiversion
    });
    const url = `${window.location.origin}${window.location.pathname}${params}`;
    const success = await copyToClipboard(url);
    if (success && onShare) {
      onShare();
    }
  };

  const handleDownload = () => {
    downloadJSON({
      inputs,
      results,
      timestamp: new Date().toISOString()
    }, 'waste-calculator-results.json');
  };

  const diversionPercentage = (results.diverted / results.totalWaste) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{t('calc.results')}</h3>
        <div className="flex gap-2">
          <button
            onClick={handleShare}
            className="btn btn-outline text-sm"
            title={t('calc.share')}
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleDownload}
            className="btn btn-outline text-sm"
            title={t('calc.download')}
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Total waste generated */}
      <div className="card p-6">
        <p className="text-sm text-gray-600 mb-2">{t('calc.generated')}</p>
        <p className="text-4xl font-bold text-zwa-ink mb-1">
          {formatNumber(results.totalWaste, 0)}
        </p>
        <p className="text-sm text-gray-500">tonnes per year</p>
      </div>

      {/* Diversion breakdown */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-zwa-primary mb-1">
              {t('calc.diverted')}
            </p>
            <p className="text-2xl font-bold text-zwa-primary">
              {formatNumber(results.diverted, 0)} t
            </p>
          </div>
          <div className="flex-1 text-right">
            <p className="text-sm font-medium text-gray-600 mb-1">
              {t('calc.disposed')}
            </p>
            <p className="text-2xl font-bold text-gray-600">
              {formatNumber(results.disposed, 0)} t
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-zwa-primary to-zwa-accent rounded-full transition-all duration-500"
            style={{ width: `${Math.min(diversionPercentage, 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-600 mt-2">
          <span>Diversion rate</span>
          <span className="font-semibold">{formatNumber(diversionPercentage, 1)}%</span>
        </div>
      </div>

      {/* Emissions avoided */}
      <div className="card p-6">
        <p className="text-sm text-gray-600 mb-2">{t('calc.emissions')}</p>
        <p className="text-3xl font-bold text-zwa-accent mb-1">
          {formatNumber(results.emissions, 0)}
        </p>
        <p className="text-sm text-gray-500">
          tonnes CO₂e avoided annually
        </p>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-600">
            Equivalent to taking{' '}
            <span className="font-semibold text-zwa-ink">
              {formatNumber(results.emissions / 4.6, 0)}
            </span>
            {' '}cars off the road for a year
          </p>
        </div>
      </div>

      {/* Jobs created */}
      <div className="card p-6">
        <p className="text-sm text-gray-600 mb-2">{t('calc.jobs')}</p>
        <p className="text-3xl font-bold text-zwa-primary mb-1">
          {formatNumber(results.jobs, 0)}
        </p>
        <p className="text-sm text-gray-500">
          jobs in waste management sector
        </p>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-600">
            Based on international coefficients for composting, recycling, and reuse operations
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-gray-50 rounded-xl p-4">
        <p className="text-xs text-gray-600">
          <strong>Note:</strong> These calculations are estimates based on international factors and regional data. 
          Actual results may vary based on local conditions, infrastructure, and program implementation.
        </p>
      </div>
    </div>
  );
}

