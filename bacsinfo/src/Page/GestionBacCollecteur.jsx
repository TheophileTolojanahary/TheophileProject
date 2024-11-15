import React, { useState, useEffect } from "react";
import {
  FaTrash,
  FaMapMarkerAlt,
  FaPlus,
  FaLocationArrow,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const GestionBacCollecteur = () => {
  const [numBac, setNumBac] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [typeBac, setTypeBac] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState({});
  const [allBacsData, setAllBacsData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchBac = () => {
    axios
      .get("http://localhost:8080/api/bacs/get")
      .then((res) => {
        setAllBacsData(res.data);
        if (res.data.length === 0) {
          setNumBac("B001");
        } else {
          const lastBacNum = res.data[res.data.length - 1].numBac;
          const lastBacNumber = parseInt(lastBacNum.substring(1), 10);
          const nextBacNumber = lastBacNumber + 1;
          setNumBac(`B00${nextBacNumber.toString().padStart(1, "0")}`);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchBac();
  }, []);

  useEffect(() => {
    if (location.state) {
      setLatitude(location.state.lat || "");
      setLongitude(location.state.lng || "");
    }
  }, [location.state]);

  const handleAddBac = (e) => {
    e.preventDefault();
    const valeur = {
      id: "",
      numBac: numBac,
      longitude: longitude,
      latitude: latitude,
      typeBac: typeBac,
      status: "",
    };

    axios
      .post("http://localhost:8080/api/bacs/post", valeur)
      .then((res) => {
        fetchBac();
        setShowNotification(true);
        setNotificationData(valeur);

        setTimeout(() => {
          setShowNotification(false);
          setLongitude("");
          setLatitude("");
          setTypeBac("");
        }, 5000);
      })
      .catch((err) => {
        console.log(err.response.status);
      });
  };

  const handleSelectLocation = () => {
    navigate("/carte");
  };

  const handleEdit = (id) => {
    // Logique pour modifier un bac (à implémenter)
  };

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce bac ?")) {
      axios
        .delete(`http://localhost:8080/api/bacs/delete/${id}`)
        .then(() => {
          fetchBac();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleDetail = (bac) => {
    navigate("/detailleBac", {
      state: {
        numeroBac: bac.numBac,
        typeBac: bac.typeBac,
        longitude: bac.longitude,
        latitude: bac.latitude,
        localisation: "", // Ajoutez ici si vous avez besoin d'une localisation
        niveau: bac.status || '', // Utilisez une valeur vide pour le niveau par défaut
      },
    });
  };
  

  // Styles définis en tant qu'objets
const styles = {
  container: {
    width: "100%",
    margin: "40px auto",
    padding: "20px",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  formGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  inputGroup: {
    flex: 1,
    position: "relative",
  },
  input: {
    padding: "10px 30px",
    border: "1px solid #ccc",
    width: "100%",
  },
  inputFocus: {
    borderColor: "#aaa",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
  notification: {
    backgroundColor: "#f0f0f0",
    padding: "20px",
    border: "1px solid #ccc",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    tableLayout: "fixed",
    borderCollapse: "collapse",
  },
  thTd: {
    border: "1px solid #ddd",
    padding: "10px",
    textAlign: "left",
    color: "black", // Ajoutez cette ligne pour colorer le texte en noir
  },
  th: {
    backgroundColor: "#f0f0f0",
    width: "100%",
  },
  scrollableTable: {
    maxHeight: "300px",
    overflowY: "auto",
    border: "1px solid #ddd",
    marginTop: "20px",
  },
};


  return (
    <div style={styles.container}>
      <div className="tab-content" style={{ padding: "20px" }}>
        <h2>Ajouter un nouveau bac</h2>
        <form onSubmit={handleAddBac} className="gestion-bac-form">
          <div className="form-group" style={styles.formGroup}>
            <label htmlFor="numBac">Numéro du Bac :</label>
            <div className="input-group" style={styles.inputGroup}>
              <FaTrash className="icon" />
              <input
                type="text"
                id="numBac"
                value={numBac}
                readOnly
                style={styles.input}
              />
            </div>
          </div>

          <div className="form-group" style={styles.formGroup}>
            <button
              type="button"
              className="select-location-button"
              onClick={handleSelectLocation}
              style={styles.button}
            >
              <FaLocationArrow className="icon" /> Sélectionner localisation
            </button>
          </div>

          <div className="form-group" style={styles.formGroup}>
            <label htmlFor="longitude">Longitude :</label>
            <div className="input-group" style={styles.inputGroup}>
              <FaMapMarkerAlt className="icon" />
              <input
                type="text"
                id="longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                placeholder="Entrez la longitude"
                required
                style={styles.input}
              />
            </div>
          </div>

          <div className="form-group" style={styles.formGroup}>
            <label htmlFor="latitude">Latitude :</label>
            <div className="input-group" style={styles.inputGroup}>
              <FaMapMarkerAlt className="icon" />
              <input
                type="text"
                id="latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                placeholder="Entrez la latitude"
                required
                style={styles.input}
              />
            </div>
          </div>

          <div className="form-group" style={styles.formGroup}>
            <label htmlFor="typeBac">Type du Bac :</label>
            <div className="input-group" style={styles.inputGroup}>
              <FaTrash className="icon" />
              <select
                id="typeBac"
                value={typeBac}
                onChange={(e) => setTypeBac(e.target.value)}
                required
                style={styles.input}
              >
                <option value="">Sélectionnez un type de bac</option>
                <option value="mobile">Bac mobile</option>
                <option value="immobile">Bac immobile</option>
              </select>
            </div>
          </div>

          <button type="submit" className="add-bac-button" style={styles.button}>
            <FaPlus className="icon" /> Ajouter un nouveau bac
          </button>
        </form>

        {showNotification && (
          <div className="notification" style={styles.notification}>
            <p>Bac numéro {notificationData.numBac}</p>
            <p>Longitude : {notificationData.longitude}</p>
            <p>Latitude : {notificationData.latitude}</p>
            <p>Type : {notificationData.typeBac}</p>
            <p>Ajouté avec succès</p>
          </div>
        )}

        <div className="scrollable-table" style={styles.scrollableTable}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.thTd}>Numéro Bac</th>
                <th style={styles.thTd}>Longitude</th>
                <th style={styles.thTd}>Latitude</th>
                <th style={styles.thTd}>Type Bac</th>
                <th style={styles.thTd}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allBacsData.map((bac) => (
                <tr key={bac.id}>
                  <td style={styles.thTd}>{bac.numBac}</td>
                  <td style={styles.thTd}>{bac.longitude}</td>
                  <td style={styles.thTd}>{bac.latitude}</td>
                  <td style={styles.thTd}>{bac.typeBac}</td>
                  <td style={styles.thTd}>
                    <button onClick={() => handleDelete(bac.id)}>Supprimer</button>
                    <button onClick={() => handleDetail(bac)}>Détails</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GestionBacCollecteur;
