import React from 'react'
import { Link } from 'react-router-dom';
import UserIcon from '../svgs/UserIcon';
import PowerOff from '../svgs/PowerOff';
import TareaIcon from '../svgs/TareaIcon';

export default function MenuAside() {
  const handleCerrarSesion = () => {
    sessionStorage.clear()
    navigate("/")
  }

  return (
    <nav className='flex items-center justify-center'>
        <ul className='flex flex-col gap-2'>
          <li className='p-2'>
            <Link to="/dashboard" className='flex items-center text-white gap-4 '>
              <UserIcon/>
              <h2 className='text-xl hidden md:block'>Clientes</h2>
            </Link>
          </li>
          <li className='p-2'>
            <Link to="/tareas" className='flex items-center text-white gap-4'>
              <TareaIcon/>
              <h2 className='text-xl hidden md:block'>Tareas</h2>
            </Link>
          </li>
          <li className='p-2'>
            <Link to="/dashboard" className='flex items-center text-white gap-4'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              <h2 className='text-xl hidden md:block'>Rutinas</h2>
            </Link>
          </li>
          <li className='p-2'>
            <Link to="/" className='flex items-center text-white gap-4' onClick={handleCerrarSesion}>
              <PowerOff/>
              <h2 className='text-xl hidden md:block'>Cerrar Sesion</h2>
            </Link>
          </li>
        </ul>
      </nav>
  )
}
