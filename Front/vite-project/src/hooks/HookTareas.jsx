import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import qs from 'qs'
const useTarea = () => {
    var id = sessionStorage.getItem("id");
    const [error, setError] = useState(null);
    const [tareas, setTareas] = useState([]);
  
  
    const getTareas = async () => {
      try {
        const response = await axios.get(`https://tfg-backend-piniass-projects.vercel.app/tareas/entrenador/${id}`);
        setTareas(response.data);
        console.log(tareas)

        console.log('Datos recibidos del backend:', response.data); // Agregar este console.log
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
          const response = await axios.delete(`https://tfg-backend-piniass-projects.vercel.app/tareas/${id}`);
          console.log(response.data.message); 
          actualizarTareas()
        }
  
      } catch (err) {
        setError(err);
      }
    };
  
    const  actualizarTareas = async() => {
      try {
          const response = await axios.get(`https://tfg-backend-piniass-projects.vercel.app/tareas/entrenador/${id}`);
          console.log("actualizo tareas")
          setTareas(response.data);
          console.log(tareas)
      } catch (error) {
          console.log(error);
      }
  
    }
  
    const handleConfirmar = async (id,tareas) => {
      try {
        const tareaActual = tareas.find(tarea => tarea.id === id);
        const nuevoEstadoConfirmado = !tareaActual.confirmado;

        const data = {
          id: id,
          confirmado: nuevoEstadoConfirmado
        };

        const options = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          data: qs.stringify(data),
          url: `https://tfg-backend-piniass-projects.vercel.app/tareas/estado/${id}`
        };
        const res = await axios(options);
        actualizarTareas() 
      } catch (err) {
        setError(err);
      }
    };
    
  
    return {
      getTareas,
      actualizarTareas,
      handleEliminar,
      handleConfirmar,
      tareas
    }
  
  }

export default useTarea;