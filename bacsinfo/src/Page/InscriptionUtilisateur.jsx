import React, { useState } from 'react';
import axios from 'axios';
import '../style/InscriptionUtilisateur.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const InscriptionUtilisateur = () => {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState('');
  const [notificationType, setNotificationType] = useState(''); // Type de notification

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/utilisateurs/post', {
        nom,
        email,
        motDePasse,
      });

      if (response.status === 201) {
        setNotification(`Ajout de ${nom} avec succès`);
        setNotificationType('success'); // Notification de succès
        // Réinitialiser les champs de saisie
        setNom('');
        setEmail('');
        setMotDePasse('');
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error);
      setNotification('Erreur lors de l\'inscription, veuillez réessayer.'); // Notification d'erreur
      setNotificationType('error'); // Notification d'erreur
    } finally {
      // Masquer la notification après 5 secondes
      setTimeout(() => {
        setNotification('');
      }, 5000);
    }
  };

  return (
    <div className="insCcl-inscription-collecteur">
      <h2>Inscription</h2>
      {notification && (
        <div className={`notification ${notificationType}`}>
          {notification}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="insCcl-form-group">
          <label htmlFor="nom">Nom :</label>
          <input 
            type="text" 
            id="nom"
            placeholder="Nom" 
            value={nom} 
            onChange={(e) => setNom(e.target.value)} 
          />
        </div>
        <div className="insCcl-form-group">
          <label htmlFor="email">Email :</label>
          <input 
            type="email" 
            id="email"
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div className="insCcl-form-group">
          <label htmlFor="motDePasse">Mot de passe :</label>
          <div className="insCcl-input-icon">
            <input 
              type={showPassword ? 'text' : 'password'} 
              id="motDePasse"
              placeholder="Mot de passe" 
              value={motDePasse} 
              onChange={(e) => setMotDePasse(e.target.value)} 
            />
            <span 
              className="insCcl-password-toggle-icon" 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default InscriptionUtilisateur;
