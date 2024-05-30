import React, { useState } from 'react';
import CloseIcon from '../svgs/CloseIcon';
import axios from 'axios';
import qs from 'qs';
import useValidaciones from '../hooks/HooksValidaciones';


export default function FormularioEditarEntrenamiento(props) {
  const [nombreEntrenamiento, setNombreEntrenamiento] = useState(props.entrenamiento.nombre || '');
  const [diaSeleccionado, setDiaSeleccionado] = useState(props.entrenamiento.dia_semana || '');
  const id = props.entrenamiento.id;
  const rutinaId = props.rutina.id;

  const diasSemana = [
    'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'
  ];
      console.log(nombreEntrenamiento)
      console.log(diaSeleccionado)
  const url = `http://tfg-backend-piniass-projects.vercel.app/entrenamientos/${id}`;
  const { errores, validarCampo } = useValidaciones();


  const handleSubmit = async (event) => {
    event.preventDefault();
    const nombreValido = validarCampo('rutina', nombreEntrenamiento);
    const diaValido = validarCampo('dia', diaSeleccionado);
    if (!nombreValido) {
        return alert("El nombre debe empezar por mayúscula y no contener ninguna más.");
    }
    if (!diaValido) {
        return alert('Por favor, selecciona un dia de la semana.');;
    }
    
    try {
      

      const data = {
        nombre: nombreEntrenamiento,
        dia_semana: diaSeleccionado,
        id_rutina: rutinaId
      };

      console.log(data)

      const options = {
        method: 'PUT',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url,
      };

      const res = await axios(options);
      console.log(res.data);

      // Actualizar la lista de entrenamientos después de editar el entrenamiento
      props.getEntrenamiento();
    } catch (error) {
      console.log("Errores:", error.response?.data?.detail || error.message);
    }

    // Cerrar el formulario después de enviar
    props.setFormEdit(false);
  }

  const handleCloseForm = () => {
    props.setFormEdit(false);
  }

  return (
    <article className='p-4 w-52 sm:w-80 border rounded-md absolute top-52 right-0 left-0 ml-auto mr-auto bg-white flex flex-col'>
      <div className='w-full flex items-center justify-between mb-2'>
        <h3>Edita tu día de entrenamiento</h3>
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
          value="Editar Entrenamiento" 
          className='bg-green-500 p-2 text-white cursor-pointer mt-4 rounded-md' 
        />
      </form>
    </article>
  );
}
