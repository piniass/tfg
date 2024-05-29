import React, { useState, useEffect } from 'react';
import InfoDetalles from './InfoDetalles';
import PesoContainer from './PesoContainer';
import EjerciciosContainer from './EjerciciosContainer';
import usePeso from '../hooks/HookPeso';
import useRutinas from "../hooks/HookRutinas";

import Spinner from '../svgs/Spinner';

export default function DetallesContainer(props) {
  const id = props.state.id;
  const { peso, getPeso, actualizarPeso, loading } = usePeso(id);
  const { rutinas, getRutinasId } = useRutinas();


  useEffect(() => {
    if (id) {
      getPeso(); // Llamar a getPeso solo si id es válido
      getRutinasId(id)
    }
  }, [id]);

  return (
    <section className='flex flex-col p-3 md:p-5 w-4/5 gap-2 h-screen overflow-auto'>
      <InfoDetalles state={props.state} />
      {
        loading ? <Spinner /> :
        <PesoContainer
          state={props.state}
          peso={peso}
          actualizarPeso={actualizarPeso}
          loading={loading}
        />
      }
      <EjerciciosContainer state={props.state} rutinas={rutinas} />
    </section>
  );
}
