// src/components/OverlayUploader.jsx
import { useState } from "react";
import { db, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

export default function OverlayUploader() {
    const [name, setName] = useState("");
    const [file, setFile] = useState(null);
    const [southWest, setSouthWest] = useState("");
    const [northEast, setNorthEast] = useState("");
    const [loading, setLoading] = useState(false);

    const handleUpload = async () => {
        if (!name || !file || !southWest || !northEast) {
            alert("Please fill out all fields.");
            return;
        }

        try {
            setLoading(true);

            const sw = southWest.split(",").map(Number);
            const ne = northEast.split(",").map(Number);

            if (sw.length !== 2 || ne.length !== 2 || sw.some(isNaN) || ne.some(isNaN)) {
                alert("Invalid coordinates. Use format: lat,lng");
                return;
            }

            const fileRef = ref(storage, `overlays/${file.name}`);
            await uploadBytes(fileRef, file);
            const imageUrl = await getDownloadURL(fileRef);

            await addDoc(collection(db, "overlays"), {
                name,
                imageUrl,
                bounds: {
                    southWest: sw,
                    northEast: ne,
                },
                timestamp: Date.now(),
            });

            alert("Overlay uploaded successfully!");
            setName("");
            setFile(null);
            setSouthWest("");
            setNorthEast("");
        } catch (err) {
            console.error("Upload error:", err);
            alert("Failed to upload overlay.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 bg-white rounded shadow max-w-md w-full space-y-2">
            <h2 className="text-lg font-bold">Upload Cemetery Overlay</h2>

            <input
                type="text"
                placeholder="Cemetery Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border px-2 py-1 rounded"
            />

            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full"
            />

            <input
                type="text"
                placeholder="SouthWest (lat,lng)"
                value={southWest}
                onChange={(e) => setSouthWest(e.target.value)}
                className="w-full border px-2 py-1 rounded"
            />

            <input
                type="text"
                placeholder="NorthEast (lat,lng)"
                value={northEast}
                onChange={(e) => setNorthEast(e.target.value)}
                className="w-full border px-2 py-1 rounded"
            />

            <button
                onClick={handleUpload}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
                {loading ? "Uploading..." : "Upload Overlay"}
            </button>
        </div>
    );
}
