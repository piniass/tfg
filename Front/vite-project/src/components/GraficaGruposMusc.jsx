import React, { useEffect } from 'react';
import { Pie } from 'react-chartjs-2';

export default function GraficaGruposMusc(props) {
    const grupos = props.counterEj;
    const claves = grupos ? Object.keys(grupos) : []; 
    const valores = grupos ? Object.values(grupos) : []; 
    
    return (
        <div className='w-[450px]'>
            <h3 className='text-center text-xl'>Grafica de ejercicios</h3>
            <Pie 
                data = {{
                    labels: claves,
                    datasets: [
                        {
                            label: 'Cantidad de ejercicios',
                            data: valores,
                            backgroundColor: ['#dc3545', '#007bff', '#28a745', '#ffc107', '#f8f9fa', '#343a40','#BB8FCE','#F5B041','#ABEBC6','#B2BABB','#F5B7B1'], // Colores de Bootstrap
                        }
                    ]
                }}
            />
        </div>
    );
}