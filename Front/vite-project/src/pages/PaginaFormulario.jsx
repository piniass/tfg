import React from 'react'
import Formulario from '../components/Formulario'
import Logo from '../assets/Logo.png'
export default function PaginaFormulario() {
  return (
    <>
    <main className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-gray-800 to-purple-500">
      <div className='border m-auto  flex items-center justify-around flex-col md:h-[450px] w-5/6 sm:w-[640px] md:w-[750px] md:flex-row'>
      

        <section className='p-4 h-full w-full text-white flex flex-col gap-2'>
            <h1 className=' text-3xl sm:text-5xl text-center'>ConexionFit</h1>
            <p className='text-left m-0'>ConexionFit es la aplicación que revoluciona el sector del fitness permitiendote a ti, entrenador personal, gestionar tus clientes para que trabajes y entrenen como una BESTIA para sacar el máximo partido a tu tiempo y a los entrenamientos</p>
            <img src={Logo} alt="" className='w-52 m-auto'/>
        </section>
        <Formulario/>
      </div>
      <footer className='text-white '>Desarrollado con cariño por Marcos Calvo y Miguel Piñán.</footer>

    </main>
    </>
  )
}
