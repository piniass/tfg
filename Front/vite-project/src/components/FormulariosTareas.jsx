import React, { useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import useTarea from '../hooks/HookTareas';

export default function FormulariosTareas(props) {
  const { id, actualizarTareas } = props;
  const [tareaNueva, setTareaNueva] = useState('');
  const { getTareas, handleEditar, handleEliminar, handleConfirmar, tareas } = useTarea({ id }); // Pasar el id al hook

  const url = 'http://127.0.0.1:8000/tareas';
  // const navigate = useNavigate();

 
  const handleSubmitCrear = async (event) => {
    event.preventDefault();
    try {
      const data = {
        tarea: tareaNueva,
        id_entrenador: id
      };

      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url: url,
      };

      const res = await axios(options);
      console.log(res.data);
      console.log(props)
      // window.location.reload()
      actualizarTareas()
    } catch (error) {
      console.error('Error al crear tarea:', error);
    }
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
        <label htmlFor="tareaActualizada1" className="text-lg font-semibold mb-2">Actualiza tarea </label>
        <textarea 
          id="tareaActualizada1"
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
