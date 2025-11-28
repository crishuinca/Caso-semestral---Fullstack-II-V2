import { useEffect, useState } from "react"
import CardBoletas from "../components/cardBoletas/CardBoletas"
import { getBoletas, getDetalleBoletas, getProductos } from "../utils/apiHelper"
import 'bootstrap/dist/css/bootstrap.min.css'

import "../styles/cssESCALONA.css"
import { useNavigate } from "react-router-dom"

function DetalleBoleta(){

    const [lsBoletas, setLsBoletas] = useState([])
    const [recboleta, setRecboleta] = useState(null)
    const [productos, setProductos] = useState(null)

    const navigate = useNavigate()

    useEffect(()=>{
        const cargarDetalle = async () => {
            const codigo = JSON.parse(localStorage.getItem("BOLETA_SELECTED"))
            
            const boletasDB = await getBoletas()
            const detallesDB = await getDetalleBoletas()
            const productosDB = await getProductos()
            
            if (boletasDB && detallesDB && productosDB) {
                // Encontrar la boleta
                const boletaEncontrada = boletasDB.find(b => b.b_id === codigo)
                
                if (boletaEncontrada) {
                    // Obtener el detalle de la boleta
                    const detalle = detallesDB.find(d => d.db_id === boletaEncontrada.b_id_detalle)
                    
                    const boletaCompleta = {
                        n_boleta: boletaEncontrada.b_id,
                        monto_total: boletaEncontrada.b_monto_total,
                        fecha_compra: detalle?.db_fecha_compra || new Date().toISOString(),
                        nombre_comprador: detalle?.db_nombre_comprador || '',
                        nombre_recibidor: detalle?.db_nombre_recibidor || '',
                        direccion_despacho: detalle?.db_direccion_despacho || '',
                        fecha_despacho: detalle?.db_fecha_despacho || '',
                        cantidad_total: detalle?.db_cantidad_total || 0,
                        productos_comprados: detalle?.db_id_productos_comprados ? 
                            JSON.parse(detalle.db_id_productos_comprados) : []
                    }
                    
                    setRecboleta(boletaCompleta)
                    
                    // Mapear productos comprados con información completa
                    const productosComprados = boletaCompleta.productos_comprados.map(pc => {
                        const prod = productosDB.find(p => p.p_codigo === pc.codigo_producto)
                        return {
                            nombre: prod?.p_nombre || 'Producto no encontrado',
                            cantidad: parseInt(pc.cantidad_producto),
                            precio: prod?.p_precio || 0
                        }
                    })
                    
                    setProductos(productosComprados)
                }
            }
        }
        
        cargarDetalle()
    },[])

    return(
        <>
        <h3 className="ms-5 mt-5">Detalle boleta</h3>
        <div className="justify-self-center">
        {recboleta ? (
            <CardBoletas 
            brp={recboleta}
            prods={productos}
            regresar={() => navigate("/admin/boletas")}/>
        ) : (
            <p>No se encontró la boleta seleccionada</p>
        )}
        </div>
        </>
    )
}
export default DetalleBoleta
