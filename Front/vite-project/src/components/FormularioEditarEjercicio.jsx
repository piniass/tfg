import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import useValidaciones from '../hooks/HooksValidaciones';

export default function FormularioEditarEjercicio(props) {
  const { ejercicio, getEjercicios, setFormEditEjercicio } = props;
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
  
  const url = `http://tfg-backend-piniass-projects.vercel.app/ejercicios/${ejercicio.id}`;
  const { errores, validarCampo } = useValidaciones();


  const [nombreEjercicio, setNombreEjercicio] = useState(ejercicio.nombre || '');
  const [grupoMuscular, setGrupoMuscular] = useState(ejercicio.grupo_muscular || '');
  const [series, setSeries] = useState(ejercicio.series || '');
  const [repeticiones, setRepeticiones] = useState(ejercicio.repeticiones || '');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nombreValido = validarCampo('nombre', nombreEjercicio);
    const musculoValido = validarCampo('grupoMuscular', grupoMuscular);
    const seriesValidas = validarCampo('series', series);
    const repeticionesValidas = validarCampo('repeticiones', repeticiones);

    if (!nombreValido) {
        return alert("El nombre debe empezar por mayúscula y no contener ninguna más.");
    }
    if (!musculoValido) {
      console.log(musculoValido)
        return alert('Por favor, selecciona un grupo muscular.');;
    }
    if (!seriesValidas) {
      return alert('Series y repeticiones deben ser mayores que 0.');;
    }
    if (!repeticionesValidas) {
      return alert('Series y repeticiones deben ser mayores que 0');;
    }
    
    try {
      const data = {
        nombre: nombreEjercicio,
        grupo_muscular: grupoMuscular,
        series: series,
        repeticiones: repeticiones
      };

      console.log(data);

      const options = {
        method: 'PUT', 
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url,
      };

      const res = await axios(options);
      console.log(res.data);
      getEjercicios();
      setFormEditEjercicio(false);
    } catch (error) {
      console.log("Errores:", error.response ? error.response.data.detail : error.message);
    }
  };

  return (
    <section className='p-4 w-full flex flex-col'>
      <h4 className='text-xl mb-2'>Edita el ejercicio {ejercicio.nombre}</h4>
      <form className='flex gap-2 w-full flex-col sm:flex-row' onSubmit={handleSubmit}>
        <div className='flex flex-col lg:flex-row gap-2'> 
          <input
            type="text"
            placeholder='Nombre'
            className='border rounded-md p-2 w-full sm:w-40'
            value={nombreEjercicio}
            onChange={(e) => setNombreEjercicio(e.target.value)}
          />
          <select
            name="musculo"
            id="musculo"
            className='border rounded-md p-2 w-full sm:w-40'
            value={grupoMuscular}
            onChange={(e) => setGrupoMuscular(e.target.value)}
          >
            <option value="">Grupo Muscular</option>
            {gruposMusculares.map((grupo, index) => (
              <option key={index} value={grupo.toLowerCase()}>{grupo}</option>
            ))}
          </select>
        </div>
        <div className='flex flex-col lg:flex-row gap-2'> 
          <input
            type="number"
            name="series"
            id="series"
            placeholder='Series'
            className='border rounded-md p-2 w-full sm:w-32'
            value={series}
            onChange={(e) => setSeries(e.target.value)}
          />
          <input
            type="number"
            name="repeticiones"
            id="repeticiones"
            placeholder='Repeticiones'
            className='border rounded-md p-2 w-full sm:w-32'
            value={repeticiones}
            onChange={(e) => setRepeticiones(e.target.value)}
          />
        </div>
        <input type="submit" value="Editar ejercicio" className='w-full sm:w-56 bg-green-500 text-white p-2 rounded-md cursor-pointer hover:bg-green-600' />
      </form>
    </section>
  );
}
