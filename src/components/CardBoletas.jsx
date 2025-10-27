import "../styles/cssESCALONA.css"
import 'bootstrap/dist/css/bootstrap.min.css'

function CardBoletas({brp, prods, style, regresar}){
    let [ano,mes,dia] = brp.comprador.fecha_compra.split("-")
    var ndia = dia.substring(0,2)
    var total = 0
    prods.forEach(p=>{
        total += p.cantidad * p.precio
    })
    return(
        <>
        <div className="base_tarjeta blt-tarjeta">
            <div className="blt-bordes">
                <div className="blt-bordes mt-1 mb-1 p-2 blt-jst">
                    <strong>BOLETA N° - {brp.n_boleta}</strong>
                </div>
            </div>
            <div className="p-2">
                <div className="blt-jst mb-2 mt-1">
                    <strong>Pasteleria mil sabores</strong>
                </div>
                <div className="row g-0">
                    <strong className="mb-1 col-6">Direccion despacho:</strong>
                    <p className="mb-1 col-6 blt-mandar-end">{brp.recibidor.direccion_recibidor}</p>
                </div>
                <div className="row g-0">
                    <strong className="mb-1 col-6">Fecha de compra:</strong>
                    <p className="mb-1 col-6 blt-mandar-end">{ano}-{mes}-{ndia}</p>
                </div>
            </div>
            <div className="blt-bordes pt-3 pb-2">
                <div className="row g-0">
                    <strong className="col-6">Nombre</strong>
                    <strong className="col-2 blt-mandar-end">Unids</strong>
                    <strong className="col-4 blt-mandar-end">Precio</strong>
                </div>
                <div>
                    {
                        prods.map((p,i)=>(
                            <div key={i} className={style}>
                                <p className="mb-1 col-6">{p.nombre}</p>
                                <p className="mb-1 col-2 blt-mandar-end">x{p.cantidad}</p>
                                <p className="mb-1 col-4 blt-mandar-end">${p.cantidad * p.precio}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="blt-espaciado mt-3">
                <div className="row g-0 fondo">
                    <strong className="mb-0 col-6">TOTAL</strong>
                    <p className="mb-0 col-6 blt-mandar-end">${total}</p>
                </div>
            </div>
        </div>
        <button className="margen-btn btn-cambio-chocolate" onClick={regresar}>Regresar al panel</button>
        </>
    )
}
export default CardBoletas