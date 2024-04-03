import React, { useState } from 'react';
import ClientsContainer from './ClientsContainer';
import Search from '../svgs/Search';
import { useNavigate } from 'react-router-dom';


export default function ClientDashboardContainer(props) {
  const navigate = useNavigate()
  const [buscador, setBuscador] = useState('')
  
  const goUsuarios = async () => {
    await navigate('/registrar');
  };

  const handleChange = (e) => {
    setBuscador(e.target.value); // Actualiza el estado buscador con el valor del input
  };

  return (
    <section className="w-3/4">
      <div className='p-4 flex gap-4'>
        <div className='flex items-center relative'>
          <input 
            type='text' 
            className='ps-2 pr-8 py-4 border-solid border-2 rounded-lg'
            id='find' 
            placeholder='Introduce un nombre' 
            value={buscador} // Establece el valor del input al estado buscador
            onChange={handleChange} // Usa la función handleChange para manejar cambios en el input
          />
          <div className='absolute left-44'>
            <Search />
          </div>
        </div>
        <button onClick={goUsuarios}>Crear Usuario</button>
      </div>
      <ClientsContainer id={props.id} buscador={buscador}/> {/* Pasa la función para actualizar la búsqueda como una prop */}
    </section>
  );
}