import React, { useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '../svgs/CloseIcon';

export default function FormulariosTareas(props) {
  var id_entrenador = sessionStorage.getItem("id");

  const { id, actualizarTareas, handleEditar, setEstadoForm} = props;
  const [tareaNueva, setTareaNueva] = useState('');
  // const { getTareas, handleEditar, handleEliminar, handleConfirmar, tareas } = useTarea({ id }); // Pasar el id al hook

  const url = 'https://tfg-backend-piniass-projects.vercel.app/tareas';
  // const navigate = useNavigate();

 
  const handleSubmitCrear = async (event) => {
    event.preventDefault();
    try {
      const data = {
        tarea: tareaNueva,
        id_entrenador: id_entrenador
      };

      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url: url,
      };
      console.log(data)
      const res = await axios(options);
      console.log(res.data);
      console.log(props)
      // window.location.reload()
      actualizarTareas() //esto no funciona bien
      setEstadoForm(false)
    } catch (error) {
      console.error('Error al crear tarea:', error);
    }
  };


  const cerrarForm = () => {
    setEstadoForm(false)
  }

  const handleSubmitActualizar = (event) => {
    event.preventDefault();
    console.log('Se ha enviado el formulario para actualizar la tarea:', tareaNueva);
    setTareaNueva('');
  };

  return (
    <div className='p-4 flex flex-col absolute top-1/3 right-1/3 '>
      <form onSubmit={handleSubmitCrear} className='border-2 flex flex-col p-2 mb-2 bg-white w-96'>
        <div className='flex items-center justify-between mb-2'>
          <label htmlFor="tareaNueva" className="text-lg font-semibold mb-2">Introduce una nueva tarea</label>
          <button className='bg-transparent' onClick={cerrarForm}>
          <CloseIcon /> 

          </button>
          {/* no funciona esta funcion, revisar */}
        </div>
        <textarea 
          id="tareaNueva"
          value={tareaNueva}
          onChange={(event) => setTareaNueva(event.target.value)}
          placeholder="Nueva Tarea"
          className="resize-none mb-2 p-2 border-2" 
        />
        <button className='bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded' type="submit">Crear</button>
      </form>
      {/* <form onSubmit={handleEditar} className='bg-yellow-400 flex flex-col p-2 h-1/2 hover:bg-yellow-500'>
        <label htmlFor="tareaActualizada1" className="text-lg font-semibold mb-2">Actualiza tarea </label>
        <textarea 
          id="tareaActualizada1"
          value={tareaActualizada}
          onChange={(event) => setTareaActualizda(event.target.value)}
          placeholder=""
          rows={24} 
          className="resize-none mb-2" 
        />
        <button className='bg-green hover:bg-green-dark text-white font-bold py-2 px-4 rounded' type="submit">Actualizar</button>
      </form> */}
    </div>
  );
}
