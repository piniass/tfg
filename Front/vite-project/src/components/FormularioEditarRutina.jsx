import React, { useState, useEffect } from 'react';
import CloseIcon from '../svgs/CloseIcon';
import avatardefault from '../../public/avatardefault.png';
import axios from 'axios'; // Importa axios
import qs from 'qs'; // Importa qs si lo estás utilizando
import useValidaciones from '../hooks/HooksValidaciones';


export default function FormularioEditarRutina({ rutina, actualizarRutinas, setForm }) {
    const imagenes = ["gorila.jpg", "tiburon.jpg", "cocodrilo.jpg", "leon.jpg", "ornitorrinco.jpg", "tortuga.jpg", "lobo.jpg"];
    const [selectedImg, setSelectedImg] = useState(rutina.foto || '');
    const [nombreRutina, setNombreRutina] = useState(rutina.nombre || '');
    const ruta = "../../public/img-rutinas/" + selectedImg;
    const id_entrenador = sessionStorage.getItem("id");
    const url = `http://127.0.0.1:8000/rutinas/${rutina.id}/`;
    const { errores, validarCampo } = useValidaciones();


    useEffect(() => {
        setSelectedImg(rutina.foto || '');
        setNombreRutina(rutina.nombre || '');
    }, [rutina]);

    const handleCloseForm = () => {
        setForm(false);
    };

    const handleImgChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedImg(selectedValue);
        console.log("Imagen seleccionada:", selectedValue);
    };

    const handleNombreChange = (event) => {
        const nuevoNombre = event.target.value;
        setNombreRutina(nuevoNombre);
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        const nombreValido = validarCampo('rutina', nombreRutina);
        const ImgValida = validarCampo('avatar', selectedImg);
        if (!nombreValido) {
            return alert("El nombre debe empezar por mayúscula y no contener ninguna más.");
        }
        if (!ImgValida) {
            return alert('Por favor, selecciona una Imagen.');;
        }

        try {
            const data = {
                nombre: nombreRutina, 
                foto: selectedImg,
                id_entrenador: id_entrenador
            };
            console.log(data);
            const options = {
                method: 'PUT',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: qs.stringify(data),
                url,
            };

            const res = await axios(options);
            console.log(res.data);

            actualizarRutinas(); 
            setForm(false); 

        } catch (error) {
            console.log("Errores:", error.response.data.detail);
        }
    };

    const formatOptionText = (imagen) => {
        const formattedText = imagen.charAt(0).toUpperCase() + imagen.slice(1, -4);
        return formattedText;
    };

    return (
        <section className='p-4 w-80 border absolute top-52 right-0 left-0 ml-auto mr-auto bg-white'>
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
                <input value={nombreRutina} onChange={handleNombreChange} type="text" placeholder='Introduce el nombre de la rutina' className='p-2 border' />
                <input type="submit" value="Actualizar rutina" className='bg-green-500 p-2 text-white cursor-pointer' />
            </form>
        </section>
    );
}
