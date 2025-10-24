import React, { useEffect, useState } from 'react';
import '../styles/cssESCALONA.css'

function CompraExitosa() {
    const [i_pago, setI_pago] = useState(null)
    const [i_desp, setI_desp] = useState(null)
    const [usuario_act, setUsuario_act] = useState(null)

    const [productos, setProductos] = useState([])
    const [cliente, setCliente] = useState([])
    const [total, setTotal] = useState(0)

    var com_rut

    useEffect(()=>{

        let lista_productos_comprados = []
        let info_usuario_comprador = {}
        let info_usuario_recibidor = {}

        let lista_boletas_guardadas = []

        try {  
            if(localStorage.getItem("usuarioActual")){
                let u = JSON.parse(localStorage.getItem("usuarioActual"))
                com_rut = u.run  
            }else{
                com_rut = "USUARIO NO REGISTRADO"
            } 
            const infodespacho = JSON.parse(localStorage.getItem("temporal_info"))
            if(infodespacho){
                setI_desp(infodespacho)
                setProductos(infodespacho.productos       || [])
                setCliente(infodespacho.cliente_despachar || [])
                setTotal(infodespacho.total               || 0)
            }
            const infopago = JSON.parse(localStorage.getItem("temporal_info_quien_pago"))
            if(infopago){
                setI_pago(infopago)
            }
            
            infodespacho.productos.forEach(p=>{
                const prod ={
                    codigo_producto: p.codigo,
                    cantidad_producto: p.cantidad
                }
                lista_productos_comprados.push(prod)
                console.log(lista_productos_comprados)
            })
            info_usuario_comprador = {
                nombre_comprador: infopago.payer.name.given_name,
                rut_comprador: com_rut,
                id_comprador: infopago.id,
                estado_compra: infopago.status,
                fecha_compra: infopago.create_time
            }
            info_usuario_recibidor = {
                nombre_recibidor: infodespacho.cliente_despachar.nombre,
                rut_recibidor: infodespacho.cliente_despachar.rut
            }
            var id = "HBLT_0"
            lista_boletas_guardadas = JSON.parse(localStorage.getItem("historial_boletas"))
            lista_boletas_guardadas.forEach((b,i)=>{
                id = "HBLT_"+(i+1)
            })
            let guardar_boleta = {
                n_boleta: id,
                recibidor: info_usuario_recibidor,
                comprador: info_usuario_comprador,
                productos_comprados: lista_productos_comprados
            }
            if(localStorage.getItem("c")){
                localStorage.removeItem("c")
                return
            }
            localStorage.setItem("c","true")
            localStorage.setItem("compra_realizada", JSON.stringify(guardar_boleta))
            lista_boletas_guardadas.push(guardar_boleta)
            localStorage.setItem("historial_boletas", JSON.stringify(lista_boletas_guardadas))

        } catch (error) {
            console.error("Error al cargar la informacion: ", error)
        }


    },[]);

    if (!i_pago) {
    return (
        <>
            <div className='base_tarjeta altura-maxima'>
                <h2>Compra realizada!</h2>
                <h3>No se pudo encontrar la informacion del pago...</h3>
                <p>Rut del mamon que compro sin cuenta:</p>
                <p>{com_rut}</p>
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

    return (
        <>
            <div className='base_tarjeta altura-maxima'>
                <h2>Compra realizada!</h2>
                <h3>Informacion del pago:</h3>
                <div className=''>
                    <strong className='mb-1'>Nombre del que pago:</strong>
                    <p>{i_pago.payer.name.given_name}</p>
                    <strong className='mb-1'>Rut comprador:</strong>
                    <p>{com_rut}</p>
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