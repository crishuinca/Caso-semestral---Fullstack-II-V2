import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Boletas(){
    
    const [lista_boletas, setLista_boletas] = useState(null)
    const navigate = useNavigate()

    const volverInicio = ()=>{
        navigate("/admin")
    }

    useEffect(()=>{
        try {
            setLista_boletas(JSON.parse(localStorage.getItem("historial_boletas")))
        } catch (error) {
            
        }
        
    })

    return(
        <div>
            <button onClick={volverInicio}>Volver</button>
        </div>
    )
}
export default Boletas