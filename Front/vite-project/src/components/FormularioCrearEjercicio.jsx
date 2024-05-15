import React from 'react';

export default function FormularioCrearEjercicio(props) {
  // Definir los grupos musculares disponibles
  console.log("props crear ej:", props)
  const idEntrenamiento = props.entrenamientoObj.id_rutina
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

  return (
    <section className='p-4 w-full  flex flex-col'>
        <h4 className='text-xl mb-2'>Añade un ejercicio al dia de {props.entrenamientoObj.nombre}</h4>
      <form className='flex items-center justify-between'>
        <input type="text" placeholder='Nombre' className='border rounded-md p-2' />
        {/* Crear el menú desplegable con opciones dinámicas */}
        <select name="musculo" id="musculo" className='border rounded-md p-2'>
          {/* Mapear los grupos musculares para generar las opciones */}
          <option value="">Grupo Muscular</option>
          {gruposMusculares.map((grupo, index) => (
            <option key={index} value={grupo.toLowerCase()}>{grupo}</option>
          ))}
        </select>
        <input type="number" name="series" id="series" placeholder='Series' className='border rounded-md p-2' />
        <input type="number" name="repeticiones" id="repeticiones" placeholder='Repeticiones' className='border rounded-md p-2' />
        <input type="submit" value="Crear ejercicio" className='bg-green-500 text-white p-2 rounded-md cursor-pointer hover:bg-green-600' />
      </form>
    </section>
  );
}

