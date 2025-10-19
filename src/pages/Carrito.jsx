import React, { useState } from 'react';
import { useCarrito } from '../context/CarritoContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Carrito.css';

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
    ano: '',
    tipoEntrega: 'retiro'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatosCompra(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
    if (!datosCompra.dia || !datosCompra.mes || !datosCompra.ano) {
      mostrarMensaje('Ingrese la fecha de entrega completa', 'error');
      return;
    }

    const pedido = {
      productos: carrito,
      total: calcularTotal(),
      cliente: datosCompra,
      fecha: new Date().toISOString()
    };

    console.log('Pedido confirmado:', pedido);
    mostrarMensaje('¡Pedido confirmado exitosamente!', 'ok');

    vaciarCarrito();
    setMostrarConfirmacion(false);
    setDatosCompra({
      nombre: '',
      rut: '',
      direccion: '',
      dia: '',
      mes: '',
      ano: '',
      tipoEntrega: 'retiro'
    });
  };

  const estilos = {
    body: {
      backgroundColor: '#FFF5E1',
      minHeight: '100vh',
      paddingTop: '300px',
      fontFamily: 'sans-serif',
      color: '#5D4037'
    },
    tituloCarrito: {
      color: '#5D4037',
      fontFamily: 'Pacifico',
      fontSize: '35px',
      marginTop: '3.5rem',
      marginBottom: '3.5rem',
      marginLeft: '2.1rem',
      marginRight: '2.1rem'
    },
    resumenCarro: {
      fontFamily: 'sans-serif',
      color: '#5D4037',
      border: '1px solid #ff2600a9',
      borderRadius: '5px',
      backgroundColor: '#ffefcf'
    },
    inputCarrito: {
      fontFamily: 'sans-serif',
      color: '#5D4037',
      backgroundColor: '#fff5e1',
      border: '1px solid #ff2600a9',
      marginBottom: '15px',
      borderRadius: '2px'
    },
    btnConfirmar: {
      backgroundColor: '#FFC0CB',
      color: '#8B4513',
      border: '1px solid #ff2600a9',
      borderRadius: '5px',
      padding: '10px 20px',
      margin: '5px',
      cursor: 'pointer',
      fontWeight: 'bold'
    },
    modalConfirmar: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 1050,
      border: '1px solid #ff2600a9',
      borderRadius: '5px',
      padding: '1.5rem',
      backgroundColor: '#ffefcf',
      fontFamily: 'sans-serif',
      color: '#5D4037',
      maxWidth: '780px',
      width: '100%'
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1040
    }
  };

  return (
    <div style={estilos.body}>
      <main>
        <p style={estilos.tituloCarrito}>Mi carrito de compras</p>
        
        <div className="row g-0 m-0">
          {}
          <div className="col-lg-7 col-md-12 col-sm-12">
            <div className="pb-4 pt-4 ps-4">
              {carrito.length === 0 ? (
                <div className="text-center p-5">
                  <h4 style={{ color: '#5D4037' }}>Tu carrito está vacío</h4>
                  <p>Agrega algunos productos deliciosos</p>
                </div>
              ) : (
                carrito.map((item, index) => {
                  const producto = productosDisponibles.find(p => p.prod_codigo === item.codigo);
                  if (!producto) return null;
                  
                  return (
                    <div key={index} className="card mb-3" style={{ border: '1px solid #ff2600a9' }}>
                      <div className="row g-0">
                        <div className="col-md-4">
                          <img 
                            src={producto.imagen} 
                            className="img-fluid rounded-start" 
                            alt={producto.nombre}
                            style={{ 
                              objectFit: 'cover', 
                              height: '200px', 
                              width: '100%' 
                            }}
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/200x200/D2691E/FFF?text=Producto';
                            }}
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title" style={{ color: '#5D4037' }}>
                              {producto.nombre}
                            </h5>
                            <p className="card-text">
                              <strong>Precio: ${producto.precio.toLocaleString()}</strong>
                            </p>
                            
                            <div className="row mb-2">
                              <div className="col-md-3">
                                <label>Cantidad:</label>
                                <input
                                  type="number"
                                  min="1"
                                  value={item.cantidad}
                                  onChange={(e) => actualizarCantidad(item.codigo, e.target.value)}
                                  style={estilos.inputCarrito}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-9">
                                <label>Mensaje personalizado:</label>
                                <input
                                  type="text"
                                  placeholder="Ej: Feliz cumpleaños..."
                                  value={item.mensaje}
                                  onChange={(e) => actualizarMensaje(item.codigo, e.target.value)}
                                  style={estilos.inputCarrito}
                                  className="form-control"
                                />
                              </div>
                            </div>
                            
                            <div className="d-flex justify-content-between align-items-center">
                              <span style={{ fontWeight: 'bold', color: '#5D4037' }}>
                                Subtotal: ${(producto.precio * item.cantidad).toLocaleString()}
                              </span>
                              <button
                                onClick={() => {
                                  console.log('Eliminando producto:', item.codigo);
                                  eliminarProducto(item.codigo);
                                }}
                                className="btn btn-danger btn-sm"
                              >
                                Eliminar
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {}
          <div className="col-lg-5 col-sm-12 pb-4 pt-4 ps-4 pe-4">
            <div style={estilos.resumenCarro} className="p-4">
              <h3>Resumen del carrito:</h3>
              
              <strong>Productos en el carrito:</strong>
              <div className="row" style={{ marginTop: '10px' }}>
                <div>
                  {carrito.map((item, index) => {
                    const producto = productosDisponibles.find(p => p.prod_codigo === item.codigo);
                    return (
                      <div key={index} style={{ marginBottom: '5px' }}>
                        {producto?.nombre} (x{item.cantidad})
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="row" style={{ marginTop: '10px' }}>
                <strong>Total productos:</strong>
                <p>{carrito.reduce((total, item) => total + item.cantidad, 0)}</p>
              </div>
              
              <div className="row" style={{ marginTop: '10px' }}>
                <strong>Total de la compra:</strong>
                <p>${calcularTotal().toLocaleString()}</p>
              </div>
              
              <button
                style={estilos.btnConfirmar}
                onClick={() => carrito.length > 0 && setMostrarConfirmacion(true)}
                disabled={carrito.length === 0}
              >
                Continuar
              </button>
              
              <button
                style={estilos.btnConfirmar}
                onClick={vaciarCarrito}
              >
                Vaciar carrito
              </button>
            </div>
          </div>
        </div>

        {}
        {mostrarConfirmacion && (
          <>
            <div style={estilos.overlay} onClick={() => setMostrarConfirmacion(false)}></div>
            <div style={estilos.modalConfirmar}>
              <div className="row g-0" style={{ columnGap: '15px' }}>
                <div className="col-md-6 col-sm-12">
                  <p>Nombre del comprador</p>
                  <input
                    type="text"
                    name="nombre"
                    value={datosCompra.nombre}
                    onChange={handleInputChange}
                    placeholder=" Nombre del destinatario"
                    style={estilos.inputCarrito}
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-md-6 col-sm-12">
                  <p>RUT del comprador</p>
                  <input
                    type="text"
                    name="rut"
                    value={datosCompra.rut}
                    onChange={handleInputChange}
                    placeholder=" RUT (con guión, ej: 12345678-9)"
                    style={estilos.inputCarrito}
                    className="form-control"
                    required
                  />
                </div>
              </div>

              <p>Dirección</p>
              <input
                type="text"
                name="direccion"
                value={datosCompra.direccion}
                onChange={handleInputChange}
                placeholder=" Dirección de despacho"
                style={{
                  ...estilos.inputCarrito,
                  backgroundColor: datosCompra.tipoEntrega === 'retiro' ? '#fff5e149' : '#fff5e1',
                  borderColor: datosCompra.tipoEntrega === 'retiro' ? '#ff260038' : '#ff2600a9'
                }}
                className="form-control"
                disabled={datosCompra.tipoEntrega === 'retiro'}
              />

              <p>Fecha de entrega</p>
              <div className="row g-0" style={{ columnGap: '15px' }}>
                <p className="col-3" style={{ marginBottom: '0' }}>Día:</p>
                <p className="col-3" style={{ marginBottom: '0' }}>Mes:</p>
                <p className="col-3" style={{ marginBottom: '0' }}>Año:</p>
                <input
                  type="number"
                  name="dia"
                  value={datosCompra.dia}
                  onChange={handleInputChange}
                  placeholder=" Día"
                  min="1"
                  max="31"
                  style={estilos.inputCarrito}
                  className="col-3 form-control"
                  required
                />
                <input
                  type="number"
                  name="mes"
                  value={datosCompra.mes}
                  onChange={handleInputChange}
                  placeholder=" Mes"
                  min="1"
                  max="12"
                  style={estilos.inputCarrito}
                  className="col-3 form-control"
                  required
                />
                <input
                  type="number"
                  name="ano"
                  value={datosCompra.ano}
                  onChange={handleInputChange}
                  placeholder=" Año"
                  min="2025"
                  style={estilos.inputCarrito}
                  className="col-3 form-control"
                  required
                />
              </div>

              <p>Tipo de pedido:</p>
              <div style={{ marginBottom: '15px' }}>
                <button
                  style={{
                    ...estilos.btnConfirmar,
                    backgroundColor: datosCompra.tipoEntrega === 'retiro' ? '#8B4513' : '#FFC0CB',
                    color: datosCompra.tipoEntrega === 'retiro' ? '#FFF5E1' : '#8B4513'
                  }}
                  onClick={() => setDatosCompra(prev => ({ ...prev, tipoEntrega: 'retiro' }))}
                >
                  Retiro
                </button>
                <button
                  style={{
                    ...estilos.btnConfirmar,
                    backgroundColor: datosCompra.tipoEntrega === 'despacho' ? '#8B4513' : '#FFC0CB',
                    color: datosCompra.tipoEntrega === 'despacho' ? '#FFF5E1' : '#8B4513'
                  }}
                  onClick={() => setDatosCompra(prev => ({ ...prev, tipoEntrega: 'despacho' }))}
                >
                  Despacho
                </button>
              </div>

              <strong>Productos a comprar:</strong>
              <div style={{ marginBottom: '15px' }}>
                {carrito.map((item, index) => {
                  const producto = productosDisponibles.find(p => p.prod_codigo === item.codigo);
                  return (
                    <div key={index}>
                      {producto?.nombre} - Cantidad: {item.cantidad} - ${(producto?.precio * item.cantidad).toLocaleString()}
                    </div>
                  );
                })}
              </div>

              <strong>Total de la compra:</strong>
              <p>${calcularTotal().toLocaleString()}</p>

              <div>
                <button style={estilos.btnConfirmar} onClick={confirmarPedido}>
                  Confirmar
                </button>
                <button 
                  style={estilos.btnConfirmar} 
                  onClick={() => setMostrarConfirmacion(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default Carrito;
