import React, { useState } from 'react';
import CloseIcon from '../svgs/CloseIcon';
import qs from 'qs';
import axios from 'axios';
import useValidaciones from '../hooks/HooksValidaciones';


export default function FormularioEditarTarea(props) {
  var id_entrenador = sessionStorage.getItem("id");
  const { tarea, setEstadoForm, actualizarTareas} = props;
  const id = tarea.id
  const tareaAntigua = tarea.tarea;
  const [tareaNueva, setTareaNueva] = useState(tareaAntigua);
  const { validarCampo, errores } = useValidaciones(); // Usa el hook de validaciones


  const handleSubmitActualizar = async (event) => {
    event.preventDefault();
    const esTareaValida = validarCampo('tarea', tareaNueva);
    if (!esTareaValida) {
      return alert('El campo no puede estar vacio ');;
    }
    try {
      const data = {
        tarea: tareaNueva,
        id_entrenador:id_entrenador
      };
  
      const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url: `http://127.0.0.1:8000/tareas/${id}`    // Aquí está la URL de la ruta
      };
      console.log(data)
      const res = await axios(options);
      console.log(res.data);
      console.log(props)
      actualizarTareas()
      // window.location.reload()
      setEstadoForm(false)
    } catch (error) {
      console.error('Error al crear tarea:', error);
    }
    console.log(`Editando tarea con ID: ${id}`);
  };
  
  const cerrarForm = () => {
    setEstadoForm(false)
  }
  

  return (
    <div className='p-4 flex flex-col absolute top-1/3 right-1/3 '>
      <form onSubmit={handleSubmitActualizar} className='border-2 flex flex-col p-2 mb-2 bg-white w-96'>
        <div className='flex items-center justify-between mb-2'>
          <label htmlFor="tareaNueva" className="text-lg font-semibold mb-2">Introduce una nueva tarea</label>
          <button className='bg-transparent' onClick={cerrarForm}>
          <CloseIcon /> 

          </button>
        </div>
        <textarea 
          id="tareaNueva"
          defaultValue={tareaAntigua}
          onChange={(e) => setTareaNueva(e.target.value)} // Controlador onChange para actualizar tareaNueva
          placeholder="Nueva Tarea"
          className="resize-none mb-2 p-2 border-2" 
        />
        <button className='bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded' type="submit">Editar</button>
      </form>
    </div>
  );
}
