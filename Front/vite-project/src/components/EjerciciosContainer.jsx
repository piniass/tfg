import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GraficaGruposMusc from './GraficaGruposMusc';
import VerRutina from './VerRutina';
export default function EjerciciosContainer(props) {
    const id = props.state.id;
    const id_rutina = props.state.id_rutina
    const [counterEj, setCounter] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async (id_cliente) => {
            try {
                const response = await axios.get(`http://localhost:8000/ejercicios/rutina/cliente/${id_cliente}`);
                setCounter(response.data);
            } catch (err) {
                setError(err);
                console.log(error);
            }
        };
    
        const fetchDataAsync = async () => {
            if (id) {
                await fetchData(id);
            }
        };
    
        fetchDataAsync();
    }, [id]);
    


    return (
        <section className='border-2 p-4 flex justify-between'>
            <VerRutina id={id} id_rutina={id_rutina}/>
            <GraficaGruposMusc counterEj={counterEj}/>
        </section>
    );
}
