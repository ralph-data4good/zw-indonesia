import { useEffect, useRef, useState } from 'react';
import { Navigation } from 'lucide-react';

export default function MapView({ features = [], onBoundsChange }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);
  const [maplibreModule, setMaplibreModule] = useState(null);

  // Dynamically import maplibre-gl
  useEffect(() => {
    let cancelled = false;
    import('maplibre-gl').then((module) => {
      if (!cancelled) setMaplibreModule(module);
    }).catch((err) => {
      console.error('[MapView] Failed to load maplibre-gl:', err);
    });
    return () => { cancelled = true; };
  }, []);

  // Initialize map
  useEffect(() => {
    if (!maplibreModule || map.current || !mapContainer.current) return;

    const indonesiaBounds = [
      [95, -11],   // Southwest
      [141, 6]     // Northeast
    ];

    const { Map, NavigationControl } = maplibreModule;

    try {
      map.current = new Map({
        container: mapContainer.current,
        style: 'https://demotiles.maplibre.org/style.json',
        bounds: indonesiaBounds,
        fitBoundsOptions: { padding: 40 }
      });

      map.current.addControl(new NavigationControl(), 'top-right');

      map.current.on('moveend', () => {
        if (onBoundsChange && map.current) {
          const bounds = map.current.getBounds();
          onBoundsChange([
            [bounds.getWest(), bounds.getSouth()],
            [bounds.getEast(), bounds.getNorth()]
          ]);
        }
      });

      // Wait for map to load before triggering initial bounds
      map.current.on('load', () => {
        if (onBoundsChange && map.current) {
          const bounds = map.current.getBounds();
          onBoundsChange([
            [bounds.getWest(), bounds.getSouth()],
            [bounds.getEast(), bounds.getNorth()]
          ]);
        }
      });

      console.log('[MapView] Map initialized successfully');
    } catch (error) {
      console.error('[MapView] Error initializing map:', error);
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
    markers.current.forEach(marker => {
      try {
        marker.remove();
      } catch (e) {
        console.warn('[MapView] Error removing marker:', e);
      }
    });
    markers.current = [];

    const { Marker, Popup } = maplibreModule;

    // Add new markers
    features.forEach((feature, index) => {
      if (!feature.coords || feature.coords.length !== 2) {
        console.warn('[MapView] Invalid coords for feature:', feature.name);
        return;
      }

      const [lng, lat] = feature.coords;

      // Validate coordinates
      if (isNaN(lng) || isNaN(lat)) {
        console.warn('[MapView] Invalid coordinate values for feature:', feature.name, lng, lat);
        return;
      }

      try {
        // Create marker element with ZWA primary color
        const el = document.createElement('div');
        el.className = 'map-marker';
        el.style.cssText = `
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background-color: #2179B3;
          border: 3px solid white;
          box-shadow: 0 2px 10px rgba(33, 121, 179, 0.4);
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        `;
        
        el.addEventListener('mouseenter', () => {
          el.style.transform = 'scale(1.3)';
          el.style.boxShadow = '0 4px 15px rgba(33, 121, 179, 0.6)';
        });
        
        el.addEventListener('mouseleave', () => {
          el.style.transform = 'scale(1)';
          el.style.boxShadow = '0 2px 10px rgba(33, 121, 179, 0.4)';
        });

        // Create popup with ZWA branding
        const popupContent = `
          <div style="min-width: 220px; font-family: Inter, sans-serif;">
            <h4 style="font-weight: 700; font-size: 16px; margin-bottom: 6px; color: #111827; line-height: 1.3;">${feature.name}</h4>
            <p style="font-size: 13px; color: #4B5563; margin-bottom: 10px; font-weight: 500;">${feature.entry_type || feature.type || ''}</p>
            ${feature.status_badge === 'verified' ? `<span style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; background: #489E4A; color: white; border-radius: 999px; font-size: 11px; font-weight: 600; margin-bottom: 10px;">
              <svg width="12" height="12" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
              Verified
            </span>` : ''}
            ${feature.city ? `<p style="font-size: 12px; color: #6B7280; margin-top: 8px;">📍 ${feature.city}, ${feature.country || 'Indonesia'}</p>` : ''}
            <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #E5E7EB;">
              <a href="https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 6px; color: #2179B3; text-decoration: none; font-size: 13px; font-weight: 600;">
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="10" r="3"></circle><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"></path></svg>
                Get Directions
              </a>
            </div>
          </div>
        `;

        const popup = new Popup({ 
          offset: 30,
          closeButton: true,
          closeOnClick: true,
          maxWidth: '300px'
        }).setHTML(popupContent);

        const marker = new Marker({ element: el })
          .setLngLat([lng, lat])
          .setPopup(popup)
          .addTo(map.current);

        markers.current.push(marker);

        console.log(`[MapView] Added marker ${index + 1}/${features.length}: ${feature.name} at [${lng}, ${lat}]`);
      } catch (error) {
        console.error('[MapView] Error creating marker for feature:', feature.name, error);
      }
    });

    console.log(`[MapView] Total markers added: ${markers.current.length}`);
  }, [features, maplibreModule]);

  if (!maplibreModule) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-neutral-100">
        <div className="text-center">
          <Navigation className="w-12 h-12 text-primary mx-auto mb-3 animate-pulse" />
          <p className="text-fg-muted font-medium">Loading map...</p>
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
