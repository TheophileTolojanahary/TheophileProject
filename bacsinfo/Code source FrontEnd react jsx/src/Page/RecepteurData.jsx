import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/RecepteurData.css";

const RecepteurData = () => {
    const [percentage, setPercentage] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://192.168.4.1/data", {
                    timeout: 5000, // Timeout après 5 secondes
                });
                if (response.status === 200) {
                    setPercentage(response.data.distance);
                    setError(null); // Effacer l'erreur si requête réussie
                } else {
                    console.error("Erreur serveur:", response.status);
                    setError("Erreur serveur");
                }
            } catch (error) {
                console.error("Erreur réseau:", error);
                setError("Erreur réseau : vérifier la connexion.");
            }
        };

        // Exécuter fetchData toutes les 2 secondes
        const interval = setInterval(fetchData, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="receiver-container">
            <h2>Pourcentage de la mesure</h2>
            <div className="slider-container">
                <input type="range" min="0" max="100" value={percentage} readOnly />
                <span className="percentage-display">{percentage}%</span>
            </div>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default RecepteurData;
