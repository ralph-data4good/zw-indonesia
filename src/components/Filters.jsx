import { Search, X } from 'lucide-react';
import { cx } from '../lib/utils';

export default function Filters({
  searchValue,
  onSearchChange,
  filters = [],
  selectedFilters = [],
  onFilterToggle,
  toggles = [],
  className
}) {
  return (
    <div className={cx('space-y-4', className)}>
      {/* Search input */}
      {onSearchChange && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zwa-muted" aria-hidden="true" />
          <input
            type="search"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search..."
            className="input pl-10 pr-10"
            aria-label="Search"
          />
          {searchValue && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zwa-muted hover:text-zwa-ink transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>
      )}

      {/* Chip filters */}
      {filters.length > 0 && (
        <div>
          {filters.map((filterGroup) => (
            <div key={filterGroup.key} className="mb-4">
              {filterGroup.label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {filterGroup.label}
                </label>
              )}
              <div className="flex flex-wrap gap-2">
                {filterGroup.options.map((option) => {
                  const isSelected = selectedFilters.some(
                    (f) => f.key === filterGroup.key && f.value === option.value
                  );
                  return (
                    <button
                      key={option.value}
                      onClick={() => onFilterToggle(filterGroup.key, option.value)}
                      className={cx(
                        'chip',
                        isSelected ? 'chip-active' : 'chip-default'
                      )}
                      aria-pressed={isSelected}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Toggle switches */}
      {toggles.length > 0 && (
        <div className="space-y-2">
          {toggles.map((toggle) => (
            <label key={toggle.key} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={toggle.value}
                onChange={(e) => toggle.onChange(e.target.checked)}
                className="w-4 h-4 text-zwa-primary border-gray-300 rounded focus:ring-zwa-primary"
              />
              <span className="text-sm text-gray-700">{toggle.label}</span>
            </label>
          ))}
        </div>
      )}

      {/* Clear all button */}
      {selectedFilters.length > 0 && (
        <button
          onClick={() => {
            selectedFilters.forEach((filter) => {
              onFilterToggle(filter.key, filter.value);
            });
          }}
          className="text-sm text-zwa-primary hover:text-zwa-primary/80 font-medium transition-colors"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}

