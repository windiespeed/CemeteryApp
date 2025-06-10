// src/components/MarkerSidebar.jsx
import React, { useState, useEffect } from "react";
import MarkerForm from "./MarkerForm";
import MarkerList from "./MarkerList";
import OverlayUploader from "./OverlayUploader";
import OverlayEditor from "./OverlayEditor";
import { FaMapMarkerAlt, FaImage, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function MarkerSidebar({
    selectedMarker,
    onFormSubmit,
    onDelete,
    latLng,
    markers,
    onSelectMarker,
}) {
    const [activeTab, setActiveTab] = useState("markers");
    const [collapsed, setCollapsed] = useState(false);
    const [hasUserToggled, setHasUserToggled] = useState(false);

    useEffect(() => {
        if (hasUserToggled) return;
        const mediaQuery = window.matchMedia("(max-width: 767px)");
        const handleResize = () => setCollapsed(mediaQuery.matches);
        handleResize();
        mediaQuery.addEventListener("change", handleResize);
        return () => mediaQuery.removeEventListener("change", handleResize);
    }, [hasUserToggled]);

    const handleCollapse = () => {
        setHasUserToggled(true);
        setCollapsed(true);
    };

    const handleExpand = () => {
        setHasUserToggled(true);
        setCollapsed(false);
    };

    if (collapsed) {
        return (
            <div className="bg-white border-r shadow-lg h-full flex flex-col transition-all duration-300 ease-in-out">
                <button
                    onClick={handleExpand}
                    className="p-2 hover:bg-gray-100 text-gray-600"
                >
                    <FaChevronRight size={20} />
                </button>
            </div>
        );
    }

    return (
        <aside className="w-full md:w-96 bg-white flex-shrink-0 flex flex-col md:h-full border-r shadow-lg transition-all duration-300 ease-in-out">
            <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
                <h1 className="text-2xl font-bold">Cemetery Tools</h1>
                <button
                    onClick={handleCollapse}
                    className="p-2 rounded hover:bg-gray-100 text-gray-600"
                >
                    <FaChevronLeft size={20} />
                </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b">
                <button
                    className={`flex-1 p-3 text-center font-medium transition-colors duration-300 ${activeTab === "markers" ? "bg-gray-200" : "hover:bg-gray-100"
                        }`}
                    onClick={() => setActiveTab("markers")}
                >
                    <FaMapMarkerAlt className="inline mr-1" /> Markers
                </button>
                <button
                    className={`flex-1 p-3 text-center font-medium transition-colors duration-300 ${activeTab === "overlays" ? "bg-gray-200" : "hover:bg-gray-100"
                        }`}
                    onClick={() => setActiveTab("overlays")}
                >
                    <FaImage className="inline mr-1" /> Overlays
                </button>
            </div>

            {/* Tab Panels */}
            <div className="flex-1 overflow-y-auto p-4">
                <div
                    className={`transition-opacity duration-300 ease-in-out ${activeTab === "markers" ? "opacity-100 max-h-full" : "opacity-0 max-h-0 overflow-hidden"
                        }`}
                >
                    <MarkerForm
                        selectedMarker={selectedMarker}
                        onFormSubmit={onFormSubmit}
                        onDelete={onDelete}
                        latLng={latLng}
                    />
                    <MarkerList
                        markers={markers}
                        onSelectMarker={onSelectMarker}
                    />
                </div>

                <div
                    className={`transition-opacity duration-300 ease-in-out ${activeTab === "overlays" ? "opacity-100 max-h-full" : "opacity-0 max-h-0 overflow-hidden"
                        }`}
                >
                    <OverlayUploader />
                    <OverlayEditor />
                </div>
            </div>
        </aside>
    );
}
