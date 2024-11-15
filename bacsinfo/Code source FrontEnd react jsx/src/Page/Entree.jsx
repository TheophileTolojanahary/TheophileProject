import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/entree.css"; // Importez le fichier CSS

const Entree = () => {
  const [imagePosition, setImagePosition] = useState(100);
  const [textPosition, setTextPosition] = useState(100);
  const [quotePosition, setQuotePosition] = useState(100);
  const [showButton, setShowButton] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const imageInterval = setInterval(() => {
      if (imagePosition > 0) {
        setImagePosition(imagePosition - 2);
      }
    }, 10);

    const textInterval = setInterval(() => {
      if (textPosition > 40) {
        setTextPosition(textPosition - 1.5);
      }
    }, 10);

    const quoteInterval = setInterval(() => {
      if (quotePosition > 50) {
        setQuotePosition(quotePosition - 1);
      }
    }, 10);

    const buttonTimeout = setTimeout(() => {
      setShowButton(true);
    }, 3000);

    return () => {
      clearInterval(imageInterval);
      clearInterval(textInterval);
      clearInterval(quoteInterval);
      clearTimeout(buttonTimeout);
    };
  }, [imagePosition, textPosition, quotePosition]);

  const handleStart = () => {
    navigate("/login");
  };

  return (
    <div className="Entree-container">
      <div className="Entree-image" style={{ right: `${imagePosition}%` }}>
        <img
          src="/img.jpg"
          alt="Gestion de collecte des ordures"
          style={{ width: "100%", height: "auto", borderRadius: "10px" }}
        />
      </div>
      <div className="Entree-text" style={{ right: `${textPosition}%` }}>
        <h1 style={{ color: "#2E865F" }}>
          Système de gestion de collecte de déchet du village
        </h1>
      </div>
      <div className="Entree-quote" style={{ bottom: `${quotePosition}px` }}>
        <p>
        "La pollution est le reflet des choix de l'homme face à la nature qu'il devrait chérir."
        </p>
      </div>
      {showButton && (
        <div
          className="Entree-button-container"
          style={{ opacity: showButton ? 1 : 0 }}
        >
          <button className="Entree-start-button" onClick={handleStart}>
            Commencer
          </button>
        </div>
      )}
    </div>
  );
};

export default Entree;
