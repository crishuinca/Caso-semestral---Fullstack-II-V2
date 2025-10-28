import React, { useState } from 'react';
import { useCarrito } from '../context/CarritoContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Carrito.css';
import CartItem from '../components/carrito/CartItem';
import CarritoResumen from '../components/carrito/CarritoResumen';
import ConfirmacionModal from '../components/carrito/ConfirmacionModal';

function Carrito() {
  const {
    carrito,
    productosDisponibles,
    eliminarProducto,
    actualizarCantidad,
    actualizarMensaje,
    vaciarCarrito,
    calcularTotal,
    mostrarMensaje
  } = useCarrito();
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [datosCompra, setDatosCompra] = useState({
    nombre: '',
    rut: '',
    direccion: '',
    dia: '',
    mes: '',
    anios: '',
    tipoEntrega: 'retiro'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatosCompra(prev => ({
      ...prev,
      [name]: value
    }));
  };

  var btn_pa_pagar = false
  const confirmarPedido = () => {
    
    if (!datosCompra.nombre.trim()) {
      mostrarMensaje('Ingrese el nombre del comprador', 'error');
      return;
    }
    if (!datosCompra.rut.trim()) {
      mostrarMensaje('Ingrese el RUT del comprador', 'error');
      return;
    }
    if (datosCompra.tipoEntrega === 'despacho' && !datosCompra.direccion.trim()) {
      mostrarMensaje('Ingrese la dirección de despacho', 'error');
      return;
    }
    if (!datosCompra.dia || !datosCompra.mes || !datosCompra.anios) {
      mostrarMensaje('Ingrese la fecha de entrega completa', 'error');
      return;
    }

    btn_pa_pagar = true
    
    const pedido = {
      productos: carrito,
      total: calcularTotal(),
      cliente: datosCompra,
      fecha: new Date().toISOString()
    };

    mostrarMensaje('Pedido confirmado', 'exito');
    setMostrarConfirmacion(false);
  };

  const initialOptions = {
        clientId: "AR36SqRE30K24Cv_7MIVRq0qBamsHC1vhgU_hiXCwRNoGehpT1hzCrSTgTjWEgNFFssFeZr4SlkqlFYN",
        currency: "USD",
        intent: "capture",
        style: ""
    };

  return (
    <div className="cuerpo-carrito">
      <main>
        <p className="titulo-carrito">Mi carrito de compras</p>
        
        <div className="row g-0 m-0">
          {}
          <div className="col-lg-7 col-md-12 col-sm-12">
            <div className="pb-4 pt-4 ps-4">
              {carrito.length === 0 ? (
                <div className="carrito-vacio">
                  <h4>Tu carrito está vacío</h4>
                  <p>Agrega algunos productos deliciosos</p>
                </div>
              ) : (
                carrito.map((item, index) => {
                  const producto = productosDisponibles.find(p => p.prod_codigo === item.codigo);
                  return (
                    <CartItem
                      key={index}
                      item={item}
                      producto={producto}
                      onCantidadChange={actualizarCantidad}
                      onMensajeChange={actualizarMensaje}
                      onEliminar={eliminarProducto}
                    />
                  );
                })
              )}
            </div>
          </div>

          {}
          <div className="col-lg-5 col-sm-12 pb-4 pt-4 ps-4 pe-4">
            <CarritoResumen
              carrito={carrito}
              productosDisponibles={productosDisponibles}
              total={calcularTotal()}
              onContinuar={() => carrito.length > 0 && setMostrarConfirmacion(true)}
              onVaciar={vaciarCarrito}
            />
          </div>
        </div>

        {}
        <ConfirmacionModal
          visible={mostrarConfirmacion}
          onClose={() => setMostrarConfirmacion(false)}
          onConfirm={confirmarPedido}
          datosCompra={datosCompra}
          onInputChange={handleInputChange}
          setTipoEntrega={(tipo) => setDatosCompra(prev => ({ ...prev, tipoEntrega: tipo }))}
          carrito={carrito}
          productosDisponibles={productosDisponibles}
          total={calcularTotal()}
          paypalOptions={initialOptions}
        />
      </main>
    </div>
  );
}

export default Carrito;
