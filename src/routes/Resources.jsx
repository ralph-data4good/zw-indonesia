import { useState, useEffect } from 'react';
import { Grid3x3, List } from 'lucide-react';
import { useTranslation } from '../lib/i18n';
import { useResources as useMockResources } from '../lib/useMockData';
import { cx } from '../lib/utils';
import ResourceCard from '../components/ResourceCard';
import Filters from '../components/Filters';
import Section from '../components/Section';

export default function Resources() {
  const { t } = useTranslation();
  const { data: resources, loading } = useMockResources();
  
  const [searchValue, setSearchValue] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [filteredResources, setFilteredResources] = useState([]);

  // Extract unique filter options from data
  const topics = [...new Set(resources?.flatMap(r => r.topics || []) || [])];
  const years = [...new Set(resources?.map(r => r.year).filter(Boolean) || [])].sort((a, b) => b - a);
  const formats = [...new Set(resources?.map(r => r.format).filter(Boolean) || [])];
  const accessTypes = [...new Set(resources?.map(r => r.access_type).filter(Boolean) || [])];

  useEffect(() => {
    if (!resources) return;

    let filtered = [...resources];

    // Apply search
    if (searchValue) {
      const search = searchValue.toLowerCase();
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(search) ||
        resource.summary?.toLowerCase().includes(search) ||
        resource.source?.org.toLowerCase().includes(search)
      );
    }

    // Apply filters
    const topicFilters = selectedFilters.filter(f => f.key === 'topic');
    if (topicFilters.length > 0) {
      filtered = filtered.filter(resource =>
        resource.topics?.some(topic => topicFilters.some(f => f.value === topic))
      );
    }

    const yearFilters = selectedFilters.filter(f => f.key === 'year');
    if (yearFilters.length > 0) {
      filtered = filtered.filter(resource =>
        yearFilters.some(f => f.value === String(resource.year))
      );
    }

    const formatFilters = selectedFilters.filter(f => f.key === 'format');
    if (formatFilters.length > 0) {
      filtered = filtered.filter(resource =>
        formatFilters.some(f => f.value === resource.format)
      );
    }

    const accessFilters = selectedFilters.filter(f => f.key === 'access');
    if (accessFilters.length > 0) {
      filtered = filtered.filter(resource =>
        accessFilters.some(f => f.value === resource.access_type)
      );
    }

    setFilteredResources(filtered);
  }, [resources, searchValue, selectedFilters]);

  const handleFilterToggle = (key, value) => {
    setSelectedFilters(prev => {
      const exists = prev.some(f => f.key === key && f.value === value);
      if (exists) {
        return prev.filter(f => !(f.key === key && f.value === value));
      } else {
        return [...prev, { key, value }];
      }
    });
  };

  return (
    <div>
      <Section
        eyebrow="Knowledge Base"
        title={t('resources.title')}
        description="Browse reports, guides, toolkits, and research supporting zero waste initiatives across Indonesia"
        centered={true}
      >
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <Filters
                searchValue={searchValue}
                onSearchChange={setSearchValue}
                filters={[
                  {
                    key: 'topic',
                    label: t('resources.topic'),
                    options: topics.map(t => ({ value: t, label: t }))
                  },
                  {
                    key: 'year',
                    label: t('resources.year'),
                    options: years.map(y => ({ value: String(y), label: String(y) }))
                  },
                  {
                    key: 'format',
                    label: t('resources.format'),
                    options: formats.map(f => ({ value: f, label: f }))
                  },
                  {
                    key: 'access',
                    label: t('resources.access'),
                    options: accessTypes.map(a => ({ value: a, label: a }))
                  }
                ]}
                selectedFilters={selectedFilters}
                onFilterToggle={handleFilterToggle}
              />
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* View controls */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-600">
                {loading ? t('common.loading') : `${filteredResources.length} resources`}
              </p>
              <div className="flex gap-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cx(
                    'p-2 rounded-lg transition-colors',
                    viewMode === 'grid'
                      ? 'bg-zwa-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  )}
                  aria-label={t('resources.viewGrid')}
                >
                  <Grid3x3 className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cx(
                    'p-2 rounded-lg transition-colors',
                    viewMode === 'list'
                      ? 'bg-zwa-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  )}
                  aria-label={t('resources.viewList')}
                >
                  <List className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Resources grid/list */}
            {loading ? (
              <p className="text-gray-500 text-center py-12">{t('common.loading')}</p>
            ) : filteredResources.length === 0 ? (
              <p className="text-gray-500 text-center py-12">No resources found</p>
            ) : (
              <div className={cx(
                'gap-6',
                viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3' : 'flex flex-col'
              )}>
                {filteredResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}

