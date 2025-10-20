import { MapPin, ExternalLink } from 'lucide-react';
import { getDirectionsUrl } from '../lib/utils';

export default function DirectoryList({ entries = [], loading = false }) {
  if (loading) {
    return (
      <div className="p-4">
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    );
  }

  if (!entries.length) {
    return (
      <div className="p-4">
        <p className="text-gray-500 text-sm">No entries found in current view</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {entries.map((entry) => (
        <div key={entry.id} className="p-4 hover:bg-gray-50 transition-colors">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h4 className="font-semibold text-zwa-ink">{entry.name}</h4>
            {entry.status_badge && (
              <span className={`chip text-xs flex-shrink-0 ${
                entry.status_badge === 'verified' ? 'chip-active' : 'chip-accent'
              }`}>
                {entry.status_badge}
              </span>
            )}
          </div>

          <p className="text-sm text-gray-600 mb-2">
            {entry.entry_type || entry.type}
          </p>

          {(entry.city || entry.province) && (
            <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
              <MapPin className="w-3 h-3" aria-hidden="true" />
              <span>
                {[entry.city, entry.province].filter(Boolean).join(', ')}
              </span>
            </div>
          )}

          {entry.meta?.description && (
            <p className="text-sm text-gray-600 mb-3">
              {entry.meta.description}
            </p>
          )}

          {entry.endorse_score !== undefined && (
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                <span>Community endorsement</span>
                <span>{entry.endorse_score}/5</span>
              </div>
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-zwa-accent rounded-full"
                  style={{ width: `${(entry.endorse_score / 5) * 100}%` }}
                />
              </div>
            </div>
          )}

          {entry.coords && entry.coords.length === 2 && (
            <a
              href={getDirectionsUrl(entry.coords[1], entry.coords[0])}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-zwa-primary hover:text-zwa-primary/80 font-medium transition-colors"
            >
              <MapPin className="w-4 h-4" aria-hidden="true" />
              <span>Get Directions</span>
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

