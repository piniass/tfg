import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useTarea from '../hooks/HookTareas';

export default function ListaDeTareas(props) {
  const { id,tareas, handleEliminar } = props; // Recibiendo la función como prop
  const { getTareas, handleEditar, handleConfirmar} = useTarea({ id }); //cambiar porque ya no se va a usar

  return (
    <div className="h-full w-2/4 p-4">
      <h2 className="text-xl font-semibold mb-4">Lista de Tareas</h2>
      <div className="grid grid-cols-1 gap-4">
        {tareas.map(tarea => (
          <div key={tarea.id} className="bg-yellow-200 p-4 rounded-md">
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
  );
}