import React, { useState, useEffect } from 'react';
import CheckIcon from '../svgs/CheckIcon';
import Add from '../svgs/Add';
import Spinner from '../svgs/Spinner';
import CloseIcon from '../svgs/CloseIcon';
import qs from 'qs';
import axios from 'axios'; // Asegúrate de importar axios

export default function ModalClientes(props) {
    const { cliente, rutina_id, rutinas } = props;
    const [rutina, setRutina] = useState(null);
    const [loaderUsers, setLoaderUsers] = useState([]);

    useEffect(() => {
        const findRutina = () => {
            const rutinaFind = rutinas.find((r) => r.id === rutina_id);
            setRutina(rutinaFind);
        };
        findRutina();
    }, [rutina_id, rutinas]);

    const handleClose = () => {
        props.setModal(false);
    };

    const handlePutRutina = async (userId) => {
        try {
            const url = `http://tfg-backend-piniass-projects.vercel.app/cliente/rutina/${userId}`;
            const data = {
                id_rutina: rutina.id
            };

            const options = {
                method: 'PUT',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: qs.stringify(data),
                url,
            };

            setLoaderUsers([...loaderUsers, userId]); // Agrega userId a la lista de cargadores
            const res = await axios(options);
            props.getClientes();
            setLoaderUsers(loaderUsers.filter(id => id !== userId)); // Elimina userId de la lista de cargadores

            console.log(res.data);
        } catch (error) {
            console.log("Errores:", error.response.data.detail);
        }
    };

    return (
        <article className='bg-white border rounded-md w-96 p-4 absolute top-52 left-0 right-0 mr-auto ml-auto'>
            <button onClick={handleClose}><CloseIcon/></button>
            <h2 className='text-xl text-center'>
                {rutina ? `Añadir la rutina ${rutina.nombre}` : 'Cargando rutina...'}
            </h2>
            <ul>
                {cliente.map((user) => (
                    <li key={user.id} className='p-2 flex items-center justify-between'>
                        <p>{user.nombre}</p>
                        {user.id_rutina === rutina_id ? (
                            <button disabled>
                                {loaderUsers.includes(user.id) ? (<Spinner/>) : <CheckIcon />}
                            </button>
                        ) : user.id_rutina === null ? (
                            <form onSubmit={(e) => { e.preventDefault(); handlePutRutina(user.id); }}>
                                <button type="submit">
                                    {loaderUsers.includes(user.id) ? (<Spinner/>) : <Add />}
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={(e) => { e.preventDefault(); handlePutRutina(user.id); }}>
                                <button type="submit">
                                    {loaderUsers.includes(user.id) ? (<Spinner/>) : <Add />}
                                </button>
                            </form>
                        )}
                    </li>
                ))}
            </ul>
        </article>
    );
}
