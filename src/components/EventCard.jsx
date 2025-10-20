import { Calendar, MapPin, Download } from 'lucide-react';
import Card from './Card';
import { formatDateRange, downloadICS } from '../lib/utils';
import { useTranslation } from '../lib/i18n';

export default function EventCard({ event }) {
  const { t, lang } = useTranslation();

  const handleAddToCalendar = (e) => {
    e.preventDefault();
    e.stopPropagation();
    downloadICS(event);
  };

  return (
    <Card className="p-5 h-full flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-zwa-ink flex-1">
          {event.title}
        </h3>
        {event.featured && (
          <span className="chip chip-accent text-xs">Featured</span>
        )}
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4 text-zwa-primary" aria-hidden="true" />
          <span>{formatDateRange(event.start, event.end, lang)}</span>
        </div>
        
        {event.city && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-zwa-primary" aria-hidden="true" />
            <span>{event.venue ? `${event.venue}, ${event.city}` : event.city}</span>
          </div>
        )}
      </div>
      
      {event.description && (
        <p className="text-sm text-gray-600 mb-4">
          {event.description}
        </p>
      )}
      
      <div className="mt-auto pt-4 border-t border-gray-200 flex gap-2">
        {event.rsvp && (
          <a 
            href={event.rsvp}
            className="btn btn-primary text-sm flex-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('events.rsvp')}
          </a>
        )}
        <button
          onClick={handleAddToCalendar}
          className="btn btn-outline text-sm"
          aria-label={t('events.addToCalendar')}
        >
          <Download className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </Card>
  );
}

