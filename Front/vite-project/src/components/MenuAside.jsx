import React from 'react'
import { Link } from 'react-router-dom';
import UserIcon from '../svgs/UserIcon';
import PowerOff from '../svgs/PowerOff';
import TareaIcon from '../svgs/TareaIcon';
import MuscleIcon from '../svgs/MuscleIcon';

export default function MenuAside() {
  const handleCerrarSesion = () => {
    sessionStorage.clear()
    navigate("/")
  }

  return (
    <nav className='flex items-center justify-center'>
        <ul className='flex flex-col gap-2'>
          <li className='p-2'>
            <Link to="/dashboard" className='flex items-center text-white gap-4 hover:text-white '>
              <UserIcon/>
              <h2 className='text-xl hidden md:block'>Clientes</h2>
            </Link>
          </li>
          <li className='p-2'>
            <Link to="/tareas" className='flex items-center text-white gap-4 hover:text-white'>
              <TareaIcon/>
              <h2 className='text-xl hidden md:block'>Tareas</h2>
            </Link>
          </li>
          <li className='p-2'>
            <Link to="/rutinas" className='flex items-center text-white gap-4 hover:text-white'>
              <MuscleIcon/>
              <h2 className='text-xl hidden md:block'>Rutinas</h2>
            </Link>
          </li>
          <li className='p-2'>
            <Link to="/" className='flex items-center text-white gap-4 hover:text-white' onClick={handleCerrarSesion}>
              <PowerOff/>
              <h2 className='text-xl hidden md:block'>Cerrar Sesion</h2>
            </Link>
          </li>
        </ul>
      </nav>
  )
}
