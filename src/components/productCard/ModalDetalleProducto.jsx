import React from 'react';
import { useCarrito } from '../../context/CarritoContext';
import { useEffect, useState } from 'react';
import './ModalDetalleProducto.css';

function ModalDetalleProducto({ producto, isOpen, onClose }) {
  const { agregarProducto } = useCarrito();
  const [stockActual, setStockActual] = useState(producto?.prod_stock || producto?.stock || 0);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    if (producto) {
      const actualizarStock = () => {
        const productosStock = JSON.parse(localStorage.getItem('productosStock')) || [];
        const codigo = producto.prod_codigo || producto.codigo;
        const productoActualizado = productosStock.find(p => 
          p.prod_codigo === codigo || p.codigo === codigo
        );
        if (productoActualizado) {
          setStockActual(productoActualizado.stock);
        } else {
          // Si no está en localStorage, usar el stock del producto
          setStockActual(producto.prod_stock || producto.stock || 0);
        }
      };

      actualizarStock();
      window.addEventListener('productosActualizados', actualizarStock);
      
      return () => {
        window.removeEventListener('productosActualizados', actualizarStock);
      };
    }
  }, [producto]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !producto) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(price);
  };

  const sinStock = stockActual === 0;
  const stockCritico = stockActual > 0 && stockActual <= 5;
  const precio = producto.prod_precio || producto.precio || 0;
  const precioOferta = producto.prod_precio_oferta || producto.precioEspecial || null;
  const descuento = precioOferta 
    ? Math.round(((precio - precioOferta) / precio) * 100)
    : 0;

  const handleAddToCart = () => {
    const codigo = producto.prod_codigo || producto.codigo;
    const precioOfertaFinal = precioOferta;
    for (let i = 0; i < cantidad; i++) {
      agregarProducto(codigo, 1, '', precioOfertaFinal);
    }
    onClose();
  };

  const handleCantidadChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    const maxCantidad = Math.min(stockActual, 10);
    setCantidad(Math.max(1, Math.min(value, maxCantidad)));
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-detalle-overlay" onClick={handleBackdropClick}>
      <div className="modal-detalle-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-detalle-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>

        <div className="modal-detalle-content">
          {/* Imagen del producto */}
          <div className="modal-detalle-image-container">
            <img 
              src={producto.prod_imagen || producto.imagen || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect width="400" height="400" fill="%23D2691E"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="%23FFF"%3EProducto%3C/text%3E%3C/svg%3E'} 
              alt={producto.prod_nombre || producto.nombre}
              className={`modal-detalle-image ${sinStock ? 'opacity-50' : ''}`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect width="400" height="400" fill="%23D2691E"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="%23FFF"%3EProducto%3C/text%3E%3C/svg%3E';
              }}
            />
            {sinStock && (
              <div className="modal-detalle-badge-sinstock">
                <span>Sin Stock</span>
              </div>
            )}
            {stockCritico && !sinStock && (
              <div className="modal-detalle-badge-critico">
                <i className="fas fa-exclamation-triangle me-1"></i>
                Últimas unidades
              </div>
            )}
            {precioOferta && (
              <div className="modal-detalle-badge-oferta">
                -{descuento}% OFF
              </div>
            )}
          </div>

          {/* Información del producto */}
          <div className="modal-detalle-info">
            <div className="modal-detalle-header">
              <h2 className="modal-detalle-title">{producto.prod_nombre || producto.nombre}</h2>
              <span className="modal-detalle-categoria">{producto.prod_categoria || producto.categoria}</span>
            </div>

            <div className="modal-detalle-description">
              <h3 className="modal-detalle-subtitle">Descripción</h3>
              <p>{producto.prod_desc || producto.descripcion || 'Sin descripción disponible'}</p>
            </div>

            <div className="modal-detalle-details">
              <div className="modal-detalle-detail-item">
                <i className="fas fa-barcode"></i>
                <span><strong>Código:</strong> {producto.prod_codigo || producto.codigo}</span>
              </div>
              <div className="modal-detalle-detail-item">
                <i className="fas fa-box"></i>
                <span>
                  <strong>Stock disponible:</strong>{' '}
                  <span className={sinStock ? 'text-danger' : stockCritico ? 'text-warning' : 'text-success'}>
                    {sinStock ? 'Sin stock' : `${stockActual} unidades`}
                  </span>
                </span>
              </div>
              {stockCritico && !sinStock && (
                <div className="modal-detalle-alert">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  ¡Solo quedan {stockActual} unidades disponibles!
                </div>
              )}
            </div>

            {/* Precio */}
            <div className="modal-detalle-precio-container">
              {precioOferta ? (
                <div className="modal-detalle-precio-oferta">
                  <div className="precio-antes">
                    <span>Precio regular:</span>
                    <span className="precio-tachado">{formatPrice(precio)}</span>
                  </div>
                  <div className="precio-ahora">
                    <span>Precio especial:</span>
                    <span className="precio-destacado">{formatPrice(precioOferta)}</span>
                  </div>
                  <div className="precio-ahorro">
                    <i className="fas fa-piggy-bank me-1"></i>
                    Ahorras {formatPrice(precio - precioOferta)}
                  </div>
                </div>
              ) : (
                <div className="modal-detalle-precio-normal">
                  <span>Precio:</span>
                  <span className="precio-destacado">{formatPrice(precio)}</span>
                </div>
              )}
            </div>

            {/* Cantidad y botón */}
            {!sinStock && (
              <div className="modal-detalle-actions">
                <div className="modal-detalle-cantidad">
                  <label htmlFor="cantidad-detalle">
                    <i className="fas fa-shopping-cart me-2"></i>
                    Cantidad:
                  </label>
                  <div className="cantidad-controls">
                    <button 
                      className="cantidad-btn"
                      onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                      disabled={cantidad <= 1}
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                    <input
                      id="cantidad-detalle"
                      type="number"
                      min="1"
                      max={Math.min(stockActual, 10)}
                      value={cantidad}
                      onChange={handleCantidadChange}
                      className="cantidad-input"
                    />
                    <button 
                      className="cantidad-btn"
                      onClick={() => setCantidad(Math.min(Math.min(stockActual, 10), cantidad + 1))}
                      disabled={cantidad >= Math.min(stockActual, 10)}
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                  <span className="cantidad-max">(Máx: {Math.min(stockActual, 10)})</span>
                </div>

                <button 
                  className="modal-detalle-btn-agregar"
                  onClick={handleAddToCart}
                >
                  <i className="fas fa-cart-plus me-2"></i>
                  Agregar {cantidad > 1 ? `${cantidad} unidades` : 'al carrito'}
                </button>
              </div>
            )}

            {sinStock && (
              <div className="modal-detalle-sinstock">
                <i className="fas fa-times-circle me-2"></i>
                Este producto no está disponible en este momento
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalDetalleProducto;
