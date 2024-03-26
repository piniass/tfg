import React, { useState } from 'react';

export default function ListaDeTareas() {
  const [tareas, setTareas] = useState([
    { id: 1, texto: 'Tarea 1' },
    { id: 2, texto: 'Tarea 2' },
    { id: 3, texto: 'Tarea 3' }
  ]);

  const handleConfirmar = (id) => {
    // Aquí puedes agregar la lógica para confirmar la tarea
    console.log(`Tarea ${id} confirmada`);
  };

  const handleEditar = (id) => {
    // Aquí puedes agregar la lógica para editar la tarea
    console.log(`Editando tarea ${id}`);
  };

  const handleEliminar = (id) => {
    // Aquí puedes agregar la lógica para eliminar la tarea
    setTareas(tareas.filter(tarea => tarea.id !== id));
    console.log(`Tarea ${id} eliminada`);
  };

  return (
    <div className="h-full w-2/4">
      <h2 className="text-xl font-semibold mb-4">Lista de Tareas</h2>
      <div className="grid grid-cols-1 gap-4">
        {tareas.map(tarea => (
          <div key={tarea.id} className="bg-yellow-200 p-4 rounded-md">
            <p className="text-lg font-semibold mb-2">{tarea.texto}</p>
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
