import React from 'react';

function CartItem({ item, producto, onCantidadChange, onMensajeChange, onEliminar }) {
  if (!producto) return null;

  return (
    <div className="card mb-3 tarjeta-producto-carrito">
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={producto.imagen}
            className="img-fluid rounded-start imagen-producto-carrito"
            alt={producto.nombre}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/200x200/D2691E/FFF?text=Producto';
            }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title titulo-producto-carrito">{producto.nombre}</h5>
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
                  onChange={(e) => onCantidadChange(item.codigo, e.target.value)}
                  className="form-control input-carrito"
                />
              </div>
              <div className="col-md-9">
                <label>Mensaje personalizado:</label>
                <input
                  type="text"
                  placeholder="Ej: Feliz cumpleaños..."
                  value={item.mensaje}
                  onChange={(e) => onMensajeChange(item.codigo, e.target.value)}
                  className="form-control input-carrito"
                />
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <span className="subtotal-producto">
                Subtotal: ${(producto.precio * item.cantidad).toLocaleString()}
              </span>
              <button onClick={() => onEliminar(item.codigo)} className="boton-eliminar">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
