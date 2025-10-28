import { useState, useEffect } from 'react';
import { Grid as GridIcon, List } from 'lucide-react';
import MapView from '../components/MapView';
import DirectoryList from '../components/DirectoryList';
import { useDirectory } from '../lib/useMockData';

export default function MapDirectory() {
  const { data: directory, loading, error } = useDirectory();
  const [searchValue, setSearchValue] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [mapBounds, setMapBounds] = useState(null);

  // Extract unique values for filters
  const allTopics = [...new Set(directory?.flatMap(e => e.topics || []) || [])];
  const allTypes = [...new Set(directory?.map(e => e.entry_type || e.type).filter(Boolean) || [])];
  const allCountries = [...new Set(directory?.map(e => e.country).filter(Boolean) || [])];

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

    setFilteredEntries(filtered);
  }, [directory, searchValue, selectedTopics, selectedTypes, selectedCountries]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const clearFilters = () => {
    setSelectedTopics([]);
    setSelectedTypes([]);
    setSelectedCountries([]);
    setSearchValue('');
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
    <div className="min-h-screen flex flex-col">
      {/* Map Section */}
      <div className="h-[400px] md:h-[500px] w-full bg-neutral-100 relative">
        <MapView features={filteredEntries} onBoundsChange={setMapBounds} />
      </div>

      {/* Content Section */}
      <div className="flex-1 bg-bg-muted pb-16">
        <div className="container-custom py-8">
          {/* Search Bar */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-fg mb-6">Directory</h1>
            <form onSubmit={handleSearch} className="flex gap-4">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search directories"
                className="flex-1 px-6 py-3.5 rounded-lg border border-border bg-white text-base placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
              />
              <button 
                type="submit" 
                className="px-8 py-3.5 rounded-lg bg-header-bg text-white hover:bg-primary-dark font-semibold text-base shadow-sm hover:shadow-md transition-all hover:scale-[1.02] min-w-[120px]"
              >
                Search
              </button>
            </form>
          </div>

          {/* Filters and Results */}
          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            {/* Left Sidebar - Filters */}
            <aside className="bg-neutral-50 border border-border rounded-xl p-6 shadow-sm h-fit">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-fg">Refine Results</h2>
                {(selectedTopics.length > 0 || selectedTypes.length > 0 || selectedCountries.length > 0) && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-primary hover:text-primary-dark font-medium transition-colors"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Topics Filter */}
              {allTopics.length > 0 && (
                <div className="space-y-3 pb-6 mb-6 border-b border-border">
                  <label className="block text-sm font-semibold text-fg mb-2">Topics</label>
                  <select
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-fg appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cpath fill='%234B5563' d='M4.5 6l3.5 3.5L11.5 6z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 12px center',
                      paddingRight: '40px'
                    }}
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
                        <span key={topic} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-primary text-white">
                          {topic}
                          <button
                            onClick={() => setSelectedTopics(selectedTopics.filter(t => t !== topic))}
                            className="ml-1 hover:text-red-200 font-bold"
                            aria-label={`Remove ${topic} filter`}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Types Filter */}
              {allTypes.length > 0 && (
                <div className="space-y-3 pb-6 mb-6 border-b border-border">
                  <label className="block text-sm font-semibold text-fg mb-2">Types</label>
                  <select
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-fg appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cpath fill='%234B5563' d='M4.5 6l3.5 3.5L11.5 6z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 12px center',
                      paddingRight: '40px'
                    }}
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
                        <span key={type} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-primary text-white">
                          {type}
                          <button
                            onClick={() => setSelectedTypes(selectedTypes.filter(t => t !== type))}
                            className="ml-1 hover:text-red-200 font-bold"
                            aria-label={`Remove ${type} filter`}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Countries Filter */}
              {allCountries.length > 0 && (
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-fg mb-2">Countries</label>
                  <select
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-fg appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cpath fill='%234B5563' d='M4.5 6l3.5 3.5L11.5 6z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 12px center',
                      paddingRight: '40px'
                    }}
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
                        <span key={country} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-primary text-white">
                          {country}
                          <button
                            onClick={() => setSelectedCountries(selectedCountries.filter(c => c !== country))}
                            className="ml-1 hover:text-red-200 font-bold"
                            aria-label={`Remove ${country} filter`}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </aside>

            {/* Main Content - Results */}
            <div>
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-xl font-bold text-fg">
                  Showing {filteredEntries.length} of {directory?.length || 0} results
                </h2>
                
                {/* View Toggle and Sort */}
                <div className="flex items-center gap-4">
                  <div className="inline-flex rounded-lg border border-border bg-white overflow-hidden shadow-sm">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`px-4 py-2.5 text-sm font-medium flex items-center justify-center transition-colors ${
                        viewMode === 'grid' 
                          ? 'bg-primary text-white shadow-sm' 
                          : 'text-fg-muted hover:bg-neutral-50'
                      }`}
                      aria-label="Grid view"
                    >
                      <GridIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('table')}
                      className={`px-4 py-2.5 text-sm font-medium flex items-center justify-center transition-colors ${
                        viewMode === 'table' 
                          ? 'bg-primary text-white shadow-sm' 
                          : 'text-fg-muted hover:bg-neutral-50'
                      }`}
                      aria-label="Table view"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <select 
                    className="px-4 py-2.5 rounded-lg border border-border bg-white text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary pr-10"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cpath fill='%234B5563' d='M4.5 6l3.5 3.5L11.5 6z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 12px center'
                    }}
                  >
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
                <div className="bg-white rounded-xl border border-border p-16 text-center">
                  <svg className="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-fg text-lg font-semibold mb-2">No results found</p>
                  <p className="text-sm text-fg-muted">Try adjusting your filters or search terms</p>
                  {(selectedTopics.length > 0 || selectedTypes.length > 0 || selectedCountries.length > 0 || searchValue) && (
                    <button
                      onClick={clearFilters}
                      className="mt-4 px-6 py-2.5 rounded-lg bg-primary text-white hover:bg-primary-dark font-medium text-sm transition-all"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
