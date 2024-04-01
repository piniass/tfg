import React, { useState } from 'react';
import axios from 'axios';

export default function FormulariosTareas(props) {
  const id = props.id;
  const [tareaNueva, setTareaNueva] = useState('');
  const [error, setError] = useState(null);

  const handleSubmitCrear = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://127.0.0.1:8000/tareas`, {
        tarea: tareaNueva,
        id_entrenador: parseInt(id)
      });
      console.log(tarea);
      console.log(id);

      // Lógica adicional después de crear la tarea, como redireccionar o mostrar un mensaje de éxito
    } catch (error) {
      console.error('Error al crear tarea:', error);
      // Manejo de errores, como mostrar un mensaje de error al usuario
      setError(error);
    }
    setTareaNueva('');
  };

  const handleSubmitActualizar = (event) => {
    event.preventDefault();
    console.log('Se ha enviado el formulario para actualizar la tarea:', tareaNueva);
    setTareaNueva('');
  };

  return (
    <div className='p-4 flex flex-col w-2/4'>
      <form onSubmit={handleSubmitCrear} className='bg-yellow-400 flex flex-col p-2 mb-2 h-1/2 hover:bg-yellow-500'>
        <label htmlFor="tareaNueva" className="text-lg font-semibold mb-2">Introduce una nueva tarea</label>
        <textarea 
          id="tareaNueva"
          value={tareaNueva}
          onChange={(event) => setTareaNueva(event.target.value)}
          placeholder="Nueva Tarea"
          rows={24} 
          className="resize-none mb-2" 
        />
        <button className='bg-green hover:bg-green-dark text-white font-bold py-2 px-4 rounded' type="submit">Crear</button>
      </form>
      <form onSubmit={handleSubmitActualizar} className='bg-yellow-400 flex flex-col p-2 h-1/2 hover:bg-yellow-500'>
        <label htmlFor="tareaActualizada" className="text-lg font-semibold mb-2">Actualiza tarea </label>
        <textarea 
          id="tareaActualizada"
          value={tareaNueva}
          onChange={(event) => setTareaNueva(event.target.value)}
          placeholder=""
          rows={24} 
          className="resize-none mb-2" 
        />
        <button className='bg-green hover:bg-green-dark text-white font-bold py-2 px-4 rounded' type="submit">Actualizar</button>
      </form>
    </div>
  );
}
