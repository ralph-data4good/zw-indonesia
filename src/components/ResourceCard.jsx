import { ExternalLink } from 'lucide-react';
import Card from './Card';
import { truncate } from '../lib/utils';

export default function ResourceCard({ resource, featured = false }) {
  return (
    <Card href={resource.source?.url} className="p-5 h-full flex flex-col">
      {resource.cover && (
        <div className="mb-4 rounded-lg overflow-hidden bg-gray-100">
          <img 
            src={resource.cover} 
            alt={resource.title}
            className="w-full h-48 object-cover"
            loading="lazy"
            width="400"
            height="192"
          />
        </div>
      )}
      
      <div className="flex-1">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="text-lg font-semibold text-zwa-ink leading-tight flex-1">
            {resource.title}
          </h3>
          <ExternalLink className="w-4 h-4 text-zwa-muted flex-shrink-0 mt-1" aria-hidden="true" />
        </div>
        
        {resource.summary && (
          <p className="text-sm text-gray-600 mb-3">
            {truncate(resource.summary, 120)}
          </p>
        )}
        
        {resource.topics && resource.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {resource.topics.slice(0, 3).map((topic) => (
              <span key={topic} className="chip chip-default text-xs">
                {topic}
              </span>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-between text-xs text-zwa-muted pt-3 border-t border-gray-200">
        <span>{resource.source?.org || 'Unknown source'}</span>
        <span>{resource.year}</span>
      </div>
    </Card>
  );
}

