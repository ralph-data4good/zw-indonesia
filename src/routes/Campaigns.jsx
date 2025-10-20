import { useTranslation } from '../lib/i18n';
import { useCampaigns as useMockCampaigns } from '../lib/useMockData';
import Section from '../components/Section';
import CampaignCard from '../components/CampaignCard';

export default function Campaigns() {
  const { t } = useTranslation();
  const { data: campaigns, loading } = useMockCampaigns();

  const featured = campaigns?.filter(c => c.featured) || [];
  const active = campaigns?.filter(c => c.status === 'active' && !c.featured) || [];
  const upcoming = campaigns?.filter(c => c.status === 'upcoming') || [];
  const past = campaigns?.filter(c => c.status === 'completed') || [];

  return (
    <div>
      <Section
        eyebrow="Get Involved"
        title={t('campaigns.title')}
        description="Join active campaigns across Indonesia working toward a zero waste future"
        centered={true}
      >
        {/* Featured campaigns */}
        {featured.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-6">{t('campaigns.featured')}</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          </div>
        )}

        {/* Active campaigns */}
        {active.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-6">Active Campaigns</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {active.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          </div>
        )}

        {/* Upcoming campaigns */}
        {upcoming.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-6">Upcoming Campaigns</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcoming.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          </div>
        )}

        {/* Past campaigns */}
        {past.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold mb-6">Past Campaigns</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {past.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          </div>
        )}

        {loading && (
          <p className="text-gray-500 text-center py-12">{t('common.loading')}</p>
        )}

        {!loading && campaigns?.length === 0 && (
          <p className="text-gray-500 text-center py-12">No campaigns found</p>
        )}
      </Section>
    </div>
  );
}

