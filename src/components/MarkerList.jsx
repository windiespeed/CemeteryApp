// src/components/MarkerList.jsx
import React from "react";

export default function MarkerList({ markers, onSelectMarker }) {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">All Markers</h2>
            <ul className="space-y-2">
                {markers.map((marker) => (
                    <li
                        key={marker.id}
                        className="p-2 border rounded cursor-pointer hover:bg-gray-100"
                        onClick={() => onSelectMarker(marker)}
                    >
                        <strong>{marker.firstName} {marker.lastName}</strong><br />
                        <span className="text-sm text-gray-600">{marker.cemeteryName}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
