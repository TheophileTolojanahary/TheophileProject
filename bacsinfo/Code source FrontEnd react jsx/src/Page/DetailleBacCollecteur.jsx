import React, { useEffect, useState } from 'react';
import '../style/detailleBacCollecteur.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';

const DetailleBacCollecteur = () => {
  const [bacs, setBacs] = useState([]); // Stockage des données des bacs
  const [currentPage, setCurrentPage] = useState(0); // Page actuelle pour la pagination
  const [selectedBac, setSelectedBac] = useState(''); // État pour le bac sélectionné
  const [sliderValue, setSliderValue] = useState(0); // Valeur du slider
  const [notification, setNotification] = useState({ visible: false, message: '' }); // Notification
  const itemsPerPage = 6; // Nombre de bacs affichés par page
  let notificationTimeout; // Variable pour gérer le timeout de la notification

  // Récupération des données des bacs depuis l'API
  useEffect(() => {
    const fetchBacs = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/bacs/get'); // Adapter l'URL si nécessaire
        const data = await response.json();
        // Initialiser chaque bac avec un niveau par défaut de 0
        const bacsWithDefaultLevels = data.map(bac => ({ ...bac, niveau: 0 }));
        setBacs(bacsWithDefaultLevels);

        // Définir le premier bac comme sélectionné par défaut
        if (bacsWithDefaultLevels.length > 0) {
          setSelectedBac(bacsWithDefaultLevels[0].numBac);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données des bacs:', error);
      }
    };

    fetchBacs();
  }, []);

  // Fonction pour afficher la notification
  const showNotification = (bacNum, niveau) => {
    clearTimeout(notificationTimeout); // Effacer l'ancienne notification
    setNotification({ visible: true, message: `Notification : ${bacNum} plein à ${niveau}%` });

    // Réinitialiser la notification après 5 secondes
    notificationTimeout = setTimeout(() => {
      setNotification({ visible: false, message: '' });
    }, 5000);
  };

  // Mise à jour automatique du niveau de bac sélectionné en récupérant les données de RecepteurData
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://192.168.4.1/data", { timeout: 5000 }); // Adapter l'URL si nécessaire
        if (response.status === 200) {
          const newLevel = response.data.distance;
          setSliderValue(newLevel);
          setBacs(bacs.map(bac => {
            if (bac.numBac === selectedBac) {
              const updatedBac = { ...bac, niveau: newLevel }; // Mettre à jour le niveau du bac sélectionné
              if (newLevel >= 75) {
                showNotification(updatedBac.numBac, newLevel); // Afficher la notification si le niveau dépasse 75%
              }
              return updatedBac;
            }
            return bac;
          }));
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    // Exécuter fetchData toutes les 2 secondes
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, [selectedBac, bacs]);

  // Gestion de la pagination
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedBacs = bacs.slice(startIndex, endIndex);

  // Gestion de la navigation des pages
  const handlePrevPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  const handleNextPage = () => setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.floor(bacs.length / itemsPerPage)));

  // Gestion de la sélection du bac
  const handleBacChange = (e) => {
    const selectedBacValue = e.target.value;
    setSelectedBac(selectedBacValue);
    const selected = bacs.find(bac => bac.numBac === selectedBacValue);
    
    if (selected) {
      setSliderValue(selected.niveau); // Mettre à jour la valeur du slider en fonction du bac sélectionné

      // Calculer la page du bac sélectionné
      const selectedIndex = bacs.findIndex(bac => bac.numBac === selectedBacValue);
      const selectedPage = Math.floor(selectedIndex / itemsPerPage);

      // Mettre à jour la page actuelle si le bac sélectionné n'est pas déjà visible
      if (selectedPage !== currentPage) {
        setCurrentPage(selectedPage);
      }
    }
  };

  return (
    <div className="dashboard-container">
      {/* Icone de notification */}
      <div className="notification-icon">
        <i className="fas fa-bell"></i>
      </div>
      
      <h2>Tableau de Bord des Niveaux de Bacs à Ordures</h2>
      
      {/* Notification */}
      {notification.visible && (
        <div className="notification">
          {notification.message}
        </div>
      )}

      {/* Boutons de pagination */}
      <div className="pagination-controls">
        <button onClick={handlePrevPage} disabled={currentPage === 0}>←</button>
        <button onClick={handleNextPage} disabled={endIndex >= bacs.length}>→</button>
      </div>
      
      {/* Affichage des niveaux de bacs */}
      <div className="bac-levels">
        {displayedBacs.map((bac) => (
          <div key={bac.id} className={`bac ${selectedBac === bac.numBac ? 'selected' : ''}`}>
            <div className="bac-gauge">
              <svg viewBox="0 0 36 36" className="circular-chart">
                <path
                  className="circle-bg"
                  d="M18 2.0845
                     a 15.9155 15.9155 0 0 1 0 31.831
                     a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="circle"
                  strokeDasharray={`${bac.niveau}, 100`}
                  d="M18 2.0845
                     a 15.9155 15.9155 0 0 1 0 31.831
                     a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="bac-percentage">
                {bac.niveau}%
              </div>
            </div>
            <div className="bac-info">
              <h4>Bac {bac.numBac}</h4>
              <p>Niveau: {bac.niveau}%</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-parametre">
        <label htmlFor="bac-select">Sélectionner un Bac :</label>
        <select id="bac-select" value={selectedBac} onChange={handleBacChange}>
          {bacs.map((bac) => (
            <option key={bac.id} value={bac.numBac}>
              Bac {bac.numBac}
            </option>
          ))}
        </select>

        {/* Slider pour ajuster le niveau du bac sélectionné */}
        <div className="slider-container">
          <label htmlFor="level-slider">Niveau:</label>
          <input 
            type="range" 
            id="level-slider" 
            min="0" 
            max="100" 
            value={sliderValue} 
            readOnly 
          />
          <span>{sliderValue}%</span>
        </div>
      </div>
    </div>
  );
};

export default DetailleBacCollecteur;
