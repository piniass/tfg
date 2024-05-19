import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import FormularioCrearRutina from './FormularioCrearRutina';
import RutinasCard from './RutinasCard';
import useRutinas from '../hooks/HookRutinas';

export default function RutinasContainer() {
  const id = sessionStorage.getItem("id");
  const [showForm, setForm] = useState(false);
  const { getRutinas, actualizarRutinas, handleEliminar,rutinas} = useRutinas({ id });

  const handleOpenForm = () => {
    setForm(true)
  }

  useEffect(() => {
    getRutinas()
  }, []);

  return (
    <section className='w-full h-full overflow-auto flex flex-col relative'>
        <div className='p-4'>
          <button className='bg-blue-600 text-white' onClick={handleOpenForm}>Crear Rutina</button>
        </div>
        {
          showForm && <FormularioCrearRutina actualizarRutinas={actualizarRutinas} setForm={setForm} />
        }
        <article className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'> 

          {rutinas.map(rutina => (
                <RutinasCard key={rutina.id} handleEliminar={handleEliminar} rutina={rutina}/>
          ))}
        </article>
    </section>
  )
}
