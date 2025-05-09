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
    <div>

      <header class="container-fluid"><Navbar /></header>

      <div className="flex flex-col md:flex-row-reverse h-screen text-gray-900 bg-white">

        {/* Sidebar (on right in desktop, on top in mobile) */}
        <aside className="w-full md:w-96 bg-white flex-shrink-0 flex flex-col overflow-y-auto md:h-full">

          <div className="flex-1 overflow-y-auto p-4 space-y-6 overflow-x-hidden">
            {/* Marker Form */}
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

        {/* Main Map Area */}
        <main className="flex-1 h-96 md:h-full">
          <MainMap
            markers={markers}
            onMapClick={(latlng) => {
              setClickedLatLng(latlng);
              setSelectedMarker(null); // Clear form for new marker
            }}
            onMarkerClick={setSelectedMarker}
          />
        </main>

      </div>

      <footer><Footer /></footer>

    </div>
  );
}

export default App;
