import React from 'react'
import axios from 'axios';
import { useState } from 'react';
const usePeso = (id) => {
    const idPersona = id
    //Le paso la id x parametro pero no hace falta que la declare
    const [error, setError] = useState(null);
    const [peso, setPeso] = useState([]);
    const [loading, setLoading] = useState(false)
  
    const getPeso = async () => {
      setLoading(true)
      setTimeout(() => {

      }, 3000);
      try {
        console.log("Entro al get")
        
        const response = await axios.get(`http://tfg-backend-piniass-projects.vercel.app/pesos/cliente/${idPersona}`);
        setPeso(response.data);
        setLoading(false)
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
          const response = await axios.delete(`http://tfg-backend-piniass-projects.vercel.app/pesos/cliente/${id}`);
          console.log(response.data.message); 
          actualizarTareas()
        }
  
      } catch (err) {
        setError(err);
      }
    };
  
    const  actualizarPeso = async() => {
      try {
        setLoading(true)
          const response = await axios.get(`http://tfg-backend-piniass-projects.vercel.app/pesos/cliente/${idPersona}`);
          setPeso(response.data);
          setLoading(false)
      } catch (error) {
          console.log(error);
      }
  
    }
  
  
    return {
        getPeso,
        actualizarPeso,
        peso,
        loading
    }
  
  }

export default usePeso;