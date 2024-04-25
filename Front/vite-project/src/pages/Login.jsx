import React, { useState } from 'react'
import AvataresContainer from '../components/AvataresContainer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import qs from 'qs';


export default function Login() {

    const [name, setName] = useState()
    const [apellido, setApellido] = useState()
    const [email, setEmail] = useState()
    const [pwd, setPwd] = useState()
    const [avatar, setAvatar] = useState()
    const [error, setError] = useState()
    const url = 'https://tfg-backend-piniass-projects.vercel.app/entrenadores'
    const navigate = useNavigate()

    const sacarImagen = (src) => {
        const recortado = src.substring(13);
        setAvatar(recortado);
    };

    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log("nombre:", name)
        console.log("apellido:", apellido)
        console.log("email:", email)
        console.log("pwd:", pwd)
        console.log("avatar:", avatar)

        const user = {
            "nombre" : name,
            "apellido": apellido,
            "correo": email,
            "password": pwd,
            "avatar": avatar
          }

          const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(user),
            url,
          };
      
          try{
            console.log(user)
            const res = await axios(options);
            console.log(res.data);
            navigate("/");
          }catch(err){
            setError(err.response.data.detail); // Aquí capturas solo el detalle del error
            console.log(error)
          }

    }

  return (
    <main className='bg-gradient-to-tr from-gray-800 to-purple-500 w-screen h-screen flex items-center justify-center'>
      <section onSubmit={(e) =>handleSubmit(e)} className='flex flex-col items-center justify-center '>
              <h1 className='text-center p-2 text-white'>Crear Usuario</h1>
              <form className='flex flex-col gap-2 p-2 border-2'>
                  <input type="text" name="nombre" id="nombre" placeholder='Introduce tu nombre' className='border-2 rounded-lg p-2' onChange={(e) => setName(e.target.value)}/>
                  <input type="text" name="apellido" id="apellido" placeholder='Introduce tu apellido' className='border-2 rounded-lg p-2' onChange={(e) => setApellido(e.target.value)}/>
                  <input type="email" name="email" id="email" placeholder='Introduce tu correo electronico' className='border-2 rounded-lg p-2' onChange={(e) => setEmail(e.target.value)}/>
                  <input type="password" name="pwd" id="pwd" placeholder='Introduce tu contraseña' className='border-2 rounded-lg p-2' onChange={(e) => setPwd(e.target.value)}/>
                  <h3 className='p-2 text-xl text-center text-white'>Selecciona un avatar</h3>
                  <div className='overflow-auto h-96'>
                      <AvataresContainer sacarImagen={sacarImagen}/>
                  </div>
                  <input type="submit" value="Crear Usuario" className='bg-green-600 text-white cursor-pointer p-2 rounded-lg' />
              </form>
        </section>
    </main>
    
    
  )
}
