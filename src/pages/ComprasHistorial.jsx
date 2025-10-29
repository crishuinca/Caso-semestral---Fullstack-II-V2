import { useState, useEffect } from "react"
import "../styles/cssESCALONA.css"
import { useNavigate } from "react-router-dom"

function ComprasHistorial() {

    const [boletas, setBoletas] = useState([])
    const [compradores, setCompradores] = useState([])
    const [tieneSinCuenta, setTieneSinCuenta] = useState(false)

    const navigate = useNavigate()

    const volverInicio = () => {
        navigate("/admin")
    }

    const ver = (rut) => {
        const lista = boletas.filter(b => b.comprador.rut_comprador === rut)
        localStorage.setItem("compras_usuario", JSON.stringify(lista))
        navigate("/admin/historial-compras/detalle-compra")
    }

    const verSinCuentas = () => {
        const listaSinCuenta = boletas.filter(b =>
            !b.comprador.rut_comprador ||
            b.comprador.rut_comprador === "USUARIO NO REGISTRADO"
        )
        localStorage.setItem("compras_usuario", JSON.stringify(listaSinCuenta))
        navigate("/admin/historial-compras/detalle-compra")
    }

    useEffect(() => {
        const boletas_s = JSON.parse(localStorage.getItem("historial_boletas")) || []
        setBoletas(boletas_s)
        const mapa = new Map()

        boletas_s.forEach(b => {
            const rut = b.comprador?.rut_comprador
            const nombre = b.comprador?.nombre_comprador

            if (rut && rut !== "USUARIO NO REGISTRADO") {
                if (!mapa.has(rut)) {
                    mapa.set(rut, nombre || "Sin nombre registrado")
                }
            }
        })

        const compradoresUnicos = Array.from(mapa, ([rut, nombre]) => ({ rut, nombre }))
        setCompradores(compradoresUnicos)

        const haySinCuenta = boletas_s.some(b =>
            !b.comprador.rut_comprador ||
            b.comprador.rut_comprador === "USUARIO NO REGISTRADO"
        )
        setTieneSinCuenta(haySinCuenta)

    }, [])

    return (
        <>
            <h3 className="ms-5 mt-5">Historial de compras por usuario</h3>

            <div>

                {compradores.length > 0 ? (
                    compradores.map((c, i) => (
                        <div className="base_tarjeta" key={i}>
                            <strong>RUT comprador:</strong>
                            <div className="fondo">
                                <p>{c.rut}</p>
                            </div>
                            <strong>Nombre:</strong>
                            <div className="fondo">
                                <p>{c.nombre}</p>
                            </div>
                            <button
                                className="btn-delineado-chocolate mb-2"
                                onClick={() => ver(c.rut)}
                            >
                                Ver compras
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="ms-5">No hay compras registradas con cuenta.</p>
                )}

                {tieneSinCuenta && (
                    <div className="base_tarjeta">
                        <strong>Compras de usuarios sin cuenta</strong>
                        <button
                            className="btn-delineado-chocolate"
                            onClick={verSinCuentas}
                        >
                            Ver compras sin cuenta
                        </button>
                    </div>
                )}
            </div>

            <button
                className="btn-cambio-frutilla margin-btn"
                onClick={volverInicio}
            >
                Volver al panel
            </button>
        </>
    )
}

export default ComprasHistorial