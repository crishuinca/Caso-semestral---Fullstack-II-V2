import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function ConfirmacionModal({
  mostrarConfirmacion,
  datosCompra,
  onInputChange,
  onTipoEntregaChange,
  carrito,
  productosDisponibles,
  calcularTotal,
  onConfirmar,
  onCancelar,
  estilos, 
  btnpago,
  initialOptions, redirigir, redirigirFallo
}) {
  if (!mostrarConfirmacion) return null;

  return (
    <>
      <div style={estilos.overlay} onClick={onCancelar}></div>
      <div style={estilos.modalConfirmar}>
        <div className="row g-0" style={{ columnGap: '15px' }}>
          <div className="col-md-6 col-sm-12">
            <p>Nombre del comprador</p>
            <input
              type="text"
              name="nombre"
              value={datosCompra.nombre}
              onChange={onInputChange}
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
              onChange={onInputChange}
              placeholder=" RUT (con guión, ej: 12345678-9)"
              style={estilos.inputCarrito}
              className="form-control"
              required
            />
          </div>
        </div>

        <p>Tipo de pedido:</p>
        <div style={{ marginBottom: '15px' }}>
          <button
            style={{
              ...estilos.btnConfirmar,
              backgroundColor: datosCompra.tipoEntrega === 'retiro' ? '#8B4513' : '#FFC0CB',
              color: datosCompra.tipoEntrega === 'retiro' ? '#FFF5E1' : '#8B4513'
            }}
            onClick={() => onTipoEntregaChange('retiro')}
          >
            Retiro
          </button>
          <button
            style={{
              ...estilos.btnConfirmar,
              backgroundColor: datosCompra.tipoEntrega === 'despacho' ? '#8B4513' : '#FFC0CB',
              color: datosCompra.tipoEntrega === 'despacho' ? '#FFF5E1' : '#8B4513'
            }}
            onClick={() => onTipoEntregaChange('despacho')}
          >
            Despacho
          </button>
        </div>

        {datosCompra.tipoEntrega === 'despacho' && (
          <>
            <p>Dirección de despacho</p>
            <input
              type="text"
              name="direccion"
              value={datosCompra.direccion}
              onChange={onInputChange}
              placeholder="Ej: Av. Principal 123, Comuna"
              style={{
                ...estilos.inputCarrito
              }}
              className="form-control"
              required
            />
          </>
        )}

        <p>Fecha de entrega</p>
        <div className="row g-0" style={{ columnGap: '15px', marginBottom: '15px' }}>
          <div className="col-4">
            <label style={{ marginBottom: '5px', display: 'block' }}>Día:</label>
            <select
              name="dia"
              value={datosCompra.dia}
              onChange={onInputChange}
              style={estilos.inputCarrito}
              className="form-control"
              required
            >
              <option value="">Día</option>
              {Array.from({ length: 31 }, (_, i) => i + 1).map(dia => (
                <option key={dia} value={dia}>{dia}</option>
              ))}
            </select>
          </div>
          <div className="col-4">
            <label style={{ marginBottom: '5px', display: 'block' }}>Mes:</label>
            <select
              name="mes"
              value={datosCompra.mes}
              onChange={onInputChange}
              style={estilos.inputCarrito}
              className="form-control"
              required
            >
              <option value="">Mes</option>
              <option value="1">Enero</option>
              <option value="2">Febrero</option>
              <option value="3">Marzo</option>
              <option value="4">Abril</option>
              <option value="5">Mayo</option>
              <option value="6">Junio</option>
              <option value="7">Julio</option>
              <option value="8">Agosto</option>
              <option value="9">Septiembre</option>
              <option value="10">Octubre</option>
              <option value="11">Noviembre</option>
              <option value="12">Diciembre</option>
            </select>
          </div>
          <div className="col-4">
            <label style={{ marginBottom: '5px', display: 'block' }}>Año:</label>
            <select
              name="ano"
              value={datosCompra.ano}
              onChange={onInputChange}
              style={estilos.inputCarrito}
              className="form-control"
              required
            >
              <option value="">Año</option>
              {Array.from({ length: 10 }, (_, i) => 2025 + i).map(ano => (
                <option key={ano} value={ano}>{ano}</option>
              ))}
            </select>
          </div>
        </div>

        <strong>Productos a comprar:</strong>
        <div style={{ marginBottom: '15px' }}>
          {carrito.map((item, index) => {
            const producto = productosDisponibles.find(p => p.prod_codigo === item.codigo);
            const precio = item.precioEspecial !== null && item.precioEspecial !== undefined 
              ? item.precioEspecial 
              : producto?.precio;
            return (
              <div key={index}>
                {producto?.nombre} - Cantidad: {item.cantidad} - ${(precio * item.cantidad).toLocaleString()}
              </div>
            );
          })}
        </div>

        <strong>Total de la compra:</strong>
        <p>${calcularTotal().toLocaleString()}</p>

        <div>
          <button style={estilos.btnConfirmar} onClick={onConfirmar}>
            Confirmar
          </button>
          {btnpago && 
                
            <PayPalScriptProvider options={initialOptions}>
              <PayPalButtons
                style={{
                  layout: 'vertical', 
                  color: 'gold',   
                  shape: 'rect',    
                  label: 'pay', 
                  tagline: false     
                }}
                forceReRender={[carrito, calcularTotal()]} // opcional si necesitas forzar re-render
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: calcularTotal().toString(), // total como string
                        },
                      },
                    ],
                  });
                }}
                onCancel={(data) =>{
                  alert("Se ha cancelado el pago")
                  navigate("/carrito")
                }}
                onError={(error) => {
                  redirigirFallo(error)
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then((details) => {
                    redirigir(details)
                  }).catch((error) => {
                    redirigirFallo(error)
                  })
                }}
              />
            </PayPalScriptProvider>
          }
          <button style={estilos.btnConfirmar} onClick={onCancelar}>
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
}

export default ConfirmacionModal;