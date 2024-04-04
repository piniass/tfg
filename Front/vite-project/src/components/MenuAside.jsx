import React from 'react'
import { Link } from 'react-router-dom';
import UserIcon from '../svgs/UserIcon';
import PowerOff from '../svgs/PowerOff';

export default function MenuAside() {

  return (
    <nav className='flex items-center justify-center'>
        <ul>
          <li className='mb-10 p-2'>
            <Link to="/dashboard" className='flex items-center text-white gap-4'>
              <UserIcon/>
              <h2 className='text-2xl'>Clientes</h2>
            </Link>
          </li>
          <li className='mb-10 p-2'>
            <Link to="/tareas" className='flex items-center text-white gap-4'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
              </svg>
              <h2 className='text-2xl'>Tareas</h2>
            </Link>
          </li>
          <li className='mb-10 p-2'>
            <Link to="/dashboard" className='flex items-center text-white gap-4'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              <h2 className='text-2xl'>Ver Perfil</h2>
            </Link>
          </li>
          <li className='mb-10 p-2'>
            <Link to="/dashboard" className='flex items-center text-white gap-4'>
              <PowerOff/>
              <h2 className='text-2xl'>Cerrar Sesion</h2>
            </Link>
          </li>
        </ul>
      </nav>
  )
}
