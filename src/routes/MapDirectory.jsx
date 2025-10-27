import { useState, useEffect } from 'react';
import { Search, Grid as GridIcon, List } from 'lucide-react';
import MapView from '../components/MapView';
import DirectoryList from '../components/DirectoryList';
import { useDirectory } from '../lib/useMockData';
import { isInBounds } from '../lib/utils';

export default function MapDirectory() {
  const { data: directory, loading, error } = useDirectory();
  const [searchValue, setSearchValue] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  const [mapBounds, setMapBounds] = useState(null);

  // Extract unique values for filters
  const allTopics = [...new Set(directory?.flatMap(e => e.topics || []) || [])];
  const allTypes = [...new Set(directory?.map(e => e.entry_type || e.type) || [])];
  const allCountries = [...new Set(directory?.map(e => e.country) || [])];

  useEffect(() => {
    if (!directory) return;
    
    let filtered = [...directory];

    // Apply search filter
    if (searchValue.trim()) {
      const search = searchValue.toLowerCase();
      filtered = filtered.filter(entry =>
        entry.name?.toLowerCase().includes(search) ||
        entry.type?.toLowerCase().includes(search) ||
        entry.topics?.some(t => t.toLowerCase().includes(search))
      );
    }

    // Apply topic filter
    if (selectedTopics.length > 0) {
      filtered = filtered.filter(entry =>
        entry.topics?.some(t => selectedTopics.includes(t))
      );
    }

    // Apply type filter
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(entry =>
        selectedTypes.includes(entry.entry_type || entry.type)
      );
    }

    // Apply country filter
    if (selectedCountries.length > 0) {
      filtered = filtered.filter(entry =>
        selectedCountries.includes(entry.country)
      );
    }

    console.log('[MapDirectory] Filtered entries:', filtered.length);
    setFilteredEntries(filtered);
  }, [directory, searchValue, selectedTopics, selectedTypes, selectedCountries]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const clearFilters = () => {
    setSelectedTopics([]);
    setSelectedTypes([]);
    setSelectedCountries([]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-fg-muted">Loading directory...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-custom py-16">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-800">Error loading directory: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Map Section */}
      <div className="h-[400px] md:h-[500px] w-full bg-neutral-100">
        <MapView features={filteredEntries} onBoundsChange={setMapBounds} />
      </div>

      {/* Content Section */}
      <div className="flex-1 bg-bg-muted">
        <div className="container-custom py-8">
          {/* Search Bar */}
          <div className="mb-8">
            <h1 className="text-h1 mb-6">Infobank / Directory</h1>
            <form onSubmit={handleSearch} className="search-bar">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search directories"
                  className="search-input"
                  aria-label="Search directory entries"
                />
              </div>
              <button type="submit" className="search-button">
                Search
              </button>
            </form>
          </div>

          {/* Filters and Results */}
          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            {/* Left Sidebar - Filters */}
            <aside className="filter-sidebar">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-fg">Refine Results</h2>
                {(selectedTopics.length > 0 || selectedTypes.length > 0 || selectedCountries.length > 0) && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-primary hover:text-primary-dark font-medium"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Topics Filter */}
              <div className="filter-section">
                <label className="filter-label">Topics</label>
                <select
                  className="select w-full"
                  value=""
                  onChange={(e) => {
                    if (e.target.value && !selectedTopics.includes(e.target.value)) {
                      setSelectedTopics([...selectedTopics, e.target.value]);
                    }
                  }}
                >
                  <option value="">Select topics</option>
                  {allTopics.map(topic => (
                    <option key={topic} value={topic}>{topic}</option>
                  ))}
                </select>
                {selectedTopics.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedTopics.map(topic => (
                      <span key={topic} className="chip bg-primary text-white">
                        {topic}
                        <button
                          onClick={() => setSelectedTopics(selectedTopics.filter(t => t !== topic))}
                          className="ml-2 hover:text-red-200"
                          aria-label={`Remove ${topic} filter`}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Types Filter */}
              <div className="filter-section">
                <label className="filter-label">Types</label>
                <select
                  className="select w-full"
                  value=""
                  onChange={(e) => {
                    if (e.target.value && !selectedTypes.includes(e.target.value)) {
                      setSelectedTypes([...selectedTypes, e.target.value]);
                    }
                  }}
                >
                  <option value="">Select types</option>
                  {allTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {selectedTypes.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedTypes.map(type => (
                      <span key={type} className="chip bg-primary text-white">
                        {type}
                        <button
                          onClick={() => setSelectedTypes(selectedTypes.filter(t => t !== type))}
                          className="ml-2 hover:text-red-200"
                          aria-label={`Remove ${type} filter`}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Countries Filter */}
              <div className="filter-section">
                <label className="filter-label">Countries</label>
                <select
                  className="select w-full"
                  value=""
                  onChange={(e) => {
                    if (e.target.value && !selectedCountries.includes(e.target.value)) {
                      setSelectedCountries([...selectedCountries, e.target.value]);
                    }
                  }}
                >
                  <option value="">Select countries</option>
                  {allCountries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
                {selectedCountries.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedCountries.map(country => (
                      <span key={country} className="chip bg-primary text-white">
                        {country}
                        <button
                          onClick={() => setSelectedCountries(selectedCountries.filter(c => c !== country))}
                          className="ml-2 hover:text-red-200"
                          aria-label={`Remove ${country} filter`}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </aside>

            {/* Main Content - Results */}
            <div>
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-fg">
                  Showing {filteredEntries.length} of {directory?.length || 0} results
                </h2>
                
                {/* View Toggle */}
                <div className="flex items-center gap-4">
                  <div className="view-toggle">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                      aria-label="Grid view"
                    >
                      <GridIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('table')}
                      className={`view-toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
                      aria-label="Table view"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <select className="select text-sm py-2">
                    <option>Default sorting</option>
                    <option>Name A-Z</option>
                    <option>Name Z-A</option>
                    <option>Newest first</option>
                  </select>
                </div>
              </div>

              {/* Results List */}
              {filteredEntries.length > 0 ? (
                <DirectoryList entries={filteredEntries} viewMode={viewMode} />
              ) : (
                <div className="text-center py-16">
                  <p className="text-fg-muted text-lg mb-2">No results found</p>
                  <p className="text-sm text-fg-muted">Try adjusting your filters or search terms</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
