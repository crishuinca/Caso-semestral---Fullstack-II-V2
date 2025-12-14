import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getBoletas, getDetalleBoletas } from "../utils/apiHelper"

import CardBoletasPreview from "../components/cardBoletasPreview/CardBoletasPreview"
import "../styles/cssESCALONA.css"

function Boletas(){
    
    const [lista_boletas, setLista_boletas] = useState([])
    const navigate = useNavigate()

    const volverInicio = ()=>{
        navigate("/admin")
    }
    const detalle_boleta = (codigo)=>{
        console.log(codigo)
        localStorage.setItem("BOLETA_SELECTED", JSON.stringify(codigo))
        navigate("/admin/boletas/detalle-boleta")
    }

    useEffect(()=>{
        const cargarBoletas = async () => {
            const boletasDB = await getBoletas()
            const detallesDB = await getDetalleBoletas()
            
            console.log("Boletas cargadas:", boletasDB)
            console.log("Detalles cargados:", detallesDB)
            
            if (boletasDB && boletasDB.length > 0) {
                // Combinar boletas con sus detalles
                const boletasConDetalle = boletasDB.map(boleta => {
                    // Buscar detalle por db_id_boleta (relación inversa)
                    const detalle = detallesDB?.find(d => d.db_id_boleta === boleta.b_id) || null
                    
                    // Si no hay detalle, usar datos de la boleta
                    return {
                        n_boleta: boleta.b_id,
                        monto_total: boleta.b_monto_total,
                        fecha_compra: detalle?.db_fecha_compra || new Date().toISOString(),
                        comprador: {
                            nombre_comprador: boleta.b_nombre_comprador || detalle?.db_nombre_comprador || 'Sin nombre'
                        },
                        recibidor: {
                            nombre_recibidor: boleta.b_nombre_recibidor || detalle?.db_nombre_recibidor || 'Sin nombre'
                        },
                        direccion_despacho: detalle?.db_direccion_despacho || 'Sin dirección',
                        fecha_despacho: detalle?.db_fecha_despacho || '',
                        cantidad_total: detalle?.db_cantidad_total || 0,
                        productos_comprados: detalle?.db_id_productos_comprados ? 
                            JSON.parse(detalle.db_id_productos_comprados) : []
                    }
                })
                console.log("Boletas procesadas:", boletasConDetalle)
                setLista_boletas(boletasConDetalle)
            } else {
                console.log("No hay boletas para mostrar")
            }
        }
        
        cargarBoletas()
    },[])

    return(
        <>
            <h3 className="ms-5 mt-5">Historial de boletas</h3>
            <div>
                {
                lista_boletas.map(boleta=>(
                    <div key={boleta.n_boleta}>
                        <CardBoletasPreview
                        lsb={boleta}
                        ver={()=>detalle_boleta(boleta.n_boleta)}/>
                    </div>
                ))
                }
            </div>
            <div>
                <button className="btn-cambio-frutilla margin-btn" onClick={volverInicio}>Volver al panel</button>
            </div>
        </>
    )
}
export default Boletas