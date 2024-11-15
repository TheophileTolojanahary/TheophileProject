import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa'; // Assurez-vous d'avoir installé react-icons
import axios from 'axios'; // Axios pour les appels API
import '../style/collecte.css';

const Collecte = () => {
  const [searchTerm, setSearchTerm] = useState(''); // Terme de recherche
  const [collectes, setCollectes] = useState([]); // Liste des collectes
  const [filteredCollectes, setFilteredCollectes] = useState([]); // Liste filtrée

  // Charger les collectes depuis l'API lors du montage du composant
  useEffect(() => {
    axios.get('http://localhost:8080/api/collectes/get')
      .then(response => {
        setCollectes(response.data); // Met à jour la liste des collectes
      })
      .catch(error => {
        console.error('Erreur lors du chargement des collectes:', error);
      });
  }, []);

  // Mettre à jour la liste filtrée chaque fois que le terme de recherche change
  useEffect(() => {
    const results = collectes.filter(collecte =>
      collecte.tempsCollecte.toLowerCase().includes(searchTerm.toLowerCase()) // Filtrage par le champ tempsCollecte
    );
    setFilteredCollectes(results); // Met à jour les collectes filtrées
  }, [searchTerm, collectes]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value); // Met à jour le terme de recherche
  };

  return (
    <div className="collecte-container">
      <form className="search-bar" onSubmit={e => e.preventDefault()}>
        <input
          type="text"
          placeholder="Rechercher par date ou jour..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button type="submit" className="search-button">
          <FaSearch className="search-icon" />
        </button>
      </form>

      {/* Affichage de la liste filtrée */}
      {filteredCollectes.length > 0 ? (
        <ul className="collecte-list">
          {filteredCollectes.map(collecte => (
            <li key={collecte.id}>
              Bac: {collecte.numBac}, Collecte: {collecte.tempsCollecte}
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun résultat trouvé.</p>
      )}
    </div>
  );
};

export default Collecte;
