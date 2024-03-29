import axios from 'axios'
import { useEffect, useState } from 'react'
import ClientCard from './ClientCard'

export default function ClientsContainer(props) {
    const id = props.id
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/clientes/entrenador/${id}`)
            .then(function (response) {
                setClientes(response.data);
                console.log(clientes)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [id]); // Añadí 'id' a la dependencia del efecto para que se vuelva a ejecutar cuando cambie 'id'

    return (
        <section>
            {clientes.length === 0 ? (
                <p>No hay clientes</p>
            ) : (
                <div>
                    {clientes.map(cliente => (
                        <ClientCard key={cliente.id} cliente={cliente} />
                    ))}
                </div>
            )}
        </section>
    );
}
