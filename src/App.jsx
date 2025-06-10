// src/App.jsx
import MainMap from "./components/MainMap";
import MarkerSidebar from "./components/MarkerSidebar";
import useMarkers from "./hooks/useMarkers";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const { markers, fetchMarkers } = useMarkers();
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [clickedLatLng, setClickedLatLng] = useState(null);

  return (
    <div className="min-h-screen flex flex-col">

      <header className="container-fluid"><Navbar /></header>

        {/* Map + Sidebar layout */}
        <div className="flex flex-col md:flex-row-reverse flex-grow text-gray-900 bg-white">
          <aside className="w-full md:w-96 bg-white flex-shrink-0 flex flex-col overflow-y-auto md:h-full">
            <div className="flex-1 overflow-y-auto p-4 space-y-6 overflow-x-hidden">
              <MarkerSidebar
                selectedMarker={selectedMarker}
                onFormSubmit={fetchMarkers}
                onDelete={fetchMarkers}
                latLng={clickedLatLng}
                markers={markers}
                onSelectMarker={(marker) => {
                  setSelectedMarker(marker);
                  setClickedLatLng(null);
                }}
              />
            </div>
          </aside>

          <main className="flex-grow">
            <MainMap
              markers={markers}
              onMapClick={(latlng) => {
                setClickedLatLng(latlng);
                setSelectedMarker(null);
              }}
              onMarkerClick={setSelectedMarker}
            />
          </main>
        </div>

  <footer className="pb-9"><Footer /></footer>

</div>

  );
}

export default App;
