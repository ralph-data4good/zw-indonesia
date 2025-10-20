import { useTranslation } from '../lib/i18n';
import { useEvents as useMockEvents } from '../lib/useMockData';
import { formatDate } from '../lib/utils';
import Section from '../components/Section';
import EventCard from '../components/EventCard';

export default function Events() {
  const { t, lang } = useTranslation();
  const { data: events, loading } = useMockEvents();

  const now = new Date();
  
  const upcoming = events
    ?.filter(e => new Date(e.start) > now)
    .sort((a, b) => new Date(a.start) - new Date(b.start)) || [];
  
  const past = events
    ?.filter(e => new Date(e.start) <= now)
    .sort((a, b) => new Date(b.start) - new Date(a.start)) || [];

  // Group upcoming events by month
  const groupedUpcoming = upcoming.reduce((acc, event) => {
    const date = new Date(event.start);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const monthLabel = new Intl.DateTimeFormat(lang === 'id' ? 'id-ID' : 'en-US', {
      year: 'numeric',
      month: 'long'
    }).format(date);
    
    if (!acc[monthKey]) {
      acc[monthKey] = { label: monthLabel, events: [] };
    }
    acc[monthKey].events.push(event);
    return acc;
  }, {});

  return (
    <div>
      <Section
        eyebrow="Community"
        title={t('events.title')}
        description="Join workshops, conferences, clean-ups, and gatherings advancing zero waste in Indonesia"
        centered={true}
      >
        {/* Upcoming events */}
        {upcoming.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-8">{t('events.upcoming')}</h3>
            {Object.entries(groupedUpcoming).map(([monthKey, group]) => (
              <div key={monthKey} className="mb-12">
                <h4 className="text-lg font-medium text-zwa-primary mb-4">
                  {group.label}
                </h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.events.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Past events */}
        {past.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold mb-6">{t('events.past')}</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {past.slice(0, 6).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        {loading && (
          <p className="text-gray-500 text-center py-12">{t('common.loading')}</p>
        )}

        {!loading && events?.length === 0 && (
          <p className="text-gray-500 text-center py-12">No events found</p>
        )}
      </Section>
    </div>
  );
}

