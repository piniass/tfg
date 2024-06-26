import React from 'react'
import Aside from '../components/Aside'
import RutinasContainer from '../components/RutinasContainer'

export default function PaginaRutinas() {
  return (
    <div className='flex'>
      <Aside/>
      <main className='w-4/5 h-screen flex flex-col'>
        <RutinasContainer/>
      </main> 
    </div>
  )
}
