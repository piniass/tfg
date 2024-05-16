import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Multistep_1(props) {
    const navigate = useNavigate()
    const handleNext = () => {
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
        <button value="Siguiente" className='bg-slate-50 w-full p-2 mt-auto' onClick={handleNext}>Siguiente</button>
        <button value="Volver" className='bg-slate-50 w-full p-2 mt-auto' onClick={handleBack}>Volver</button>

    </>        
  )
}
