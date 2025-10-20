import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';
import Section from '../components/Section';
import ResourceCard from '../components/ResourceCard';
import CampaignCard from '../components/CampaignCard';
import EventCard from '../components/EventCard';
import Spotlight from '../components/Spotlight';
import { useTranslation } from '../lib/i18n';
import { useCampaigns, useResources, useEvents } from '../lib/useMockData';

export default function Home() {
  const { t } = useTranslation();
  const { data: campaigns } = useCampaigns();
  const { data: resources } = useResources();
  const { data: events } = useEvents();

  const featuredCampaigns = campaigns?.filter(c => c.featured).slice(0, 3) || [];
  const featuredResources = resources?.filter(r => r.featured).slice(0, 6) || [];
  const upcomingEvents = events
    ?.filter(e => new Date(e.start) > new Date())
    .sort((a, b) => new Date(a.start) - new Date(b.start))
    .slice(0, 3) || [];

  return (
    <div>
      <Hero 
        title={t('home.hero.title')}
        subtitle={t('home.hero.subtitle')}
        showLinks={true}
      />

      {/* Featured Campaigns */}
      {featuredCampaigns.length > 0 && (
        <Section
          eyebrow="Take Action"
          title={t('home.featured.campaigns')}
          centered={false}
        >
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {featuredCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
          <div className="text-center">
            <Link to="/campaigns" className="inline-flex items-center gap-2 text-zwa-primary font-semibold hover:text-zwa-primary/80 transition-colors">
              <span>{t('common.viewAll')}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </Section>
      )}

      {/* Featured Resources */}
      {featuredResources.length > 0 && (
        <Section
          eyebrow="Learn"
          title={t('home.featured.resources')}
          centered={false}
          className="bg-gray-50"
        >
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {featuredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} featured={true} />
            ))}
          </div>
          <div className="text-center">
            <Link to="/resources" className="inline-flex items-center gap-2 text-zwa-primary font-semibold hover:text-zwa-primary/80 transition-colors">
              <span>{t('common.viewAll')}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </Section>
      )}

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <Section
          eyebrow="Join Us"
          title={t('home.featured.events')}
          centered={false}
        >
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <div className="text-center">
            <Link to="/events" className="inline-flex items-center gap-2 text-zwa-primary font-semibold hover:text-zwa-primary/80 transition-colors">
              <span>{t('common.viewAll')}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </Section>
      )}

      {/* Spotlight */}
      <Section
        eyebrow="Community"
        title={t('home.spotlight.title')}
        description="Highlighting organizations and initiatives leading the zero waste movement in Indonesia"
        centered={false}
        className="bg-gray-50"
      >
        <Spotlight />
      </Section>

      {/* CTA Row */}
      <Section className="bg-zwa-ink" dark>
        <div className="grid md:grid-cols-3 gap-6">
          <Link to="/about" className="card-dark p-6 hover:border-zwa-primary transition-colors group">
            <h4 className="text-white font-semibold mb-2 group-hover:text-zwa-accent transition-colors">
              {t('home.cta.contribute')}
            </h4>
            <p className="text-zwa-muted text-sm mb-4">
              Share your organization, initiative, or resource with the community
            </p>
            <ArrowRight className="w-5 h-5 text-zwa-accent" aria-hidden="true" />
          </Link>

          <Link to="/campaigns" className="card-dark p-6 hover:border-zwa-primary transition-colors group">
            <h4 className="text-white font-semibold mb-2 group-hover:text-zwa-accent transition-colors">
              {t('home.cta.join')}
            </h4>
            <p className="text-zwa-muted text-sm mb-4">
              Connect with active campaigns and make a real impact in your area
            </p>
            <ArrowRight className="w-5 h-5 text-zwa-accent" aria-hidden="true" />
          </Link>

          <Link to="/calculator" className="card-dark p-6 hover:border-zwa-primary transition-colors group">
            <h4 className="text-white font-semibold mb-2 group-hover:text-zwa-accent transition-colors">
              {t('home.cta.explore')}
            </h4>
            <p className="text-zwa-muted text-sm mb-4">
              Model waste scenarios and understand the impact of diversion programs
            </p>
            <ArrowRight className="w-5 h-5 text-zwa-accent" aria-hidden="true" />
          </Link>
        </div>
      </Section>
    </div>
  );
}

