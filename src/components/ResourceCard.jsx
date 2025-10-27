import { Download, ExternalLink, MessageCircle, Eye, CheckCircle } from 'lucide-react';

export default function ResourceCard({ resource, featured = false }) {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 overflow-hidden">
      {/* Image placeholder */}
      <div className="h-48 bg-gradient-to-br from-blue-50 via-neutral-50 to-blue-100 relative overflow-hidden">
        {/* Document icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-20 h-20 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        
        {/* Type badge - top left */}
        {resource.type && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-secondary text-white shadow-md">
              {resource.type}
            </span>
          </div>
        )}
        
        {/* Verified badge - top right */}
        {resource.verified && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-accent text-white shadow-md">
              <CheckCircle className="w-3 h-3" />
              Verified (Org)
            </span>
          </div>
        )}
        
        {/* Featured badge - bottom left */}
        {featured && (
          <div className="absolute bottom-3 left-3">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-primary text-white shadow-md">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-bold text-lg text-fg mb-2 line-clamp-2 leading-tight">
          {resource.title}
        </h3>

        <p className="text-sm text-fg-muted mb-4 line-clamp-3 leading-relaxed">
          {resource.description}
        </p>

        {/* Meta information */}
        <div className="space-y-2 mb-4 text-xs text-fg-muted">
          {resource.topics && resource.topics.length > 0 && (
            <div className="flex flex-wrap gap-1">
              <span className="font-semibold text-fg">Topics:</span>
              <span className="flex-1">
                {resource.topics.slice(0, 3).join(', ')}
                {resource.topics.length > 3 && `, +${resource.topics.length - 3} more`}
              </span>
            </div>
          )}
          {resource.countries && resource.countries.length > 0 && (
            <div className="flex items-start gap-1">
              <span className="font-semibold text-fg">Countries:</span>
              <span className="flex-1">{resource.countries.join(', ')}</span>
            </div>
          )}
          {resource.published && (
            <div>
              <span className="font-semibold text-fg">Published:</span> {resource.published}
            </div>
          )}
        </div>

        {/* Stats */}
        {(resource.views || resource.comments) && (
          <div className="flex items-center gap-4 mb-4 text-xs text-fg-muted pb-4 border-b border-border">
            {resource.views && (
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span className="font-medium">{resource.views}</span>
              </div>
            )}
            {resource.comments && (
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span className="font-medium">{resource.comments}</span>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3">
          {resource.url && (
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white hover:bg-primary-dark font-semibold text-sm transition-all hover:scale-[1.02] shadow-sm"
            >
              <span>How it works</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          {resource.download && (
            <a
              href={resource.download}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all"
              aria-label="Download resource"
            >
              <Download className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
