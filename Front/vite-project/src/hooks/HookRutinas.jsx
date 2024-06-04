import axios from 'axios';
import { useState } from 'react';
import qs from 'qs'

const useRutinas = () => {
    var id = sessionStorage.getItem("id");
    const [error, setError] = useState(null);
    const [rutinas, setRutinas] = useState([]);

    const getRutinas = async () => {
      
        try {
          setTimeout(() => {

          }, 2000);
          const response = await axios.get(`http://127.0.0.1:8000/rutinas/entrenador/${id}`);
          setRutinas(response.data);
        } catch (err) {
          setError(err);
        }
      };

      const getRutinasId = async (id_cliente) => {
        try {
          setTimeout(() => {

          }, 2000);
          const response = await axios.get(`http://127.0.0.1:8000/rutinas/entrenador/${id_cliente}`);
          setRutinas(response.data);
        } catch (err) {
          setError(err);
        }
      };

      const  actualizarRutinas = async() => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/rutinas/entrenador/${id}`);
            console.log("actualizo tareas")
            setRutinas(response.data);
        } catch (error) {
            console.log(error);
        }
    
      }

      const handleEliminar = async (id) => {
        try {
          // const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta tarea?");
          const confirmDelete = true
  
          if (confirmDelete) {
            const response = await axios.delete(`http://127.0.0.1:8000/rutinas/${id}`);
            console.log(response.data.message); 
            actualizarRutinas()
          }
    
        } catch (err) {
          setError(err);
        }
      };

      return {
        getRutinas,
        actualizarRutinas,
        getRutinasId,
        handleEliminar,
        rutinas
      }

}

export default useRutinas;