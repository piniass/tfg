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
    const url = 'http://tfg-backend-piniass-projects.vercel.app/entrenadores'
    const navigate = useNavigate()
    const { errores, validarCampo } = useValidaciones();

    
    console.log("nombre:", name)
    console.log("apellido:", apellido)
    console.log("email:", email)
    console.log("pwd:", pwd)
    console.log("avatar:", avatar)

    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log("nombre:", name)
        console.log("apellido:", apellido)
        // console.log("email:", email)
        // console.log("pwd:", pwd)
        // console.log("avatar:", avatar)
        const esNombreValido = validarCampo('nombre', name);
        const esApellidoValido = validarCampo('apellido', apellido);
        const esEmailValido = validarCampo('email', email);
        const esPwdValido = validarCampo('password', pwd);
        const esAvatarValido = validarCampo('avatar', avatar);

        if (!esNombreValido) {
          return alert("El nombre debe empezar por mayúscula y no contener ninguna más.");
      } else if (!esApellidoValido) {
          return alert("El apellido debe empezar por mayúscula.");
      } else if (!esEmailValido) {
          return alert("El correo debe contener un '@' y un dominio válido.");
      } else if (!esPwdValido) {
          return alert("La contraseña debe contener al menos 1 número, tener entre 5 y 12 caracteres.");
      } else if (!esAvatarValido) {
          return alert("El avatar no puede estar vacío. Haz clic sobre la imagen.");
      } else {
          // Si todos los campos son válidos, continuar con el envío del formulario
          // Código para enviar el formulario
      
      

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
            sessionStorage.setItem("id", coincidencia.id);
            sessionStorage.setItem("nombre", coincidencia.nombre);
            sessionStorage.setItem("apellido", coincidencia.apellido);
            sessionStorage.setItem("foto", coincidencia.avatar);
            navigate("/dashboard");
          }catch(err){
            setError(err.response.data.detail);
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
