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
    const deviceId = "80646F827174"; // Remplacez par l'ID de votre dispositif.
    const authKey = "MWRmYzM2dWlkE62C6C4C76F817CE0A3D2902F5B5D4C115E49B28CF8539114D9246505DE5D368D560D06020A92480"; // Remplacez par votre clé d'authentification.
  
    // Utilisez l'URL du cloud Shelly pour allumer ou éteindre le relais.
    const toggleUrl = `https://shelly-86-eu.shelly.cloud/device/relay/control?channel=0&turn=${newState ? "on" : "off"}&id=${deviceId}&auth_key=${authKey}`;
  
    // Envoyer une requête GET vers le cloud Shelly pour changer l'état du relais.
    axios
      .get(toggleUrl)
      .then((response) => {
        // La requête a réussi, mettez à jour l'état local
        setIsSwitchOn(newState);
  
        // Si l'appareil est allumé, envoyez les données à la base de données
        if (newState) {
          sendStateToDatabase(newState);
        }
      })
      .catch((error) => {
        // Gérer les erreurs ici
        console.error("Erreur lors de la requête :", error);
      });
  };
  

  const updateSwitchState = () => {
    const deviceId = "80646F827174"; // Remplacez par l'ID de votre dispositif.
    const authKey = "MWRmYzM2dWlkE62C6C4C76F817CE0A3D2902F5B5D4C115E49B28CF8539114D9246505DE5D368D560D06020A92480"; // Remplacez par votre clé d'authentification.
  
    // Utilisez l'URL du cloud Shelly pour obtenir l'état du relais.
    const statusUrl = `https://shelly-86-eu.shelly.cloud/device/status?id=${deviceId}&auth_key=${authKey}`;
  
    // Envoyer une requête GET vers le cloud Shelly pour obtenir l'état du relais.
    axios
      .get(statusUrl)
      .then((response) => {
        // Extraire l'état du relais (ison) de la réponse
        const isSwitchOn = response.data.relays[0].ison;
        setIsSwitchOn(isSwitchOn);
  
        // Si l'appareil est allumé, envoyez les données à la base de données
        if (isSwitchOn) {
          sendStateToDatabase(isSwitchOn);
        }
      })
      .catch((error) => {
        // Gérer les erreurs ici
        console.error("Erreur lors de la récupération de l'état :", error);
      });
  };
  

  const sendStateToDatabase = (isOn) => {
    // Créez l'objet avec les données à envoyer
    const data = {
      isSwitchOn: isOn,
      timestamp: new Date().toISOString(),
    };
  
    // Envoyez une requête POST pour enregistrer les données dans la base de données
    axios
      .post("https://127.0.0.1:8000/api/states", data)
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
