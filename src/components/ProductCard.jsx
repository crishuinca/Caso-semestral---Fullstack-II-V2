import { useCarrito } from '../context/CarritoContext';

function ProductCard({ producto }) {
  const { agregarProducto } = useCarrito();
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(price);
  };

  const handleAddToCart = () => {
    agregarProducto(producto.prod_codigo, 1, '', producto.prod_precio_oferta || null);
  };

  return (
    <div className="card h-100 shadow">
      <div className="position-relative">
        <img 
          src={producto.prod_imagen} 
          className="card-img-top" 
          alt={producto.prod_nombre}
          style={{ height: '200px', objectFit: 'cover' }}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200/D2691E/FFF?text=Producto';
          }}
        />
      </div>
      
      <div className="card-body d-flex flex-column">
        <h5 className="card-title" style={{ color: '#8B4513' }}>
          {producto.prod_nombre}
        </h5>
        <p className="text-muted small">{producto.prod_categoria}</p>
        <p className="card-text">{producto.prod_desc}</p>
        
        <div className="mt-auto">
          <div className="d-flex flex-column justify-content-between align-items-start mb-2">
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
          
          <div className="d-grid gap-2">
            <button 
              onClick={handleAddToCart}
              className="btn text-white"
              style={{ backgroundColor: '#D2691E' }}
            >
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
