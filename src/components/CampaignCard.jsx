import { ArrowRight } from 'lucide-react';
import Card from './Card';

export default function CampaignCard({ campaign }) {
  return (
    <Card className="p-6 h-full flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-zwa-ink mb-2">
            {campaign.title}
          </h3>
          {campaign.tagline && (
            <p className="text-gray-600">
              {campaign.tagline}
            </p>
          )}
        </div>
        {campaign.status && (
          <span className={`chip text-xs ${
            campaign.status === 'active' ? 'chip-active' :
            campaign.status === 'upcoming' ? 'chip-accent' :
            'chip-default'
          }`}>
            {campaign.status}
          </span>
        )}
      </div>
      
      {campaign.topics && campaign.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {campaign.topics.map((topic) => (
            <span key={topic} className="chip chip-default text-xs">
              {topic}
            </span>
          ))}
        </div>
      )}
      
      <div className="mt-auto pt-4 border-t border-gray-200">
        {campaign.partners && campaign.partners.length > 0 && (
          <p className="text-sm text-zwa-muted mb-3">
            Partners: {campaign.partners.join(', ')}
          </p>
        )}
        {campaign.cta && (
          <a 
            href={campaign.cta.url}
            className="inline-flex items-center gap-2 text-zwa-primary font-medium hover:text-zwa-primary/80 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{campaign.cta.label}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        )}
      </div>
    </Card>
  );
}

