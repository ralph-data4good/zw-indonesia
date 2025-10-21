import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, MapPin } from 'lucide-react';
import { cx } from '../lib/utils';
import { format } from 'date-fns';

export default function EventsCarousel({ events = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!events || events.length === 0) return null;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? events.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === events.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Show current and next 2 events (3 visible at once on desktop)
  const visibleEvents = [
    events[currentIndex],
    events[(currentIndex + 1) % events.length],
    events[(currentIndex + 2) % events.length]
  ];

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div className="overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleEvents.map((event, idx) => {
            if (!event) return null;
            
            const startDate = new Date(event.start);
            const endDate = new Date(event.end);
            const isSameDay = event.start === event.end;

            return (
              <div
                key={`${event.id}-${idx}`}
                className={cx(
                  'bg-white rounded-xl border-2 border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-zwa-primary',
                  idx === 0 && 'md:scale-105 md:border-zwa-primary'
                )}
              >
                {/* Event Image Placeholder */}
                <div className="h-52 bg-gradient-to-br from-zwa-primary to-[#0e3b33] relative overflow-hidden">
                  <div className="absolute inset-0 opacity-15" style={{
                    backgroundImage: `radial-gradient(circle, white 1.5px, transparent 1.5px)`,
                    backgroundSize: '16px 16px'
                  }} />
                  <div className="absolute top-4 left-4 bg-white rounded-xl px-4 py-3 shadow-xl">
                    <div className="text-3xl font-bold text-zwa-primary">
                      {format(startDate, 'd')}
                    </div>
                    <div className="text-xs text-gray-700 font-bold uppercase tracking-wide">
                      {format(startDate, 'MMM')}
                    </div>
                  </div>
                  {event.featured && (
                    <div className="absolute top-4 right-4 bg-zwa-accent text-zwa-ink text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                      Featured
                    </div>
                  )}
                </div>

                {/* Event Content */}
                <div className="p-6">
                  <h3 className="font-bold text-xl text-zwa-ink mb-3 line-clamp-2 leading-snug">
                    {event.title}
                  </h3>
                  
                  <p className="text-sm text-gray-700 mb-5 line-clamp-3 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="space-y-3 text-sm text-gray-700 mb-5">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-zwa-primary flex-shrink-0 mt-0.5" />
                      <span className="font-medium">
                        {isSameDay 
                          ? format(startDate, 'MMMM d, yyyy')
                          : `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`
                        }
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-zwa-primary flex-shrink-0 mt-0.5" />
                      <span className="font-medium">{event.city || 'TBA'}</span>
                    </div>
                  </div>

                  {event.rsvp && (
                    <a
                      href={event.rsvp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary w-full text-sm font-semibold shadow-md hover:shadow-lg transition-shadow"
                    >
                      RSVP
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls */}
      {events.length > 3 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full bg-white shadow-lg hover:bg-zwa-primary hover:text-white transition-all flex items-center justify-center group"
            aria-label="Previous events"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full bg-white shadow-lg hover:bg-zwa-primary hover:text-white transition-all flex items-center justify-center group"
            aria-label="Next events"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cx(
                  'h-2 rounded-full transition-all',
                  index === currentIndex
                    ? 'w-8 bg-zwa-primary'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                )}
                aria-label={`Go to event ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

