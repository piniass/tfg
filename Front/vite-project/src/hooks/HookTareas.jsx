import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import qs from 'qs'
import { useUser } from '../context/UserProvider';

const useTarea = () => {
  const id = sessionStorage.getItem('id');

    const [error, setError] = useState(null);
    const [tareas, setTareas] = useState([]);
  
  
    const getTareas = async () => {
      try {
        console.log("fetch tareas id:",id)
        const response = await axios.get(`http://127.0.0.1:8000/tareas/entrenador/${id}`);
        setTareas(response.data);
        // console.log(tareas)

        // console.log('Datos recibidos del backend:', response.data); // Agregar este console.log
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
          const response = await axios.delete(`http://127.0.0.1:8000/tareas/${id}`);
          console.log(response.data.message); 
          actualizarTareas()
        }
  
      } catch (err) {
        setError(err);
      }
    };
  
    const  actualizarTareas = async() => {
      try {
          const response = await axios.get(`http://127.0.0.1:8000/tareas/entrenador/${id}`);
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
          url: `http://127.0.0.1:8000/tareas/estado/${id}`
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