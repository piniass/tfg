import React, { useState, useEffect } from 'react';
import ClientsContainer from './ClientsContainer';
import Search from '../svgs/Search';
import { useNavigate } from 'react-router-dom';
import FormularioCrearCliente from './FormularioCrearCliente';
import FormularioEditarCliente from './FormularioEditarCliente';
import useCliente from '../hooks/HookCliente';
import useHasheo from '../hooks/HookHasheo';

export default function ClientDashboardContainer() {
  const {decryptData } = useHasheo();
  const id = decryptData(sessionStorage.getItem("id"));
  const navigate = useNavigate();
  const [buscador, setBuscador] = useState('');
  const [showForm, setForm] = useState(false);
  const [editForm, setEdit] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null); // Agregar estado para almacenar la ID del cliente seleccionado
  const {cliente, getClientes, handleEliminar} = useCliente();

  useEffect(() => {
      getClientes();
  }, [id]);

  const handleForm = async () => {
      setForm(true);
  };

  const handleChange = (e) => {
      setBuscador(e.target.value);
  };

  return (
      <section className="w-4/5 h-full overflow-auto relative">
          <div className='p-4 flex gap-4 flex-col sm:flex-row h-30'>
              <div className='flex items-center relative'>
                  <input 
                      type='text' 
                      className='ps-2 pr-20 py-4 border-solid border-2 rounded-lg w-full md:w-[320px] box-border'
                      id='find' 
                      placeholder='Introduce un nombre o apellido' 
                      value={buscador}
                      onChange={handleChange}
                  />
                  <div className='absolute right-5'>
                      <Search />
                  </div>
              </div>
              <button onClick={handleForm} className='bg-blue-600 text-white hover:bg-blue-500'>Crear Usuario</button>
          </div>
          {showForm && <FormularioCrearCliente setForm={setForm} getClientes={getClientes}/>}
          {editForm && <FormularioEditarCliente setEdit={setEdit} cliente={cliente.find(c => c.id === selectedClientId)} getClientes={getClientes} />} {/* Pasar el cliente seleccionado */}
          <ClientsContainer buscador={buscador} cliente={cliente} getClientes={getClientes} setEdit={setEdit} setClienteId={setSelectedClientId} handleEliminar={handleEliminar} />
      </section>
  );
}
