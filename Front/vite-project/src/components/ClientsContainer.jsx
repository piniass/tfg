import axios from 'axios'
import { useEffect, useState } from 'react'
import ClientCard from './ClientCard'
import Spinner from '../svgs/Spinner';

export default function ClientsContainer(props) {
    const id = sessionStorage.getItem("id");
    const cliente = props.cliente;
    const [busqueda, setBusqueda] = useState('');
    const [nuevosClientes, setNuevos] = useState([]);
    const [loading, setLoading] = useState(false);

    // Eliminado el llamado directo a getClientes
    // const getClientes = props.getClientes()


    useEffect(() => {
        console.log("Entro al useEffect2");
        if (props.buscador !== '') {
            console.log("Me acabo de meter");
            setBusqueda(props.buscador);
            const clientesFiltrados = cliente.filter(cliente => 
                cliente.nombre.toLowerCase().includes(props.buscador.toLowerCase()) || 
                cliente.apellido.toLowerCase().includes(props.buscador.toLowerCase())
            );
            setNuevos(clientesFiltrados);
        }
    }, [props.buscador, cliente]);

    return (
        <section className=''>
            {loading && 
            <div className='flex items-center justify-center flex-col'>
                <Spinner />
                <p>Cargando clientes...</p>
            </div>}
            
            {cliente.length === 0 && !loading ? (
                <p>No hay clientes todavía</p>
            ) : (
                props.buscador !== '' ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
                        {nuevosClientes.map(cliente => (
                            <ClientCard 
                                key={cliente.id} 
                                cliente={cliente} 
                                getClientes={props.getClientes} 
                                setEdit={props.setEdit} 
                                setSelectedClientId={props.setClienteId} 
                                handleEliminar={props.handleEliminar} 
                            />                        ))}
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
                        {cliente.map(cliente => (
                            <ClientCard 
                                key={cliente.id} 
                                cliente={cliente} 
                                getClientes={props.getClientes} 
                                setEdit={props.setEdit} 
                                setSelectedClientId={props.setClienteId} 
                                handleEliminar={props.handleEliminar} 
                            />
                        ))}
                    </div>
                )
            )}
        </section>
    );
}
