import React, { useState } from 'react';
import axios from 'axios';
import qs from 'qs';

export default function FormularioCrearEjercicio(props) {
  // Definir los grupos musculares disponibles
  const idEntrenamiento = props.entrenamientoObj.id;
  const gruposMusculares = [
    'Pectoral',
    'Bíceps',
    'Tríceps',
    'Cuádriceps',
    'Espalda',
    'Deltoides',
    'Gemelos',
    'Glúteo'
  ];
  
  const url = `http://127.0.0.1:8000/ejercicios/entreanmiento`;

  const [nombreEjercicio, setNombreEjercicio] = useState('');
  const [grupoMuscular, setGrupoMuscular] = useState('');
  const [series, setSeries] = useState('');
  const [repeticiones, setRepeticiones] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const data = {
        nombre: nombreEjercicio,
        grupo_muscular: grupoMuscular,
        series: series,
        repeticiones: repeticiones,
        id_entrenamiento: idEntrenamiento
      };

      console.log(data);

      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url,
      };

      const res = await axios(options);
      console.log(res.data);

      //props.actualizarEjercicios();
    } catch (error) {
      console.log("Errores:", error.response ? error.response.data.detail : error.message);
    }

    // Cerrar el formulario después de enviar
    //props.setForm(false);
    //props.getEjercicios();
  };


  return (
    <section className='p-4 w-full flex flex-col'>
      <h4 className='text-xl mb-2'>Añade un ejercicio al día de {props.entrenamientoObj.nombre}</h4>
      <form className='flex items-center justify-between' onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Nombre'
          className='border rounded-md p-2'
          value={nombreEjercicio}
          onChange={(e) => setNombreEjercicio(e.target.value)}
        />
        <select
          name="musculo"
          id="musculo"
          className='border rounded-md p-2'
          value={grupoMuscular}
          onChange={(e) => setGrupoMuscular(e.target.value)}
        >
          <option value="">Grupo Muscular</option>
          {gruposMusculares.map((grupo, index) => (
            <option key={index} value={grupo.toLowerCase()}>{grupo}</option>
          ))}
        </select>
        <input
          type="number"
          name="series"
          id="series"
          placeholder='Series'
          className='border rounded-md p-2'
          value={series}
          onChange={(e) => setSeries(e.target.value)}
        />
        <input
          type="number"
          name="repeticiones"
          id="repeticiones"
          placeholder='Repeticiones'
          className='border rounded-md p-2'
          value={repeticiones}
          onChange={(e) => setRepeticiones(e.target.value)}
        />
        <input type="submit" value="Crear ejercicio" className='bg-green-500 text-white p-2 rounded-md cursor-pointer hover:bg-green-600' />
      </form>
    </section>
  );
}
