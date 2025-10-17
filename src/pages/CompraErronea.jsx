import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function CompraErronea(){

    const error = JSON.parse(localStorage.getItem("error_compra"))
    
    const navigate = useNavigate()
    function volver_al_carro(){
        navigate("/carrito")
    }

    return(
        <div className="w-100 h-100">
            <div className="p-5">
                <div>
                    <p>ERROR AL REALIZAR EL PAGO</p>
                    <p>No se pudo compeltar el pago:</p>
                    <p>{error}</p>
                    <button onClick={()=>volver_al_carro()}>Volver al carro</button>
                </div>
            </div>
        </div>
    )
}
export default CompraErronea