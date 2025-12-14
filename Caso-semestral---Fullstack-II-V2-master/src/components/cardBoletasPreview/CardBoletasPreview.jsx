import "../../styles/cssESCALONA.css"
function CardBoletasPreview({lsb,ver}){

    return(
        <>
        <div>
            <h4></h4>
            <div className="base_tarjeta">
                <strong>Numero de boleta:</strong>
                <p data-id={lsb.n_boleta}>{lsb.n_boleta}</p>
                <strong>Comprador:</strong>
                <p>{lsb.comprador.nombre_comprador}</p>
                <strong>Receptor del pedido:</strong>
                <p>{lsb.recibidor.nombre_recibidor}</p>
                <button className="btn-delineado-chocolate" onClick={ver}>Ver detalles</button>
            </div>
        </div>
        </>
    )
}
export default CardBoletasPreview