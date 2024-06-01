import React, { useState, useEffect } from 'react';
import InfoDetalles from './InfoDetalles';
import PesoContainer from './PesoContainer';
import EjerciciosContainer from './EjerciciosContainer';
import usePeso from '../hooks/HookPeso';
import useRutinas from "../hooks/HookRutinas";
import Spinner from '../svgs/Spinner';

export default function DetallesContainer(props) {
  const { id, id_rutina } = props.state;
  const { peso, getPeso, actualizarPeso, loading } = usePeso(id);
  const { rutinas, getRutinasId } = useRutinas();
  
  const [state, setState] = useState(props.state);

  useEffect(() => {
    console.log("primer use effect: ", props.state);
    getPeso();
    getRutinasId(id);
  }, [id]);

  // Función para actualizar el estado
  const updateState = (newState) => {
    setState(prevState => ({ ...prevState, ...newState }));
  };

  return (
    <section className='flex flex-col p-3 md:p-5 w-4/5 gap-2 h-screen overflow-auto'>
      <InfoDetalles state={state} />
      {
        loading ? <Spinner /> :
        <PesoContainer
          state={state}
          peso={peso}
          actualizarPeso={actualizarPeso}
          loading={loading}
        />
      }
      <EjerciciosContainer state={state} rutinas={rutinas} updateState={updateState} />
    </section>
  );
}
