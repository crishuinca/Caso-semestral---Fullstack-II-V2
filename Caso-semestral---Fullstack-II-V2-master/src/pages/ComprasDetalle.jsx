import { useState,useEffect } from "react"
import "../styles/cssESCALONA.css"
import CardBoletas from "../components/cardBoletas/CardBoletas"
import { useNavigate } from "react-router-dom"

function ComprasDetalle(){

    const [comprasUsuario, setComprasUsuarios] = useState([])
    const [infoProds, setInfoProds] = useState([])

    const navigate = useNavigate()

    useEffect(()=>{
        let listaCompras = JSON.parse(localStorage.getItem("compras_usuario"))
        setComprasUsuarios(listaCompras)

        const pg = JSON.parse(localStorage.getItem("productosAdmin")) || []
        const ls = JSON.parse(localStorage.getItem("historial_boletas")) || []

        const listp = []


        listaCompras.forEach(lsc=>{
            lsc.productos_comprados.forEach(p=>{
                pg.forEach(pg=>{
                    if(pg.prod_codigo == p.codigo_producto){
                        const producto_info = {
                            nombre: pg.nombre,
                            cantidad: parseInt(p.cantidad_producto),
                            precio: parseInt(pg.precio)
                        }
                        console.log("PRODUCTOS COMPRADOS")
                        console.log(p)
                        console.log("PRODUCTOS SISTEMA")
                        console.log(pg)
                        console.log("LISTA DE COMPRAS")
                        console.log(lsc)
                        
                        listp.push(producto_info)
                    }
                })
            })
        })
        setInfoProds(listp)

    },[])

    return(
        <>
        <h3 className="ps-5 pt-5 pb-3">Historial de compras</h3>
        <div className="row g-0">
            <div className="col-sm-12 col-md-6 col-lg-4">
                {
                    comprasUsuario.map((cu,i)=>(
                        <div key={i}>
                            <CardBoletas
                            brp={cu}
                            prods={infoProds}
                            style={""}
                            regresar={() => navigate("/admin/historial-compras")}/>
                        </div>
                    ))
                }
            </div>
        </div>
        </>
    )
}
export default ComprasDetalle