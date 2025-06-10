// src/components/OverlayEditor.jsx
import { useEffect, useState } from "react";
import { db, storage } from "../firebase";
import {
    collection,
    getDocs,
    doc,
    updateDoc,
} from "firebase/firestore";
import {
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";

export default function OverlayEditor() {
    const [overlays, setOverlays] = useState([]);
    const [selectedId, setSelectedId] = useState("");
    const [form, setForm] = useState({
        name: "",
        southWest: "",
        northEast: "",
        file: null,
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchOverlays = async () => {
            const snapshot = await getDocs(collection(db, "overlays"));
            const docs = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setOverlays(docs);
        };
        fetchOverlays();
    }, []);

    const handleSelect = (id) => {
        const overlay = overlays.find((o) => o.id === id);
        setSelectedId(id);
        setForm({
            name: overlay.name || "",
            southWest: overlay.bounds?.southWest?.join(",") || "",
            northEast: overlay.bounds?.northEast?.join(",") || "",
            file: null,
        });
    };

    const handleUpdate = async () => {
        if (!selectedId || !form.name || !form.southWest || !form.northEast) {
            alert("All fields are required.");
            return;
        }

        try {
            setLoading(true);

            const sw = form.southWest.split(",").map(Number);
            const ne = form.northEast.split(",").map(Number);

            const docRef = doc(db, "overlays", selectedId);
            let updateData = {
                name: form.name,
                bounds: {
                    southWest: sw,
                    northEast: ne,
                },
            };

            if (form.file) {
                const storageRef = ref(storage, `overlays/${form.file.name}`);
                await uploadBytes(storageRef, form.file);
                const imageUrl = await getDownloadURL(storageRef);
                updateData.imageUrl = imageUrl;
            }

            await updateDoc(docRef, updateData);
            alert("Overlay updated!");

        } catch (err) {
            console.error("Update error:", err);
            alert("Failed to update overlay.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 bg-white rounded shadow max-w-md space-y-3">
            <h2 className="text-lg font-bold">Edit Overlay</h2>

            <select
                className="w-full border p-2 rounded"
                onChange={(e) => handleSelect(e.target.value)}
                value={selectedId}
            >
                <option value="">Select an overlay</option>
                {overlays.map((overlay) => (
                    <option key={overlay.id} value={overlay.id}>
                        {overlay.name}
                    </option>
                ))}
            </select>

            {selectedId && (
                <>
                    <input
                        type="text"
                        className="w-full border px-2 py-1 rounded"
                        placeholder="Overlay Name"
                        value={form.name}
                        onChange={(e) =>
                            setForm((f) => ({ ...f, name: e.target.value }))
                        }
                    />
                    <input
                        type="text"
                        className="w-full border px-2 py-1 rounded"
                        placeholder="SouthWest (lat,lng)"
                        value={form.southWest}
                        onChange={(e) =>
                            setForm((f) => ({ ...f, southWest: e.target.value }))
                        }
                    />
                    <input
                        type="text"
                        className="w-full border px-2 py-1 rounded"
                        placeholder="NorthEast (lat,lng)"
                        value={form.northEast}
                        onChange={(e) =>
                            setForm((f) => ({ ...f, northEast: e.target.value }))
                        }
                    />
                    <input
                        type="file"
                        onChange={(e) =>
                            setForm((f) => ({ ...f, file: e.target.files[0] }))
                        }
                    />
                    <button
                        onClick={handleUpdate}
                        disabled={loading}
                        className="bg-green-600 text-white px-4 py-2 rounded w-full"
                    >
                        {loading ? "Updating..." : "Update Overlay"}
                    </button>
                </>
            )}
        </div>
    );
}
