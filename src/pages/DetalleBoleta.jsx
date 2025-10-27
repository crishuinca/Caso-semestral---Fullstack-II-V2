import { useEffect, useState } from "react"
import CardBoletas from "../components/CardBoletas"
import 'bootstrap/dist/css/bootstrap.min.css'

import "../styles/cssESCALONA.css"
import { useNavigate } from "react-router-dom"

function DetalleBoleta(){

    const [lsBoletas, setLsBoletas] = useState([])
    const [recboleta, setRecboleta] = useState(null)
    const [productos, setProductos] = useState(null)
    const [estilo, setEstilo] = useState("")

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

        var est = " row g-0"
        
        prods.forEach(p=>{
            pg.forEach(pg=>{
                if(pg.prod_codigo == p.codigo_producto){
                    const producto_info = {
                        nombre: pg.nombre,
                        cantidad: parseInt(p.cantidad_producto),
                        precio: parseInt(pg.precio)
                    }
                    if(est == "fondo row g-0"){est = " row g-0"}else{est = "fondo row g-0"}
                    setEstilo(est)
                    listp.push(producto_info)
                }
            })
        })
        setProductos(listp)
    },[])

    return(
        <div>
        {recboleta ? (
            <CardBoletas 
            brp={recboleta}
            prods={productos}
            style={estilo}
            regresar={() => navigate("/admin/boletas")}/>
        ) : (
            <p>No se encontró la boleta seleccionada</p>
        )}
        </div>
    )
}
export default DetalleBoleta
