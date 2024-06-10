import React, { useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import useValidaciones from '../hooks/HooksValidaciones';

export default function FormularioEditarEjercicio(props) {
  const { ejercicio, getEjercicios, setFormEditEjercicio } = props;

  const ejercicios = {
    "Press de Banca": "Pectoral",
    "Curl de Bíceps": "Bíceps",
    "Extensiones de Tríceps": "Tríceps",
    "Sentadillas": "Cuádriceps",
    "Peso Muerto": "Espalda",
    "Press Militar": "Deltoides",
    "Elevación de Gemelos": "Gemelos",
    "Curl Femoral": "Femoral",
    "Hip Thrust": "Glúteo",
    "Crunch Abdominal": "Abdominales",
    "Aducción de Cadera": "Abductor",
    "Dominadas": "Espalda",
    "Remo con Barra": "Espalda",
    "Remo con Mancuernas": "Espalda",
    "Press Inclinado": "Pectoral",
    "Aperturas con Mancuernas": "Pectoral",
    "Curl de Martillo": "Bíceps",
    "Flexiones": "Pectoral",
    "Dips de Tríceps": "Tríceps",
    "Press Francés": "Tríceps",
    "Lunges": "Cuádriceps",
    "Prensa de Piernas": "Cuádriceps",
    "Extensiones de Cuádriceps": "Cuádriceps",
    "Encogimientos de Hombros": "Deltoides",
    "Elevaciones Laterales": "Deltoides",
    "Elevaciones Frontales": "Deltoides",
    "Planchas": "Abdominales",
    "Russian Twist": "Abdominales",
    "Bicicleta Abdominal": "Abdominales",
    "Patada de Glúteo": "Glúteo",
    "Peso Muerto Rumano": "Femoral",
  };

  const url = `https://tfg-backend-piniass-projects.vercel.app/ejercicios/${ejercicio.id}`;
  const { errores, validarCampo } = useValidaciones();

  const [nombreEjercicio, setNombreEjercicio] = useState(ejercicio.nombre || '');
  const [grupoMuscular, setGrupoMuscular] = useState(ejercicio.grupo_muscular || '');
  const [series, setSeries] = useState(ejercicio.series || '');
  const [repeticiones, setRepeticiones] = useState(ejercicio.repeticiones || '');
  const [errors, setErrors] = useState({
    nombre: '',
    musculo: '',
    series: '',
    repeticiones: ''
  });

  const handleEjercicioChange = (e) => {
    const selectedEjercicio = e.target.value;
    setNombreEjercicio(selectedEjercicio);
    setGrupoMuscular(ejercicios[selectedEjercicio]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nombreValido = validarCampo('ejercicio', nombreEjercicio);
    const musculoValido = validarCampo('grupoMuscular', grupoMuscular);
    const seriesValidas = validarCampo('series', series);
    const repeticionesValidas = validarCampo('repeticiones', repeticiones);

    let formErrors = {
      nombre: '',
      musculo: '',
      series: '',
      repeticiones: ''
    };

    if (!nombreValido) {
      formErrors.nombre = "El nombre debe empezar por mayúscula y no contener ninguna más.";
    }
    if (!musculoValido) {
      formErrors.musculo = 'Por favor, selecciona un grupo muscular.';
    }
    if (!seriesValidas) {
      formErrors.series = 'Series y repeticiones deben ser mayores que 0.';
    }
    if (!repeticionesValidas) {
      formErrors.repeticiones = 'Series y repeticiones deben ser mayores que 0';
    }

    setErrors(formErrors);

    if (!nombreValido || !musculoValido || !seriesValidas || !repeticionesValidas) {
      return;
    }

    try {
      const data = {
        nombre: nombreEjercicio,
        grupo_muscular: grupoMuscular,
        series: series,
        repeticiones: repeticiones
      };

      const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url,
      };

      const res = await axios(options);
      // console.log(res.data);
      getEjercicios();
      setFormEditEjercicio(false);
    } catch (error) {
      // console.log("Errores:", error.response ? error.response.data.detail : error.message);
    }
  };

  return (
    <section className='p-4 w-full flex flex-col'>
      <h4 className='text-xl mb-2'>Edita el ejercicio {ejercicio.nombre}</h4>
      <form className='flex gap-2 w-full flex-col sm:flex-row' onSubmit={handleSubmit}>
        <div className='flex flex-col lg:flex-row gap-2'>
          <select
            name="ejercicio"
            id="ejercicio"
            className='border rounded-md p-2 w-full sm:w-40'
            value={nombreEjercicio}
            onChange={handleEjercicioChange}
          >
            <option value="">Selecciona un ejercicio</option>
            {Object.keys(ejercicios).map((ejercicio, index) => (
              <option key={index} value={ejercicio}>{ejercicio}</option>
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
        {errors.series || errors.repeticiones && <p className='p-1 bg-red-500 text-white rounded-md'>{errors.series}</p>}
      </form>
    </section>
  );
}
