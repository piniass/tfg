import React from 'react'
import axios from 'axios';
import { useState } from 'react';
const usePeso = (id) => {
    const idPersona = id
    //Le paso la id x parametro pero no hace falta que la declare
    const [error, setError] = useState(null);
    const [peso, setPeso] = useState([]);
  
    const getPeso = async () => {
      try {
        console.log("Entro al get")
        const response = await axios.get(`http://127.0.0.1:8000/pesos/cliente/${idPersona}`);
        setPeso(response.data);
        console.log('Datos recibidos del backend:', response.data); // Agregar este console.log
        return peso
      } catch (err) {
        setError(err);
      }
    };
  
    const handleEliminar = async (id) => {
      try {
        // const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta tarea?");
        const confirmDelete = true

        if (confirmDelete) {
          const response = await axios.delete(`http://127.0.0.1:8000/pesos/cliente/${id}`);
          console.log(response.data.message); 
          actualizarTareas()
        }
  
      } catch (err) {
        setError(err);
      }
    };
  
    const  actualizarPeso = async() => {
      try {
          const response = await axios.get(`http://127.0.0.1:8000/pesos/cliente/${idPersona}`);
          setPeso(response.data);
      } catch (error) {
          console.log(error);
      }
  
    }
  
  
    return {
        getPeso,
        actualizarPeso,
        peso
    }
  
  }

export default usePeso;