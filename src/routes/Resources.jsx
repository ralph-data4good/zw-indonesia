import { useState, useEffect } from 'react';
import { Search, Grid as GridIcon, List, CheckCircle } from 'lucide-react';
import ResourceCard from '../components/ResourceCard';
import { useResources } from '../lib/useMockData';

export default function Resources() {
  const { data: resources, loading, error } = useResources();
  const [searchValue, setSearchValue] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'

  // Extract unique values for filters
  const allTopics = [...new Set(resources?.flatMap(r => r.topics || []) || [])];
  const allTypes = [...new Set(resources?.map(r => r.type) || [])];
  const allCategories = [...new Set(resources?.map(r => r.category) || [])];
  const allCountries = [...new Set(resources?.flatMap(r => r.countries || []) || [])];

  useEffect(() => {
    if (!resources) return;

    let filtered = [...resources];

    // Apply search filter
    if (searchValue.trim()) {
      const search = searchValue.toLowerCase();
      filtered = filtered.filter(resource =>
        resource.title?.toLowerCase().includes(search) ||
        resource.description?.toLowerCase().includes(search) ||
        resource.topics?.some(t => t.toLowerCase().includes(search))
      );
    }

    // Apply filters
    if (selectedTopics.length > 0) {
      filtered = filtered.filter(r => r.topics?.some(t => selectedTopics.includes(t)));
    }

    if (selectedTypes.length > 0) {
      filtered = filtered.filter(r => selectedTypes.includes(r.type));
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(r => selectedCategories.includes(r.category));
    }

    if (selectedCountries.length > 0) {
      filtered = filtered.filter(r => r.countries?.some(c => selectedCountries.includes(c)));
    }

    setFilteredResources(filtered);
  }, [resources, searchValue, selectedTopics, selectedTypes, selectedCategories, selectedCountries]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const clearFilters = () => {
    setSelectedTopics([]);
    setSelectedTypes([]);
    setSelectedCategories([]);
    setSelectedCountries([]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-fg-muted">Loading resources...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-custom py-16">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-800">Error loading resources: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg-muted min-h-screen">
      <div className="container-custom py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <h1 className="text-h1 mb-6">Resource Library</h1>
          <form onSubmit={handleSearch} className="search-bar">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search resources"
                className="search-input"
                aria-label="Search resources"
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
          <aside className="filter-sidebar h-fit">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-fg">Refine Results</h2>
              {(selectedTopics.length > 0 || selectedTypes.length > 0 || selectedCategories.length > 0 || selectedCountries.length > 0) && (
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

            {/* Categories Filter */}
            <div className="filter-section">
              <label className="filter-label">Categories</label>
              <select
                className="select w-full"
                value=""
                onChange={(e) => {
                  if (e.target.value && !selectedCategories.includes(e.target.value)) {
                    setSelectedCategories([...selectedCategories, e.target.value]);
                  }
                }}
              >
                <option value="">Select categories</option>
                {allCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              {selectedCategories.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedCategories.map(category => (
                    <span key={category} className="chip bg-primary text-white">
                      {category}
                      <button
                        onClick={() => setSelectedCategories(selectedCategories.filter(c => c !== category))}
                        className="ml-2 hover:text-red-200"
                        aria-label={`Remove ${category} filter`}
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
                Showing {filteredResources.length} of {resources?.length || 0} results
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
                  <option>Title A-Z</option>
                  <option>Title Z-A</option>
                  <option>Newest first</option>
                </select>
              </div>
            </div>

            {/* Results Grid/Table */}
            {filteredResources.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-fg-muted text-lg mb-2">No resources found</p>
                <p className="text-sm text-fg-muted">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
