import React, { useState, useEffect } from 'react';
import InfoDetalles from './InfoDetalles';
import PesoContainer from './PesoContainer';
import EjerciciosContainer from './EjerciciosContainer';
import usePeso from '../hooks/HookPeso';
import useRutinas from "../hooks/HookRutinas";
import Spinner from '../svgs/Spinner';

export default function DetallesContainer(props) {
  const { id, id_rutina } = props.state;
  // const { peso, getPeso, actualizarPeso,handleEliminar, loading } = usePeso(id);
  // const { rutinas, getRutinasId, error } = useRutinas();
  
  const [state, setState] = useState(props.state);

  useEffect(() => {
    const fetchData = async () => {
        try {
            // Ejecutamos getRutinasId con el id
            // await getRutinasId(id);
            // await getPeso();
        } catch (error) {
            console.error("Error fetching data: ", error);
            // Verificar si el error es debido a CORS
            if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
                // Vuelve a ejecutar la función para intentar nuevamente
                // console.log('Error de CORS. Volviendo a ejecutar la función...');
                fetchData();
            }
        }
    };

    fetchData(); // Llama a la función para que ejecute las llamadas
}, [id]);

  
  

  // Función para actualizar el estado
  const updateState = (newState) => {
    console.log("Actualizando gráfica")
    setState(prevState => ({ ...prevState, ...newState }));
    console.log("state: ",state)
  };

  // console.log("rutina: ",rutinas)
  // console.log("error de rutinas", error)

  return (
    <section className='flex flex-col p-3 md:p-5 w-4/5 gap-2 h-screen overflow-auto'>
      <InfoDetalles state={state} />
      <PesoContainer
          state={state}
          // peso={peso}
          // actualizarPeso={actualizarPeso}
          // handleEliminar={handleEliminar}
          // loading={loading}
      />
      {/* <EjerciciosContainer state={state} rutinas={rutinas} updateState={updateState} error={error} /> */}
      <EjerciciosContainer state={state} updateState={updateState} />

    </section>
  );
}
