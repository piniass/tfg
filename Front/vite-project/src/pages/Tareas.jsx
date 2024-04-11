import React, { useState } from 'react'
import Aside from '../components/Aside';
import FormulariosTareas from '../components/FormulariosTareas';
import ListaDeTareas from '../components/ListaTareas';
import useTarea from '../hooks/HookTareas';
import { useEffect } from 'react';

export default function Tareas() {
    var id = sessionStorage.getItem("id");
    const { getTareas, handleEditar, handleEliminar, handleConfirmar, actualizarTareas, tareas } = useTarea({ id });
    
    useEffect(() => {
      getTareas()
      console.log("prueba")
    }, [id]);


   console.log("Estado tareas:",tareas)
  return (
    <div className='flex'>
      <Aside id={id}/>
      <main className='w-4/5 h-screen bg-blue-500 flex'>
        <FormulariosTareas id={id} actualizarTareas={actualizarTareas}/>

        <ListaDeTareas id={id} tareas={tareas} handleEliminar={handleEliminar}/> 
        
      </main> 
    </div>
  )
}