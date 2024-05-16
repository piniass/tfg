import React from 'react';

const AvataresContainer = ({ sacarImagen }) => {
  const ruta = '../../public/';
  // const ruta = '/';
  
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

  return (
    <article className='grid justify-items-center items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-2 overflow-auto'>
      {avatares.map((avatar, index) => (
        <img
          key={index}
          src={ruta + avatar}
          alt="Avatar"
          className='size-28 cursor-pointer rounded-full  hover:shadow-lg'
          onClick={() => sacarImagen(ruta + avatar)}
        />
      ))}
    </article>
  );
}

export default AvataresContainer;
