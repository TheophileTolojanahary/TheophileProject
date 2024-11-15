import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../style/accueilCollecteur.css";
import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AccueilCollecteur = () => {
  const [date, setDate] = useState(new Date());
  const [nombreBacs, setNombreBacs] = useState(0);
  // const [nombreUtilisateurs, setNombreUtilisateurs] = useState(0);
  const [nombreCollecteurs, setNombreCollecteurs] = useState(0);
  const [nombreTotalCollectes, setNombreTotalCollectes] = useState(0);
  const [nombreCollectesAujourdhui, setNombreCollectesAujourdhui] = useState(0);
  const [nombreCollectesParDate, setNombreCollectesParDate] = useState([0, 0, 0, 0, 0]);

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const getMonday = (d) => {
    const date = new Date(d);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
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

  const fetchData = async () => {
    try {
      const bacsResponse = await axios.get("http://localhost:8080/api/bacs/count");
      setNombreBacs(bacsResponse.data);

      // const utilisateursResponse = await axios.get("http://localhost:8080/api/utilisateurs/get");
      // setNombreUtilisateurs(utilisateursResponse.data.length);

      const collecteursResponse = await axios.get("http://localhost:8080/api/collecteurs/count");
      setNombreCollecteurs(collecteursResponse.data);

      const totalCollectesResponse = await axios.get("http://localhost:8080/api/collectes/countTotal");
      setNombreTotalCollectes(totalCollectesResponse.data);

      const collectesResponse = await axios.get("http://localhost:8080/api/collectes/get");
      const collectes = collectesResponse.data;

      const today = formatDate(new Date());
      const collectesAujourdhui = collectes.filter((collecte) => {
        const dateCollecte = collecte.tempsCollecte.split(" à ")[0];
        return dateCollecte === today;
      });
      setNombreCollectesAujourdhui(collectesAujourdhui.length);

      const { weekDates } = generateWeekLabels(getMonday(date));
      const nombreCollectesSemaine = weekDates.map((weekDate) => {
        const formattedWeekDate = formatDate(weekDate);
        return collectes.filter((collecte) => {
          const dateCollecte = collecte.tempsCollecte.split(" à ")[0];
          return dateCollecte === formattedWeekDate;
        }).length;
      });
      setNombreCollectesParDate(nombreCollectesSemaine);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [date]);

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

  const handleDateChange = (selectedDate) => {
    const selectedMonday = getMonday(selectedDate);
    const { weekLabels } = generateWeekLabels(selectedMonday);
    setData((prevData) => ({
      ...prevData,
      labels: weekLabels,
    }));
    setDate(selectedDate);
  };

  const formatDayOfWeek = (date) => {
    return new Intl.DateTimeFormat("fr-FR", { weekday: "long" }).format(date);
  };

  const generateWeekLabels = (monday) => {
    const weekDates = [];
    const weekLabels = [];
    for (let i = 0; i < 5; i++) {
      const currentDay = new Date(monday);
      currentDay.setDate(monday.getDate() + i);
      weekDates.push(currentDay);
      weekLabels.push(formatDayOfWeek(currentDay));
    }
    return { weekDates, weekLabels };
  };

  const [data, setData] = useState({
    labels: generateWeekLabels(getMonday(new Date())).weekLabels,
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
            <h3>Nombre de Collecteurs</h3>
            <p>{nombreCollecteurs}</p>
          </div>
          <div className="info-box">
            <h3>Nombre Total de Collectes</h3>
            <p>{nombreTotalCollectes}</p>
          </div>
        </div>
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

export default AccueilCollecteur;
