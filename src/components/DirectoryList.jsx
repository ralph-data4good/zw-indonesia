import { MapPin, ExternalLink, CheckCircle } from 'lucide-react';

export default function DirectoryList({ entries = [], viewMode = 'grid' }) {
  if (viewMode === 'table') {
    return (
      <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-fg uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-fg uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-fg uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-fg uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {entries.map((entry) => (
                <tr key={entry.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-fg text-base">{entry.name}</div>
                    {entry.topics && entry.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {entry.topics.slice(0, 2).map((topic) => (
                          <span key={topic} className="chip bg-neutral-100 text-fg-muted">
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="badge bg-secondary text-white">
                      {entry.entry_type || entry.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-fg-muted">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
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
      </div>
    );
  }

  // Grid view
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="bg-white rounded-xl border border-border shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 overflow-hidden"
        >
          {/* Image placeholder */}
          <div className="h-48 bg-gradient-to-br from-blue-50 via-neutral-50 to-neutral-100 relative overflow-hidden">
            {/* Building icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-20 h-20 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            
            {/* Type badge - top left */}
            {(entry.entry_type || entry.type) && (
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-secondary text-white shadow-md">
                  {entry.entry_type || entry.type}
                </span>
              </div>
            )}
            
            {/* Verified badge - top right */}
            {entry.status_badge === 'verified' && (
              <div className="absolute top-3 right-3">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-accent text-white shadow-md">
                  <CheckCircle className="w-3 h-3" />
                  Verified
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="font-bold text-lg text-fg mb-3 line-clamp-2 leading-tight">
              {entry.name}
            </h3>

            {/* Location */}
            <div className="flex items-center gap-2 text-sm text-fg-muted mb-4">
              <MapPin className="w-4 h-4 flex-shrink-0 text-primary" />
              <span className="font-medium">{entry.city}, {entry.country}</span>
            </div>

            {/* Topics */}
            {entry.topics && entry.topics.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {entry.topics.slice(0, 3).map((topic) => (
                  <span key={topic} className="chip bg-blue-50 text-primary border border-blue-200">
                    {topic}
                  </span>
                ))}
                {entry.topics.length > 3 && (
                  <span className="chip bg-neutral-100 text-fg-muted">
                    +{entry.topics.length - 3} more
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
                className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold text-sm transition-colors"
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
