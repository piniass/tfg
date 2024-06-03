import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GraficaGruposMusc from './GraficaGruposMusc';
import VerRutina from './VerRutina';
import Spinner from '../svgs/Spinner';
import useContador from '../hooks/HookContador';

export default function EjerciciosContainer(props) {
    console.log("props del contenedor de ejercicio", props)
    const id = props.state.id;
    const id_rutina = props.state.id_rutina
    const id_entrenador = props.state.id_entrenador
    const {counterEj, getCounter,loading} = useContador( {id} );
    const updateState  = props.updateState 
    
    useEffect(() => {

        const fetchDataAsync = async () => {
            if (id) {
                await getCounter(id);
            }
        };
    
        fetchDataAsync();
    }, [id, id_rutina]);
    


    return (
        <section className='border-2 p-4 flex flex-col md:flex-row justify-between'>
            <VerRutina id={id} id_rutina={id_rutina} id_entrenador={id_entrenador} updateState={updateState}/>
            {
                !loading ?  
                <div className='flex items-center justify-center'>
                    <GraficaGruposMusc counterEj={counterEj}/>
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
