import axios from 'axios';
import { useState } from 'react';
import qs from 'qs'

const useEntrenamiento = (id_rutina) => {
    const rutinaId = typeof id_rutina === 'object' ? id_rutina.rutinaId : id_rutina;
    const [error, setError] = useState(null);
    const [entrenamiento, setEntrenamiento] = useState([]);

    const getEntrenamiento = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/entrenamientos/rutina/${rutinaId}`);
          setEntrenamiento(response.data);
          return tareas
        } catch (err) {
          setError(err);
        }
      };

      const handleEliminar = async (id) => {
        try {
          // const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta tarea?");
          const confirmDelete = true
  
          if (confirmDelete) {
            const response = await axios.delete(`http://127.0.0.1:8000/entrenamientos/${id}`);
            console.log(response.data.message); 
            getEntrenamiento()
          }
    
        } catch (err) {
          setError(err);
        }
      };

      return {
        getEntrenamiento,
        handleEliminar,
        entrenamiento
      }

}

export default useEntrenamiento;