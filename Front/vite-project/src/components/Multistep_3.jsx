import React from 'react'
import AvataresContainer from './AvataresContainer'



export default function Multistep_3(props) {
    const sacarImagen = (src) => {
        const recortado = src;
        props.setAvatar(recortado);
    };

    const handlePrev = () => {
        props.setEmail('')
        props.setPwd('')
        props.setAvatar('');

    }
  return (
    <>
            <h2 className='text-xl text-center mt-auto text-white'>Elige tu avatar</h2>
            <div className='flex flex-col object-cover w-full h-52 mb-2'>
                <AvataresContainer sacarImagen={sacarImagen}/>
            </div>
            <div className='mt-auto'>
                <button value="Atrás" className='bg-slate-50 w-full p-2 mb-8' onClick={handlePrev}>Atrás</button>
                {/* <button value="Siguiente" className='bg-slate-50 w-full p-2' onClick={sacarImagen}>Siguiente</button> */}
            </div>
        </>  
  )
}
