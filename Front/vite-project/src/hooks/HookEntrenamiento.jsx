import axios from 'axios';
import { useState } from 'react';
import qs from 'qs'

const useEntrenamiento = () => {
    var id = sessionStorage.getItem("id");
    const [error, setError] = useState(null);
    const [entrenamiento, setEntrenamiento] = useState([]);

    const getEntrenamiento = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/entrenamientos/rutina/${id}`);
          setEntrenamiento(response.data);
          return tareas
        } catch (err) {
          setError(err);
        }
      };

      const  actualizarEntrenamientos = async() => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/entrenamientos/rutina/${id}`);
            setEntrenamiento(response.data);
        } catch (error) {
            console.log(error);
        }
    
      }

      const handleEliminar = async (id) => {
        try {
          // const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta tarea?");
          const confirmDelete = true
  
          if (confirmDelete) {
            const response = await axios.delete(`http://127.0.0.1:8000/entrenamientos/${id}`);
            console.log(response.data.message); 
            actualizarRutinas()
          }
    
        } catch (err) {
          setError(err);
        }
      };

      return {
        getEntrenamiento,
        actualizarEntrenamientos,
        handleEliminar,
        entrenamiento
      }

}

export default useEntrenamiento;