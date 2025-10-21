import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, MapPin } from 'lucide-react';
import { cx } from '../lib/utils';

export default function Spotlight({ items = [], type = 'mixed' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Format items with type if not already formatted
  const formattedItems = items.map(item => {
    if (item.type && item.data) return item; // Already formatted
    return {
      type: type === 'mixed' ? (item.entry_type || item.type || 'organization') : type,
      data: item
    };
  });

  useEffect(() => {
    if (!autoPlay || formattedItems.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % formattedItems.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [autoPlay, formattedItems.length]);

  if (!formattedItems.length) return null;

  const current = formattedItems[currentIndex];

  const goToPrevious = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + formattedItems.length) % formattedItems.length);
  };

  const goToNext = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % formattedItems.length);
  };

  const showPhoto = type === 'initiative'; // Show photo for waste picker initiatives

  return (
    <div className="relative bg-gradient-to-br from-zwa-primary-ink to-zwa-surface rounded-2xl overflow-hidden">
      <div className={cx("grid", showPhoto ? "md:grid-cols-2 gap-0" : "grid-cols-1")}>
        {/* Photo Section (for initiatives) */}
        {showPhoto && (
          <div className="relative h-64 md:h-auto bg-gradient-to-br from-zwa-accent/30 to-zwa-primary/30">
            {/* Placeholder for photo - in real app, this would be current.data.image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full bg-cover bg-center opacity-40" style={{
                backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }} />
              <div className="absolute inset-0 flex items-center justify-center text-white/50">
                {/* Icon placeholder - can be replaced with actual images */}
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="p-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="chip bg-zwa-primary text-white text-xs">
              {current.type === 'organization' ? 'Organization' : 'Initiative'}
            </span>
            {current.data.status_badge === 'verified' && (
              <span className="chip bg-zwa-accent text-zwa-ink text-xs">Verified</span>
            )}
          </div>

        {current.type === 'organization' ? (
          <>
            <h3 className="text-2xl font-bold mb-2">{current.data.name}</h3>
            <p className="text-sm text-zwa-accent mb-4">{current.data.type}</p>
            {current.data.city && (
              <div className="flex items-center gap-2 text-sm mb-4">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                <span>{current.data.city}, {current.data.province}</span>
              </div>
            )}
            {current.data.website && (
              <a 
                href={current.data.website}
                className="inline-flex items-center gap-2 text-zwa-accent hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Visit website</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            )}
          </>
        ) : (
          <>
            <h3 className="text-2xl font-bold mb-2">{current.data.title}</h3>
            <p className="text-zwa-muted mb-4">{current.data.summary}</p>
            {current.data.topics && current.data.topics.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {current.data.topics.map((topic) => (
                  <span key={topic} className="chip bg-zwa-surface text-white text-xs">
                    {topic}
                  </span>
                ))}
              </div>
            )}
          </>
        )}
        </div>
      </div>

      {formattedItems.length > 1 && (
        <>
          <div className="absolute bottom-8 right-8 flex gap-2">
            <button
              onClick={goToPrevious}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Previous spotlight"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              onClick={goToNext}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Next spotlight"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          <div className="absolute top-8 right-8 flex gap-1">
            {formattedItems.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setAutoPlay(false);
                  setCurrentIndex(index);
                }}
                className={cx(
                  'w-2 h-2 rounded-full transition-all',
                  index === currentIndex
                    ? 'w-6 bg-white'
                    : 'bg-white/40 hover:bg-white/60'
                )}
                aria-label={`Go to spotlight ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

