import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/Login.css";
import logo from "/imgg.jpg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoints = [
        { role: "admin", url: "http://localhost:8080/api/admins/validate", redirectPath: "/accueil" },
        { role: "collecteur", url: "http://localhost:8080/api/collecteurs/validate", redirectPath: "/sidebarCollecteur/accueilCollecteur" },
        { role: "utilisateur", url: "http://localhost:8080/api/utilisateurs/validate", redirectPath: "/interfaceUtilisateur" }
      ];

      let validRole = null;

      for (const { role, url, redirectPath } of endpoints) {
        try {
          const response = await axios.get(url, {
            params: {
              nom: username,
              motDePasse: password,
            },
          });

          if (response.status === 200) {
            validRole = { role, redirectPath };
            break;
          }
        } catch (error) {
          if (error.response && error.response.status === 401) {
            continue; // Passe à l'endpoint suivant si les identifiants ne sont pas valides
          } else {
            throw error; // Erreur serveur ou connexion
          }
        }
      }

      if (validRole) {
        navigate(validRole.redirectPath);
      } else {
        setErrorMessage("Nom d'utilisateur ou mot de passe incorrect.");
      }
    } catch (error) {
      console.error("Erreur de connexion :", error);
      setErrorMessage("Une erreur est survenue. Veuillez réessayer.");

      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  return (
    <div className="loginCSS-container">
      <div className="container">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo-image" />
        </div>
        <div className="loginCSS-form">
          <h2>Connexion</h2>
          <form onSubmit={handleSubmit}>
            {errorMessage && (
              <div className={`loginCSS-error-message ${!errorMessage ? 'hide' : ''}`}>
                {errorMessage}
              </div>
            )}
            <div className="loginCSS-form-group">
              <label htmlFor="username">Nom d'utilisateur :</label>
              <div className="loginCSS-input-wrapper">
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Entrez votre nom d'utilisateur"
                  required
                />
              </div>
            </div>
            <div className="loginCSS-form-group">
              <label htmlFor="password">Mot de passe :</label>
              <div className="loginCSS-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Entrez votre mot de passe"
                  required
                />
                <span className="loginCSS-show-password" onClick={handleShowPassword}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            <button type="submit">Connexion</button>
            <p>
              Mot de passe oublié ? <Link to="/forgot-password">Cliquez ici</Link>
            </p>
            <p>
              Vous n'avez pas encore de compte ? <Link to="/choixInscription">Inscrivez-vous</Link>
            </p>
          </form>
        </div>
      </div>
      {/* Adding copyright footer */}
      <footer className="login-footer">
        <p>copyright@2024-rafaltech</p>
      </footer>
    </div>
  );
};

export default Login;
