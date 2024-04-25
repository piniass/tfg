import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



export default function Formulario() {

    const [correo, setCorreo] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [datosRecibidos, setDatosRecibidos] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    const login = () => {
        navigate("/login")
    }

    const handleSubmit = async (event) => {
        console.log("hola")
        event.preventDefault();
        try {
            // Realizar la petición GET a la API
            const response = await axios.get('https://tfg-backend-piniass-projects.vercel.app/entrenadores');
            // Actualizar el estado con los datos recibidos
            setDatosRecibidos(response.data);
            // Verificar coincidencia entre correo y contraseña ingresados y los datos recibidos
            const coincidencia = response.data.find(entrenador => entrenador.correo === correo && entrenador.password === contrasenia);
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
    <section className='p-8'>
        <form onSubmit={handleSubmit} className='border-2 w-80 flex flex-col p-8 gap-4 '>
            <h2 className='text-center text-2xl text-white'>Iniciar Sesion</h2>

            <label className='text-white' htmlFor='correo'>Introduce tu correo</label>
            <input 
                className='p-2'
                type="text" 
                placeholder="Correo electronico"
                id="correo"
                name='email'
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                />
            <label htmlFor='contrasenia' className='text-white'>Contraseña</label>
            <input 
                className='p-2'
                type="password" 
                placeholder="Contraseña"
                id="contrasenia"
                onChange={(e) => setContrasenia(e.target.value)}
                value={contrasenia} />
            <input 
                type="submit" 
                value="Iniciar Sesion"
                className='rounded cursor-pointer bg-green-600 p-2 text-white'
                />
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
