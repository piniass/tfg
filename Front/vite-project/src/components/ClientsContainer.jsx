import axios from 'axios'
import { useEffect, useState } from 'react'
import ClientCard from './ClientCard'

export default function ClientsContainer(props) {
    const id = props.id
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/clientes/entrenador/${id}`);
                setClientes(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchClientes(); 

    }, [id]); 

    const actualizarClientes = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/clientes/entrenador/${id}`);
            setClientes(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className='p-4'>
            {clientes.length === 0 ? (
                <p>No hay clientes</p>
            ) : (
                <div className='grid grid-cols-3 gap-4'>
                    {clientes.map(cliente => (
                        <ClientCard key={cliente.id} cliente={cliente} actualizarClientes={actualizarClientes}/>
                        ))}
                </div>
            )}
        </section>
    );
}
