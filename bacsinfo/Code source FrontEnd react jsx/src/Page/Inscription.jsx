import React, { useState } from 'react';
import axios from 'axios';
import '../style/inscription.css';  // Importer le fichier CSS

const Inscription = () => {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const nouvelUtilisateur = {
      nom,
      email,
      motDePasse,
    };

    // Envoi des données au backend
    axios.post('http://localhost:8080/api/utilisateurs/post', nouvelUtilisateur)
      .then((response) => {
        if (response.status === 201) {
          setShowNotification(true);
          setNotificationMessage(`Inscription réussie pour ${nom}`);
          // Réinitialiser les champs du formulaire
          setNom('');
          setEmail('');
          setMotDePasse('');
        }
      })
      .catch((error) => {
        console.error(error);
        setShowNotification(true);
        setNotificationMessage('Erreur lors de l\'inscription. Veuillez réessayer.');
      });
  };

  return (
    <div className="inscriptionCSS-container">
      <div className="inscriptionCSS-form-section">
        <h2>Inscription</h2>
        <form onSubmit={handleSubmit}>
          <div className="inscriptionCSS-form-group">
            <label htmlFor="nom" className="inscriptionCSS-label">Nom :</label>
            <input
              type="text"
              id="nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Entrez votre nom"
              required
              className="inscriptionCSS-input"
            />
          </div>
          <div className="inscriptionCSS-form-group">
            <label htmlFor="email" className="inscriptionCSS-label">Email :</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Entrez votre email"
              required
              className="inscriptionCSS-input"
            />
          </div>
          <div className="inscriptionCSS-form-group">
            <label htmlFor="motDePasse" className="inscriptionCSS-label">Mot de passe :</label>
            <input
              type="password"
              id="motDePasse"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              placeholder="Entrez votre mot de passe"
              required
              className="inscriptionCSS-input"
            />
          </div>
          <button type="submit" className="inscriptionCSS-button">S'inscrire</button>
        </form>

        {showNotification && (
          <div className="inscriptionCSS-notification">
            <p>{notificationMessage}</p>
          </div>
        )}
      </div>
      <div className="inscriptionCSS-image-section">
        <img src="public/image.png" alt="Image d'inscription" className="inscriptionCSS-image" />
      </div>
    </div>
  );
};

export default Inscription;
