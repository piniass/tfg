import React, { useState } from 'react'
import Aside from '../components/Aside';
import FormulariosTareas from '../components/FormulariosTareas';
import ListaDeTareas from '../components/ListaTareas';
import useTarea from '../hooks/HookTareas';
import { useEffect } from 'react';
import { useUser } from '../context/UserProvider';

export default function Tareas() {
    const id = sessionStorage.getItem('id');
    console.log("El id es: ",id)
    // var id = sessionStorage.getItem("id");
    const { getTareas, handleEliminar, handleEditar, handleConfirmar, actualizarTareas, tareas } = useTarea({ id });


    useEffect(() => {
      getTareas()
    }, []);



   console.log("Estado tareas:",tareas)
  return (
    <div className='flex'>
      <Aside />
      <main className='w-4/5 h-screen flex flex-col'>
        {/* <FormulariosTareas id={id} actualizarTareas={actualizarTareas} /> */}

        <ListaDeTareas userId={id} tareas={tareas} handleEditar={handleEditar} handleConfirmar={handleConfirmar} handleEliminar={handleEliminar} actualizarTareas={actualizarTareas}/> 
        
      </main> 
    </div>
  )
}