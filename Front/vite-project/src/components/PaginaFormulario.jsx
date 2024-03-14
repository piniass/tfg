import React from 'react'
import Formulario from './Formulario'

export default function PaginaFormulario() {
  return (
    <main className='bg-green-500 w-screen h-screen flex justify-center items-center'>
        <section className='p-8'>
            <h1>ConexionFit</h1>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                Ad quos minima quas nesciunt soluta id!</p>
        </section>
        <Formulario/>
    </main>
  )
}
