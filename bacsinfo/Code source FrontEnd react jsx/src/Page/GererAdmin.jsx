import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import axios from 'axios'; // Importer axios
import '../style/GererAdmin.css';

const GererAdmin = () => {
  const [name, setName] = useState(''); // État pour le nom
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialiser useNavigate

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Vérifier l'admin via l'API
      const response = await axios.get(`http://localhost:8080/api/admins/get`, {
        params: {
          nom: name,
          motDePasse: password,
        },
      });

      if (response.data && response.data.length > 0) {
        // Si l'admin est trouvé, naviguer vers InscriptionAdmin
        navigate('/InscriptionAdmin');
      } else {
        alert('Nom ou mot de passe incorrect');
      }
    } catch (error) {
      console.error('Erreur lors de la validation de l\'admin', error);
      alert('Erreur de validation. Veuillez réessayer.');
    }
  };

  return (
    <div className="gererAdmin-wrapper">
      <div className="gererAdmin-container">
        <form className="gererAdmin-form" onSubmit={handleSubmit}>
          <label className="gererAdmin-label">Nom:</label>
          <input
            className="gererAdmin-input"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Entrez votre nom"
          />
          <label className="gererAdmin-label">Mot de passe:</label>
          <input
            className="gererAdmin-input"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Entrez votre mot de passe"
          />
          <button className="gererAdmin-button" type="submit">Valider</button>
        </form>
      </div>
    </div>
  );
};

export default GererAdmin;
