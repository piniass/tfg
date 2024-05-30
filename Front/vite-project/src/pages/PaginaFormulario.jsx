import React from 'react'
import Formulario from '../components/Formulario'
// import fondo from '../assets/fondo.jpg'
export default function PaginaFormulario() {
  return (
    <main className="w-screen h-screen flex justify-around items-center bg-gradient-to-tr from-gray-800 to-purple-500">
      <div className='border flex items-center justify-around flex-col md:h-[450px] w-5/6 sm:w-[640px] md:w-[750px] md:flex-row'>
      

        <section className='p-4 bg-purple-900 h-full w-full text-white'>
            <h1 className=' text-3xl sm:text-5xl'>ConexionFit</h1>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                Ad quos minima quas nesciunt soluta id!</p>
        </section>
        <Formulario/>
      </div>
        
    </main>
  )
}
