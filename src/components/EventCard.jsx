import { Calendar, MapPin, Clock } from 'lucide-react';
import { format, isSameDay } from 'date-fns';

export default function EventCard({ event }) {
  const startDate = new Date(event.start);
  const endDate = new Date(event.end);
  const isSameDate = isSameDay(startDate, endDate);

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 overflow-hidden">
      {/* Image placeholder with date badge */}
      <div className="h-48 bg-gradient-to-br from-primary/10 via-neutral-50 to-blue-100 relative overflow-hidden">
        {/* Calendar icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-20 h-20 text-primary/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        
        {/* Date badge - top left */}
        <div className="absolute top-3 left-3 bg-white rounded-xl px-4 py-3 shadow-lg border border-neutral-200">
          <div className="text-3xl font-bold text-primary leading-none">
            {format(startDate, 'd')}
          </div>
          <div className="text-xs text-fg-muted font-bold uppercase tracking-wider mt-1">
            {format(startDate, 'MMM')}
          </div>
        </div>
        
        {/* Featured badge - top right */}
        {event.featured && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-secondary text-white shadow-md">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-bold text-lg text-fg mb-2 line-clamp-2 leading-tight">
          {event.title}
        </h3>

        <p className="text-sm text-fg-muted mb-4 line-clamp-3 leading-relaxed">
          {event.description}
        </p>

        {/* Event details */}
        <div className="space-y-2 mb-4">
          {/* Date & Time */}
          <div className="flex items-start gap-2 text-sm text-fg-muted">
            <Calendar className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="font-semibold text-fg">
                {isSameDate
                  ? format(startDate, 'MMMM d, yyyy')
                  : `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`
                }
              </div>
              {event.time && (
                <div className="flex items-center gap-1 text-xs text-fg-muted mt-1">
                  <Clock className="w-3 h-3" />
                  <span>{event.time}</span>
                </div>
              )}
            </div>
          </div>

          {/* Location */}
          {event.city && (
            <div className="flex items-center gap-2 text-sm text-fg-muted">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="font-medium">{event.city}, {event.country || 'Indonesia'}</span>
            </div>
          )}
        </div>

        {/* Topics */}
        {event.topics && event.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-border">
            {event.topics.slice(0, 2).map((topic) => (
              <span key={topic} className="chip bg-blue-50 text-primary border border-blue-200">
                {topic}
              </span>
            ))}
            {event.topics.length > 2 && (
              <span className="chip bg-neutral-100 text-fg-muted">
                +{event.topics.length - 2} more
              </span>
            )}
          </div>
        )}

        {/* RSVP button */}
        {event.rsvp && (
          <a
            href={event.rsvp}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center px-4 py-3 rounded-lg bg-secondary text-white hover:bg-secondary-dark font-semibold text-sm transition-all hover:scale-[1.02] shadow-sm"
          >
            RSVP
          </a>
        )}
      </div>
    </div>
  );
}
