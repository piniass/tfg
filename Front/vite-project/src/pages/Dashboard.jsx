import React from 'react'
import Aside from '../components/Aside';
import ClientDashboardCointainer from '../components/ClientDashboardCointainer';
export default function Dashboard() {
    var id = sessionStorage.getItem("id");
    console.log("idd")
    console.log(id)
  return (
    <div className='flex'>
      <Aside id={id}/>
      <ClientDashboardCointainer id={id}/>
    </div>
    
  )
}
