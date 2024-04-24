import React from 'react'
import Aside from '../components/Aside'

export default function PaginaRutinas() {
  return (
    <div className='flex'>
      <Aside/>
      <main className='w-4/5 h-screen flex flex-col'>
        {/* <FormulariosTareas id={id} actualizarTareas={actualizarTareas} /> */}

        <p>Rutinas de ejercicios</p>
        
      </main> 
    </div>
  )
}
