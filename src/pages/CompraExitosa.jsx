import React, { useEffect, useState } from 'react';
import '../styles/cssESCALONA.css'

function CompraExitosa() {
    const [i_pago, setI_pago] = useState(null)
    const [i_desp, setI_desp] = useState(null)

    const [productos, setProductos] = useState([])
    const [cliente, setCliente] = useState([])
    const [total, setTotal] = useState(0)

    useEffect(()=>{
        try {           
            const infodespacho = JSON.parse(localStorage.getItem("temporal_info"))
            if(infodespacho){
                setI_desp(infodespacho)
                setProductos(infodespacho.productos || [])
                setCliente(infodespacho.cliente_despachar || [])
                setTotal(infodespacho.total || 0)
            }
        
            const infopago = JSON.parse(localStorage.getItem("temporal_info_quien_pago"))
            if(infopago){
                setI_pago(infopago)
            }
        } catch (error) {
            console.error("Error al cargar la informacion: ", error)
        }
    },[]);

    if (!i_pago) {
    return (
        <>
            <div className='altura-maxima'>
                <h2>Compra realizada</h2>
                <p>No se encontró información del pago.</p>
            </div>
            <div className='base_tarjeta'>
                <h2>Compra realizada!</h2>
                <p>No se ha podido recuperar la informacion del pago...</p>
                <p>-</p>
                <p>Informacion del despacho:</p>
                <div>
                    <strong className='mb-1'>Lista productos:</strong>
                    <div className='row'>
                    {
                        productos.map((prod,i) => (
                            <div key={i} className='display-flex-basico'>
                                <p>{prod.codigo}</p>
                                <p>x{prod.cantidad}</p>
                            </div>
                        ))
                    }
                    </div>
                    <p className='mb-1'>Persona recibidora:</p>
                    <div className='row'>
                    {
                        <div className=''>
                            <strong className='mb-1'>Nombre:</strong>
                            <p>{cliente.nombre}</p>
                            <strong className='mb-1'>Rut de la persona:</strong>
                            <p>{cliente.rut}</p>
                            <strong className='mb-1'>Tipo de entrega:</strong>
                            <p>{cliente.tipoEntrega}</p>
                            <strong className='mb-1'>Direccion:</strong>
                            <p>{cliente.direccion}</p>
                            <strong className='mb-1'>Fecha de entrega</strong>
                            <p>{cliente.dia}-{cliente.mes}-{cliente.ano}</p>
                        </div>
                    }
                    </div>
                    <strong className='mb-1'>Total de la compra:</strong>
                        <p>${total}</p>
                </div>
            </div>
        </>
        );
    }

    return (
        <>
            <div className='altura-maxima'>
                <h2>Compra realizada</h2>
                <p>No se encontró información del pago.</p>
            </div>
            <div className='base_tarjeta'>
                <h2>Compra realizada!</h2>
                <h3>Informacion del pago:</h3>
                <div className=''>
                    <strong className='mb-1'>Nombre del que pago:</strong>
                    <p>{i_pago.payer.name.given_name}</p>
                    <strong className='mb-1'>ID comprador:</strong>
                    <p>{i_pago.id}</p>
                    <strong className='mb-1'>Estado:</strong>
                    <p>{i_pago.status}</p>
                    <strong className='mb-1'>Fecha del pago:</strong>
                    <p>{i_pago.create_time}</p>
                    <strong className='mb-1'>Total de la compra:</strong>
                    <p>${total}</p>
                </div>
                <p>-</p>
                <h3>Informacion del despacho:</h3>
                <div>
                    <strong className='mb-1'>Lista productos:</strong>
                    <div className='row'>
                    {
                        productos.map((prod,i) => (
                            <div key={i} className='display-flex-basico'>
                                <p className='mb-1'>{prod.codigo}</p>
                                <p className='mb-1'>x{prod.cantidad}</p>
                            </div>
                        ))
                    }
                    <p></p>
                    <strong className='mb-0'>Tipo de entrega:</strong>
                    <p>{cliente.tipoEntrega}</p>
                    <strong className='mb-0'>Direccion:</strong>
                    <p>{cliente.direccion}</p>
                    <strong className='mb-0'>Fecha de entrega</strong>
                    <p>{cliente.dia}-{cliente.mes}-{cliente.ano}</p>
                    </div>
                    <h3 className='mb-1'>Persona recibidora:</h3>
                    <div className='row'>
                    {
                        <div className=''>
                            <strong className='mb-1'>Nombre:</strong>
                            <p>{cliente.nombre}</p>
                            <strong className='mb-1'>Rut de la persona:</strong>
                            <p>{cliente.rut}</p>
                        </div>
                    }
                    </div>
                    
                </div>
            </div>
        </>
    );
}

export default CompraExitosa;