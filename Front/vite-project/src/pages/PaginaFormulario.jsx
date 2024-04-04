import React from 'react'
import Formulario from '../components/Formulario'
import fondo from '../assets/fondo.jpg'
export default function PaginaFormulario() {
  return (
    <main className="w-screen h-screen flex justify-around items-center" style={{
      backgroundImage: `url(${fondo})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    }}>
        <section className='p-8 border-2'>
            <h1>ConexionFit</h1>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                Ad quos minima quas nesciunt soluta id!</p>
        </section>
        <Formulario/>
    </main>
  )
}
