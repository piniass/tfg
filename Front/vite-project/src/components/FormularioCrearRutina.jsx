import React, { useState } from 'react';
import CloseIcon from '../svgs/CloseIcon';
import avatardefault from '../../public/avatardefault.png';
import axios from 'axios'; // Importa axios
import qs from 'qs'; // Importa qs si lo estás utilizando
// Importa navigate desde @reach/router si es necesario
import useValidaciones from '../hooks/HooksValidaciones';
import useHasheo from '../hooks/HookHasheo';

export default function FormularioCrearRutina(props) {
    const imagenes = ["gorila.jpg", "tiburon.jpg", "cocodrilo.jpg", "leon.jpg", "ornitorrinco.jpg", "tortuga.jpg", "lobo.jpg"];
    const [selectedImg, setSelectedImg] = useState('');
    const [rutinaNueva, setRutinaNueva] = useState('');
    const [ImgValida, setImgValida] = useState(true);
    const {decryptData } = useHasheo();
    const id_entrenador = decryptData(sessionStorage.getItem("id"));
    const url = `https://tfg-backend-piniass-projects.vercel.app/rutinas/cliente/`;
    const [nombreValido, setNombre] = useState(true)
    const { errores, validarCampo } = useValidaciones();

    // console.log(props);

    const handleCloseForm = () => {
        props.setForm(false);
    };

    const handleImgChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedImg("/img-rutinas/" +selectedValue);
        // console.log("Imagen seleccionada:", selectedValue);
    };

    const handleNombreChange = (event) => {
        const nuevoNombre = event.target.value;
        setRutinaNueva(nuevoNombre);
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        const validarNombre = validarCampo('rutina', rutinaNueva);
        const validarImg = validarCampo('avatar', selectedImg);
        // setNombreValido(nombreValido);
        // setImgValida(ImgValida);

        if (!validarNombre) {
            setNombre(false)
            
        }

        if (!validarImg) {
            setImgValida(false)
            
        }

        if(validarNombre && validarCampo){
            try {
                const data = {
                    nombre: rutinaNueva, // Usar el estado rutinaNueva
                    foto: selectedImg,
                    id: id_entrenador
                };
                // console.log(data);
                const options = {
                    method: 'POST',
                    headers: { 'content-type': 'application/x-www-form-urlencoded' },
                    data: qs.stringify(data),
                    url,
                };
    
                const res = await axios(options);
                // console.log(res.data);
    
            } catch (error) {
                // console.log("Errores:", error.response.data.detail);
            }
            props.actualizarRutinas();
            props.setForm(false);
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
                    <img src={`${selectedImg}`} alt="Rutina" />
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
                {!ImgValida && (<p className='p-1 mt-3 bg-red-500 text-white rounded-md'>Por favor, selecciona una imagen.</p>)}
                <input value={rutinaNueva} onChange={handleNombreChange} type="text" placeholder='Introduce el nombre de la rutina' className='p-2 border' />
                {!nombreValido && (<p className='p-1 mt-3 bg-red-500 text-white rounded-md'>El nombre debe empezar por mayúscula y no contener ninguna más.</p>)}

                <input type="submit" value="Crear rutina" className='bg-green-500 p-2 text-white cursor-pointer' />
            </form>
        </section>
    );
}
