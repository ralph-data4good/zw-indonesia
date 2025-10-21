import { useEffect, useRef, useState } from 'react';
import { Navigation } from 'lucide-react';

export default function MapView({ features = [], onBoundsChange }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);
  const [maplibreModule, setMaplibreModule] = useState(null);

  // Dynamically import maplibre-gl (module namespace)
  useEffect(() => {
    let cancelled = false;
    import('maplibre-gl').then((module) => {
      if (!cancelled) setMaplibreModule(module);
    }).catch(() => {
      // ignore for now; loader will show
    });
    return () => { cancelled = true; };
  }, []);

  // Initialize map
  useEffect(() => {
    if (!maplibreModule || map.current || !mapContainer.current) return;

    // Indonesia bounds
    const indonesiaBounds = [
      [95, -11], // Southwest coordinates
      [141, 6]   // Northeast coordinates
    ];

    const { Map, NavigationControl } = maplibreModule;

    map.current = new Map({
      container: mapContainer.current,
      style: 'https://demotiles.maplibre.org/style.json', // Free tile service
      bounds: indonesiaBounds,
      fitBoundsOptions: { padding: 40 }
    });

    map.current.addControl(new NavigationControl(), 'top-right');

    map.current.on('moveend', () => {
      if (onBoundsChange) {
        const bounds = map.current.getBounds();
        onBoundsChange([
          [bounds.getWest(), bounds.getSouth()],
          [bounds.getEast(), bounds.getNorth()]
        ]);
      }
    });

    // Initial bounds callback
    if (onBoundsChange) {
      const bounds = map.current.getBounds();
      onBoundsChange([
        [bounds.getWest(), bounds.getSouth()],
        [bounds.getEast(), bounds.getNorth()]
      ]);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [maplibreModule, onBoundsChange]);

  // Update markers when features change
  useEffect(() => {
    if (!map.current || !maplibreModule) return;

    console.log('[MapView] Updating markers. Features count:', features.length);

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    const { Marker, Popup } = maplibreModule;

    // Add new markers
    features.forEach((feature) => {
      if (!feature.coords || feature.coords.length !== 2) return;

      const [lng, lat] = feature.coords;

      // Create marker element
      const el = document.createElement('div');
      el.className = 'map-marker';
      el.style.cssText = `
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: #1abc9c;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        cursor: pointer;
        transition: transform 0.2s;
      `;
      
      el.addEventListener('mouseenter', () => {
        el.style.transform = 'scale(1.2)';
      });
      
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'scale(1)';
      });

      // Create popup
      const popupContent = `
        <div style="min-width: 200px;">
          <h4 style="font-weight: 600; margin-bottom: 4px; color: #0f1720;">${feature.name}</h4>
          <p style="font-size: 13px; color: #64748b; margin-bottom: 8px;">${feature.entry_type || feature.type || ''}</p>
          ${feature.status_badge ? `<span style=\"display: inline-block; padding: 2px 8px; background: #7bd389; color: #0e3b33; border-radius: 12px; font-size: 11px; font-weight: 500;\">${feature.status_badge}</span>` : ''}
          <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #e5e7eb;">
            <a href="https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; gap: 4px; color: #1abc9c; text-decoration: none; font-size: 13px; font-weight: 500;">
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="10" r="3"></circle><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"></path></svg>
              Get Directions
            </a>
          </div>
        </div>
      `;

      const popup = new Popup({ offset: 25 }).setHTML(popupContent);

      const marker = new Marker({ element: el })
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(map.current);

      markers.current.push(marker);
    });
  }, [features, maplibreModule]);

  if (!maplibreModule) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <Navigation className="w-12 h-12 text-zwa-primary mx-auto mb-2 animate-pulse" />
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
}

