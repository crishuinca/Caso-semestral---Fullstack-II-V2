import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductoById } from '../utils/apiHelper';
import { useCarrito } from '../context/CarritoContext';
import Footer from '../components/footer/Footer';
import '../styles/Productos.css';

function DetalleProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agregarProducto } = useCarrito();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [cantidad, setCantidad] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        setCargando(true);
        const productoData = await getProductoById(id);
        
        if (productoData) {
          setProducto({
            p_id: productoData.p_id,
            prod_codigo: productoData.p_codigo,
            prod_nombre: productoData.p_nombre,
            prod_desc: productoData.p_descripcion || 'Sin descripción',
            prod_categoria: productoData.p_categoria,
            prod_precio: productoData.p_precio,
            prod_imagen: productoData.p_imagen,
            prod_stock: productoData.p_stock,
            prod_stock_critico: productoData.p_stock_critico,
            prod_precio_oferta: productoData.p_precio_oferta || null
          });
        } else {
          setError('Producto no encontrado');
        }
      } catch (err) {
        console.error('Error al cargar producto:', err);
        setError('Error al cargar el producto');
      } finally {
        setCargando(false);
      }
    };

    if (id) {
      cargarProducto();
    }
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(price);
  };

  const handleCantidadChange = (e) => {
    const nuevaCantidad = parseInt(e.target.value) || 1;
    if (nuevaCantidad > 0 && nuevaCantidad <= producto.prod_stock) {
      setCantidad(nuevaCantidad);
    }
  };

  const handleIncrementar = () => {
    if (cantidad < producto.prod_stock) {
      setCantidad(cantidad + 1);
    }
  };

  const handleDecrementar = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  const handleAgregarAlCarrito = () => {
    if (producto.prod_stock === 0) {
      alert('Este producto no tiene stock disponible');
      return;
    }
    
    if (cantidad > producto.prod_stock) {
      alert(`Solo hay ${producto.prod_stock} unidades disponibles`);
      return;
    }

    agregarProducto(
      producto.prod_codigo, 
      cantidad, 
      '', 
      producto.prod_precio_oferta || null
    );
  };

  if (cargando) {
    return (
      <div style={{ 
        backgroundColor: '#FFF5E1', 
        paddingTop: '100px', 
        paddingBottom: '40px',
        minHeight: '100vh'
      }}>
        <div className="container text-center py-5">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (error || !producto) {
    return (
      <div style={{ 
        backgroundColor: '#FFF5E1', 
        paddingTop: '100px', 
        paddingBottom: '40px',
        minHeight: '100vh'
      }}>
        <div className="container text-center py-5">
          <h2 className="text-danger">Error</h2>
          <p>{error || 'Producto no encontrado'}</p>
          <button 
            className="btn btn-primary mt-3"
            onClick={() => navigate('/productos')}
          >
            Volver a Productos
          </button>
        </div>
      </div>
    );
  }

  const sinStock = producto.prod_stock === 0;
  const stockCritico = producto.prod_stock > 0 && producto.prod_stock <= producto.prod_stock_critico;
  const tieneOferta = producto.prod_precio_oferta && producto.prod_precio_oferta > 0;

  return (
    <div style={{ backgroundColor: '#FFF5E1', paddingTop: '100px', paddingBottom: '40px', minHeight: '100vh' }}>
      <div className="container py-4">
        {/* Botón volver */}
        <button 
          className="btn mb-4"
          onClick={() => navigate('/productos')}
          style={{
            backgroundColor: '#8B4513',
            color: '#FFC0CB',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#FFC0CB';
            e.target.style.color = '#8B4513';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#8B4513';
            e.target.style.color = '#FFC0CB';
          }}
        >
          <i className="fas fa-arrow-left me-2"></i>
          Volver a Productos
        </button>

        <div className="row">
          {/* Imagen del producto */}
          <div className="col-lg-6 mb-4">
            <div className="position-relative">
              <img 
                src={producto.prod_imagen || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="500"%3E%3Crect width="500" height="500" fill="%23D2691E"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="%23FFF"%3EProducto%3C/text%3E%3C/svg%3E'} 
                alt={producto.prod_nombre}
                className="img-fluid rounded shadow"
                style={{ width: '100%', height: '500px', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="500"%3E%3Crect width="500" height="500" fill="%23D2691E"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="%23FFF"%3EProducto%3C/text%3E%3C/svg%3E';
                }}
              />
              {sinStock && (
                <div className="position-absolute top-50 start-50 translate-middle">
                  <span className="badge bg-danger fs-4 px-4 py-2">Sin Stock</span>
                </div>
              )}
              {stockCritico && !sinStock && (
                <div className="position-absolute top-0 start-0 m-3">
                  <span className="badge bg-warning text-dark fs-5 px-3 py-2">
                    ⚠️ Últimas unidades
                  </span>
                </div>
              )}
              {tieneOferta && (
                <div className="position-absolute top-0 end-0 m-3">
                  <span className="badge bg-danger fs-5 px-3 py-2">
                    🎁 OFERTA
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Información del producto */}
          <div className="col-lg-6">
            <div className="card shadow h-100">
              <div className="card-body d-flex flex-column">
                <h1 className="card-title mb-3" style={{ color: '#8B4513', fontSize: '2.5rem' }}>
                  {producto.prod_nombre}
                </h1>
                
                <p className="text-muted mb-3">
                  <i className="fas fa-tag me-2"></i>
                  <strong>Categoría:</strong> {producto.prod_categoria}
                </p>

                <p className="card-text mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                  {producto.prod_desc}
                </p>

                {/* Precio */}
                <div className="mb-4">
                  {tieneOferta ? (
                    <div>
                      <div className="d-flex align-items-center gap-3 mb-2">
                        <span style={{ 
                          textDecoration: 'line-through', 
                          color: '#999', 
                          fontSize: '1.5rem' 
                        }}>
                          {formatPrice(producto.prod_precio)}
                        </span>
                        <span className="badge bg-danger fs-6">OFERTA</span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <span className="h2" style={{ color: '#dc3545', fontWeight: 'bold' }}>
                          {formatPrice(producto.prod_precio_oferta)}
                        </span>
                        <span className="text-success">
                          Ahorras {formatPrice(producto.prod_precio - producto.prod_precio_oferta)}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <span className="h2" style={{ color: '#D2691E', fontWeight: 'bold' }}>
                      {formatPrice(producto.prod_precio)}
                    </span>
                  )}
                </div>

                {/* Stock */}
                <div className="mb-4">
                  <span className={`badge ${stockCritico ? 'bg-warning text-dark' : sinStock ? 'bg-danger' : 'bg-success'} fs-6 px-3 py-2`}>
                    {sinStock ? 'Sin stock' : `Stock disponible: ${producto.prod_stock} unidades`}
                  </span>
                  {stockCritico && !sinStock && (
                    <div className="alert alert-warning mt-2">
                      <i className="fas fa-exclamation-triangle me-2"></i>
                      ¡Solo quedan {producto.prod_stock} unidades!
                    </div>
                  )}
                </div>

                {/* Selector de cantidad */}
                {!sinStock && (
                  <div className="mb-4">
                    <label className="form-label fw-bold">Cantidad:</label>
                    <div className="d-flex align-items-center gap-3">
                      <button 
                        className="btn btn-outline-secondary"
                        onClick={handleDecrementar}
                        disabled={cantidad <= 1}
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                      <input
                        type="number"
                        className="form-control text-center"
                        style={{ maxWidth: '100px' }}
                        value={cantidad}
                        onChange={handleCantidadChange}
                        min="1"
                        max={producto.prod_stock}
                      />
                      <button 
                        className="btn btn-outline-secondary"
                        onClick={handleIncrementar}
                        disabled={cantidad >= producto.prod_stock}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                      <span className="text-muted">
                        (Máximo: {producto.prod_stock})
                      </span>
                    </div>
                  </div>
                )}

                {/* Botón agregar al carrito */}
                <div className="mt-auto">
                  <button 
                    className={`btn w-100 text-white ${sinStock ? 'btn-secondary' : ''}`}
                    style={{ 
                      backgroundColor: sinStock ? '#6c757d' : '#D2691E',
                      fontSize: '1.2rem',
                      padding: '12px'
                    }}
                    onClick={handleAgregarAlCarrito}
                    disabled={sinStock}
                  >
                    {sinStock ? (
                      <>
                        <i className="fas fa-times-circle me-2"></i>
                        Sin Stock
                      </>
                    ) : (
                      <>
                        <i className="fas fa-shopping-cart me-2"></i>
                        Agregar al Carrito
                      </>
                    )}
                  </button>
                </div>

                {/* Información adicional */}
                <div className="mt-4 pt-4 border-top">
                  <p className="text-muted small mb-0">
                    <i className="fas fa-info-circle me-2"></i>
                    Código del producto: <strong>{producto.prod_codigo}</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DetalleProducto;

