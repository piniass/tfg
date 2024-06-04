import React from 'react';
// import gorila from '../../public/assets/'

export default function FotoPerfil() {
    const localAvatar = sessionStorage.getItem("foto");
    const ruta = '../../public/'+localAvatar
    
    return (
        <img 
            src={ruta}
            alt="Foto de Perfil"
            className='rounded-full w-12 h-12 md:w-20 md:h-20 bg-cyan-500'
        />
    );
}
