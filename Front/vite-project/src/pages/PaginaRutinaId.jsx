import React, { useState } from 'react'
import Aside from '../components/Aside'
import { useLocation } from 'react-router-dom';
import Add from '../svgs/Add';
import FormularioCrearEntrenamiento from '../components/FormularioCrearEntrenamiento';


export default function PaginaRutinaId() {
    const location = useLocation();
    const rutina = location.state;
    const nombreRutina = rutina.nombre
    const [showForm, setForm] = useState(false)
    console.log(rutina); 

    const handleShowForm = () => {
        setForm(true)
    }

  return (
    <div className='flex'>
      <Aside/>
      <main className='w-4/5 h-screen flex flex-col relative'>
        <section className='p-4'>
            <h2 className='text-2xl'>Nombre de la rutina: {nombreRutina}</h2>
        </section>
        <section className='p-4'>
            <h2 className='text-2xl mb-2'>Entrenamientos:</h2>
            <article>
                <button className='flex flex-col justify-center items-center size-32' onClick={handleShowForm}>
                    <Add/>
                    <span>Añadir entrenamiento</span>
                </button>
            </article>
        </section>
        {showForm && <FormularioCrearEntrenamiento rutina={rutina} setForm={setForm}/>}
      </main> 
    </div>
  )
}
