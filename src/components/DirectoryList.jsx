import { MapPin, ExternalLink, CheckCircle } from 'lucide-react';

export default function DirectoryList({ entries = [], viewMode = 'grid' }) {
  if (viewMode === 'table') {
    return (
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-neutral-50 border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-fg uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-fg uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-fg uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-fg uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {entries.map((entry) => (
              <tr key={entry.id} className="hover:bg-neutral-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-fg">{entry.name}</div>
                  {entry.topics && entry.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {entry.topics.slice(0, 2).map((topic) => (
                        <span key={topic} className="chip bg-neutral-100 text-fg-muted text-xs">
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-fg-muted">
                  {entry.entry_type || entry.type}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-fg-muted">
                    <MapPin className="w-4 h-4" />
                    <span>{entry.city}, {entry.country}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {entry.status_badge === 'verified' && (
                    <span className="badge-verified">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Grid view
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="card-hover overflow-hidden"
        >
          {/* Image placeholder */}
          <div className="h-48 bg-gradient-to-br from-neutral-100 to-neutral-200 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-16 h-16 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            {/* Category badge */}
            {(entry.entry_type || entry.type) && (
              <div className="absolute top-3 left-3">
                <span className="badge-category shadow-sm">
                  {entry.entry_type || entry.type}
                </span>
              </div>
            )}
            {/* Verified badge */}
            {entry.status_badge === 'verified' && (
              <div className="absolute top-3 right-3">
                <span className="badge-verified shadow-sm">
                  <CheckCircle className="w-3 h-3" />
                  Verified
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="font-bold text-lg text-fg mb-2 line-clamp-2">
              {entry.name}
            </h3>

            {/* Location */}
            <div className="flex items-center gap-2 text-sm text-fg-muted mb-3">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span>{entry.city}, {entry.country}</span>
            </div>

            {/* Topics */}
            {entry.topics && entry.topics.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {entry.topics.slice(0, 3).map((topic) => (
                  <span key={topic} className="chip bg-neutral-100 text-fg-muted">
                    {topic}
                  </span>
                ))}
                {entry.topics.length > 3 && (
                  <span className="chip bg-neutral-100 text-fg-muted">
                    +{entry.topics.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* Actions */}
            {entry.website && (
              <a
                href={entry.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium text-sm transition-colors"
              >
                <span>Visit website</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
