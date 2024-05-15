import React, { useEffect, useState } from 'react'
import Aside from '../components/Aside'
import { useLocation } from 'react-router-dom';
import Add from '../svgs/Add';
import FormularioCrearEntrenamiento from '../components/FormularioCrearEntrenamiento';
import useEntrenamiento from '../hooks/HookEntrenamiento';
import DeleteIcon from '../svgs/Delete';
import EntrenamientoCard from '../components/EntrenamientoCard';
import FormularioCrearEjercicio from '../components/FormularioCrearEjercicio';

export default function PaginaRutinaId() {
    const location = useLocation();
    const rutina = location.state;
    const nombreRutina = rutina.nombre
    const rutinaId = Number(rutina.id)
    const [showForm, setForm] = useState(false)
    const {entrenamiento, getEntrenamiento, actualizarEntrenamiento,handleEliminar} = useEntrenamiento({rutinaId})
    const [entrenamientoObj, setObj] = useState('')


    const handleShowForm = () => {
        setForm(true)
    }

    useEffect(() => {
      getEntrenamiento()
    }, []);

  return (
    <div className='flex'>
      <Aside/>
      <main className='w-4/5 h-screen flex flex-col relative'>
        <section className='p-4'>
            <h2 className='text-2xl'>Nombre de la rutina: {nombreRutina}</h2>
        </section>
        <section className='p-4'>
          <div className='flex gap-4 items-center mb-4'>
          <h2 className='text-2xl mb-2'>Entrenamientos</h2>
            <button className='flex flex-col justify-center items-center' onClick={handleShowForm}>
                    <span>Añadir entrenamiento</span>
                </button>
          </div>
            
            <article className='flex gap-4 overflow-x-auto'>
                {
                  entrenamiento.map((sesion) => 
                  // <div className='flex flex-col justify-center items-center w-52 h-52 p-2 border rounded-md'>
                    <EntrenamientoCard key={sesion.id} sesion={sesion} setObj={setObj} handleEliminar={handleEliminar}/>
                  )
                }
            </article>
        </section>
        {showForm && <FormularioCrearEntrenamiento getEntrenamiento={getEntrenamiento} rutina={rutina} setForm={setForm}/>}
        {entrenamientoObj && <FormularioCrearEjercicio entrenamientoObj={entrenamientoObj}/>}
      </main> 
    </div>
  )
}
