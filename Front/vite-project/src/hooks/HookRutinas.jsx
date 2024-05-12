import axios from 'axios';
import { useState } from 'react';
import qs from 'qs'

const useRutinas = () => {
    var id = sessionStorage.getItem("id");
    const [error, setError] = useState(null);
    const [rutinas, setRutinas] = useState([]);

    const getRutinas = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/rutinas/entrenador/${id}`);
          setRutinas(response.data);
          return tareas
        } catch (err) {
          setError(err);
        }
      };

      return {
        getRutinas,
        rutinas
      }

}

export default useRutinas;