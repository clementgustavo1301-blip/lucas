"use client";

import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface MinimalMapProps {
  center: [number, number];
  zoom?: number;
}

export function MinimalMap({ center, zoom = 14 }: MinimalMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json", // Minimalist dark style to match branding
      center: center,
      zoom: zoom,
      attributionControl: false,
    });

    // Add navigation controls
    map.current.addControl(new maplibregl.NavigationControl({ showCompass: false }), "bottom-right");

    // Add a custom marker
    const markerEl = document.createElement("div");
    markerEl.className = "w-5 h-5 bg-gold rounded-full border-[3px] border-white shadow-[0_0_15px_rgba(197,168,128,0.5)]";
    
    new maplibregl.Marker({ element: markerEl })
      .setLngLat(center)
      .addTo(map.current);

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [center, zoom]);

  return <div ref={mapContainer} className="w-full h-full" />;
}
