import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';
import Section from '../components/Section';
import ResourceCard from '../components/ResourceCard';
import CampaignCard from '../components/CampaignCard';
import EventsCarousel from '../components/EventsCarousel';
import Spotlight from '../components/Spotlight';
import { useTranslation } from '../lib/i18n';
import { useCampaigns, useResources, useEvents, useOrganizations, useInitiatives } from '../lib/useMockData';

export default function Home() {
  const { t } = useTranslation();
  const { data: campaigns, loading: loadingCampaigns, error: campaignsError } = useCampaigns();
  const { data: resources, loading: loadingResources, error: resourcesError } = useResources();
  const { data: events, loading: loadingEvents, error: eventsError } = useEvents();
  const { data: organizations } = useOrganizations();
  const { data: initiatives } = useInitiatives();

  const featuredCampaignsRaw = (campaigns || []).filter((c) => c.featured);
  const featuredResourcesRaw = (resources || []).filter((r) => r.featured);

  const featuredCampaigns = (featuredCampaignsRaw.length > 0
    ? featuredCampaignsRaw
    : (campaigns || [])).slice(0, 3);

  const featuredResources = (featuredResourcesRaw.length > 0
    ? featuredResourcesRaw
    : (resources || [])).slice(0, 6);

  const upcomingEvents = (events || [])
    .filter((e) => new Date(e.start) > new Date())
    .sort((a, b) => new Date(a.start) - new Date(b.start))
    .slice(0, 3);

  return (
    <div>
      {/* 1. Hero */}
      <Hero 
        title={t('home.hero.title')}
        subtitle={t('home.hero.subtitle')}
        showLinks={true}
      />

      {/* 2. Take Action - Featured Campaigns */}
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
          {(loadingCampaigns || campaignsError) && (
            <p className="text-xs text-gray-500 mt-4">{loadingCampaigns ? 'Loading…' : `Error: ${campaignsError}`}</p>
          )}
        </Section>
      )}

      {/* 3. Community Spotlight - Waste Picker Groups (with photos) */}
      {initiatives && initiatives.length > 0 && (
        <Section
          eyebrow="Community Spotlight"
          title="Waste Picker Groups & Initiatives"
          description="On-the-ground, human-interest stories from waste pickers and community groups"
          centered={false}
          className="bg-gray-50"
        >
          <Spotlight items={initiatives.slice(0, 3)} type="initiative" />
        </Section>
      )}

      {/* 4. Join Us - Upcoming Events (Carousel) */}
      {upcomingEvents.length > 0 && (
        <Section
          eyebrow="Join Us"
          title={t('home.featured.events')}
          description="Workshops, conferences, clean-ups, and gatherings advancing zero waste in Indonesia"
          centered={false}
        >
          <EventsCarousel events={upcomingEvents} />
          <div className="text-center mt-10">
            <Link 
              to="/events" 
              className="inline-flex items-center gap-2 btn btn-primary text-base px-8 py-3"
            >
              <span>See More Events</span>
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </div>
          {(loadingEvents || eventsError) && (
            <p className="text-xs text-gray-500 mt-4">{loadingEvents ? 'Loading…' : `Error: ${eventsError}`}</p>
          )}
        </Section>
      )}

      {/* 5. Community Impact - Grassroots Initiatives (text-based) */}
      {initiatives && initiatives.length > 0 && (
        <Section
          eyebrow="Community Impact"
          title="Grassroots Initiatives"
          description="Innovative solutions and community-led projects transforming waste management"
          centered={false}
          className="bg-gray-50"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initiatives.slice(0, 3).map((initiative) => (
              <div key={initiative.id} className="bg-white rounded-xl p-7 border-2 border-gray-200 hover:border-zwa-primary hover:shadow-lg transition-all group">
                <h4 className="font-bold text-xl text-zwa-ink mb-3 group-hover:text-zwa-primary transition-colors leading-snug">{initiative.title}</h4>
                <p className="text-base text-gray-700 mb-4 leading-relaxed">{initiative.summary}</p>
                {initiative.topics && initiative.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {initiative.topics.map((topic) => (
                      <span key={topic} className="chip bg-zwa-surface/50 text-zwa-ink text-xs font-medium border border-gray-200">
                        {topic}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* 6. Learn - Featured Resources */}
      {featuredResources.length > 0 && (
        <Section
          eyebrow="Learn"
          title={t('home.featured.resources')}
          description="Reports, guides, toolkits, and research supporting zero waste initiatives"
          centered={false}
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
          {(loadingResources || resourcesError) && (
            <p className="text-xs text-gray-500 mt-4">{loadingResources ? 'Loading…' : `Error: ${resourcesError}`}</p>
          )}
        </Section>
      )}

      {/* 7. Leadership - Partner Organizations */}
      {organizations && organizations.length > 0 && (
        <Section
          eyebrow="Leadership"
          title="Partner Organizations"
          description="Established organizations driving systemic change in Indonesia's zero waste movement"
          centered={false}
          className="bg-gray-50"
        >
          <Spotlight items={organizations.filter(org => org.status_badge === 'verified').slice(0, 3)} type="organization" />
        </Section>
      )}

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

