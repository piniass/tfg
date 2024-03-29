import React, { useState, useEffect } from 'react';

export default function ClientCard(props) {
    const [nombre, setNombre] = useState('');

    useEffect(() => {
        if (props.cliente && props.cliente.nombre) {
            setNombre(props.cliente.nombre);
        }
    }, [props.cliente]);

    return (
        <div>
            <p>Nombre del cliente: {nombre}</p>
        </div>
    );
}
