// src/components/MainMap.jsx
import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { GeoPoint } from "firebase/firestore";

// Fix default icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function MainMap({ markers = [], onMapClick, onMarkerClick }) {
    const mapRef = useRef(null);
    const markerLayerRef = useRef(null);

    useEffect(() => {
        if (mapRef.current) return;

        const map = L.map("map").setView([33.8848, -83.9597], 13);
        mapRef.current = map;

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; OpenStreetMap contributors',
            maxZoom: 19,
        }).addTo(map);

        const markerClusterGroup = L.markerClusterGroup();
        markerLayerRef.current = markerClusterGroup;
        map.addLayer(markerClusterGroup);

        map.on("click", (e) => {
            const { lat, lng } = e.latlng;
            if (onMapClick) onMapClick({ lat, lng });
        });
    }, []);

    useEffect(() => {
        const markerLayer = markerLayerRef.current;
        if (!markerLayer) return;

        markerLayer.clearLayers();

        markers.forEach((marker) => {
            const { plotLocation, firstName, lastName, cemeteryName } = marker;
            let lat = plotLocation?.latitude || 0;
            let lng = plotLocation?.longitude || 0;

            const leafletMarker = L.marker([lat, lng]);
            leafletMarker.bindPopup(`
        <strong>${firstName} ${lastName}</strong><br/>
        Cemetery: ${cemeteryName || "N/A"}
      `);

            leafletMarker.on("click", () => {
                if (onMarkerClick) onMarkerClick(marker);
            });

            markerLayer.addLayer(leafletMarker);
        });
    }, [markers]);

    return (
        <div id="map" className="h-full w-full z-0 rounded min-h-[350px]" />
    );
}
