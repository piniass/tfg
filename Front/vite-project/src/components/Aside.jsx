import React from 'react';
import MenuAside from './MenuAside';
import InfoAside from './InfoAside';

export default function Aside(props) {

  return (
    <aside className='w-1/4 h-screen bg-slate-700	 flex flex-col justify-between gap-10'>
      <section className='flex items-center justify-center my-5 p-4 gap-3'>
        <div className='h-7 w-7 rounded-xl bg-red-600'></div>
        <h2 className='text-3xl text-white'>ConexionFit</h2>
      </section>
      <InfoAside id={props.id}/>
      <MenuAside />
      <section className='flex items-center justify-center gap-3 mb-4 mt-auto'>
        <div className='h-7 w-7 rounded-xl bg-red-600'></div>
        <h2 className='text-3xl'>Cerrar Sesión</h2>
      </section>
      
    </aside>
  );
}
