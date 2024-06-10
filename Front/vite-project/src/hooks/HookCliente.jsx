import { useState } from 'react';
import axios from 'axios';
import useHasheo from '../hooks/HookHasheo';

const useCliente = () => {
  const {decryptData } = useHasheo();
  const id = decryptData(sessionStorage.getItem("id"));
  const [error, setError] = useState(null);
  const [cliente, setCliente] = useState([]);
  
  const getClientes = async () => {
    try {
      const response = await axios.get(`https://tfg-backend-piniass-projects.vercel.app/clientes/entrenador/${id}`);
      setCliente(response.data);
    } catch (err) {
      setError(err);
    }
  };

  const handleEliminar = async (cliente) => {
    // console.log(cliente)
    try {
      const confirmDelete = true;
      if (confirmDelete) {
        await axios.delete(`https://tfg-backend-piniass-projects.vercel.app/tfg-backend-piniass-projects.vercel.app/cliente/${cliente}`);
        getClientes(); // Refresca la lista de clientes después de eliminar
      }
    } catch (err) {
      setError(err);
    }
  };

  return {
    cliente,
    getClientes,
    handleEliminar,
  };
};

export default useCliente;
