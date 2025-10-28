import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useCarrito } from '../context/CarritoContext';
import '../styles/Categoria.css';

function Categoria() {
  const { categoria } = useParams();
  const navigate = useNavigate();
  const { productosDisponibles, agregarProducto } = useCarrito();
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [ofertas, setOfertas] = useState([]);

  // Categorías válidas
  const categoriasValidas = [
    'Todos',
    'Tortas Cuadradas',
    'Tortas Circulares', 
    'Postres Individuales',
    'Productos Sin Azúcar',
    'Pastelería Tradicional',
    'Productos Sin Gluten',
    'Productos Veganos',
    'Tortas Especiales'
  ];

  useEffect(() => {
    // Verificar si la categoría es válida
    if (!categoriasValidas.includes(categoria)) {
      navigate('/productos');
      return;
    }

    // Cargar productos
    const productosAdmin = JSON.parse(localStorage.getItem('productosAdmin') || 'null');
    
    let productosFinales;
    if (productosAdmin) {
      productosFinales = productosAdmin.map(producto => ({
        prod_codigo: producto.prod_codigo,
        prod_nombre: producto.nombre,
        prod_desc: producto.descripcion || 'Sin descripción',
        prod_categoria: producto.categoria,
        prod_precio: producto.precio,
        prod_imagen: producto.imagen,
        prod_stock: producto.stock,
        prod_stock_critico: producto.stock_critico,
        prod_precio_oferta: producto.precioEspecial || null
      }));
    } else {
      productosFinales = productosDisponibles.map(producto => ({
        prod_codigo: producto.prod_codigo,
        prod_nombre: producto.nombre,
        prod_desc: producto.descripcion || 'Sin descripción',
        prod_categoria: producto.categoria,
        prod_precio: producto.precio,
        prod_imagen: producto.imagen,
        prod_stock: producto.stock,
        prod_stock_critico: producto.stock_critico
      }));
    }
    
    setProductos(productosFinales);
  }, [productosDisponibles, categoria, navigate]);

  useEffect(() => {
    const handleProductosActualizados = () => {
      const productosAdmin = JSON.parse(localStorage.getItem('productosAdmin') || 'null');
      if (productosAdmin) {
        const productosActualizados = productosAdmin.map(producto => ({
          prod_codigo: producto.prod_codigo,
          prod_nombre: producto.nombre,
          prod_desc: producto.descripcion || 'Sin descripción',
          prod_categoria: producto.categoria,
          prod_precio: producto.precio,
          prod_imagen: producto.imagen,
          prod_stock: producto.stock,
          prod_stock_critico: producto.stock_critico,
          prod_precio_oferta: producto.precioEspecial || null
        }));
        setProductos(productosActualizados);
      }
    };

    window.addEventListener('productosActualizados', handleProductosActualizados);
    
    return () => {
      window.removeEventListener('productosActualizados', handleProductosActualizados);
    };
  }, []);

  // Filtrar productos por categoría
  useEffect(() => {
    let productosFiltrados;
    if (categoria === 'Todos') {
      productosFiltrados = productos; // Mostrar todos los productos
    } else {
      productosFiltrados = productos.filter(producto => producto.prod_categoria === categoria);
    }
    setFilteredProductos(productosFiltrados);
  }, [productos, categoria]);

  // Generar ofertas dinámicamente
  useEffect(() => {
    const productosConOferta = filteredProductos.filter(producto => producto.prod_precio_oferta);
    
    const ofertasGeneradas = productosConOferta.map(producto => {
      const descuento = Math.round(((producto.prod_precio - producto.prod_precio_oferta) / producto.prod_precio) * 100);
      return {
        ...producto,
        descuento: descuento
      };
    });
    
    setOfertas(ofertasGeneradas);
  }, [filteredProductos]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(price);
  };

  const handleAddOfertaToCart = (producto) => {
    agregarProducto(producto.prod_codigo, 1, '', producto.prod_precio_oferta);
  };

  const getCategoriaIcon = (categoria) => {
    const iconos = {
      'Todos': '🛍️',
      'Tortas Cuadradas': '🍰',
      'Tortas Circulares': '🎂',
      'Postres Individuales': '🍮',
      'Productos Sin Azúcar': '🍯',
      'Pastelería Tradicional': '🥧',
      'Productos Sin Gluten': '🌾',
      'Productos Veganos': '🌱',
      'Tortas Especiales': '🎉'
    };
    return iconos[categoria] || '🍰';
  };

  return (
    <div style={{ backgroundColor: '#FFF5E1', paddingTop: '100px', paddingBottom: '40px' }}>
      <div className="container py-4">
        {/* Header de la categoría */}
        <div className="text-center mb-5">
          <div className="categoria-header">
            <h1 className="categoria-title">
              {getCategoriaIcon(categoria)} Categoría
            </h1>
            <h2 className="categoria-subtitle">
              {categoria === 'Todos' ? 'Todos los Productos' : categoria}
            </h2>
            <p className="categoria-description">
              {categoria === 'Todos' 
                ? 'Descubre todos nuestros deliciosos productos disponibles'
                : `Descubre todos nuestros deliciosos productos de ${categoria.toLowerCase()}`
              }
            </p>
          </div>
        </div>

        {/* Sección de Ofertas */}
        {ofertas.length > 0 && (
          <div className="ofertas-container mb-5">
            <div className="ofertas-header text-center">
              <h3 className="ofertas-title">
                🎁 Ofertas Especiales{categoria !== 'Todos' ? ` en ${categoria}` : ''}
              </h3>
              <p className="ofertas-subtitle">Aprovecha estos increíbles descuentos</p>
            </div>

            <div className="row g-4 mb-5">
              {ofertas.map(producto => (
                <div key={producto.prod_codigo} className="col-lg-4 col-md-6">
                  <div className="oferta-card">
                    <div className="oferta-badge">
                      -{producto.descuento}%
                    </div>
                    <div className="oferta-image-container">
                      <img 
                        src={producto.prod_imagen} 
                        alt={producto.prod_nombre}
                        className="oferta-image"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x200/D2691E/FFF?text=Producto';
                        }}
                      />
                    </div>
                    <div className="oferta-body">
                      <h5 className="oferta-nombre">{producto.prod_nombre}</h5>
                      <p className="oferta-categoria">{producto.prod_categoria}</p>
                      <p className="text-muted small" style={{ flexGrow: 1 }}>
                        {producto.prod_desc}
                      </p>
                      <div className="oferta-precio-container">
                        <p className="oferta-precio-antes">{formatPrice(producto.prod_precio)}</p>
                        <div className="oferta-precio-ahora">{formatPrice(producto.prod_precio_oferta)}</div>
                        <span className="oferta-descuento">
                          Ahorra {formatPrice(producto.prod_precio - producto.prod_precio_oferta)}
                        </span>
                      </div>
                      <button 
                        className="oferta-button w-100"
                        onClick={() => handleAddOfertaToCart(producto)}
                      >
                        Agregar al Carrito 🛒
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Productos de la categoría */}
        <div className="productos-categoria">
          <div className="text-center mb-4">
            <h3 className="productos-titulo">
              {ofertas.length > 0 ? 'Todos los Productos' : 'Productos Disponibles'}
            </h3>
            <p className="productos-contador">
              {filteredProductos.length} producto{filteredProductos.length !== 1 ? 's' : ''} encontrado{filteredProductos.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="row g-4">
            {filteredProductos.map(producto => (
              <div key={producto.prod_codigo} className="col-lg-4 col-md-6">
                <ProductCard producto={producto} />
              </div>
            ))}
          </div>

          {filteredProductos.length === 0 && (
            <div className="text-center py-5">
              <div className="no-productos">
                <h3 className="text-muted">No hay productos disponibles</h3>
                <p>No se encontraron productos en esta categoría.</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => navigate('/productos')}
                >
                  Ver Todos los Productos
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Categoria;
