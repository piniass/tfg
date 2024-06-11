import React, { useState } from 'react';
import AvataresContainer from '../components/AvataresContainer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import Multistep_1 from '../components/Multistep_1';
import Multistep_2 from '../components/Multistep_2';
import Multistep_3 from '../components/Multistep_3';
import avatardefault from '../../public/avatardefault.png';
import ProgesionForm from '../components/ProgesionForm';
import useValidaciones from '../hooks/HooksValidaciones';
import Spinner from '../svgs/Spinner';

export default function Login() {

    const [name, setName] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [avatar, setAvatar] = useState('');
    const [error, setError] = useState({});
    const url = 'https://tfg-backend-piniass-projects.vercel.app/entrenadores';
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const { validarCampo } = useValidaciones();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const esAvatar = validarCampo('avatar', avatar);

        if (!esAvatar) {
            setError({ avatar: 'Selecciona un avatar' });
        } else {

            const user = {
                "nombre": name,
                "apellido": apellido,
                "correo": email,
                "password": pwd,
                "avatar": avatar
            };

            const options = {
                method: 'POST',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: qs.stringify(user),
                url,
            };

            try {
                setLoading(true)
                const res = await axios(options);
                setLoading(false)

                navigate("/");
            } catch (err) {
                const errorResponse = err.response.data.detail;
                setError({ general: errorResponse });
            }
        }
    };

    const showAvatar = () => {
        return avatar ?
            (<img src={avatar} className='rounded-full p-4' />) :
            (<img className='rounded-full p-4' src={avatardefault} />);
    };

    const user = {
        "nombre": name,
        "apellido": apellido,
        "correo": email,
        "password": pwd,
        "avatar": avatar
    };

    return (
        <main className='bg-gradient-to-tr from-gray-800 to-purple-500 w-screen h-screen flex items-center justify-center'>
            <section onSubmit={(e) => handleSubmit(e)} className='flex flex-col items-center justify-center '>
                <form className='flex flex-col p-3 h-[600px] w-[450px] justify-center z-10 border-2 relative rounded-md'>
                    <div className='w-40 h-40 justify-self-center self-center flex items-center justify-center relative bottom-24'>
                        {showAvatar()}
                    </div>
                    <ProgesionForm user={user} />

                    {(!name && !apellido) && <Multistep_1 setName={setName} setApellido={setApellido} />}
                    {(name && apellido && (!email || !pwd)) && <Multistep_2 setEmail={setEmail} setPwd={setPwd} setName={setName} setApellido={setApellido} />}
                    {(name && apellido && email && pwd) &&
                        <>
                            <Multistep_3 setAvatar={setAvatar} setEmail={setEmail} setPwd={setPwd} setName={setName} setApellido={setApellido} />
                            {error.avatar && <p className='p-1 bg-red-500 text-white rounded-md mb-2'>{error.avatar}</p>}
                            {error.general && <p className='p-1 bg-red-500 text-white rounded-md mb-2'>{error.general}</p>}
                            {
                                loading ? (
                                    <button
                                        type="button"
                                        disabled
                                        className='rounded flex items-center justify-center cursor-pointer bg-gray-300 p-2 text-white'
                                    ><Spinner /></button>
                                )
                                    : (
                                        <input type="submit" value="Crear Usuario" className='bg-green-600 text-white cursor-pointer p-2 rounded-lg' />

                                    )
                            }
                        </>
                    }

                </form>
            </section>
        </main>
    );
}
