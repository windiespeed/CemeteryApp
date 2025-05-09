// src/hooks/useMarkers.js
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function useMarkers() {
    const [markers, setMarkers] = useState([]);

    const fetchMarkers = async () => {
        const snapshot = await getDocs(collection(db, "markers"));
        const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        setMarkers(data);
    };

    useEffect(() => {
        fetchMarkers();
    }, []);

    return { markers, fetchMarkers };
}
