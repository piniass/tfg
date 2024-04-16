import React, { useState, useEffect } from 'react';
import FormulariosTareas from './FormulariosTareas';
import axios from 'axios';
import useTarea from '../hooks/HookTareas';

export default function ListaDeTareas(props) {
  const { id,tareas, handleEliminar, actualizarTareas } = props; // Recibiendo la función como prop
  const [taskForm, setEstadoForm] = useState(false)
  // const { getTareas, handleEditar, handleConfirmar} = useTarea({ id }); //cambiar porque ya no se va a usar

  const handleEditar = (tarea) => {
    setTareaEdit(tarea)
  }

  const mostrarForm = () => {
    if(!taskForm){
      setEstadoForm(true)
    } else {
      setEstadoForm(false)
    }
  }

  return (
    <>
    <div className='p-2 flex'>
      <h2 className="text-xl p-4 pb-0 font-semibold mb-4">Lista de Tareas</h2>
      <button onClick={mostrarForm}>Crear Tarea</button>
    </div>
    {
      taskForm && <FormulariosTareas actualizarTareas={actualizarTareas} setEstadoForm={setEstadoForm}/>
    }
    <div className="h-full p-4 overflow-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-auto">
        {tareas.map(tarea => (
          <div key={tarea.id} className="border-2 p-4 rounded-md">
            <p className={`text-lg font-semibold mb-2 ${tarea.confirmado ? 'line-through' : ''}`}>{tarea.tarea}</p>
            <div className="flex justify-between">
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" onClick={() => handleConfirmar(tarea.id)}>{tarea.confirmado === 1 ? 'Desconfirmar' : 'Confirmar'}</button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={() => handleEditar(tarea.id)}>Editar</button>
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={() => handleEliminar(tarea.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
    
  );
}