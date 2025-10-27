import { Download, ExternalLink, MessageCircle, Eye, CheckCircle } from 'lucide-react';

export default function ResourceCard({ resource, featured = false }) {
  return (
    <div className="card-hover overflow-hidden">
      {/* Image placeholder */}
      <div className="h-48 bg-gradient-to-br from-blue-50 to-blue-100 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-16 h-16 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        
        {/* Type badge */}
        {resource.type && (
          <div className="absolute top-3 left-3">
            <span className="badge-category shadow-sm">
              {resource.type}
            </span>
          </div>
        )}
        
        {/* Verified badge */}
        {resource.verified && (
          <div className="absolute top-3 right-3">
            <span className="badge-verified shadow-sm">
              <CheckCircle className="w-3 h-3" />
              Verified (Org)
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-fg mb-2 line-clamp-2 leading-tight">
          {resource.title}
        </h3>

        <p className="text-sm text-fg-muted mb-4 line-clamp-3 leading-relaxed">
          {resource.description}
        </p>

        {/* Meta information */}
        <div className="space-y-2 mb-4 text-xs text-fg-muted">
          {resource.topics && resource.topics.length > 0 && (
            <div>
              <span className="font-medium">Topics:</span>{' '}
              {resource.topics.slice(0, 3).join(', ')}
              {resource.topics.length > 3 && `, +${resource.topics.length - 3}`}
            </div>
          )}
          {resource.countries && resource.countries.length > 0 && (
            <div>
              <span className="font-medium">Countries:</span>{' '}
              {resource.countries.join(', ')}
            </div>
          )}
          {resource.published && (
            <div>
              <span className="font-medium">Published:</span>{' '}
              {resource.published}
            </div>
          )}
        </div>

        {/* Stats */}
        {(resource.views || resource.comments) && (
          <div className="flex items-center gap-4 mb-4 text-xs text-fg-muted">
            {resource.views && (
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>{resource.views}</span>
              </div>
            )}
            {resource.comments && (
              <div className="flex items-center gap-1">
                <MessageCircle className="w-3 h-3" />
                <span>{resource.comments}</span>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-border">
          {resource.url && (
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark font-medium text-sm transition-all hover:scale-[1.02]"
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
              className="p-2 rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all"
              aria-label="Download resource"
            >
              <Download className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
