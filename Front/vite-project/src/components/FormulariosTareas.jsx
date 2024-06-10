import React, { useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '../svgs/CloseIcon';
import useValidaciones from '../hooks/HooksValidaciones';
import useHasheo from '../hooks/HookHasheo';


export default function FormulariosTareas(props) {
  const {decryptData } = useHasheo();
  const id_entrenador = decryptData(sessionStorage.getItem("id"));

  const { id, actualizarTareas, handleEditar, setEstadoForm} = props;
  const [tareaNueva, setTareaNueva] = useState('');
  const { validarCampo, errores } = useValidaciones(); // Usa el hook de validaciones
  const [tareaValida, setValida] = useState(true)
  const url = 'https://tfg-backend-piniass-projects.vercel.app/tareas';

  const handleSubmitCrear = async (event) => {
    event.preventDefault();
    
    // Validar el campo de la tarea
    const esTareaValida = validarCampo('tarea', tareaNueva);
    if (!esTareaValida) {
      setValida(false)
    }
    if(esTareaValida){
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
  
        const res = await axios(options);
        // console.log(res.data);
        actualizarTareas();
        setEstadoForm(false);
      } catch (error) {
        console.error('Error al crear tarea:', error);
      }
    }
    
  };

  const cerrarForm = () => {
    setValida(true)

    setEstadoForm(false);
  }

  return (
    <div className='p-4 flex flex-col absolute top-1/3 right-1/3 '>
      <form onSubmit={handleSubmitCrear} className='border-2 flex flex-col p-2 mb-2 bg-white w-96'>
        <div className='flex items-center justify-between mb-2'>
          <label htmlFor="tareaNueva" className="text-lg font-semibold mb-2">Introduce una nueva tarea</label>
          <button className='bg-transparent' onClick={cerrarForm}>
            <CloseIcon /> 
          </button>
        </div>
        <textarea 
          id="tareaNueva"
          value={tareaNueva}
          onChange={(event) => setTareaNueva(event.target.value)}
          placeholder="Nueva Tarea"
          className="resize-none mb-2 p-2 border-2" 
        />
        {!tareaValida && <p className='p-1 mb-2 bg-red-500 text-white rounded-md'>El campo no puede estar vacio </p>}
        <button className='bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded' type="submit">Crear</button>
      </form>
    </div>
  );
}
