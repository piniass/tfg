import React, { useState } from 'react';
import CloseIcon from '../svgs/CloseIcon';
import avatardefault from '../../public/avatardefault.png';
import axios from 'axios'; // Importa axios
import qs from 'qs'; // Importa qs si lo estás utilizando
// Importa navigate desde @reach/router si es necesario

export default function FormularioCrearRutina(props) {
    const imagenes = ["gorila.jpg", "tiburon.jpg", "cocodrilo.jpg", "leon.jpg", "ornitorrinco.jpg", "tortuga.jpg", "lobo.jpg"];
    const [selectedImg, setSelectedImg] = useState('');
    const ruta = "../../public/img-rutinas/" + selectedImg;
    const url = 'http://127.0.0.1:8000/rutinas/cliente/';
    const id_entrenador = sessionStorage.getItem("id");
    const [rutinaNueva, setRutinaNueva] = useState(''); // Estado para el nombre de la rutina

    const handleCloseForm = () => {
        props.setForm(false);
    };

    const handleImgChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedImg(selectedValue);
        console.log("Imagen seleccionada:", selectedValue);
    };

    const handleNombreChange = (event) => {
        const nuevoNombre = event.target.value;
        setRutinaNueva(nuevoNombre);
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();

        try {
            const data = {
                nombre: rutinaNueva, // Usar el estado rutinaNueva
                foto: selectedImg,
                id: id_entrenador
            };
            console.log(data)
            const options = {
                method: 'POST',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: qs.stringify(data),
                url,
            };

            const res = await axios(options);
            console.log(res.data);

            // Navega a la página de dashboard si es necesario
            // navigate('/dashboard');

        } catch (error) {
            console.log("Errores:", error.response.data.detail);
        }
        props.setForm(false);
    };

    const formatOptionText = (imagen) => {
        const formattedText = imagen.charAt(0).toUpperCase() + imagen.slice(1, -4);
        return formattedText;
    };

    return (
        <section className='p-4 w-80 border absolute top-52 right-0 left-0 ml-auto mr-auto'>
            <div className='w-full flex items-end justify-end'>
                <button onClick={handleCloseForm} className='bg-transparent'>
                    <CloseIcon />
                </button>
            </div>

            <form className='flex flex-col gap-4 p-2' onSubmit={handleSubmit}>
                {selectedImg ? (
                    <img src={ruta} alt="Rutina" />
                ) : (
                    <img src={avatardefault} alt="Avatar por defecto" />
                )}
                <label htmlFor="img">Elige una imagen:</label>
                <select name="img" id="img" className='p-2 border' onChange={handleImgChange} value={selectedImg}>
                    <option value="">Selecciona una imagen</option>
                    {imagenes.map((imagen, index) => (
                        <option key={index} value={imagen}>
                            {formatOptionText(imagen)}
                        </option>
                    ))}
                </select>
                <input value={rutinaNueva} onChange={handleNombreChange} type="text" placeholder='Introduce el nombre de la rutina' className='p-2 border' />
                <input type="submit" value="Crear rutina" className='bg-green-500 p-2 text-white cursor-pointer' />
            </form>
        </section>
    );
}
