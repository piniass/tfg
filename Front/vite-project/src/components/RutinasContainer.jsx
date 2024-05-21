import React, { useState, useEffect } from 'react';
import FormularioCrearRutina from './FormularioCrearRutina';
import FormularioEditarRutina from './FormularioEditarRutina';
import RutinasCard from './RutinasCard';
import useRutinas from '../hooks/HookRutinas';

export default function RutinasContainer() {
  const id = sessionStorage.getItem("id");
  const [showForm, setForm] = useState(false);
  const [showFormEdit, setFormEdit] = useState(false);
  const [rutinaToEdit, setRutinaToEdit] = useState(null);
  const { getRutinas, actualizarRutinas, handleEliminar, rutinas } = useRutinas({ id });

  const handleOpenForm = () => {
    setForm(true);
  }

  const handleOpenEditForm = (rutina) => {
    setRutinaToEdit(rutina);
    setFormEdit(true);
  }

  useEffect(() => {
    getRutinas();
  }, []);

  return (
    <section className='w-full h-full overflow-auto flex flex-col relative'>
      <div className='p-4'>
        <button className='bg-blue-600 text-white' onClick={handleOpenForm}>Crear Rutina</button>
      </div>
      {showForm && <FormularioCrearRutina actualizarRutinas={actualizarRutinas} setForm={setForm} />}
      {showFormEdit && 
        <FormularioEditarRutina rutina={rutinaToEdit} actualizarRutinas={actualizarRutinas} setForm={setFormEdit} />
      }
      <article className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
        {rutinas.map(rutina => (
          <RutinasCard  key={rutina.id} handleEliminar={handleEliminar} rutina={rutina} handleEdit={() => handleOpenEditForm(rutina)} />
        ))}
      </article>
    </section>
  )
}
