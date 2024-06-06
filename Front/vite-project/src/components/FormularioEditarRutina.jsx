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
    const { validarCampo } = useValidaciones();
    const [nombreValido, setNombre] = useState(true);
    const [ImgValida, setImgValida] = useState(true);
        
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
        const validarNombre = validarCampo('rutina', nombreRutina);
        const validarImg = validarCampo('avatar', selectedImg);
        
        if(!validarNombre){
            setNombre(false)
        }
        if(!validarImg){
            setImgValida(false)
        }
        console.log(validarNombre)

        if (validarNombre && validarImg) {
            console.log("entro")
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
                {!ImgValida && <p className='p-1 mt-3 bg-red-500 text-white rounded-md'>Por favor, selecciona una Imagen.</p>}
                <input value={nombreRutina} onChange={handleNombreChange} type="text" placeholder='Introduce el nombre de la rutina' className='p-2 border' />
                {!nombreValido && <p className='p-1 mt-3 bg-red-500 text-white rounded-md'>El nombre debe empezar por mayúscula y no contener ninguna más.</p>}

                <input type="submit" value="Actualizar rutina" className='bg-green-500 p-2 text-white cursor-pointer' />
            </form>
        </section>
    );
}
