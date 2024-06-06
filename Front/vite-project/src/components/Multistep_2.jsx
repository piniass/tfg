import React, { useState } from 'react'
import useValidaciones from '../hooks/HooksValidaciones';

export default function Multistep_2(props) {
    const { validarCampo } = useValidaciones();
    const [error, setError] = useState({ email: '', password: '' });

    const handleNext = () => {
        const emailValido = validarCampo('email', email.value);
        const pwdValido = validarCampo('password', pwd.value);

        if (!emailValido) {
            setError(prevError => ({ ...prevError, email: "El correo debe contener un '@' y un dominio válido." }));
        } else {
            setError(prevError => ({ ...prevError, email: '' }));
        }

        if (!pwdValido) {
            setError(prevError => ({ ...prevError, password: "La contraseña debe contener al menos 1 número, tener entre 5 y 12 caracteres." }));
        } else {
            setError(prevError => ({ ...prevError, password: '' }));
        }

        if (emailValido && pwdValido) {
            props.setEmail(email.value);
            props.setPwd(pwd.value);
        }
    }

    const handlePrev = () => {
        props.setName('');
        props.setApellido('');
        props.setEmail('');
        props.setPwd('');
    }

    return (
        <>
            <h2 className='text-xl text-center my-auto text-white'>Introduce tus datos</h2>
            <div className='flex flex-col w-full'>
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    className='w-full p-2 mb-2' 
                    placeholder='Introduce tu correo...'
                />
                {error.email && <p className='p-1 bg-red-500 text-white rounded-md'>{error.email}</p>}
                <input 
                    type="password" 
                    name="pwd" 
                    id="pwd" 
                    className='w-full p-2 mb-2' 
                    placeholder='Introduce tu contraseña...'
                />
                {error.password && <p className='p-1 bg-red-500 text-white rounded-md'>{error.password}</p>}
            </div>
            <button type="button" value="Atrás" className='bg-slate-50 w-full p-2 mt-auto' onClick={handlePrev}>Atrás</button>
            <button type="button" value="Siguiente" className='bg-slate-50 w-full p-2 mt-auto' onClick={handleNext}>Siguiente</button>
        </>
    )
}
