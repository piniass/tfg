import React from 'react'
import Aside from '../components/Aside';
export default function Dashboard() {
    var id = sessionStorage.getItem("id");
    console.log("idd")
    console.log(id)
  return (
    <div className='flex'>
      <Aside id={id}/>
      <main className='w-3/4 h-screen bg-blue-500'>Dashboard</main> 
    </div>
  )
}
