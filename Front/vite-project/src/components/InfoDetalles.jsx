import React from 'react'
import { useState } from 'react'
export default function InfoDetalles(props) {
    console.log(props)
    const [detalles, setDetalles] = useState(props.state)
    const ruta = '/' + detalles.avatar
    const nombre = detalles.nombre + ' ' + detalles.apellido
    const edad = detalles.edad
    const altura = detalles.altura
    const patologia = detalles.patologias
  return (
    <section className='flex flex-col md:flex-row border-2 items-center justify-around h-64 md:h-32 p-2 w-full'>
        <img src={ruta} alt='Avatar de Usuario' className='rounded-full w-20 h-20'/>
        <p className='text-xl'>{nombre}, {edad}</p>
        <p className='text-xl'>Altura: {altura}</p>
        {patologia === ' ' ? <p className='text-xl'>Patologia: Ninguna</p> : <p className='text-xl'>Patologia: {patologia}</p>}
        <button>Editar</button>
    </section>
  )
}
