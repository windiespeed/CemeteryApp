// src/components/Footer.jsx
import React from "react";

export default function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 w-full bg-gray-100 text-center text-sm py-2 border-t border-gray-300 z-50">
            &copy; {new Date().getFullYear()} Cemetery Map App. All rights reserved.
        </footer>
    );
}
