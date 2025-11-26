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
  initialOptions, redirigir, redirigirFallo,
  actualizar_el_stock
}) {
  if (!mostrarConfirmacion) return null;

  // Función para obtener la fecha actual
  const obtenerFechaActual = () => {
    const hoy = new Date();
    return {
      dia: hoy.getDate(),
      mes: hoy.getMonth() + 1, // Los meses van de 0-11
      ano: hoy.getFullYear()
    };
  };

  // Función para verificar si una fecha es válida (no pasada)
  const esFechaValida = (dia, mes, ano) => {
    const fechaActual = obtenerFechaActual();
    const fechaSeleccionada = new Date(ano, mes - 1, dia);
    const fechaHoy = new Date(fechaActual.ano, fechaActual.mes - 1, fechaActual.dia);
    
    return fechaSeleccionada >= fechaHoy;
  };

  // Función para obtener días válidos según el mes y año seleccionados
  const obtenerDiasValidos = () => {
    const fechaActual = obtenerFechaActual();
    const mesSeleccionado = parseInt(datosCompra.mes);
    const anoSeleccionado = parseInt(datosCompra.ano);
    
    if (!mesSeleccionado || !anoSeleccionado) {
      return Array.from({ length: 31 }, (_, i) => i + 1);
    }

    // Si es el mes y año actual, solo mostrar días desde hoy en adelante
    if (mesSeleccionado === fechaActual.mes && anoSeleccionado === fechaActual.ano) {
      return Array.from({ length: 31 - fechaActual.dia + 1 }, (_, i) => fechaActual.dia + i);
    }

    // Para otros meses/años, mostrar todos los días
    const diasEnMes = new Date(anoSeleccionado, mesSeleccionado, 0).getDate();
    return Array.from({ length: diasEnMes }, (_, i) => i + 1);
  };

  // Función para obtener meses válidos según el año seleccionado
  const obtenerMesesValidos = () => {
    const fechaActual = obtenerFechaActual();
    const anoSeleccionado = parseInt(datosCompra.ano);
    
    if (!anoSeleccionado) {
      return Array.from({ length: 12 }, (_, i) => i + 1);
    }

    // Si es el año actual, solo mostrar meses desde el actual en adelante
    if (anoSeleccionado === fechaActual.ano) {
      return Array.from({ length: 12 - fechaActual.mes + 1 }, (_, i) => fechaActual.mes + i);
    }

    // Para otros años, mostrar todos los meses
    return Array.from({ length: 12 }, (_, i) => i + 1);
  };

  // Función para obtener años válidos (desde el actual)
  const obtenerAnosValidos = () => {
    const fechaActual = obtenerFechaActual();
    return Array.from({ length: 10 }, (_, i) => fechaActual.ano + i);
  };

  const nombresMeses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

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
              placeholder="RUT (ej: 12345678-9)"
              style={estilos.inputCarrito}
              className="form-control"
              maxLength="10"
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
        <small style={{ color: '#8B4513', fontStyle: 'italic', marginBottom: '10px', display: 'block' }}>
          ⚠️ No se pueden seleccionar fechas pasadas
        </small>
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
              {obtenerDiasValidos().map(dia => (
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
              {obtenerMesesValidos().map(mes => (
                <option key={mes} value={mes}>{nombresMeses[mes - 1]}</option>
              ))}
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
              {obtenerAnosValidos().map(ano => (
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
                    actualizar_el_stock()
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