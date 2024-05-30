import React from 'react';
// import gorila from '../../public/assets/'

export default function FotoPerfil() {
    const localAvatar = sessionStorage.getItem("foto");
    const ruta = localAvatar
    
    return (
        <img 
            src={ruta}
            alt="Foto de Perfil"
            className='rounded-full w-20 h-20 bg-cyan-500'
        />
    );
}
