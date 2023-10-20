import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StateList() {
  const [states, setStates] = useState([]);

  useEffect(() => {
    // Effectuer une requête GET vers votre API Symfony
    axios.get('/api/states')
      .then(response => {
        setStates(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des états :', error);
      });
  }, []);

  return (
    <div>
      <h2>Historique :</h2>
      <ul>
        {states.map(state => (
          <li key={state.id}>
            État : {state.isSwitchOn ? 'Allumé' : 'Éteint'}{' '}
            à {new Date(state.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StateList;
