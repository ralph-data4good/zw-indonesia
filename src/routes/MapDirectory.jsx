import { useState, useEffect } from 'react';
import { useTranslation } from '../lib/i18n';
import { useDirectory } from '../lib/useMockData';
import { isInBounds } from '../lib/utils';
import MapView from '../components/MapView';
import DirectoryList from '../components/DirectoryList';
import Filters from '../components/Filters';

const ENTRY_TYPES = [
  { value: 'mrf', label: 'MRF' },
  { value: 'composting', label: 'Composting' },
  { value: 'refill', label: 'Refill Station' },
  { value: 'collection_point', label: 'Collection Point' },
  { value: 'reuse_center', label: 'Reuse Center' },
  { value: 'policy_site', label: 'Policy Site' },
  { value: 'landfill', label: 'Landfill' },
  { value: 'incinerator_flagged', label: 'Incinerator (Flagged)' },
  { value: 'other', label: 'Other' },
];

export default function MapDirectory() {
  const { t } = useTranslation();
  const { data: directory, loading } = useDirectory();
  
  const [searchValue, setSearchValue] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [mapBounds, setMapBounds] = useState(null);
  const [filteredEntries, setFilteredEntries] = useState([]);

  useEffect(() => {
    if (!directory) return;

    let filtered = [...directory];

    // Apply search
    if (searchValue) {
      const search = searchValue.toLowerCase();
      filtered = filtered.filter(entry =>
        entry.name.toLowerCase().includes(search) ||
        entry.city?.toLowerCase().includes(search) ||
        entry.province?.toLowerCase().includes(search)
      );
    }

    // Apply entry type filters
    const entryTypeFilters = selectedFilters.filter(f => f.key === 'entry_type');
    if (entryTypeFilters.length > 0) {
      filtered = filtered.filter(entry =>
        entryTypeFilters.some(f => entry.entry_type === f.value)
      );
    }

    // Apply verified filter
    if (verifiedOnly) {
      filtered = filtered.filter(entry => entry.status_badge === 'verified');
    }

    // Apply map bounds filter
    if (mapBounds) {
      filtered = filtered.filter(entry => {
        if (!entry.coords || entry.coords.length !== 2) return false;
        return isInBounds(entry.coords, mapBounds);
      });
    }

    setFilteredEntries(filtered);
  }, [directory, searchValue, selectedFilters, verifiedOnly, mapBounds]);

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
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Left panel - Filters and Results */}
      <div className="w-80 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
        {/* Filters */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold mb-4">{t('map.title')}</h2>
          
          <Filters
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            filters={[
              {
                key: 'entry_type',
                label: 'Entry Type',
                options: ENTRY_TYPES
              }
            ]}
            selectedFilters={selectedFilters}
            onFilterToggle={handleFilterToggle}
            toggles={[
              {
                key: 'verified',
                label: t('map.verified'),
                value: verifiedOnly,
                onChange: setVerifiedOnly
              }
            ]}
          />
        </div>

        {/* Results list */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-700">
              {t('map.results')}: {filteredEntries.length}
            </p>
          </div>
          <DirectoryList entries={filteredEntries} loading={loading} />
        </div>
      </div>

      {/* Right panel - Map */}
      <div className="flex-1">
        <MapView 
          features={filteredEntries}
          onBoundsChange={setMapBounds}
        />
      </div>
    </div>
  );
}

