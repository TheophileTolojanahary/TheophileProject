import React, { useState } from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import { FaBars, FaHome, FaTrash, FaMapMarkerAlt, FaMoon, FaSun, FaTimes, FaChartLine } from "react-icons/fa"; // Import de FaChartLine
import '../style/SidebarCollecteur.css';
import AccueilCollecteur from './AccueilCollecteur.jsx';
import GestionBacCollecteur from './GestionBacCollecteur.jsx';
import MapCollecteur from './MapCollecteur.jsx';
import DetailleBacCollecteur from './DetailleBacCollecteur.jsx';

const SidebarCollecteur = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle("dark-mode", !isDarkMode);
    };

    const menuItem = [
        { path: "accueilCollecteur", name: "Accueil", icon: <FaHome /> },
        { path: "gestionBacCollecteur", name: "Gestion du Bac", icon: <FaTrash /> },
        { path: "detailleBacCollecteur", name: "Etat des bacs", icon: <FaChartLine /> },
        { path: "mapCollecteur", name: "Map", icon: <FaMapMarkerAlt /> },
    ];

    return (
        <div className={`CSSintCltr-sidebar-container ${isDarkMode ? 'ccdark' : ''}`}>
            <div className={`CSSintCltr-sidebar ${isOpen ? '' : 'CSSintCltr-closed'} ${isDarkMode ? 'ccdark' : ''}`}>
                <div className="CSSintCltr-top-section">
                    <img 
                        src="/logocollecteur.jpg" 
                        alt="Logo Collecteur" 
                        className={`CSSintCltr-logo ${isOpen ? '' : 'CSSintCltr-closed'}`} 
                    />
                </div>

                {menuItem.map((item, index) => (
                    <NavLink
                        to={item.path}
                        key={index}
                        className={({ isActive }) => `CSSintCltr-link ${isActive ? 'CSSintCltr-active' : ''}`}
                    >
                        <div className="CSSintCltr-icon">{item.icon}</div>
                        <div className={`CSSintCltr-link-text ${isOpen ? '' : 'CSSintCltr-closed'}`}>{item.name}</div>
                    </NavLink>
                ))}

                {/* Dark/Light mode toggle */}
                <div className="CSSintCltr-mode-toggle" onClick={toggleDarkMode}>
                    {isOpen && <span>{isDarkMode ? "Éclairé" : "Sombre"}</span>}
                    {isDarkMode ? <FaSun /> : <FaMoon />}
                </div>
            </div>

            {/* Icon to toggle sidebar */}
            <div className={`CSSintCltr-toggle-icon ${isOpen ? 'CSSintCltr-open' : 'CSSintCltr-closed'}`} onClick={toggleSidebar}>
                {isOpen ? <FaTimes /> : <FaBars />} {/* Changer l'icône ici */}
            </div>

            <main className={`CSSintCltr-main-content ${isOpen ? '' : 'CSSintCltr-closed'} ${isDarkMode ? 'ccdark' : ''}`}>
                <Routes>
                    <Route path="accueilCollecteur" element={<AccueilCollecteur />} />
                    <Route path="gestionBacCollecteur" element={<GestionBacCollecteur />} />
                    <Route path="detailleBacCollecteur" element={<DetailleBacCollecteur />} />
                    <Route path="mapCollecteur" element={<MapCollecteur />} />
                </Routes>
            </main>
        </div>
    );
};

export default SidebarCollecteur;
