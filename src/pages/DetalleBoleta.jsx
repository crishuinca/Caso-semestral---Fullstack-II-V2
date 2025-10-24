import { useEffect, useState } from "react"
import CardBoletas from "../components/CardBoletas"
import 'bootstrap/dist/css/bootstrap.min.css'

import "../styles/cssESCALONA.css"
import { useNavigate } from "react-router-dom"

function DetalleBoleta(){

    const [lsBoletas, setLsBoletas] = useState([])
    const [recboleta, setRecboleta] = useState(null)
    const [productos, setProductos] = useState(null)

    const navigate = useNavigate()

    useEffect(()=>{

        const pg = JSON.parse(localStorage.getItem("productosAdmin")) || []
        const ls = JSON.parse(localStorage.getItem("historial_boletas")) || []
        setLsBoletas(ls)

        var codigo = JSON.parse(localStorage.getItem("BOLETA_SELECTED"))
        
        const encontrarBoleta = ls.find(boleta => boleta.n_boleta == codigo)
        if (encontrarBoleta){setRecboleta(encontrarBoleta)}
        
        const prods = encontrarBoleta.productos_comprados
        const listp = []

        prods.forEach(p=>{
            pg.forEach(pg=>{
                if(pg.prod_codigo == p.codigo_producto){
                    const producto_info = {
                        nombre: pg.nombre,
                        cantidad: parseInt(p.cantidad_producto),
                        precio: parseInt(pg.precio)
                    }
                    
                    listp.push(producto_info)
                }
            })
        })
        setProductos(listp)
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
