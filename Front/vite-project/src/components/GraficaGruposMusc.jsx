import React, { useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import useContador from '../hooks/HookContador';
import Spinner from '../svgs/Spinner';

export default function GraficaGruposMusc(props) {
    const { id, id_rutina, rutinas } = props;
    const { counterEj, getCounter, loading, error } = useContador({ id_rutina });

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id_rutina) {
                    await getCounter(id_rutina);
                    console.log(id_rutina);
                    console.log("Ejercicios", counterEj);
                    console.log(typeof counterEj);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
                    fetchData();
                }
            }
        };

        fetchData();
    }, [id_rutina]);

    if (loading) {
        return (
            <div className='flex flex-col items-center justify-center'>
                <Spinner />
                <p>Cargando información</p>
            </div>
        );
    }

    if (error) {
        return <p className='p-2'>Hubo un error en la conexión, recargar la página.</p>;
    }

    const grupos = counterEj;
    const claves = grupos ? Object.keys(grupos) : [];
    const valores = grupos ? Object.values(grupos) : [];

    return (
        <div className='w-[250px] md:w-[450px]'>
            {counterEj && Object.keys(counterEj).length > 0 ? (
                <>
                    <h3 className='text-center text-xl'>Gráfica de ejercicios</h3>
                    <Pie
                        data={{
                            labels: claves,
                            datasets: [
                                {
                                    label: 'Cantidad de ejercicios',
                                    data: valores,
                                    backgroundColor: ['#dc3545', '#007bff', '#28a745', '#ffc107', '#f8f9fa', '#343a40', '#BB8FCE', '#F5B041', '#ABEBC6', '#B2BABB', '#F5B7B1'], // Colores de Bootstrap
                                },
                            ],
                        }}
                    />
                </>
            ) : (
                <p className='p-2'>No hay datos de ejercicios disponibles.</p>
            )}
        </div>
    );
}
