import React, { useState } from 'react'
import AvataresContainer from '../components/AvataresContainer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import Multistep_1 from '../components/Multistep_1';
import Multistep_2 from '../components/Multistep_2';
import Multistep_3 from '../components/Multistep_3';
import avatardefault from '../../public/avatardefault.png'
import ProgesionForm from '../components/ProgesionForm';
import useValidaciones from '../hooks/HooksValidaciones';

export default function Login() {

    const [name, setName] = useState()
    const [apellido, setApellido] = useState()
    const [email, setEmail] = useState()
    const [pwd, setPwd] = useState()
    const [avatar, setAvatar] = useState()
    const [error, setError] = useState()
    const url = 'http://127.0.0.1:8000/entrenadores'
    const navigate = useNavigate()
    const { validarCampo } = useValidaciones();

    
    console.log("nombre:", name)
    console.log("apellido:", apellido)
    console.log("email:", email)
    console.log("pwd:", pwd)
    console.log("avatar:", avatar)

    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log("nombre submit:", name)
        console.log("apellido submit:", apellido)
        // console.log("email:", email)
        // console.log("pwd:", pwd)
        // console.log("avatar:", avatar)
        const esAvatar = validarCampo('avatar',avatar)

        if(!esAvatar){
          alert("Selecciona un avatar")
        }else{
      

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
            setError(err.response.data.detail);
            alert(err.response.data.detail)
            console.log(error)
          }
        }
    }

    const showAvatar = () => {
      return avatar ? 
      (<img src={avatar} className='rounded-full p-4'/>)  
        :
      (<img className='rounded-full p-4' src={avatardefault} />
      )
    
    }

    const user = {
      "nombre" : name,
      "apellido": apellido,
      "correo": email,
      "password": pwd,
      "avatar": avatar
    }
    
  return (
    <main className='bg-gradient-to-tr from-gray-800 to-purple-500 w-screen h-screen flex items-center justify-center'>
      <section onSubmit={(e) =>handleSubmit(e)} className='flex flex-col items-center justify-center '>
              <form className='flex flex-col p-3 h-[550px] w-[450px] justify-center z-10 border-2 relative rounded-md'>
              <div className='w-40 h-40 justify-self-center self-center flex items-center justify-center relative bottom-24'>
                {showAvatar()}
              </div>
                <ProgesionForm user={user}/>

                {(!name && !apellido) && <Multistep_1 setName={setName} setApellido={setApellido}/>}
                {(name && apellido && (!email || !pwd)) && <Multistep_2 setEmail={setEmail} setPwd={setPwd} setName={setName} setApellido={setApellido}/>}
                {(name && apellido && email && pwd) && 
                <>
                  <Multistep_3 setAvatar={setAvatar} setEmail={setEmail} setPwd={setPwd} setName={setName} setApellido={setApellido}/>
                  <input type="submit" value="Crear Usuario" className='bg-green-600 text-white cursor-pointer p-2 rounded-lg' />
                </>       
                          }

                  {/* <input type="text" name="nombre" id="nombre" placeholder='Introduce tu nombre' className='border-2 rounded-lg p-2' onChange={(e) => setName(e.target.value)}/>
                  <input type="text" name="apellido" id="apellido" placeholder='Introduce tu apellido' className='border-2 rounded-lg p-2' onChange={(e) => setApellido(e.target.value)}/>
                  <input type="email" name="email" id="email" placeholder='Introduce tu correo electronico' className='border-2 rounded-lg p-2' onChange={(e) => setEmail(e.target.value)}/>
                  <input type="password" name="pwd" id="pwd" placeholder='Introduce tu contraseña' className='border-2 rounded-lg p-2' onChange={(e) => setPwd(e.target.value)}/>
                  <h3 className='p-2 text-xl text-center text-white'>Selecciona un avatar</h3>
                  <div className='overflow-auto h-96'>
                      <AvataresContainer sacarImagen={sacarImagen}/>
                  </div>
                  <input type="submit" value="Crear Usuario" className='bg-green-600 text-white cursor-pointer p-2 rounded-lg' /> */}
              </form>
        </section>
    </main>
  )
}
