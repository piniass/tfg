import React, { useState } from 'react';
import CloseIcon from '../svgs/CloseIcon';
import axios from 'axios';
import qs from 'qs';

export default function FormularioCrearEntrenamiento(props) {
  const [nombreEntrenamiento, setNombreEntrenamiento] = useState('');
  const [diaSeleccionado, setDiaSeleccionado] = useState('');
  const id = props.rutina.id
 

  const diasSemana = [
    'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'
  ];

  const url = `http://127.0.0.1:8000/entrenamientos/rutina`;

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const data = {
        nombre: nombreEntrenamiento,
        dia_semana: diaSeleccionado,
        id_rutina: id
      };

      console.log(data)

      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url,
      };

      const res = await axios(options);
      console.log(res.data);

      // Actualizar la lista de rutinas después de crear el entrenamiento
    //   props.actualizarRutinas();
    } catch (error) {
      console.log("Errores:", error.response.data.detail);
    }

    // Cerrar el formulario después de enviar
    props.setForm(false);
  }

  const handleCloseForm = () => {
    props.setForm(false);
  }

  return (
    <article className='p-4 w-52 sm:w-80 border rounded-md absolute top-52 right-0 left-0 ml-auto mr-auto bg-white flex flex-col'>
      <div className='w-full flex items-center justify-between mb-2'>
        <h3>Crea tu día de entrenamiento</h3>
        <button onClick={handleCloseForm} className='bg-transparent'>
          <CloseIcon />
        </button>
      </div>
      <form onSubmit={handleSubmit} className='flex flex-col '>
        <input 
          type="text" 
          placeholder='Nombre del entrenamiento' 
          className='p-2 border rounded-lg'
          value={nombreEntrenamiento}
          onChange={(e) => setNombreEntrenamiento(e.target.value)}
        />
        <select
          name="diaSemana"
          id="diaSemana"
          className='p-2 border rounded-md mt-3'
          value={diaSeleccionado}
          onChange={(e) => setDiaSeleccionado(e.target.value)}
        >
          <option value="">Elige un día de la semana</option>
          {diasSemana.map((dia, index) => (
            <option key={index} value={dia}>{dia}</option>
          ))}
        </select>
        <input 
          type="submit" 
          value="Crear Entrenamiento" 
          className='bg-green-500 p-2 text-white cursor-pointer mt-4 rounded-md' 
        />
      </form>
    </article>
  );
}
