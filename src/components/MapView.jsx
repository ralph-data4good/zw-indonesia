import { useEffect, useRef, useState } from 'react';
import { Navigation } from 'lucide-react';

export default function MapView({ features = [], onBoundsChange }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);
  const [maplibreModule, setMaplibreModule] = useState(null);
  const [mapReady, setMapReady] = useState(false);

  // Dynamically import maplibre-gl and CSS
  useEffect(() => {
    let cancelled = false;
    
    // Import CSS first
    import('maplibre-gl/dist/maplibre-gl.css');
    
    // Then import JS
    import('maplibre-gl').then((module) => {
      if (!cancelled) {
        console.log('[MapView] MapLibre GL loaded successfully');
        setMaplibreModule(module);
      }
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
        center: [118, -2], // Center of Indonesia
        zoom: 4,
        bounds: indonesiaBounds,
        fitBoundsOptions: { 
          padding: { top: 50, bottom: 50, left: 50, right: 50 },
          maxZoom: 12
        }
      });

      map.current.addControl(new NavigationControl(), 'top-right');

      map.current.on('load', () => {
        console.log('[MapView] Map loaded successfully');
        setMapReady(true);
        
        if (onBoundsChange && map.current) {
          const bounds = map.current.getBounds();
          onBoundsChange([
            [bounds.getWest(), bounds.getSouth()],
            [bounds.getEast(), bounds.getNorth()]
          ]);
        }
      });

      map.current.on('moveend', () => {
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
        setMapReady(false);
      }
    };
  }, [maplibreModule, onBoundsChange]);

  // Update markers when features change
  useEffect(() => {
    if (!map.current || !maplibreModule || !mapReady) {
      console.log('[MapView] Waiting for map to be ready...');
      return;
    }

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

    if (features.length === 0) {
      console.log('[MapView] No features to display');
      return;
    }

    const { Marker, Popup } = maplibreModule;

    let validMarkers = 0;

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
        el.className = 'custom-map-marker';
        el.style.cssText = `
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #2179B3;
          border: 4px solid white;
          box-shadow: 0 3px 12px rgba(33, 121, 179, 0.5);
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        `;
        
        // Add inner dot for better visibility
        const innerDot = document.createElement('div');
        innerDot.style.cssText = `
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: white;
        `;
        el.appendChild(innerDot);
        
        el.addEventListener('mouseenter', () => {
          el.style.transform = 'scale(1.4)';
          el.style.boxShadow = '0 5px 20px rgba(33, 121, 179, 0.7)';
          el.style.zIndex = '1000';
        });
        
        el.addEventListener('mouseleave', () => {
          el.style.transform = 'scale(1)';
          el.style.boxShadow = '0 3px 12px rgba(33, 121, 179, 0.5)';
          el.style.zIndex = '';
        });

        // Create popup with ZWA branding
        const popupContent = `
          <div style="min-width: 240px; font-family: Inter, sans-serif; padding: 4px;">
            <h4 style="font-weight: 700; font-size: 17px; margin-bottom: 8px; color: #111827; line-height: 1.3;">${feature.name}</h4>
            <p style="font-size: 14px; color: #4B5563; margin-bottom: 12px; font-weight: 500;">${feature.entry_type || feature.type || ''}</p>
            ${feature.status_badge === 'verified' ? `<span style="display: inline-flex; align-items: center; gap: 4px; padding: 5px 12px; background: #489E4A; color: white; border-radius: 999px; font-size: 11px; font-weight: 600; margin-bottom: 12px;">
              <svg width="12" height="12" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
              Verified
            </span>` : ''}
            ${feature.city ? `<p style="font-size: 13px; color: #6B7280; margin-top: 10px; display: flex; align-items: center; gap: 6px;">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>
              ${feature.city}, ${feature.province || feature.country || 'Indonesia'}
            </p>` : ''}
            <div style="margin-top: 14px; padding-top: 14px; border-top: 1px solid #E5E7EB;">
              <a href="https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 8px; color: #2179B3; text-decoration: none; font-size: 14px; font-weight: 600;">
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="10" r="3"></circle><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"></path></svg>
                Get Directions
              </a>
            </div>
          </div>
        `;

        const popup = new Popup({ 
          offset: 35,
          closeButton: true,
          closeOnClick: true,
          maxWidth: '320px'
        }).setHTML(popupContent);

        const marker = new Marker({ element: el })
          .setLngLat([lng, lat])
          .setPopup(popup)
          .addTo(map.current);

        markers.current.push(marker);
        validMarkers++;

        console.log(`[MapView] ✓ Marker ${validMarkers}: ${feature.name} at [${lng}, ${lat}]`);
      } catch (error) {
        console.error('[MapView] Error creating marker for feature:', feature.name, error);
      }
    });

    console.log(`[MapView] Successfully added ${validMarkers} markers out of ${features.length} features`);
  }, [features, maplibreModule, mapReady]);

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
      {!mapReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-100/80">
          <div className="text-center">
            <Navigation className="w-10 h-10 text-primary mx-auto mb-2 animate-pulse" />
            <p className="text-sm text-fg-muted font-medium">Initializing map...</p>
          </div>
        </div>
      )}
    </div>
  );
}
