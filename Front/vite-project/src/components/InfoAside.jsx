import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function InfoAside(props) {
    const id = props.id
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUser = async (id) => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/entrenadores/${id}`);
                const info = response.data[0];
                setNombre(info.nombre);
                setApellido(info.apellido);
            } catch (err) {
                setError(err);
            }
        };

        getUser(id);
    }, [id]);

    return (
        <section className='flex flex-col items-center justify-center p-5 my-10 gap-4 text-white'>
            <div className='h-40 w-40 rounded-xl bg-purple-600'></div>
            <h2 className='text-3xl'>
                {nombre && <span>{nombre}</span>}
                {apellido && <span> {apellido}</span>}
            </h2>
        </section>
    );
}
