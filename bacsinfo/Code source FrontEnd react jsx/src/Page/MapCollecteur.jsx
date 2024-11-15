import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import axios from 'axios';

const MapCollecteur = () => {
  const mapRef = useRef(null); // Référence pour la carte
  const [bacs, setBacs] = useState([]); // Liste des bacs
  const [userPosition, setUserPosition] = useState(null); // Pour stocker la position actuelle de l'utilisateur
  const [currentDateTime, setCurrentDateTime] = useState(new Date()); // Pour stocker la date et l'heure actuelles
  const [notification, setNotification] = useState(''); // État pour la notification
  let routeControl; // Variable pour gérer la route

  // Mettre à jour la date et l'heure toutes les secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // Nettoyage de l'intervalle lors du démontage
  }, []);

  // Initialiser la carte et récupérer les bacs
  useEffect(() => {
    const map = L.map(mapRef.current).setView([-21.4542, 47.0807], 12); // Coordonnées de Fianarantsoa

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Leaflet &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map);

    const bacIcon = L.icon({
      iconUrl: '/bacIcone.png',
      iconSize: [20, 20],
    });

    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userCoords = [position.coords.latitude, position.coords.longitude];
            map.setView(userCoords, 10);
            setUserPosition(userCoords);
            L.marker(userCoords).addTo(map).bindPopup("Vous êtes ici").openPopup();
          },
          () => {
            alert("Erreur lors de la récupération de votre position.");
          }
        );
      } else {
        alert("La géolocalisation n'est pas supportée par ce navigateur.");
      }
    };

    getUserLocation();

    const fetchBacs = (latitude, longitude) => {
      axios.get(`http://localhost:8080/api/bacs/get?lat=${latitude}&lng=${longitude}`)
        .then((response) => {
          setBacs(response.data);
          response.data.forEach((bac) => {
            const bacLabel = L.divIcon({
              className: 'bac-label',
              html: `<div style="background: white; padding: 2px; border-radius: 3px; border: 1px solid black;">${bac.numBac}</div>`,
              iconSize: [30, 20],
              iconAnchor: [15, -10],
            });

            L.marker([bac.latitude, bac.longitude], { icon: bacIcon })
              .addTo(map)
              .bindPopup(() => getBacPopupContent(bac))
              .on('click', () => handleBacClick(bac));

            L.marker([bac.latitude, bac.longitude], { icon: bacLabel }).addTo(map);
          });
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des bacs :", error);
        });
    };

    if (userPosition) {
      fetchBacs(userPosition[0], userPosition[1]);
    }

    const handleBacClick = (bac) => {
      if (userPosition) {
        if (routeControl) {
          map.removeControl(routeControl);
        }

        routeControl = L.Routing.control({
          waypoints: [
            L.latLng(userPosition[0], userPosition[1]),
            L.latLng(bac.latitude, bac.longitude),
          ],
          routeWhileDragging: true,
          language: 'fr',
        }).addTo(map);
      }
    };

    return () => {
      map.off();
      map.remove();
    };
  }, [userPosition]);

  // Fonction pour générer le contenu du popup avec le bouton "Collecter"
  const getBacPopupContent = (bac) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <p>Bac n° ${bac.numBac}</p>
      <p>Type: ${bac.typeBac}</p>
      <p>Statut: ${bac.status}</p>
    `;

    const button = document.createElement('button');
    button.innerText = 'Collecter';
    button.addEventListener('click', () => handleCollect(bac.numBac));
    div.appendChild(button);

    return div;
  };

  // Gérer l'action de collecte d'un bac
  const handleCollect = async (bacNum) => {
    const collecte = {
      numBac: bacNum,
      tempsCollecte: formatDateTime(new Date()), // Utiliser la date actuelle
    };

    try {
      // Envoyer les données de collecte à l'API pour les enregistrer dans la base de données
      await axios.post('http://localhost:8080/api/collectes/post', collecte);
      // Mettre à jour l'état de notification
      setNotification(`Bac n° ${bacNum} collecté avec succès!`);
      // Effacer la notification après 3 secondes
      setTimeout(() => {
        setNotification('');
      }, 3000);
    } catch (error) {
      console.error("Erreur lors de la collecte :", error);
    }
  };

  // Format de la date et heure
  const formatDateTime = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('fr-FR', options);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      {/* Div pour afficher la date et l'heure */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '50px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '10px',
        borderRadius: '8px',
        zIndex: 1000,
        fontSize: '14px',
        fontWeight: 'bold',
      }}>
        {formatDateTime(currentDateTime)}
      </div>

      {/* Notification de collecte */}
      {notification && (
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(0, 128, 0, 0.5)', // Vert transparent
          color: 'white',
          padding: '10px 20px',
          borderRadius: '8px',
          zIndex: 1000,
          fontSize: '16px',
          textAlign: 'center',
        }}>
          {notification}
        </div>
      )}

      {/* Carte */}
      <div id="map" ref={mapRef} style={{ width: '100%', height: '100vh' }} />
    </div>
  );
};


export default MapCollecteur;
