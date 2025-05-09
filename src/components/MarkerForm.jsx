// src/components/MarkerForm.jsx
import React, { useState, useEffect } from "react";
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    Timestamp,
    GeoPoint,
} from "firebase/firestore";
import { db } from "../firebase";

export default function MarkerForm({ selectedMarker, onFormSubmit, onDelete, latLng }) {
    const [formData, setFormData] = useState({
        cemeteryName: "",
        city: "",
        state: "",
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        dateOfDeath: "",
        imageOverlayUrl: "",
    });

    useEffect(() => {
        if (selectedMarker) {
            setFormData({
                cemeteryName: selectedMarker.cemeteryName || "",
                city: selectedMarker.city || "",
                state: selectedMarker.state || "",
                firstName: selectedMarker.firstName || "",
                lastName: selectedMarker.lastName || "",
                dateOfBirth: selectedMarker.dateOfBirth?.toDate().toISOString().split("T")[0] || "",
                dateOfDeath: selectedMarker.dateOfDeath?.toDate().toISOString().split("T")[0] || "",
                imageOverlayUrl: selectedMarker.imageOverlayUrl || "",
            });
        }
    }, [selectedMarker]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const markerData = {
            ...formData,
            dateOfBirth: Timestamp.fromDate(new Date(formData.dateOfBirth)),
            dateOfDeath: Timestamp.fromDate(new Date(formData.dateOfDeath)),
            plotLocation: new GeoPoint(
                latLng?.lat || selectedMarker?.plotLocation?.latitude || 0,
                latLng?.lng || selectedMarker?.plotLocation?.longitude || 0
            ),
        };

        try {
            if (selectedMarker?.id) {
                // Update
                await updateDoc(doc(db, "markers", selectedMarker.id), markerData);
            } else {
                // Add
                await addDoc(collection(db, "markers"), markerData);
            }

            onFormSubmit(); // Callback to refresh marker list or map
            setFormData({
                cemeteryName: "",
                city: "",
                state: "",
                firstName: "",
                lastName: "",
                dateOfBirth: "",
                dateOfDeath: "",
                imageOverlayUrl: "",
            });
        } catch (err) {
            console.error("Error saving marker:", err);
        }
    };

    const handleDelete = async () => {
        if (selectedMarker?.id) {
            await deleteDoc(doc(db, "markers", selectedMarker.id));
            onDelete?.();
        }
    };

    return (
        <form className="space-y-4 p-4" onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold">Add Markers:</h2>

            <div className="grid grid-cols-1 gap-2">
                <label className="block">
                    Cemetery Name:
                    <input
                        type="text"
                        name="cemeteryName"
                        value={formData.cemeteryName}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </label>

                <label className="block">
                    City:
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </label>

                <label className="block">
                    State:
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        maxLength={2}
                        required
                    />
                </label>

                <label className="block">
                    First Name:
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </label>

                <label className="block">
                    Last Name:
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </label>

                <label className="block">
                    Date of Birth:
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </label>

                <label className="block">
                    Date of Death:
                    <input
                        type="date"
                        name="dateOfDeath"
                        value={formData.dateOfDeath}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </label>

                <label className="block">
                    Image Overlay URL:
                    <input
                        type="text"
                        name="imageOverlayUrl"
                        value={formData.imageOverlayUrl}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </label>

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                    {selectedMarker?.id ? "Update Marker" : "Add Marker"}
                </button>

                {selectedMarker?.id && (
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Delete Marker
                    </button>
                )}
            </div>
        </form>
    );
}
