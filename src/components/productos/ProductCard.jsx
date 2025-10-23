import { useCarrito } from '../../context/CarritoContext';
import { useEffect, useState } from 'react';
import '../../styles/ProductCard.css';

function ProductCard({ producto }) {
  const { agregarProducto } = useCarrito();
  const [stockActual, setStockActual] = useState(producto.stock);

  useEffect(() => {
    const actualizarStock = () => {
      // Ahora que están sincronizados, podemos usar productosStock directamente
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
    agregarProducto(producto.prod_codigo, 1, '');
  };

  const sinStock = stockActual === 0;
  const stockCritico = stockActual > 0 && stockActual < (producto.stock_critico || 5);

  return (
    <div className="card h-100 shadow">
      <div className="position-relative">
        <img 
          src={producto.prod_imagen} 
          className={`card-img-top imagen-producto-card ${sinStock ? 'sin-stock' : ''}`}
          alt={producto.prod_nombre}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200/D2691E/FFF?text=Producto';
          }}
        />
        {sinStock && (
          <div className="position-absolute top-50 start-50 translate-middle">
            <span className="badge bg-danger fs-5">Sin Stock</span>
          </div>
        )}
      </div>
      
      <div className="card-body d-flex flex-column">
        <h5 className="card-title titulo-producto-card">
          {producto.prod_nombre}
        </h5>
        <p className="text-muted small">{producto.prod_categoria}</p>
        <p className="card-text">{producto.prod_desc}</p>
        
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="h5 precio-producto-card">
              {formatPrice(producto.prod_precio)}
            </span>
            <span className={`badge ${stockCritico ? 'bg-warning text-dark' : sinStock ? 'bg-danger' : 'bg-success'}`}>
              {sinStock ? 'Sin stock' : `Stock: ${stockActual}`}
            </span>
          </div>
          
          <div className="d-grid gap-2">
            <button 
              onClick={handleAddToCart}
              className={`btn text-white boton-agregar-carrito ${sinStock ? 'sin-stock' : ''}`}
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
