import { useEffect, useState } from "react"

function Boletas(){
    
    const [lista_boletas, setLista_boletas] = useState(null)

    useEffect(()=>{
        try {
            setLista_boletas(JSON.parse(localStorage.getItem("pedido_completado")))
        } catch (error) {
            
        }
    })

    return(
        <div>

        </div>
    )
}
export default Boletas