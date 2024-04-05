import React from 'react'
import axios from 'axios';
import { useState } from 'react';
const useTarea = () => {
    var id = sessionStorage.getItem("id");
    const [error, setError] = useState(null);
    const [tareas, setTareas] = useState([]);
  
    const getTareas = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/tareas/entrenador/${id}`);
        setTareas(response.data);
        console.log('Datos recibidos del backend:', response.data); // Agregar este console.log
        return tareas
      } catch (err) {
        setError(err);
      }
    };
  
    const handleEditar = (id) => {
      // Lógica para editar la tarea con el ID especificado
      console.log(`Editando tarea con ID: ${id}`);
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
          const response = await axios.get(`http://127.0.0.1:8000/tareas/`);
          console.log("actualizo tareas")
          setTareas(response.data);
          console.log(tareas)
      } catch (error) {
          console.log(error);
      }
  
    }
  
    const handleConfirmar = async (id) => {
      try {
        // Obtener la tarea actual
        const tareaActual = tareas.find(tarea => tarea.id === id);
        // Invertir el estado de confirmado (0 -> 1, 1 -> 0)
        const nuevoEstadoConfirmado = tareaActual.confirmado ? 0 : 1;
        // Enviar solicitud PUT para actualizar el estado de confirmado
        await axios.put(`http://127.0.0.1:8000/tareas/${id}`, { confirmado: nuevoEstadoConfirmado });
        // Actualizar la lista de tareas después de confirmar
        const response = await axios.get(`http://127.0.0.1:8000/tareas/entrenador/${id}`);
        setTareas(response.data);
      } catch (err) {
        setError(err);
      }
    };
  
    return {
      getTareas,
      handleEditar,
      actualizarTareas,
      handleEliminar,
      handleConfirmar,
      tareas
    }
  
  }

export default useTarea;