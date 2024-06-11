import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GraficaGruposMusc from './GraficaGruposMusc';
import VerRutina from './VerRutina';
import Spinner from '../svgs/Spinner';
import useContador from '../hooks/HookContador';

export default function EjerciciosContainer(props) {
    // console.log("props del contenedor de ejercicio", props)
    const id = props.state.id;
    const id_rutina = props.state.id_rutina
    const id_entrenador = props.state.id_entrenador
    const {counterEj, getCounter,loading, error} = useContador( {id} );
    const updateState  = props.updateState 
    
    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                if (id) {
                    await getCounter(id);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                // Verifica si el error es debido a CORS
                if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
                    // Vuelve a ejecutar la función de obtención de datos
                    console.log('Error de CORS. Volviendo a ejecutar la función...');
                    fetchDataAsync();
                }
            }
        };
    
        fetchDataAsync();
    }, [id, id_rutina]);
    


    return (
        <section className='border-2 p-4 flex flex-col lg:flex-row justify-between'>
            <VerRutina id={id} id_rutina={id_rutina} id_entrenador={id_entrenador} updateState={updateState}/>
            {
                !loading ?  
                <div className='flex items-center justify-center'>
                    {
                    error ? (<p className='p-2'>Hubo un error en la conexión, recagar la página.</p>)
                     : <GraficaGruposMusc counterEj={counterEj} />
                     }
                </div>
                :
                <div className='flex flex-col items-center justify-center'>
                    <Spinner/>
                    <p>Cargan información</p>
                </div> 
            }
           
        </section>
    );
}