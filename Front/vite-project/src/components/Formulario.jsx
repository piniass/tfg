import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



export default function Formulario() {

    const [correo, setCorreo] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [datosRecibidos, setDatosRecibidos] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Realizar la petición GET a la API
            const response = await axios.get('http://127.0.0.1:8000/entrenadores');
            // Actualizar el estado con los datos recibidos
            setDatosRecibidos(response.data);
            // Verificar coincidencia entre correo y contraseña ingresados y los datos recibidos
            const coincidencia = response.data.find(entrenador => entrenador.correo === correo && entrenador.password === contrasenia);
            if (coincidencia) {
                // Utilizar navigate para navegar a la ruta del dashboard (Home)
                sessionStorage.setItem("id", coincidencia.id);
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
        <form onSubmit={handleSubmit} className='bg-yellow-400 flex flex-col p-8'>
            <label className=''>Introduce tu correo</label>
            <input 
                type="text" 
                placeholder="Correo electronico"
                id="correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                />
            <label>Contrasenia</label>
            <input 
                type="password" 
                placeholder="Contraseña"
                id="contrasenia"
                onChange={(e) => setContrasenia(e.target.value)}
                value={contrasenia} />
            <input 
                type="submit" 
                value="Enviar"
                />
        </form>
    </section>
    
  );
}
