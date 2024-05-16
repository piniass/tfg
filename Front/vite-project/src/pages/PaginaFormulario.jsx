import React from 'react'
import Formulario from '../components/Formulario'
// import fondo from '../assets/fondo.jpg'
export default function PaginaFormulario() {
  return (
    <main className="w-screen h-screen flex justify-around items-center bg-gradient-to-tr from-gray-800 to-purple-500" /*style={{
      backgroundImage: `url(${fondo})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    }}*/>
      <div className='backdrop-filter backdrop-blur-lg bg-opacity-10 w-screen h-screen flex items-center justify-around flex-col md:flex-row '>
      <section className='p-8 border-2 text-white'>
            <h1>ConexionFit</h1>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                Ad quos minima quas nesciunt soluta id!</p>
        </section>
        <Formulario/>
      </div>
        
    </main>
  )
}
