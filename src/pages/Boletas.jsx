import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import CardBoletasPreview from "../components/CardBoletasPreview"
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
        try {
            setLista_boletas(JSON.parse(localStorage.getItem("historial_boletas")))
        } catch (error) {
            
        }
        
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