import { useState } from 'react';
import axios from 'axios';

const useCliente = () => {
  const id = sessionStorage.getItem('id');
  const [error, setError] = useState(null);
  const [cliente, setCliente] = useState([]);
  
  const getClientes = async () => {
    console.log("entro al try")
    try {
      console.log("hago peticion")
      const response = await axios.get(`http://localhost:8000/clientes/entrenador/${id}`);
      setCliente(response.data);
      console.log("devuelvo peticion")
    } catch (err) {
      setError(err);
    }
    console.log("salgo del catch")
  };

  const handleEliminar = async (cliente) => {
    console.log(cliente)
    try {
      const confirmDelete = true;
      if (confirmDelete) {
        await axios.delete(`http://127.0.0.1:8000/cliente/${cliente}`);
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
