import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./TurnPower.module.scss";
import StateList from "./StateList/StateList";

function ShellyControl() {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const deviceId = "4022d88e30e8"; 
  const authKey =
    "MWNiMjY5dWlk404459961993DCA83AE44BC6E3A6F58906952E7BECA0A5B69DC375C964915ACBC0EA536A0639CB73"; 

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

  const updateSwitchState = () => {
// Remplacez par votre clé d'authentification.

    // Utilisez l'URL du cloud Shelly pour obtenir l'état du relais.
    const statusUrl = `https://shelly-77-eu.shelly.cloud/device/status?id=${deviceId}&auth_key=${authKey}`;

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

  const toggleSwitch = async () => {
    const newState = !isSwitchOn;
    setIsSwitchOn(newState);
  
    const data = new FormData();
    data.append("channel", "0");
    data.append("turn", newState ? "on" : "off");
    data.append("id", deviceId);
    data.append("auth_key", authKey);
  
    try {
      const response = await axios.post(
        "https://shelly-77-eu.shelly.cloud/device/relay/control",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setIsSwitchOn(!newState);
    }
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
        console.error(
          "Erreur lors de l'envoi des données à la base de données :",
          error
        );
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
