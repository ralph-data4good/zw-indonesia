import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from '../lib/i18n';
import { useCalculatorConfig } from '../lib/useMockData';
import { calculateResults } from '../lib/calc';
import Section from '../components/Section';
import CalculatorPanel from '../components/CalculatorPanel';
import CalculatorResults from '../components/CalculatorResults';

export default function Calculator() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const { data: config } = useCalculatorConfig();

  const [inputs, setInputs] = useState(null);
  const [results, setResults] = useState(null);
  const [shareNotification, setShareNotification] = useState(false);

  // Initialize inputs from config or URL params
  useEffect(() => {
    if (!config) return;

    const urlPop = searchParams.get('pop');
    const urlWgp = searchParams.get('wgp');
    const urlTarget = searchParams.get('target');

    setInputs({
      population: urlPop ? Number(urlPop) : config.defaults.population,
      wgpPerCapita: urlWgp ? Number(urlWgp) : config.defaults.wgp_per_capita,
      currentDiversion: config.defaults.baseline_diversion * 100,
      targetDiversion: urlTarget ? Number(urlTarget) : config.defaults.baseline_diversion * 100,
      composition: { ...config.defaults.composition }
    });
  }, [config, searchParams]);

  // Calculate results when inputs change
  useEffect(() => {
    if (!inputs || !config) return;
    const newResults = calculateResults(inputs, config);
    setResults(newResults);
  }, [inputs, config]);

  const handleReset = () => {
    if (!config) return;
    setInputs({
      population: config.defaults.population,
      wgpPerCapita: config.defaults.wgp_per_capita,
      currentDiversion: config.defaults.baseline_diversion * 100,
      targetDiversion: config.defaults.baseline_diversion * 100,
      composition: { ...config.defaults.composition }
    });
  };

  const handleShare = () => {
    setShareNotification(true);
    setTimeout(() => setShareNotification(false), 3000);
  };

  if (!inputs || !results) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500">{t('common.loading')}</p>
      </div>
    );
  }

  return (
    <div>
      <Section
        eyebrow="Model & Analyze"
        title={t('calc.title')}
        description="Estimate the impact of waste diversion programs using Indonesian baseline data"
        centered={true}
        className="pb-0"
      />

      <div className="container-custom py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Inputs */}
          <div className="card p-6">
            <CalculatorPanel
              inputs={inputs}
              onChange={setInputs}
              onReset={handleReset}
            />
          </div>

          {/* Right: Results */}
          <div className="card p-6">
            <CalculatorResults
              results={results}
              inputs={inputs}
              onShare={handleShare}
            />
          </div>
        </div>

        {/* Share notification */}
        {shareNotification && (
          <div className="fixed bottom-8 right-8 bg-zwa-primary text-white px-6 py-3 rounded-xl shadow-lg animate-fade-in">
            Link copied to clipboard!
          </div>
        )}
      </div>
    </div>
  );
}

