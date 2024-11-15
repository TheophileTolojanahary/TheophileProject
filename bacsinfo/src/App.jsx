import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Accueil from "./Page/Accueil.jsx";
import GestionBac from "./Page/GestionBac.jsx";
import DetailleBac from "./Page/DetailleBac.jsx";
import Map from "./Page/Map.jsx";
import Carte from "./Page/Carte.jsx";
import Entree from "./Page/Entree.jsx";
import Login from "./Page/Login.jsx";
import Inscription from "./Page/Inscription.jsx";
import GestionAgent from "./Page/GestionAgent.jsx";
import ChoixInscription from "./Page/ChoixInscription.jsx";
import GererAdmin from "./Page/GererAdmin.jsx";
import InscriptionAdmin from "./Page/InscriptionAdmin.jsx";
import InscriptionCollecteur from "./Page/InscriptionCollecteur.jsx";
import SidebarCollecteur from "./Page/SidebarCollecteur.jsx";
import InscriptionUtilisateur from "./Page/InscriptionUtilisateur.jsx";
import InterfaceUtilisateur from "./Page/InterfaceUtilisateur.jsx";
import Collecte from "./Page/Collecte.jsx";
import RecepteurData from "./Page/RecepteurData.jsx";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Entree />} />
        <Route path="/login" element={<Login />} />
        <Route path="/choixInscription" element={<ChoixInscription />} />
        <Route path="/gererAdmin" element={<GererAdmin />} />
        <Route path="/inscriptionAdmin" element={<InscriptionAdmin />} />
        <Route path="/inscriptionCollecteur" element={<InscriptionCollecteur />} />
        <Route path="/sidebarCollecteur/*" element={<SidebarCollecteur />} />  {/* Mise à jour ici */}
        <Route path="/inscriptionUtilisateur" element={<InscriptionUtilisateur />} />
        <Route path="/interfaceUtilisateur" element={<InterfaceUtilisateur />} />
        <Route path="/recepteurData" element={<RecepteurData />} />
        

        <Route path="/collecte" element={<Collecte />} />

        <Route path="/inscription" element={<Inscription />} />
        <Route
          path="/*"
          element={
            <Sidebar>
              <Routes>
                <Route path="/accueil" element={<Accueil />} />
                <Route path="/gestion-du-bac" element={<GestionBac />} />
                <Route path="/map" element={<Map />} />
                <Route path="/detailleBac" element={<DetailleBac />} />
                <Route path="/carte" element={<Carte />} />
                <Route path="/gestionAgent" element={<GestionAgent />} />
              </Routes>
            </Sidebar>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
