import React, { useState } from 'react'
import Aside from '../components/Aside';
import FormulariosTareas from '../components/FormulariosTareas';
import ListaDeTareas from '../components/ListaTareas';
import useTarea from '../hooks/HookTareas';
import { useEffect } from 'react';

export default function Tareas() {
    var id = sessionStorage.getItem("id");
    const { getTareas, handleEliminar, handleEditar, handleConfirmar, actualizarTareas, tareas } = useTarea({ id });


    useEffect(() => {
      getTareas()
      console.log("prueba")
    }, []);



   console.log("Estado tareas:",tareas)
  return (
    <div className='flex'>
      <Aside id={id}/>
      <main className='w-4/5 h-screen flex flex-col'>
        {/* <FormulariosTareas id={id} actualizarTareas={actualizarTareas} /> */}

        <ListaDeTareas id={id} tareas={tareas} handleEditar={handleEditar} handleConfirmar={handleConfirmar} handleEliminar={handleEliminar} actualizarTareas={actualizarTareas}/> 
        
      </main> 
    </div>
  )
}