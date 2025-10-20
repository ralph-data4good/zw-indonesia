import { useState, useEffect } from 'react';

// Resolve path relative to Vite base (works on GitHub Pages subpath)
function resolveUrl(path) {
  if (/^https?:\/\//i.test(path)) return path;
  const trimmed = path.replace(/^\//, '');
  return new URL(trimmed, import.meta.env.BASE_URL).toString();
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
        const response = await fetch(resolveUrl(path));
        if (!response.ok) {
          throw new Error(`Failed to fetch ${path}`);
        }
        const json = await response.json();
        if (isMounted) {
          setData(json);
          setError(null);
        }
      } catch (err) {
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

