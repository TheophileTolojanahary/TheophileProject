import React, { useState, useEffect } from "react";
import { FaTrash, FaPlus, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import '../style/GestionAgent.css';

const GestionAgent = () => {
  const [section, setSection] = useState("collecteur"); // État pour basculer entre les sections
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [adresse, setAdresse] = useState("");
  const [numeroTelephone, setNumeroTelephone] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [allCollecteursData, setAllCollecteursData] = useState([]);
  const [allUtilisateursData, setAllUtilisateursData] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState({});
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showUserDeleteConfirmation, setShowUserDeleteConfirmation] = useState(false); 

  // Récupération des collecteurs
  const fetchCollecteurs = () => {
    axios.get("http://localhost:8080/api/collecteurs/get")
      .then((res) => setAllCollecteursData(res.data))
      .catch((err) => console.log(err));
  };

  // Récupération des utilisateurs
  const fetchUtilisateurs = () => {
    axios.get("http://localhost:8080/api/utilisateurs/get")
      .then((res) => setAllUtilisateursData(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCollecteurs();
    fetchUtilisateurs();
  }, []);

  // Gestion de l'ajout d'un collecteur
  const handleAddCollecteur = (e) => {
    e.preventDefault();
    const newCollecteur = {
      nom,
      prenom,
      email,
      adresse,
      numeroTelephone,
      motDePasse,
    };

    axios.post("http://localhost:8080/api/collecteurs/post", newCollecteur)
      .then(() => {
        fetchCollecteurs();
        setShowNotification(true);
        setNotificationData(newCollecteur);

        setTimeout(() => {
          setShowNotification(false);
          setNom("");
          setPrenom("");
          setEmail("");
          setAdresse("");
          setNumeroTelephone("");
          setMotDePasse("");
        }, 5000);
      })
      .catch((err) => console.log(err.response.status));
  };

  // Gestion de l'ajout d'un utilisateur
  const handleAddUtilisateur = (e) => {
    e.preventDefault();
    const newUtilisateur = { nom, email, motDePasse };
    
    axios.post("http://localhost:8080/api/utilisateurs/post", newUtilisateur)
      .then(() => {
        fetchUtilisateurs();
        setNom("");
        setEmail("");
        setMotDePasse("");
      })
      .catch((err) => console.log(err));
  };

  // Gestion de la suppression d'un collecteur
  const handleDeleteCollecteur = (id) => {
    setDeleteId(id);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteCollecteur = () => {
    axios.delete(`http://localhost:8080/api/collecteurs/delete/${deleteId}`)
      .then(() => {
        fetchCollecteurs();
        setShowDeleteConfirmation(false);
      })
      .catch((err) => console.log(err));
  };

// Gestion de la suppression d'un utilisateur avec confirmation
const handleDeleteUtilisateur = (id) => {
  setDeleteId(id);
  setShowUserDeleteConfirmation(true);
};

const confirmDeleteUtilisateur = () => {
  axios.delete(`http://localhost:8080/api/utilisateurs/delete/${deleteId}`)
    .then(() => {
      fetchUtilisateurs();
      setShowUserDeleteConfirmation(false);
    })
    .catch((err) => console.log(err));
};

const cancelDeleteUser = () => {
  setShowUserDeleteConfirmation(false);
  setDeleteId(null);
};
// Ajoutez cette fonction pour gérer l'annulation de la suppression d'un collecteur
const cancelDelete = () => {
  setShowDeleteConfirmation(false);
  setDeleteId(null);
};

  return (
    <div className="Clsnm-container">
      <div className="Clsnm-containerbtn">
        <button onClick={() => setSection("collecteur")} className="btn-animated">Gestion Collecteur</button>
        <button onClick={() => setSection("utilisateur")} className="btn-animated">Gestion Utilisateur</button>
      </div>

      {showNotification && (
        <div className="Clsnm-notification">
          <strong>Notification:</strong> Nouveau collecteur ajouté : {notificationData.nom} {notificationData.prenom}
        </div>
      )}

      {showDeleteConfirmation && (
        <div className="Clsnm-delete-confirmation">
          <p>Êtes-vous sûr de vouloir supprimer ce collecteur ?</p>
          <button onClick={confirmDeleteCollecteur} className="Clsnm-confirm-button">Oui</button>
          <button onClick={cancelDelete} className="Clsnm-cancel-button">Non</button>
        </div>
      )}

      
      {/* Confirmation de suppression pour les utilisateurs */}
      {showUserDeleteConfirmation && (
        <div className="Clsnm-delete-confirmation">
          <p>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</p>
          <button onClick={confirmDeleteUtilisateur} className="Clsnm-confirm-button">Oui</button>
          <button onClick={cancelDeleteUser} className="Clsnm-cancel-button">Non</button>
        </div>
      )}

      {section === "collecteur" && (
        <div>
          <h2>Gestion des Collecteurs</h2>
          <form onSubmit={handleAddCollecteur}>
            <div className="Clsnm-form-group">
              <input
                type="text"
                className="Clsnm-input"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                placeholder="Nom"
                required
              />
              <input
                type="text"
                className="Clsnm-input"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                placeholder="Prénom"
                required
              />
              <input
                type="text"
                className="Clsnm-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <input
                type="text"
                className="Clsnm-input"
                value={adresse}
                onChange={(e) => setAdresse(e.target.value)}
                placeholder="Adresse"
                required
              />
              <input
                type="text"
                className="Clsnm-input"
                value={numeroTelephone}
                onChange={(e) => setNumeroTelephone(e.target.value)}
                placeholder="Numéro de téléphone"
                required
              />
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  className="Clsnm-input"
                  value={motDePasse}
                  onChange={(e) => setMotDePasse(e.target.value)}
                  placeholder="Mot de passe"
                  required
                />
                <span onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <button type="submit" className="Clsnm-button">
                <FaPlus /> Ajouter Collecteur
              </button>
            </div>
          </form>

          <div className="Clsnm-table-container">
          <table className="Clsnm-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Adresse</th>
                <th>Numéro de téléphone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allCollecteursData.map((collecteur) => (
                <tr key={collecteur.id}>
                  <td>{collecteur.nom}</td>
                  <td>{collecteur.prenom}</td>
                  <td>{collecteur.email}</td>
                  <td>{collecteur.adresse}</td>
                  <td>{collecteur.numeroTelephone}</td>
                  <td>
                    <button onClick={() => handleDeleteCollecteur(collecteur.id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      )}

      {section === "utilisateur" && (
        <div>
          <h2>Gestion des Utilisateurs</h2>
          <form onSubmit={handleAddUtilisateur}>
            <div className="Clsnm-form-group">
              <input
                type="text"
                className="Clsnm-input"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                placeholder="Nom"
                required
              />
              <input
                type="email"
                className="Clsnm-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  className="Clsnm-input"
                  value={motDePasse}
                  onChange={(e) => setMotDePasse(e.target.value)}
                  placeholder="Mot de passe"
                  required
                />
                <span onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <button type="submit" className="Clsnm-button">
                <FaPlus /> Ajouter Utilisateur
              </button>
            </div>
          </form>
          <div className="Clsnm-table-container">
          <table className="Clsnm-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allUtilisateursData.map((utilisateur) => (
                <tr key={utilisateur.id}>
                  <td>{utilisateur.nom}</td>
                  <td>{utilisateur.email}</td>
                  <td>
                    <button onClick={() => handleDeleteUtilisateur(utilisateur.id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      )}
    </div>
  );
};

export default GestionAgent;
