import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import '../style/carte.css'; // Assurez-vous d'importer le fichier CSS

const Carte = () => {
    const mapRef = useRef(null);
    const navigate = useNavigate(); // Utiliser useNavigate
    const [coordinates, setCoordinates] = useState({ latitude: '', longitude: '' }); // État pour les coordonnées

    useEffect(() => {
        // Initialiser la carte
        const map = L.map(mapRef.current).setView([-21.4542, 47.0807], 11); // Coordonnées de Fianarantsoa comme valeur par défaut

        // Ajouter les tuiles de carte
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: 'Leaflet &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>',
            maxZoom: 18
        }).addTo(map);

        // Définir une icône de taxi (si nécessaire)
        const taxiIcon = L.icon({
            iconUrl: 'img/taxi.png', // Assurez-vous que ce chemin est correct
            iconSize: [70, 70]
        });

        // Ajouter un marqueur à Fianarantsoa
        const marker = L.marker([-21.4542, 47.0807], { icon: taxiIcon }).addTo(map);

        // Obtenir la position actuelle
        let userCoords;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                userCoords = [position.coords.latitude, position.coords.longitude];

                // Centrer la carte sur la position actuelle
                map.setView(userCoords, 13); // Zoom niveau 13

                // Ajouter un marqueur pour la position actuelle
                L.marker(userCoords).addTo(map).bindPopup("Vous êtes ici").openPopup();

                // Optionnel : Vous pouvez définir le marqueur de taxi sur votre position actuelle
                marker.setLatLng(userCoords);
            }, () => {
                alert("Erreur lors de la récupération de votre position.");
            });
        } else {
            alert("La géolocalisation n'est pas supportée par ce navigateur.");
        }

        // Variables pour gérer la route et le marqueur cliqué
        let routeControl;
        let clickedMarker;

        // Événement pour ajouter un marqueur lors d'un clic sur la carte
        map.on('click', e => {
            // Supprimez l'ancienne route si elle existe
            if (routeControl) {
                map.removeControl(routeControl);
            }

            // Supprimez l'ancien marqueur cliqué
            if (clickedMarker) {
                map.removeLayer(clickedMarker);
            }

            // Créer un nouveau marqueur à la position cliquée
            clickedMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);

            // Mettre à jour l'état avec les coordonnées
            setCoordinates({ latitude: e.latlng.lat.toFixed(5), longitude: e.latlng.lng.toFixed(5) });

            // Créer un contrôle de routage pour tracer la route
            routeControl = L.Routing.control({
                waypoints: [
                    L.latLng(marker.getLatLng().lat, marker.getLatLng().lng), // Départ à la position actuelle
                    L.latLng(e.latlng.lat, e.latlng.lng) // Destination
                ],
                routeWhileDragging: true, // Permet de tracer la route pendant que vous déplacez le marqueur
                language: 'fr' // Définit la langue en français pour les instructions de routage
            }).addTo(map);
        });

        // Nettoyage lors du démontage du composant
        return () => {
            map.remove();
        };
    }, []);

    const handleAddCoordinates = () => {
        navigate("/gestion-du-bac", {
            state: {
                lat: coordinates.latitude,
                lng: coordinates.longitude
            }
        });
    };

    return (
        <div>
            <div className="coordinates-display">
                Longitude: {coordinates.longitude}, Latitude: {coordinates.latitude}
                <button className="add-button" onClick={handleAddCoordinates}>Ajouter</button> {/* Bouton "Ajouter" */}
            </div>
            <div ref={mapRef} style={{ width: '100%', height: '100vh' }}></div>
        </div>
    );
};

export default Carte;
