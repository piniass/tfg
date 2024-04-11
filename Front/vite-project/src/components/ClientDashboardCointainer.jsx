import React, { useState } from 'react';
import ClientsContainer from './ClientsContainer';
import Search from '../svgs/Search';
import { useNavigate } from 'react-router-dom';


export default function ClientDashboardContainer() {
  const navigate = useNavigate()
  const [buscador, setBuscador] = useState('')
  
  const goUsuarios = async () => {
    await navigate('/registrar');
  };

  const handleChange = (e) => {
    setBuscador(e.target.value); // Actualiza el estado buscador con el valor del input
  };

  return (
    <section className="w-4/5 h-full overflow-auto">
      <div className='p-4 flex gap-4 flex-col sm:flex-row h-30'>
        <div className='flex items-center relative'>
          <input 
            type='text' 
            className='ps-2 pr-20 py-4 border-solid border-2 rounded-lg w-full md:w-[320px] box-border'
            id='find' 
            placeholder='Introduce un nombre o apellido' 
            value={buscador} // Establece el valor del input al estado buscador
            onChange={handleChange} // Usa la función handleChange para manejar cambios en el input
          />
          <div className='absolute right-5'>
            <Search />
          </div>
        </div>
        <button onClick={goUsuarios} className='bg-blue-600 text-white hover:bg-blue-500'>Crear Usuario</button>
      </div>
      <ClientsContainer buscador={buscador}/> {/* Pasa la función para actualizar la búsqueda como una prop */}
    </section>
  );
}