// src/components/Navbar.jsx
import React from "react";
import SearchBar from "./SearchBar";

function Navbar() {
    return (
        <nav className="flex items-center justify-between bg-gray-800 text-white px-6 py-4 shadow-md">
            {/* Logo/Title */}
            <div className="text-xl font-bold tracking-wide">Cemetery Map</div>

            {/* Search */}
            <div className="flex items-center">
                <SearchBar />
            </div>

            {/* Future buttons / links */}
            <div></div>
        </nav>
    );
}

export default Navbar;
