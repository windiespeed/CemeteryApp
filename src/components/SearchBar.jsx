// src/components/SearchBar.jsx
import { useState } from "react";
import { X, Search } from "lucide-react"; // or Heroicons if you prefer

function SearchBar() {
    const [query, setQuery] = useState("");

    return (
        <div className="relative w-64">
            {/* Search icon (left) */}
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

            {/* Input */}
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search markers..."
                className="w-full pl-10 pr-10 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />

            {/* Clear button (right) */}
            {query && (
                <button
                    onClick={() => setQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                    <X className="w-5 h-5" />
                </button>
            )}
        </div>
    );
}

export default SearchBar;
