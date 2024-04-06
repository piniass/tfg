import React, { useState } from 'react'
import InfoDetalles from './InfoDetalles'
import PesoContainer from './PesoContainer'

export default function DetallesContainer(props) {
  return (
    <section className='flex flex-col p-5 w-4/5 gap-2'>
        <InfoDetalles state={props.state}/>
        <PesoContainer state={props.state}/>
    </section>
  )
}
