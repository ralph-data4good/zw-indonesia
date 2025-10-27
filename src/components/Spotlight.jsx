import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, MapPin, CheckCircle } from 'lucide-react';
import { cx } from '../lib/utils';

export default function Spotlight({ items = [], type = 'mixed' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const formattedItems = items.map(item => {
    if (item.type && item.data) return item;
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

  const showPhoto = type === 'initiative';

  return (
    <div className="relative bg-gradient-to-br from-header-bg to-primary-dark rounded-2xl overflow-hidden shadow-xl">
      <div className={cx("grid", showPhoto ? "md:grid-cols-2 gap-0" : "grid-cols-1")}>
        {/* Photo Section (for initiatives) */}
        {showPhoto && (
          <div className="relative h-80 md:h-auto bg-gradient-to-br from-accent/20 to-primary/40">
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800">
              <div className="w-full h-full bg-cover bg-center opacity-30" style={{
                backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }} />
              <div className="absolute inset-0 flex items-center justify-center text-white/40">
                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white/70 text-xs text-center font-medium">
                Photo placeholder
              </div>
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="p-8 md:p-10 min-h-[320px] flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-primary text-white shadow-sm">
              {current.type === 'organization' ? 'Organization' : 'Initiative'}
            </span>
            {current.data.status_badge === 'verified' && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-accent text-white shadow-sm">
                <CheckCircle className="w-3 h-3" />
                Verified
              </span>
            )}
          </div>

        {current.type === 'organization' ? (
          <>
            <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white leading-tight">
              {current.data.name}
            </h3>
            <p className="text-lg text-secondary mb-4 font-semibold">{current.data.type}</p>
            {current.data.city && (
              <div className="flex items-center gap-2 text-sm mb-6 text-white/90">
                <MapPin className="w-5 h-5 text-secondary flex-shrink-0" aria-hidden="true" />
                <span className="font-medium">{current.data.city}, {current.data.province}</span>
              </div>
            )}
            <div className="mt-auto pt-6">
              {current.data.website && (
                <a
                  href={current.data.website}
                  className="inline-flex items-center gap-2 text-secondary hover:text-white transition-colors font-semibold text-base"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Visit website</span>
                  <ExternalLink className="w-5 h-5" aria-hidden="true" />
                </a>
              )}
            </div>
          </>
        ) : (
          <>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white leading-tight">
              {current.data.title}
            </h3>
            <p className="text-white/90 mb-6 text-base leading-relaxed">
              {current.data.summary}
            </p>
            {current.data.topics && current.data.topics.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-auto">
                {current.data.topics.map((topic) => (
                  <span key={topic} className="chip bg-white/20 text-white text-xs font-medium border border-white/30 backdrop-blur-sm">
                    {topic}
                  </span>
                ))}
              </div>
            )}
          </>
        )}
        </div>
      </div>

      {/* Navigation Controls */}
      {formattedItems.length > 1 && (
        <>
          <div className="absolute bottom-8 right-8 flex gap-3 z-10">
            <button
              onClick={goToPrevious}
              className="w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center transition-all border border-white/20"
              aria-label="Previous spotlight"
            >
              <ChevronLeft className="w-6 h-6 text-white" aria-hidden="true" />
            </button>
            <button
              onClick={goToNext}
              className="w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center transition-all border border-white/20"
              aria-label="Next spotlight"
            >
              <ChevronRight className="w-6 h-6 text-white" aria-hidden="true" />
            </button>
          </div>

          {/* Indicators */}
          <div className="absolute top-8 right-8 flex gap-2 z-10">
            {formattedItems.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setAutoPlay(false);
                  setCurrentIndex(index);
                }}
                className={cx(
                  'h-2 rounded-full transition-all',
                  index === currentIndex
                    ? 'w-8 bg-white'
                    : 'w-2 bg-white/40 hover:bg-white/60'
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
