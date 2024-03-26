import React from 'react'
import ClientsContainer from './ClientsContainer'

export default function ClientDashboardCointainer(props) {
  return (
    <section className="w-3/4">
        <p>Hola</p>
        <ClientsContainer id={props.id}/>
    </section>
  )
}
