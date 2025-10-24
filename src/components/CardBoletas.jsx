import "../styles/cssESCALONA.css"

function CardBoletas(boleta){
    return(
        <div className="base_tarjeta">
            <strong>BOLETA N°-{boleta.n_boleta}</strong>
        </div>
    )
}
export default CardBoletas