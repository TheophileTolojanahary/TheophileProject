import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../style/accueil.css";
import axios from "axios";

const Accueil = () => {
  const [date, setDate] = useState(new Date());
  const [nombreBacs, setNombreBacs] = useState(0);
  const [nombreUtilisateurs, setNombreUtilisateurs] = useState(0);
  const [nombreCollecteurs, setNombreCollecteurs] = useState(0);
  const [nombreTotalCollectes, setNombreTotalCollectes] = useState(0);
  const [nombreCollectesAujourdhui, setNombreCollectesAujourdhui] = useState(0);
  const [nombreCollectesParDate, setNombreCollectesParDate] = useState([0, 0, 0, 0, 0]);

  // Fonction pour formater les dates
  const formatDate = (date) => {
    return new Intl.DateTimeFormat("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  // Fonction pour obtenir le lundi de la semaine de la date sélectionnée
  const getMonday = (d) => {
    const date = new Date(d);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Ajuste si le jour est dimanche
    return new Date(date.setDate(diff));
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: nombreBacs,
        title: {
          display: true,
          text: "Nombre de Bacs à Ordures",
        },
        ticks: {
          stepSize: 2,
        },
      },
    },
  };


  // Récupérer le nombre de collectes par date pour la semaine affichée
  useEffect(() => {
    const fetchCollectesParSemaine = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/collectes/get");
        const collectes = response.data;

        const weekLabels = generateWeekLabels(getMonday(date));
        const nombreCollectesSemaine = weekLabels.map((label) => {
          return collectes.filter((collecte) => {
            const dateCollecte = collecte.tempsCollecte.split(" à ")[0];
            return dateCollecte === label;
          }).length;
        });

        setNombreCollectesParDate(nombreCollectesSemaine);
      } catch (error) {
        console.error("Erreur lors de la récupération des collectes:", error);
      }
    };

    fetchCollectesParSemaine();
  }, [date]);

  // Met à jour les données du graphique lorsque le nombre de collectes par semaine change
  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      datasets: [
        {
          ...prevData.datasets[0],
          data: nombreCollectesParDate,
        },
      ],
    }));
  }, [nombreCollectesParDate]);

  useEffect(() => {
    const fetchNombreBacs = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/bacs/count");
        setNombreBacs(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du nombre de bacs:", error);
      }
    };

    fetchNombreBacs();
  }, []);

  useEffect(() => {
    const fetchNombreUtilisateurs = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/utilisateurs/get");
        setNombreUtilisateurs(response.data.length);
      } catch (error) {
        console.error("Erreur lors de la récupération du nombre d'utilisateurs:", error);
      }
    };

    fetchNombreUtilisateurs();
  }, []);

  useEffect(() => {
    const fetchNombreCollecteurs = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/collecteurs/count");
        setNombreCollecteurs(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du nombre de collecteurs:", error);
      }
    };

    fetchNombreCollecteurs();
  }, []);

  useEffect(() => {
    const fetchNombreTotalCollectes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/collectes/countTotal");
        setNombreTotalCollectes(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du nombre total de collectes:", error);
      }
    };

    fetchNombreTotalCollectes();
  }, []);

    // Récupérer les collectes du jour
    useEffect(() => {
      const fetchNombreCollectesAujourdhui = async () => {
        try {
          const response = await axios.get("http://localhost:8080/api/collectes/get");
          const collectes = response.data;
  
          const today = formatDate(new Date());
  
          const collectesAujourdhui = collectes.filter((collecte) => {
            const dateCollecte = collecte.tempsCollecte.split(" à ")[0];
            return dateCollecte === today;
          });
  
          setNombreCollectesAujourdhui(collectesAujourdhui.length);
        } catch (error) {
          console.error("Erreur lors de la récupération des collectes d'aujourd'hui:", error);
        }
      };
  
      fetchNombreCollectesAujourdhui();
    }, []);
  


// Fonction pour formater les dates avec uniquement le jour de la semaine
const formatDayOfWeek = (date) => {
  return new Intl.DateTimeFormat("fr-FR", { weekday: "long" }).format(date);
};

// Fonction pour générer les dates de la semaine avec les labels en jours de la semaine
const generateWeekLabels = (monday) => {
  const weekDates = [];
  const weekLabels = [];
  for (let i = 0; i < 5; i++) {
    const currentDay = new Date(monday);
    currentDay.setDate(monday.getDate() + i);
    weekDates.push(currentDay); // On garde les dates complètes pour la comparaison
    weekLabels.push(formatDayOfWeek(currentDay)); // On affiche seulement les jours de la semaine
  }
  return { weekDates, weekLabels };
};

// État pour les données du graphique
const [data, setData] = useState({
  labels: generateWeekLabels(getMonday(new Date())).weekLabels, // Utilise les labels jour de la semaine
  datasets: [
    {
      label: "Collectes Mensuelles",
      data: [0, 0, 0, 0, 0],
      backgroundColor: "rgba(75, 192, 192, 0.6)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
});

// Mettre à jour les labels du graphique lorsque la date sélectionnée change
const handleDateChange = (selectedDate) => {
  const selectedMonday = getMonday(selectedDate);
  const { weekLabels } = generateWeekLabels(selectedMonday); // Obtenir seulement les labels jour de la semaine
  setData((prevData) => ({
    ...prevData,
    labels: weekLabels, // Met à jour les labels affichés
  }));

  setDate(selectedDate);
};

// Récupérer le nombre de collectes par date pour la semaine affichée
useEffect(() => {
  const fetchCollectesParSemaine = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/collectes/get");
      const collectes = response.data;

      const { weekDates } = generateWeekLabels(getMonday(date)); // Obtenir les dates complètes de la semaine
      const nombreCollectesSemaine = weekDates.map((weekDate) => {
        const formattedWeekDate = formatDate(weekDate); // Date complète
        return collectes.filter((collecte) => {
          const dateCollecte = collecte.tempsCollecte.split(" à ")[0];
          return dateCollecte === formattedWeekDate; // Comparer avec les dates complètes
        }).length;
      });

      setNombreCollectesParDate(nombreCollectesSemaine);
    } catch (error) {
      console.error("Erreur lors de la récupération des collectes:", error);
    }
  };

  fetchCollectesParSemaine();
}, [date]);
   

  return (
    <div className="grand-container">
      <div className="accueil-container">
        <div className="header">
          <h1>Système de Gestion de Collecte des Ordures</h1>
        </div>

        <div className="info-wrapper">
          <div className="info-box">
            <h3>Nombre de Bacs à Ordures</h3>
            <p>{nombreBacs}</p>
          </div>
          <div className="info-box">
            <h3>Nombre d'Utilisateurs</h3>
            <p>{nombreUtilisateurs}</p>
          </div>
          <div className="info-box">
            <h3>Nombre de Collecteurs</h3>
            <p>{nombreCollecteurs}</p>
          </div>
          <div className="info-box">
            <h3>Nombre Total de Collectes</h3>
            <p>{nombreTotalCollectes}</p>
          </div>
        </div>

        {/* <div className="info-box">
            <h4>Nombre de Collectes Aujourd'hui</h4>
            <p>{nombreCollectesAujourdhui}</p>
          </div> */}

        <div className="chart-calendar-container">
          <div className="chart-container">
            <h3>Collecte de cette semaine</h3>
            <Bar data={data} options={options} />
          </div>
          <div className="calendar-container">
            <h3>Calendrier de Collecte</h3>
            <h4>Nombre de Collectes Aujourd'hui : {nombreCollectesAujourdhui}</h4>
            <Calendar onChange={handleDateChange} value={date} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accueil;
