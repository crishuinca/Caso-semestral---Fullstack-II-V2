import React from 'react';

function CartItem({ item, producto, onCantidadChange, onMensajeChange, onEliminar, estilos }) {
  if (!producto) return null;

  // Usar precio especial si existe, si no usar el precio del producto
  const precio = item.precioEspecial !== null && item.precioEspecial !== undefined 
    ? item.precioEspecial 
    : producto.precio;

  return (
    <div className="card mb-3" style={{ border: '1px solid #ff2600a9' }}>
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
              <strong>Precio: ${precio.toLocaleString()}</strong>
              {item.precioEspecial && (
                <span style={{ 
                  marginLeft: '10px', 
                  color: '#dc3545', 
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}>
                  🎁 OFERTA
                </span>
              )}
            </p>
            
            <div className="row mb-2">
              <div className="col-md-3">
                <label>Cantidad:</label>
                <input
                  type="number"
                  min="1"
                  value={item.cantidad}
                  onChange={(e) => onCantidadChange(item.codigo, e.target.value)}
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
                  onChange={(e) => onMensajeChange(item.codigo, e.target.value)}
                  style={estilos.inputCarrito}
                  className="form-control"
                />
              </div>
            </div>
            
            <div className="d-flex justify-content-between align-items-center">
              <span style={{ fontWeight: 'bold', color: '#5D4037' }}>
                Subtotal: ${(precio * item.cantidad).toLocaleString()}
              </span>
              <button
                onClick={() => {
                  console.log('Eliminando producto:', item.codigo);
                  onEliminar(item.codigo);
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
}

export default CartItem;