import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import User from '../svgs/User';
import Lock from '../svgs/Lock';
import Spinner from '../svgs/Spinner';

export default function Formulario() {

    const [correo, setCorreo] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [datosRecibidos, setDatosRecibidos] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); 

    const login = () => {
        navigate("/login")
    }

    const handleSubmit = async (event) => {
        console.log("hola")
        event.preventDefault();
        try {
            setLoading(true)
            // Realizar la petición GET a la API
            const response = await axios.get('http://127.0.0.1:8000/entrenadores');
            // Actualizar el estado con los datos recibidos
            setDatosRecibidos(response.data);
            // Verificar coincidencia entre correo y contraseña ingresados y los datos recibidos
            const coincidencia = response.data.find(entrenador => entrenador.correo === correo && entrenador.password === contrasenia);
            setLoading(false)
            if (coincidencia) {
                // Utilizar navigate para navegar a la ruta del dashboard (Home)
                sessionStorage.setItem("id", coincidencia.id);
                sessionStorage.setItem("nombre", coincidencia.nombre);
                sessionStorage.setItem("apellido", coincidencia.apellido);
                sessionStorage.setItem("foto", coincidencia.avatar);

                console.log(coincidencia.id)
                navigate('/dashboard');
            } else {
                alert('No se encontraron coincidencias.');
            }
        } catch (error) {
            // Manejar errores de la petición
            setError(error);
        }
    };
  return (
    <section className='p-2 md:p-5 h-full w-full'>
        <form onSubmit={handleSubmit} className='flex flex-col p-2 md:p-5 gap-4 '>
            <h2 className='text-center text-2xl text-white'>Iniciar Sesion</h2>

            <label className='text-white relative w-full' htmlFor='correo'>Introduce tu correo
            <span className='absolute top-8 left-1 text-gray-500'>
                <User />
            </span>
            
            <input 
                className='p-2 pl-8 w-full text-black'
                type="text" 
                placeholder="Correo electronico"
                id="correo"
                name='email'
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                />
            </label>
            <label htmlFor='contrasenia' className='text-white relative w-full'>Contraseña
            <span className='absolute top-8 left-1 text-gray-500'>
                <Lock />
            </span>
            <input 
                className='p-2 pl-8 w-full text-black'
                type="password" 
                placeholder="Contraseña"
                id="contrasenia"
                onChange={(e) => setContrasenia(e.target.value)}
                value={contrasenia} />
            </label>
            {
                loading ? (<div className='w-full bg-gray-300 p-2 flex items-center justify-center rounded'>
                    <Spinner/>
                    </div>)
                : (<input 
                    type="submit" 
                    value="Iniciar Sesion"
                    className='rounded cursor-pointer bg-green-600 p-2 text-white'
                    />)
            }
            
            <input
                type='button'
                value='Registrarse'
                className='rounded cursor-pointer  bg-blue-600 p-2 text-white'
                onClick={login}
            />
        </form>
    </section>
    
  );
}
