import { useEffect, useState } from "react"
import CardBoletas from "../components/CardBoletas"

import "../styles/cssESCALONA.css"

function DetalleBoleta(){

    const [lsBoletas, setLsBoletas] = useState([])
    const [codigo, setCodigo] = useState([])
    const [recboleta, setRecboleta] = useState([])

    useEffect(()=>{
        setLsBoletas(JSON.parse(localStorage.getItem("historial_boletas")))
        setCodigo(JSON.parse(localStorage.getItem("BOLETA_SELECTED")))
        lsBoletas.forEach(boleta=>{
            if(boleta.n_boleta == String(codigo)){
                console.log(boleta)
                setRecboleta(boleta)
            }
        })
    },[])

    return(
        <div>
        {
            <CardBoletas
            boleta={recboleta.n_boleta}/>
        }
        </div>
    )
}
export default DetalleBoleta