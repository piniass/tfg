import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ListaDeTareas({ id }) {
  const [tareas, setTareas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTareas = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/tareas/entrenador/${id}`);
        setTareas(response.data);
      } catch (err) {
        setError(err);
      }
    };

    getTareas();
  }, [id]);

  const handleConfirmar = (id) => {
    // Lógica para confirmar la tarea con el ID especificado
    console.log(`Tarea confirmada con ID: ${id}`);
  };

  const handleEditar = (id) => {
    // Lógica para editar la tarea con el ID especificado
    console.log(`Editando tarea con ID: ${id}`);
  };

  const handleEliminar = (id) => {
    // Lógica para eliminar la tarea con el ID especificado
    console.log(`Eliminando tarea con ID: ${id}`);
  };

  return (
    <div className="h-full w-2/4 p-4">
      <h2 className="text-xl font-semibold mb-4">Lista de Tareas</h2>
      <div className="grid grid-cols-1 gap-4">
        {tareas.map(tarea => (
          <div key={tarea.id} className="bg-yellow-200 p-4 rounded-md">
            <p className="text-lg font-semibold mb-2">{tarea.tarea}</p>
            <div className="flex justify-between">
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" onClick={() => handleConfirmar(tarea.id)}>Confirmar</button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={() => handleEditar(tarea.id)}>Editar</button>
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={() => handleEliminar(tarea.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
