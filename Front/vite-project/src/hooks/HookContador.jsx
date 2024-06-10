import { useState } from 'react';
import axios from 'axios';

const useContador = () => {
  const [error, setError] = useState(null);
  const [counterEj, setCounter] = useState(null);
  const [loading, setLoading] = useState(false)
  
  const getCounter = async (id_cliente) => {
    setLoading(true)
    setTimeout(() => {

    }, 2000);
    try {
        
        const response = await axios.get(`https://tfg-backend-piniass-projects.vercel.app/ejercicios/rutina/cliente/${id_cliente}`);
        setLoading(false)
        setCounter(response.data);
    } catch (err) {
        setError(err);
        // console.log(error);
    }
  };

  return {
    counterEj,
    getCounter,
    loading
  };
};

export default useContador;
