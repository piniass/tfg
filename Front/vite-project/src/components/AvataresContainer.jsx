import React from 'react';

const AvataresContainer = ({ sacarImagen }) => {
  const avatares = [
    "gorila.jpg",
    "elefante.jpg",
    "erizo.jpg",
    "hipo.jpg",
    "koala.jpg",
    "mapache.jpg",
    "pato.jpg",
    "tiburon.jpg",
    "pantera.jpg"
  ];
  
  const handleClick = (avatar) => {
    const imagenSrc =  avatar;
    console.log("Imagen seleccionada:", imagenSrc);
    sacarImagen(imagenSrc);
  };

  return (
    <article className='grid justify-items-center items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-2 overflow-auto'>
      {avatares.map((avatar, index) => (
        <img
          key={index}
          src={avatar}
          alt="Avatar"
          className='size-28 cursor-pointer rounded-full  hover:shadow-lg'
          onClick={() => handleClick(avatar)}
        />
      ))}
    </article>
  );
}

export default AvataresContainer;
