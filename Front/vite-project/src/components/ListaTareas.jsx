import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ListaDeTareas(props) {
  const id = props.id
  const [tareas, setTareas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTareas = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/tareas/entrenador/${id}`);
        setTareas(response.data);
        console.log('Datos recibidos del backend:', response.data); // Agregar este console.log
      } catch (err) {
        setError(err);
      }
    };

    getTareas();
  }, [id]);

  const handleConfirmar = async (id) => {
    try {
      // Obtener la tarea actual
      const tareaActual = tareas.find(tarea => tarea.id === id);
      // Invertir el estado de confirmado (0 -> 1, 1 -> 0)
      const nuevoEstadoConfirmado = tareaActual.confirmado ? 0 : 1;
      // Enviar solicitud PUT para actualizar el estado de confirmado
      await axios.put(`http://127.0.0.1:8000/tareas/${id}`, { confirmado: nuevoEstadoConfirmado });
      // Actualizar la lista de tareas después de confirmar
      const response = await axios.get(`http://127.0.0.1:8000/tareas/entrenador/${id}`);
      setTareas(response.data);
    } catch (err) {
      setError(err);
    }
  };

  const handleEditar = (id) => {
    // Lógica para editar la tarea con el ID especificado
    console.log(`Editando tarea con ID: ${id}`);
  };

  const handleEliminar = async (id) => {
    try {
      const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta tarea?");
      if (confirmDelete) {
        const response = await axios.delete(`http://127.0.0.1:8000/tareas/${id}`);
        console.log(response.data.message); 
        await window.location.reload();
      }

    } catch (err) {
      setError(err);
    }
  };
  

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
