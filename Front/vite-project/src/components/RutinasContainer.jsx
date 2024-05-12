import React from 'react'
import { useState } from 'react';
import FormularioCrearRutina from './FormularioCrearRutina';

export default function RutinasContainer() {
  const [showForm, setForm] = useState(false);
  const handleOpenForm = () => {
    setForm(true)
  }

  return (
    <section className='w-full h-full overflow-auto flex flex-col relative'>
        <div className='p-4'>
          <button className='bg-blue-600 text-white' onClick={handleOpenForm}>Crear Rutina</button>
        </div>
        {
          showForm && <FormularioCrearRutina setForm={setForm}/>
        }
        
    </section>
  )
}
