import { Calendar, MapPin, Users, CheckCircle } from 'lucide-react';

export default function CampaignCard({ campaign }) {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 overflow-hidden">
      {/* Image placeholder */}
      <div className="h-48 bg-gradient-to-br from-green-50 via-neutral-50 to-accent/20 relative overflow-hidden">
        {/* Megaphone icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-20 h-20 text-accent/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
          </svg>
        </div>
        
        {/* Featured badge - top left */}
        {campaign.featured && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-secondary text-white shadow-md">
              Featured
            </span>
          </div>
        )}
        
        {/* Verified badge - top right */}
        {campaign.verified && (
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
        <h3 className="font-bold text-lg text-fg mb-2 line-clamp-2 leading-tight">
          {campaign.title}
        </h3>

        <p className="text-sm text-fg-muted mb-4 line-clamp-3 leading-relaxed">
          {campaign.description}
        </p>

        {/* Meta information */}
        <div className="space-y-2 mb-4">
          {campaign.city && (
            <div className="flex items-center gap-2 text-sm text-fg-muted">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="font-medium">{campaign.city}, {campaign.country}</span>
            </div>
          )}
          {campaign.end_date && (
            <div className="flex items-center gap-2 text-sm text-fg-muted">
              <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="font-medium">Until {new Date(campaign.end_date).toLocaleDateString()}</span>
            </div>
          )}
          {campaign.participants && (
            <div className="flex items-center gap-2 text-sm text-fg-muted">
              <Users className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="font-medium">{campaign.participants} participants</span>
            </div>
          )}
        </div>

        {/* Topics */}
        {campaign.topics && campaign.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-border">
            {campaign.topics.slice(0, 3).map((topic) => (
              <span key={topic} className="chip bg-blue-50 text-primary border border-blue-200">
                {topic}
              </span>
            ))}
            {campaign.topics.length > 3 && (
              <span className="chip bg-neutral-100 text-fg-muted">
                +{campaign.topics.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Action button */}
        {campaign.url && (
          <a
            href={campaign.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center px-4 py-3 rounded-lg bg-secondary text-white hover:bg-secondary-dark font-semibold text-sm transition-all hover:scale-[1.02] shadow-sm"
          >
            Join Campaign
          </a>
        )}
      </div>
    </div>
  );
}
