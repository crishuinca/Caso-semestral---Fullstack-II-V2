import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function ConfirmacionModal({
  visible,
  onClose,
  onConfirm,
  datosCompra,
  onInputChange,
  setTipoEntrega,
  carrito,
  productosDisponibles,
  total,
  paypalOptions
}) {
  if (!visible) return null;

  return (
    <>
      <div className="overlay-modal" onClick={onClose}></div>
      <div className="div_confirmacion_pago modal-confirmacion">
        <div className="row g-0 columna-gap-15">
          <div className="col-md-6 col-sm-12">
            <p>Nombre del comprador</p>
            <input
              type="text"
              name="nombre"
              value={datosCompra.nombre}
              onChange={onInputChange}
              placeholder=" Nombre del destinatario"
              className="form-control input-carrito"
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
              className="form-control input-carrito"
              required
            />
          </div>
        </div>

        <p>Dirección</p>
        <input
          type="text"
          name="direccion"
          value={datosCompra.direccion}
          onChange={onInputChange}
          placeholder=" Dirección de despacho"
          className={`form-control input-carrito ${datosCompra.tipoEntrega === 'retiro' ? 'input-carrito-deshabilitado' : ''}`}
          disabled={datosCompra.tipoEntrega === 'retiro'}
        />

        <p>Fecha de entrega</p>
        <div className="row g-0 columna-gap-15">
          <p className="col-3" style={{ marginBottom: '0' }}>Día:</p>
          <p className="col-3" style={{ marginBottom: '0' }}>Mes:</p>
          <p className="col-3" style={{ marginBottom: '0' }}>Año:</p>
          <input
            type="number"
            name="dia"
            value={datosCompra.dia}
            onChange={onInputChange}
            placeholder=" Día"
            min="1"
            max="31"
            className="col-3 form-control input-carrito"
            required
          />
          <input
            type="number"
            name="mes"
            value={datosCompra.mes}
            onChange={onInputChange}
            placeholder=" Mes"
            min="1"
            max="12"
            className="col-3 form-control input-carrito"
            required
          />
          <input
            type="number"
            name="anios"
            value={datosCompra.anios}
            onChange={onInputChange}
            placeholder=" Año"
            min="2025"
            className="col-3 form-control input-carrito"
            required
          />
        </div>

        <p>Tipo de pedido:</p>
        <div className="margen-inferior-15">
          <button
            className={`boton-confirmar ${datosCompra.tipoEntrega === 'retiro' ? 'boton-tipo-entrega-activo' : ''}`}
            onClick={() => setTipoEntrega('retiro')}
          >
            Retiro
          </button>
          <button
            className={`boton-confirmar ${datosCompra.tipoEntrega === 'despacho' ? 'boton-tipo-entrega-activo' : ''}`}
            onClick={() => setTipoEntrega('despacho')}
          >
            Despacho
          </button>
        </div>

        <strong>Productos a comprar:</strong>
        <div className="margen-inferior-15">
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
        <p>${total.toLocaleString()}</p>

        <div>
          <button className="boton-confirmar" onClick={onConfirm}>
            Confirmar
          </button>

          <PayPalScriptProvider options={paypalOptions}>
            <PayPalButtons
              style={{
                layout: 'vertical',
                color: 'gold',
                shape: 'rect',
                label: 'pay',
                tagline: false
              }}
              forceReRender={[carrito, total]}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: { value: total.toString() }
                    }
                  ]
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then(() => {
                  alert('Pago completado');
                  onConfirm();
                });
              }}
            />
          </PayPalScriptProvider>

          <button className="boton-confirmar" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
}

export default ConfirmacionModal;
