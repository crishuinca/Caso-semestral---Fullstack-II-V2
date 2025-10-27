import { useState, useEffect } from "react"
import "../styles/cssESCALONA.css"
import { useNavigate } from "react-router-dom"

function ComprasHistorial(usuario){

    const [usuarios, setUsuarios] = useState([])
    const [boletas,  setBoletas]  = useState([])

    const navigate = useNavigate()

    const ver = (r)=>{
        console.log("RUN = "+r)
        let lista = []
        usuarios.forEach(us => {
            if(us.run == r){
                boletas.forEach(bs =>{
                    if(bs.comprador.rut_comprador == us.run){
                        lista.push(bs)
                    }
                })
            }
        })
        localStorage.setItem("compras_usuario", JSON.stringify(lista))
        navigate("/admin/historial-compras/detalle-compra")
    }
    useEffect(()=>{
        
        let usuarios_s = JSON.parse(localStorage.getItem("usuarios")) || []
        let boletas_s = JSON.parse(localStorage.getItem("historial_boletas")) || []

        setUsuarios(usuarios_s)
        setBoletas(boletas_s)

    },[])

    return(
        <div className="base_tarjeta">
            {
                usuarios.map((u,i)=>(
                    <div key={i}>
                        <p>{u.nombre}</p>
                        <button value={u.run} onClick={()=>ver(u.run)}>Ver compras</button>
                    </div>
                ))
            }
            <strong>Usuraio:</strong>
            <p></p>
        </div>
    )
}
export default ComprasHistorial