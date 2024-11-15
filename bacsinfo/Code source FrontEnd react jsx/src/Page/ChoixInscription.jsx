import React from 'react';
import '../style/ChoixInscription.css';

const ChoixInscription = () => {
  return (
    <div className="choix-inscription-container">
      <h2>Choisissez votre type d'inscription</h2>
      <button className="btn" onClick={() => window.location.href = '/inscriptionUtilisateur'}>
        Utilisateur
      </button>
      <button className="btn" onClick={() => window.location.href = '/inscriptionCollecteur'}>
        Collecteur
      </button>
    </div>
  );
};

export default ChoixInscription;
