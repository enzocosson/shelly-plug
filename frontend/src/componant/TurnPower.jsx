import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./TurnPower.module.scss";
import StateList from "./StateList/StateList";

function ShellyControl() {
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  useEffect(() => {
    // Mettre à jour l'état toutes les 3 secondes
    const interval = setInterval(updateSwitchState, 3000);
    // Récupérer l'état initial
    updateSwitchState();

    return () => {
      // Nettoyer l'intervalle lors de la suppression du composant
      clearInterval(interval);
    };
  }, []);

  const toggleSwitch = () => {
    const newState = !isSwitchOn;
    const url = `http://192.168.1.100/relay/0?turn=${newState ? "on" : "off"}`;

    axios
      .get(url)
      .then((response) => {
        setIsSwitchOn(newState);

        if (newState) {
          sendStateToDatabase(newState);
        }
      })
      .catch((error) => {
        // Gérer les erreurs ici
        console.error("Erreur lors de la requête :", error);
      });
      console.log(isSwitchOn)
  };

  const updateSwitchState = () => {
    // Envoyer une requête GET pour récupérer l'état du Shelly Plug
    axios
      .get("http://192.168.1.100/status")
      .then((response) => {
        console.log("Réponse de la requête :", response.data);
  
        if (response.data.relays && Array.isArray(response.data.relays) && response.data.relays.length > 0) {
          // Prendre la première entrée du tableau pour obtenir l'état du premier relais
          const isSwitchOn = response.data.relays[0].ison;
          setIsSwitchOn(isSwitchOn);
        
          // Si l'appareil est allumé, envoyez les données à la base de données
          if (isSwitchOn) {
            sendStateToDatabase(isSwitchOn);
          }
        } else {
          // Si l'information n'est pas disponible, considérez l'appareil comme éteint
          setIsSwitchOn(false);
        }
        
      })
      .catch((error) => {
        // Gérer les erreurs ici
        console.error("Erreur lors de la récupération de l'état :", error);
      });

  };
  
  

  const sendStateToDatabase = (ison) => {
    const data = {
      "@context": "/api/contexts/State",
      "@type": "State",
      isSwitchOn: ison,
      timestamp: new Date().toISOString(),
    };
  
    axios
      .post("https://127.0.0.1:8000/api/states", data, {
        headers: {
          "Content-Type": "application/ld+json",
        },
      })
      .then((response) => {
        console.log("Données enregistrées avec succès :", response.data);
      })
      .catch((error) => {
        // Gérer les erreurs ici
        console.error("Erreur lors de l'envoi des données à la base de données :", error);
      });
  };
  
  

  return (
    <div className={styles.main}>
      <div className={styles.light}>
        {isSwitchOn ? (
          <img src="/images/light-on.svg" alt="" />
        ) : (
          <img src="/images/light-off.svg" alt="" />
        )}
      </div>
      <h1>Contrôle du Shelly Plug</h1>
      <p>Le Shelly Plug est {isSwitchOn ? "allumé" : "éteint"}.</p>
      <button
        onClick={toggleSwitch}
        className={isSwitchOn ? styles.buttonOn : styles.buttonOff}
      >
        {isSwitchOn ? "Éteindre" : "Allumer"}
      </button>
      <StateList />
    </div>
  );
}

export default ShellyControl;
