import React, { useEffect, useState } from 'react';
import '../styles/cssESCALONA.css'
import { useNavigate } from 'react-router-dom';
import { createBoleta, createDetalleBoleta, updateDetalleBoleta } from '../utils/apiHelper';

function CompraExitosa() {
    const [i_pago, setI_pago] = useState(null)
    const [i_desp, setI_desp] = useState(null)
    const [usuario_act, setUsuario_act] = useState(null)

    const [productos, setProductos] = useState([])
    const [cliente, setCliente] = useState([])
    const [total, setTotal] = useState(0)

    const [rutc, setRutc] = useState("")

    const navigate = useNavigate()

    var com_rut

    // Función para guardar boleta en la base de datos
    const guardarBoletaEnBDD = async (boletaLocal, infodespacho, infopago) => {
        try {
            // Preparar datos del detalle_boleta
            const fechaDespacho = new Date(
                parseInt(infodespacho.cliente_despachar.ano),
                parseInt(infodespacho.cliente_despachar.mes) - 1,
                parseInt(infodespacho.cliente_despachar.dia)
            );

            const fechaCompra = infopago?.create_time 
                ? new Date(infopago.create_time) 
                : new Date();

            const detalleBoleta = {
                db_nombre_comprador: infopago?.payer?.name?.given_name || "Desconocido",
                db_nombre_recibidor: infodespacho?.cliente_despachar?.nombre || "Desconocido",
                db_direccion_despacho: infodespacho?.cliente_despachar?.direccion || "RETIRO EN TIENDA",
                db_fecha_despacho: fechaDespacho.toISOString().split('T')[0],
                db_fecha_compra: fechaCompra.toISOString().split('T')[0],
                db_cantidad_total: boletaLocal.productos_comprados.reduce((sum, p) => sum + p.cantidad_producto, 0),
                db_monto_total: infodespacho.total,
                db_id_productos_comprados: JSON.stringify(boletaLocal.productos_comprados)
            };

            // Crear detalle_boleta primero
            const detalleResponse = await createDetalleBoleta(detalleBoleta);
            console.log("Detalle boleta creado:", detalleResponse);
            
            const detalleCreado = detalleResponse.data || detalleResponse;

            // Crear boleta con referencia al detalle
            const boleta = {
                b_id_detalle: detalleCreado.db_id,
                b_nombre_comprador: infopago?.payer?.name?.given_name || "Desconocido",
                b_nombre_recibidor: infodespacho?.cliente_despachar?.nombre || "Desconocido",
                b_monto_total: infodespacho.total
            };

            const boletaResponse = await createBoleta(boleta);
            console.log("Boleta creada en base de datos:", boletaResponse);
            
            const boletaCreada = boletaResponse.data || boletaResponse;

            // Actualizar detalle_boleta con el id de la boleta (relación bidireccional)
            const detalleActualizado = {
                ...detalleCreado,
                db_id_boleta: boletaCreada.b_id
            };
            
            await updateDetalleBoleta(detalleActualizado);
            console.log("Detalle actualizado con db_id_boleta:", detalleActualizado);

            return boletaCreada;
        } catch (error) {
            console.error("Error al guardar boleta en BDD:", error);
            throw error;
        }
    };

    useEffect(() => {
    let lista_productos_comprados = []
    let info_usuario_comprador = {}
    let info_usuario_recibidor = {}
    let lista_boletas_guardadas = []

    try {  
        let com_rut = "USUARIO NO REGISTRADO"

        if (localStorage.getItem("usuarioActual")) {
            let u = JSON.parse(localStorage.getItem("usuarioActual"))
            com_rut = u.run  
            setRutc(com_rut)
        }else{setRutc(com_rut)}

        const infodespacho = JSON.parse(localStorage.getItem("temporal_info"))
        const infopago = JSON.parse(localStorage.getItem("temporal_info_quien_pago"))

        if (infodespacho) {
            if (infodespacho.cliente_despachar.direccion === "") {
                infodespacho.cliente_despachar.direccion = "RETIRO EN TIENDA"
            }
            setI_desp(infodespacho)
            setProductos(infodespacho.productos || [])
            setCliente(infodespacho.cliente_despachar || [])
            setTotal(infodespacho.total || 0)
        }

        if (infopago) {
            setI_pago(infopago)
        }

        infodespacho.productos.forEach(p => {
            const prod = {
                codigo_producto: p.codigo,
                cantidad_producto: p.cantidad
            }
            lista_productos_comprados.push(prod)
        })

        info_usuario_comprador = {
            nombre_comprador: infopago?.payer?.name?.given_name || "Desconocido",
            rut_comprador: com_rut,
            id_comprador: infopago?.id || "SIN_ID",
            estado_compra: infopago?.status || "N/A",
            fecha_compra: infopago?.create_time || "N/A"
        }

        info_usuario_recibidor = {
            nombre_recibidor: infodespacho?.cliente_despachar?.nombre || "Desconocido",
            rut_recibidor: infodespacho?.cliente_despachar?.rut || "N/A",
            direccion_recibidor: infodespacho?.cliente_despachar?.direccion || "N/A",
        }

        lista_boletas_guardadas = JSON.parse(localStorage.getItem("historial_boletas")) || []

        const boletaExistente = lista_boletas_guardadas.some(
            (b) => b.comprador.id_comprador === infopago.id
        )

        if (boletaExistente) {
            console.log("La boleta ya existe, no se volverá a guardar.")
            return
        }

        const id = `HBLT_${lista_boletas_guardadas.length}`

        const guardar_boleta = {
            n_boleta: id,
            recibidor: info_usuario_recibidor,
            comprador: info_usuario_comprador,
            productos_comprados: lista_productos_comprados
        }

        localStorage.setItem("compra_realizada", JSON.stringify(guardar_boleta))
        lista_boletas_guardadas.push(guardar_boleta)
        localStorage.setItem("historial_boletas", JSON.stringify(lista_boletas_guardadas))

        console.log("Nueva boleta guardada:", guardar_boleta)

        // Guardar en la base de datos
        guardarBoletaEnBDD(guardar_boleta, infodespacho, infopago).catch(err => {
            console.error("Error al guardar boleta en base de datos:", err)
        })

    } catch (error) {
        console.error("Error al cargar la informacion: ", error)
    }
}, []);

    if (!i_pago) {
    return (
        <>
            <div className='base_tarjeta altura-maxima'>
                <h2>Compra realizada!</h2>
                <h3>No se pudo encontrar la informacion del pago...</h3>
                <p>Rut del mamon que compro sin cuenta:</p>
                <p>{rutc}</p>
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
                            <strong className='mb-1'>Direccion despacho:</strong>
                            <p>{cliente.direccion}</p>
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
                    <p>{rutc}</p>
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