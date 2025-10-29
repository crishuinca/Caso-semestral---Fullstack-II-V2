import { useCarrito } from '../../context/CarritoContext';
import { useEffect, useState } from 'react';

function ProductCard({ producto }) {
  const { agregarProducto } = useCarrito();
  const [stockActual, setStockActual] = useState(producto.stock);

  useEffect(() => {
    const actualizarStock = () => {
      const productosStock = JSON.parse(localStorage.getItem('productosStock')) || [];
      const productoActualizado = productosStock.find(p => p.prod_codigo === producto.prod_codigo);
      if (productoActualizado) {
        setStockActual(productoActualizado.stock);
      }
    };

    actualizarStock();
    window.addEventListener('productosActualizados', actualizarStock);
    
    return () => {
      window.removeEventListener('productosActualizados', actualizarStock);
    };
  }, [producto.prod_codigo]);
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(price);
  };

  const handleAddToCart = () => {
    agregarProducto(producto.prod_codigo, 1, '', producto.prod_precio_oferta || null);
  };

  const sinStock = stockActual === 0;
  const stockCritico = stockActual > 0 && stockActual <= 5;

  return (
    <div className="card h-100 shadow">
      <div className="position-relative">
        <img 
          src={producto.prod_imagen} 
          className={`card-img-top ${sinStock ? 'opacity-50' : ''}`}
          alt={producto.prod_nombre}
          style={{ height: '200px', objectFit: 'cover' }}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200/D2691E/FFF?text=Producto';
          }}
        />
        {sinStock && (
          <div className="position-absolute top-50 start-50 translate-middle">
            <span className="badge bg-danger fs-5">Sin Stock</span>
          </div>
        )}
        {stockCritico && !sinStock && (
          <div className="position-absolute top-0 start-0 m-2">
            <span className="badge bg-warning text-dark fs-6">
              ⚠️ Últimas unidades
            </span>
          </div>
        )}
      </div>
      
      <div className="card-body d-flex flex-column">
        <h5 className="card-title" style={{ color: '#8B4513' }}>
          {producto.prod_nombre}
        </h5>
        <p className="text-muted small">{producto.prod_categoria}</p>
        <p className="card-text">{producto.prod_desc}</p>
        
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="d-flex flex-column">
              {producto.prod_precio_oferta ? (
                <>
                  <div className="d-flex align-items-center gap-2">
                    <span style={{ textDecoration: 'line-through', color: '#999', fontSize: '0.9rem' }}>
                      {formatPrice(producto.prod_precio)}
                    </span>
                    <span className="badge bg-danger">OFERTA</span>
                  </div>
                  <span className="h5" style={{ color: '#dc3545', fontWeight: 'bold' }}>
                    {formatPrice(producto.prod_precio_oferta)}
                  </span>
                </>
              ) : (
                <span className="h5" style={{ color: '#D2691E' }}>
                  {formatPrice(producto.prod_precio)}
                </span>
              )}
            </div>
            <span className={`badge ${stockCritico ? 'bg-warning text-dark' : sinStock ? 'bg-danger' : 'bg-success'}`}>
              {sinStock ? 'Sin stock' : `Stock: ${stockActual}`}
            </span>
          </div>
          
          <div className="d-grid gap-2">
            {stockCritico && !sinStock && (
              <div className="alert alert-warning py-2 mb-2" style={{ fontSize: '0.85rem' }}>
                <i className="fas fa-exclamation-triangle me-1"></i>
                ¡Solo quedan {stockActual} unidades!
              </div>
            )}
            <button 
              onClick={handleAddToCart}
              className={`btn text-white ${sinStock ? 'btn-secondary' : ''}`}
              style={{ backgroundColor: sinStock ? '#6c757d' : '#D2691E' }}
              disabled={sinStock}
            >
              {sinStock ? 'Sin Stock' : 'Agregar al Carrito'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
