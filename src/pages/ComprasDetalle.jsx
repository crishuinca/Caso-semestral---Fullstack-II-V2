import { useState,useEffect } from "react"
import "../styles/cssESCALONA.css"

function ComprasDetalle(){

    const [comprasUsuario, setComprasUsuarios] = useState([])
    setComprasUsuarios(JSON.parse(localStorage.getItem("compras_usuario")))

    return(
        <div className="base_tarjeta">
            <p>HISTORIAL COMPRAS</p>
            {
                map.comprasUsuario(cu=>(
                    <p>{cu.n_boleta}</p>
                ))
            }
        </div>
    )
}
export default ComprasDetalle