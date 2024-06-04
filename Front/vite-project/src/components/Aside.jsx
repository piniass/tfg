import React from 'react';
import MenuAside from './MenuAside';
import InfoAside from './InfoAside';
import Logo from '../assets/Logo.png'

export default function Aside() {
  return (
    <aside className='w-1/5 h-screen bg-slate-700 flex flex-col'>
      <section className='flex items-center justify-center my-5 gap-2 flex-col lg:flex-row'>
        <img src={Logo} alt="Logo de ConexionFit" className='w-12'/>
        <h2 className='text-2xl text-white hidden md:block'>ConexionFit</h2>
      </section>
      <InfoAside />
      <MenuAside />
    </aside>
  );
}
