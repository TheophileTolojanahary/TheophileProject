import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaHome,
  FaTrash,
  FaChartLine,
  FaMapMarkerAlt,
  FaUser,
  FaTimes,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import "./sidebar.css";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleToggleMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    document.body.classList.toggle("dark-mode", !isDarkMode);
  };

  const menuItem = [
    { path: "/accueil", name: "Accueil", icon: <FaHome /> },
    { path: "/gestion-du-bac", name: "Gestion du Bac", icon: <FaTrash /> },
    { path: "/detailleBac", name: "Etat des bacs", icon: <FaChartLine /> },
    { path: "/map", name: "Map", icon: <FaMapMarkerAlt /> },
    { path: "/gestionAgent", name: "Gestion des agents", icon: <FaUser /> },
  ];

  return (
    <div className="ccsideb-sidebar-container">
      <div
        className={`ccsideb-sidebar ${isOpen ? "" : "ccsideb-closed"} ${
          isDarkMode ? "ccdark" : ""
        }`}
      >
        <div className="ccsideb-top-section">
          {isOpen ? (
            <img
              src="/logoAdmin.png"
              alt="Logo Admin"
              className="ccsideb-logo"
            />
          ) : null}
          <div className="ccsideb-bars" onClick={toggle}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>

        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className={({ isActive }) =>
              `ccsideb-link ${isActive ? "ccsideb-active" : ""}`
            }
          >
            <div className="ccsideb-icon">{item.icon}</div>
            <div className={`ccsideb-link-text ${isOpen ? "" : "ccsideb-closed"}`}>
              {item.name}
            </div>
          </NavLink>
        ))}

        {/* Bouton de changement de mode (Sombre / Éclairé) */}
        <div className="ccsideb-mode-toggle" onClick={handleToggleMode}>
          {isOpen && (
            <span className="ccmode-text">
              {isDarkMode ? "Activer le mode éclairé" : "Activer le mode sombre"}
            </span>
          )}
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </div>
      </div>

      <main
        className={`ccsideb-main-content ${isOpen ? "" : "ccsideb-closed"} ${
          isDarkMode ? "ccdark" : ""
        }`}
      >
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
