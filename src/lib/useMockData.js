import { useState, useEffect } from 'react';

// Resolve path relative to Vite base (works on GitHub Pages subpath)
function resolveUrl(path) {
  // Get base URL from Vite environment variable
  const base = import.meta.env.BASE_URL || '/';
  // Ensure base ends with slash
  const baseWithSlash = base.endsWith('/') ? base : base + '/';
  // Remove leading slash from path if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Combine base and path
  return baseWithSlash + cleanPath;
}

// Generic JSON fetcher hook
function useJson(path) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        const url = resolveUrl(path);
        console.log(`[useMockData] Fetching: ${url}`); // Debug log
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
        }
        const json = await response.json();
        console.log(`[useMockData] Loaded ${path}:`, json?.length || Object.keys(json || {}).length, 'items'); // Debug log
        if (isMounted) {
          setData(json);
          setError(null);
        }
      } catch (err) {
        console.error(`[useMockData] Error loading ${path}:`, err); // Debug log
        if (isMounted) {
          setError(err.message);
          setData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [path]);

  return { data, loading, error };
}

// Specific hooks for each data type
export function useOrganizations() {
  return useJson('mock/organizations.json');
}

export function useInitiatives() {
  return useJson('mock/initiatives.json');
}

export function useDirectory() {
  return useJson('mock/directory.json');
}

export function useResources() {
  return useJson('mock/resources.json');
}

export function useCampaigns() {
  return useJson('mock/campaigns.json');
}

export function useEvents() {
  return useJson('mock/events.json');
}

export function useCalculatorConfig() {
  return useJson('mock/calculator.config.json');
}

