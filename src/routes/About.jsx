import { Mail, ExternalLink } from 'lucide-react';
import { useTranslation } from '../lib/i18n';
import Section from '../components/Section';

export default function About() {
  const { t } = useTranslation();

  return (
    <div>
      <Section
        eyebrow="Learn More"
        title={t('about.title')}
        centered={true}
      >
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <h3>What is Zero Waste Indonesia?</h3>
            <p>
              Zero Waste Indonesia is a country-level microsite within the Zero Waste Asia network, 
              connecting communities, organizations, resources, and initiatives working toward a 
              waste-free future across the Indonesian archipelago.
            </p>

            <h3>Our Mission</h3>
            <p>
              We aim to accelerate the zero waste transition by making it easier for citizens, 
              policymakers, businesses, and civil society to:
            </p>
            <ul>
              <li>Discover and connect with local zero waste initiatives</li>
              <li>Access reliable resources, toolkits, and research</li>
              <li>Join active campaigns and events</li>
              <li>Model waste scenarios and understand impact potential</li>
              <li>Share knowledge and best practices across regions</li>
            </ul>

            <h3>Data Sources & Methodology</h3>
            <p>
              Directory entries, resources, and baseline data are compiled from:
            </p>
            <ul>
              <li>Community submissions and verifications</li>
              <li>Partner organizations (NGOs, government agencies, academic institutions)</li>
              <li>Published reports and open datasets</li>
              <li>On-the-ground surveys and audits</li>
            </ul>

            <h3>Contributing</h3>
            <p>
              Zero Waste Indonesia thrives on community participation. If you&apos;d like to:
            </p>
            <ul>
              <li>Add your organization or initiative to the directory</li>
              <li>Share a resource, toolkit, or case study</li>
              <li>Report an error or update existing data</li>
              <li>Partner with us on campaigns or events</li>
            </ul>
            <p>
              Please reach out via the contact form below or email us directly.
            </p>

            <div className="mt-12 p-6 bg-zwa-primary-ink rounded-2xl text-white">
              <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5" aria-hidden="true" />
                {t('footer.contact')}
              </h4>
              <p className="mb-4">
                For inquiries, partnerships, or data submissions:
              </p>
              <a
                href="mailto:indonesia@zerowaste.asia"
                className="inline-flex items-center gap-2 text-zwa-accent hover:text-white font-medium transition-colors"
              >
                <span>indonesia@zerowaste.asia</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            <div className="mt-8 p-6 bg-gray-50 rounded-2xl">
              <h4 className="text-lg font-semibold mb-2">{t('about.credits')}</h4>
              <p className="text-sm text-gray-600">
                This microsite is part of the <strong>Zero Waste Asia</strong> network, 
                developed and maintained by <strong>GAIA Asia Pacific</strong> in collaboration 
                with local partners, community organizations, and volunteers across Indonesia.
              </p>
              <p className="text-sm text-gray-600 mt-4">
                Special thanks to all the organizations, initiatives, and individuals who 
                have contributed data, resources, and insights to make this platform possible.
              </p>
            </div>

            <div className="mt-8 text-center">
              <a
                href="https://www.no-burn.org/gaia-asia-pacific/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-zwa-primary hover:text-zwa-primary/80 font-medium transition-colors"
              >
                <span>Visit GAIA Asia Pacific</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

