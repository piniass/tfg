import axios from 'axios';
import { useState } from 'react';
import qs from 'qs'
import useHasheo from '../hooks/HookHasheo';

const useRutinas = () => {
  const {decryptData } = useHasheo();
  const id = decryptData(sessionStorage.getItem("id"));
    const [error, setError] = useState(null);
    const [rutinas, setRutinas] = useState([]);

    const getRutinas = async () => {
      
        try {
          setTimeout(() => {

          }, 2000);
          const response = await axios.get(`https://tfg-backend-piniass-projects.vercel.app/rutinas/entrenador/${id}`);
          setRutinas(response.data);
        } catch (err) {
          setError(err);
        }
      };

      const getRutinasId = async (id_cliente) => {
        try {
          const response = await axios.get(`https://tfg-backend-piniass-projects.vercel.app/rutinas/entrenador/${id_cliente}`);
          setRutinas(response.data);
        } catch (err) {
          setError(err);
          // console.log(err)
        }
      };

      const  actualizarRutinas = async() => {
        try {
            const response = await axios.get(`https://tfg-backend-piniass-projects.vercel.app/rutinas/entrenador/${id}`);
            // console.log("actualizo tareas")
            setRutinas(response.data);
        } catch (error) {
            // console.log(error);
        }
    
      }

      const handleEliminar = async (id) => {
        try {
          // const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta tarea?");
          const confirmDelete = true
  
          if (confirmDelete) {
            const response = await axios.delete(`https://tfg-backend-piniass-projects.vercel.app/rutinas/${id}`);
            // console.log(response.data.message); 
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