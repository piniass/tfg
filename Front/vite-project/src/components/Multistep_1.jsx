import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useValidaciones from '../hooks/HooksValidaciones';

export default function Multistep_1(props) {
    const navigate = useNavigate()
    const { validarCampo } = useValidaciones();
    const [error, setError] = useState({ nombre: '', apellido: '' });

    const handleNext = () => {  
        const nombreValido = validarCampo('nombre', nombre.value);
        const apellidoValido = validarCampo('apellido', apellido.value);

        if (!nombreValido) {
            setError(prevError => ({ ...prevError, nombre: "El nombre debe empezar por mayúscula y no contener ninguna más." }));
        } else {
            setError(prevError => ({ ...prevError, nombre: '' }));
        }

        if (!apellidoValido) {
            setError(prevError => ({ ...prevError, apellido: "El apellido debe empezar por mayúscula." }));
        } else {
            setError(prevError => ({ ...prevError, apellido: '' }));
        }

        if (nombreValido && apellidoValido) {
            props.setName(nombre.value);
            props.setApellido(apellido.value);
        }
    }

    const handleBack = () => {
        navigate('/')
    }

    return (
        <>
            <h2 className='text-xl text-center my-auto text-white '>Introduce tus datos</h2>
            <div className='flex flex-col w-full'>
                <input 
                    type="text" 
                    name="nombre" 
                    id="nombre" 
                    className='w-full p-2 mb-2' 
                    placeholder='Introduce tu nombre...'
                />
                {error.nombre && <p className='p-1 bg-red-500 text-white mb-2 rounded-md'>{error.nombre}</p>}
                <input 
                    type="text" 
                    name="apellido" 
                    id="apellido" 
                    className='w-full p-2 mb-2' 
                    placeholder='Introduce tu apellido...'
                />
                {error.apellido && <p className='p-1 bg-red-500 text-white mb-2 rounded-md'>{error.apellido}</p>}
            </div>
            <button type="button" value="Siguiente" className='bg-slate-50 w-full p-2 mt-auto' onClick={handleNext}>Siguiente</button>
            <button type="button" value="Volver" className='bg-slate-50 w-full p-2 mt-auto' onClick={handleBack}>Volver</button>
        </>        
    )
}
