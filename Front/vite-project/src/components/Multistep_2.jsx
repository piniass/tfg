import React from 'react'

export default function Multistep_2(props) {
    const handleNext = () => {
        props.setEmail(email.value)
        props.setPwd(pwd.value)
    }
    const handlePrev = () => {
        props.setName('')
        props.setApellido('')
        props.setEmail('')
        props.setPwd('')
    }
    return (
        <>
        <h2 className='text-xl text-center my-auto text-white '>Introduce tus datos</h2>
            <div className='flex flex-col w-full'>
                <input type="email" name="email" id="email" className='w-full p-2 mb-10' placeholder='Introduce tu correo...'/>
                <input type="password" name="pwd" id="pwd" className='w-full p-2' placeholder='Introduce tu contraseña...'/>
            </div>
            <button value="Atrás" className='bg-slate-50 w-full p-2 mt-auto' onClick={handlePrev}>Atrás</button>
            <button value="Siguiente" className='bg-slate-50 w-full p-2 mt-auto' onClick={handleNext}>Siguiente</button>
            
        </>        
      )
}
