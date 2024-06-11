import React, { useState, useEffect } from 'react';
import useHasheo from '../hooks/HookHasheo';

export default function FotoPerfil() {
  const { decryptData } = useHasheo();
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    const encryptedAvatar = sessionStorage.getItem("foto");
    if (encryptedAvatar) {
      const decryptedAvatar = decryptData(encryptedAvatar);
      setAvatar(decryptedAvatar);
    }
  }, [decryptData]);

  const ruta = avatar ? `/${avatar}` : '';

  return (
    <img 
      src={ruta}
      alt="Foto de Perfil"
      className='rounded-full w-12 h-12 md:w-20 md:h-20 bg-cyan-500'
    />
  );
}
