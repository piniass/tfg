import React from 'react'
import { useNavigate } from 'react-router-dom'
import useValidaciones from '../hooks/HooksValidaciones';

export default function Multistep_1(props) {
    const navigate = useNavigate()
    const { validarCampo } = useValidaciones();

    const handleNext = () => {  
        const esNombreValido = validarCampo('nombre', nombre.value);
        const esApellidoValido = validarCampo('apellido', apellido.value);
        console.log(nombre.value)
        if (!esNombreValido) {
           alert("El nombre debe empezar por mayúscula y no contener ninguna más.");
           return
        } else if(!esApellidoValido) {
             alert("El apellido debe empezar por mayúscula.");
             return
        }
            props.setName(nombre.value)
            props.setApellido(apellido.value)
        
    }
    const handleBack = () => {
        navigate('/')
    }
  return (
    <>
        <h2 className='text-xl text-center my-auto text-white '>Introduce tus datos</h2>
        <div className='flex flex-col w-full'>
            <input type="text" name="nombre" id="nombre" className='w-full p-2 mb-10' placeholder='Introduce tu nombre...'/>
            <input type="text" name="apellido" id="apellido" className='w-full p-2' placeholder='Introduce tu apellido...'/>
        </div>
        <button type="button" value="Siguiente" className='bg-slate-50 w-full p-2 mt-auto' onClick={handleNext}>Siguiente</button>
        <button type="button" value="Volver" className='bg-slate-50 w-full p-2 mt-auto' onClick={handleBack}>Volver</button>

    </>        
  )
}
