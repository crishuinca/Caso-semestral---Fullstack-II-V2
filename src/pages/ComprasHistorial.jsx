import { useState, useEffect } from "react"
import "../styles/cssESCALONA.css"
import { useNavigate } from "react-router-dom"

function ComprasHistorial(usuario){

    const [usuarios, setUsuarios] = useState([])
    const [boletas,  setBoletas]  = useState([])

    const navigate = useNavigate()

    const volverInicio = ()=>{
        navigate("/admin")
    }

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
        <>
        <h3 className="ms-5 mt-5">Usuarios y sus compras realizadas</h3>
        <div>
            {
                usuarios.map((u,i)=>(
                    <div className="base_tarjeta" key={i}>

                        <strong>Usuario: </strong>
                        <div className="fondo">
                            <p>{u.nombre}</p>
                        </div>

                        <strong>Compras realizadas: </strong>
                        <div className="fondo">
                            <p>x{i+1}</p>
                        </div>

                        <button className="btn-delineado-chocolate mb-2" value={u.run} onClick={()=>ver(u.run)}>Ver compras</button>
                    </div>
                ))
            }
        </div>
        <button className="btn-cambio-frutilla margin-btn" onClick={volverInicio}>Volver al panel</button>
        </>
    )
}
export default ComprasHistorial