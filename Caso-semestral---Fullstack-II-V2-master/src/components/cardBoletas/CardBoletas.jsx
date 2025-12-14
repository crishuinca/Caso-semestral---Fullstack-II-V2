import "../../styles/cssESCALONA.css"
import 'bootstrap/dist/css/bootstrap.min.css'

function CardBoletas({brp, prods, regresar}){
    const fecha_compra_f = new Date(brp.db_fecha_compra)
    var ano = fecha_compra_f.getFullYear() 
    var mes = fecha_compra_f.getMonth()+1  
    var dia = fecha_compra_f.getDate()     

    var total = 0
    prods.forEach(p=>{
        total += p.cantidad * p.precio
    })
    return(
        <>
        <div className="base_tarjeta blt-tarjeta">
            <div className="blt-bordes">
                <div className="blt-bordes mt-1 mb-1 p-2 blt-jst">
                    <strong>BOLETA N° - {brp.db_id_boleta}</strong>
                </div>
            </div>
            <div className="p-2">
                <div className="blt-jst mb-2 mt-1">
                    <strong>Pasteleria mil sabores</strong>
                </div>
                <div className="row g-0">
                    <strong className="mb-1 col-6">Direccion despacho:</strong>
                    <p className="mb-1 col-6 blt-mandar-end">{brp.db_direccion_despacho}</p>
                </div>
                <div className="row g-0">
                    <strong className="mb-1 col-6">Fecha de compra:</strong>
                    <p className="mb-1 col-6 blt-mandar-end">{ano}-{mes}-{dia}</p>
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
                            <div key={i} className="row g-0">
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
        { regresar?(
            <button className="margen-btn btn-cambio-chocolate" onClick={regresar}>Regresar</button>
        ):(
            <p></p>
        )}
        </>
    )
}
export default CardBoletas