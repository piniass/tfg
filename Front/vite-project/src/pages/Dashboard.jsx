import React from 'react'
import Aside from '../components/Aside';
import ClientDashboardCointainer from '../components/ClientDashboardCointainer';
export default function Dashboard() {
  return (
    <div className='flex h-screen'>
      <Aside/>
      <ClientDashboardCointainer />
    </div>
  )
}
