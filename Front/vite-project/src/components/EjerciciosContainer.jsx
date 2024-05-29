import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GraficaGruposMusc from './GraficaGruposMusc';
import VerRutina from './VerRutina';
import Spinner from '../svgs/Spinner';
import useContador from '../hooks/HookContador';

export default function EjerciciosContainer(props) {
    const id = props.state.id;
    const id_rutina = props.state.id_rutina
    const {counterEj, getCounter,loading} = useContador( {id} );


    useEffect(() => {

        const fetchDataAsync = async () => {
            if (id) {
                await getCounter(id);
            }
        };
    
        fetchDataAsync();
    }, [id]);
    


    return (
        <section className='border-2 p-4 flex justify-between'>
            <VerRutina id={id} id_rutina={id_rutina}/>
            {
                !loading ?  
                <GraficaGruposMusc counterEj={counterEj}/>
                :
                <div className='flex flex-col items-center justify-center'>
                    <Spinner/>
                    <p>Cargan información</p>
                </div> 
            }
           
        </section>
    );
}
