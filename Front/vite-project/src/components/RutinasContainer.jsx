import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import FormularioCrearRutina from './FormularioCrearRutina';
import RutinasCard from './RutinasCard';
import useRutinas from '../hooks/HookRutinas';

export default function RutinasContainer() {
  const id = sessionStorage.getItem("id");
  const [showForm, setForm] = useState(false);
  const { getRutinas, rutinas} = useRutinas({ id });

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
          showForm && <FormularioCrearRutina setForm={setForm}/>
        }
        <article className='flex flex-col md:flex-row flex-wrap items-center justify-center lg:justify-between gap-4 p-4'> 

          {rutinas.map(rutina => (
                <RutinasCard key={rutina.id} rutina={rutina}/>
          ))}
        </article>
    </section>
  )
}
