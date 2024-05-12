import React from 'react'
import CloseIcon from '../svgs/CloseIcon'
import avatardefault from '../../public/avatardefault.png'
import { useState } from 'react'

export default function FormularioCrearRutina(props) {
    const imagenes = ["gorila.jpg","tiburon.jpg","cocodrilo.jpg","leon.jpg","ornitorrinco.jpg","tortuga.jpg","lobo.jpg"]
    const [selectedImg, setSelectedImg] = useState('');
    const ruta = "../../public/img-rutinas/" + selectedImg

    console.log(ruta)

    const handleCloseForm = () => {
        props.setForm(false)
    };

    const handleImgChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedImg(selectedValue);; 
        console.log("Imagen seleccionada:", selectedValue);
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Evita que el formulario se envíe automáticamente
        console.log("hola")
        // Realiza la acción deseada al enviar el formulario
        props.setForm(false);
    };

    const formatOptionText = (imagen) => {
        // Convierte la primera letra en mayúscula y aplica substr
        const formattedText = imagen.charAt(0).toUpperCase() + imagen.slice(1, -4);
        return formattedText;
    };
  return (
    <section className='p-4 w-80 border absolute top-52 right-0 left-0 ml-auto mr-auto bg-white'>
        <div className='w-full flex items-end justify-end'>
            <button onClick={handleCloseForm} className='bg-transparent'>
                <CloseIcon/>
            </button>
        </div>

        <form className='flex flex-col gap-4 p-2 ' onSubmit={handleSubmit}>
        {selectedImg ? (
                    <img src={ruta} alt="Rutina" />
                ) : (
                    <img src={avatardefault} alt="Avatar por defecto" />
                )}
                <label htmlFor="img">Elige una imagen:</label>

                <select name="img" id="img" className='p-2 border' onChange={handleImgChange} value={selectedImg}>
                    <option value="">Selecciona una imagen</option> {/* Opción por defecto */}
                    {imagenes.map((imagen, index) => (
                        <option key={index} value={imagen}>
                            {formatOptionText(imagen)}
                        </option>
                    ))}
                </select>

            <input type="text" placeholder='Introduce el nombre de la rutina' className='p-2 border'/>
            <input type="submit" value="Crear rutina" className='bg-green-500 p-2 text-white cursor-pointer'/>
        </form>
    </section>
    
  )
}
