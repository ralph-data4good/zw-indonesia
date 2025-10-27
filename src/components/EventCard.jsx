import { Calendar, MapPin, Clock } from 'lucide-react';
import { format, isSameDay } from 'date-fns';

export default function EventCard({ event }) {
  const startDate = new Date(event.start);
  const endDate = new Date(event.end);
  const isSameDate = isSameDay(startDate, endDate);

  return (
    <div className="card-hover overflow-hidden">
      {/* Image placeholder with date badge */}
      <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/40 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-16 h-16 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        
        {/* Date badge */}
        <div className="absolute top-3 left-3 bg-white rounded-xl px-4 py-3 shadow-lg">
          <div className="text-3xl font-bold text-primary leading-none">
            {format(startDate, 'd')}
          </div>
          <div className="text-xs text-fg-muted font-bold uppercase tracking-wide mt-1">
            {format(startDate, 'MMM')}
          </div>
        </div>
        
        {/* Featured badge */}
        {event.featured && (
          <div className="absolute top-3 right-3">
            <span className="badge-secondary shadow-sm">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
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
            <div>
              <div className="font-medium">
                {isSameDate
                  ? format(startDate, 'MMMM d, yyyy')
                  : `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`
                }
              </div>
              {event.time && (
                <div className="flex items-center gap-1 text-xs mt-1">
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
              <span>{event.city}, {event.country || 'Indonesia'}</span>
            </div>
          )}
        </div>

        {/* Topics */}
        {event.topics && event.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {event.topics.slice(0, 2).map((topic) => (
              <span key={topic} className="chip bg-neutral-100 text-fg-muted">
                {topic}
              </span>
            ))}
            {event.topics.length > 2 && (
              <span className="chip bg-neutral-100 text-fg-muted">
                +{event.topics.length - 2}
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
            className="block w-full text-center px-4 py-2.5 rounded-lg bg-secondary text-white hover:bg-secondary-dark font-semibold text-sm transition-all hover:scale-[1.02] shadow-sm"
          >
            RSVP
          </a>
        )}
      </div>
    </div>
  );
}
