import React from 'react';
import MenuAside from './MenuAside';
import InfoAside from './InfoAside';

export default function Aside() {
  return (
    <aside className='w-1/5 h-screen bg-slate-700 flex flex-col'>
      <section className='flex items-center justify-center my-5 p-4 gap-3'>
        <div className='h-7 w-7 rounded-xl bg-red-600'></div>
        <h2 className='text-3xl text-white'>ConexionFit</h2>
      </section>
      <InfoAside />
      <MenuAside />
    </aside>
  );
}
