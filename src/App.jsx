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

      <header className="container-fluid sticky top-0 z-100"><Navbar /></header>

        {/* Map + Sidebar layout */}
        <div className="flex flex-col md:flex-row-reverse flex-grow text-gray-900 bg-white">
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
