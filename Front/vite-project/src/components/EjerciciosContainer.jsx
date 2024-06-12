import React, { useEffect } from 'react';
import VerRutina from './VerRutina';
import Spinner from '../svgs/Spinner';
import useRutinas from '../hooks/HookRutinas';
import GraficaGruposMusc from './GraficaGruposMusc';

export default function EjerciciosContainer(props) {
    const { state, updateState } = props;
    const { id, id_rutina, id_entrenador } = state;

    const { rutinas, getRutinasId, loading: loadingRutinas, error: errorRutinas } = useRutinas();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    await getRutinasId(id);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
                    fetchData();
                }
            }
        };

        fetchData();
        // console.log("id rutina: ", id_rutina);
    }, [id, id_rutina]);

    return (
        <section className='border-2 p-4 flex flex-col lg:flex-row justify-between'>
            <VerRutina id={id} id_rutina={id_rutina} id_entrenador={id_entrenador} updateState={updateState} />
            {
                !loadingRutinas ?  
                <div className='flex items-center justify-center'>
                    {
                    errorRutinas ? (<p className='p-2'>Hubo un error en la conexión, recargar la página.</p>)
                     : <GraficaGruposMusc id={id} id_rutina={id_rutina} rutinas={rutinas} />
                    }
                </div>
                :
                <div className='flex flex-col items-center justify-center'>
                    <Spinner />
                    <p>Cargando información</p>
                </div> 
            }
        </section>
    );
}
