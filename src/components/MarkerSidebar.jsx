// src/components/MarkerSidebar.jsx
import React from "react";
import MarkerForm from "./MarkerForm";
import MarkerList from "./MarkerList";

export default function MarkerSidebar({
    selectedMarker,
    onFormSubmit,
    onDelete,
    latLng,
    markers,
    onSelectMarker,
}) {
    return (
        < aside className = "w-full md:w-96 bg-white flex-shrink-0 flex flex-col overflow-y-auto overflow-x-hidden md:h-full">
            <div className="p-4 border-b">
                <h1 className="text-2xl font-bold">Cemetery Marker Manager</h1>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                <MarkerForm
                    selectedMarker={selectedMarker}
                    onFormSubmit={onFormSubmit}
                    onDelete={onDelete}
                    latLng={latLng}
                />

                <hr className="my-4" />

                <MarkerList
                    markers={markers}
                    onSelectMarker={onSelectMarker}
                />
            </div>
        </aside>
    );
}
