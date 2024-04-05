import React from 'react'
import Aside from '../components/Aside';
import ClientDashboardCointainer from '../components/ClientDashboardCointainer';
export default function Dashboard() {
    var id = sessionStorage.getItem("id");
    console.log("id entrenador: ", id)
  return (
    <div className='flex h-screen'>
      <Aside id={id}/>
      <ClientDashboardCointainer id={id}/>
    </div>
  )
}
