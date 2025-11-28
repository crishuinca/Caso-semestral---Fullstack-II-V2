import { useState, useEffect } from 'react';
import ProductCard from '../components/productCard/ProductCard';
import { useCarrito } from '../context/CarritoContext';
import { useFiltro } from '../context/FiltroContext';
import '../styles/Productos.css';
import Footer from '../components/footer/Footer';
import { getProductos } from '../utils/apiHelper';

function Productos() {
  const { productosStock, agregarProducto, cargandoProductos } = useCarrito();
  const { categoriaSeleccionada, setCategoriaSeleccionada, terminoBusqueda, setTerminoBusqueda } = useFiltro();
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [ofertas, setOfertas] = useState([]);

  useEffect(() => {
    if (!cargandoProductos && productosStock.length > 0) {
      const productosFormateados = productosStock.map(producto => ({
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
      setProductos(productosFormateados);
      setFilteredProductos(productosFormateados);
    }
  }, [productosStock, cargandoProductos]);
  

  useEffect(() => {
    const handleProductosActualizados = () => {
      
      const recuperarDATOS = async()=>{
        const productosAdmin = await getProductos()
        if (productosAdmin) {
          const productosActualizados = productosAdmin.map(producto => ({
            prod_codigo: producto.p_codigo,
            prod_nombre: producto.p_nombre,
            prod_desc: producto.p_descripcion || 'Sin descripción',
            prod_categoria: producto.p_categoria,
            prod_precio: producto.p_precio,
            prod_imagen: producto.p_imagen,
            prod_stock: producto.p_stock,
            prod_stock_critico: producto.p_stock_critico,
            prod_precio_oferta: producto.p_precio_oferta || null
          }));
          setProductos(productosActualizados);
          setFilteredProductos(productosActualizados);
      }
      
      }
      recuperarDATOS()
    };

    window.addEventListener('productosActualizados', handleProductosActualizados);
    
    return () => {
      window.removeEventListener('productosActualizados', handleProductosActualizados);
    };
  }, []);

  // Generar ofertas dinámicamente de productos con descuento
  useEffect(() => {
    const productosConOferta = productos.filter(producto => producto.prod_precio_oferta);
    
    const ofertasGeneradas = productosConOferta.map(producto => {
      const descuento = Math.round(((producto.prod_precio - producto.prod_precio_oferta) / producto.prod_precio) * 100);
      return {
        ...producto,
        descuento: descuento
      };
    });
    
    setOfertas(ofertasGeneradas);
  }, [productos]);

  useEffect(() => {
    let filtered = productos;

    if (categoriaSeleccionada !== 'Todos') {
      filtered = filtered.filter(producto => producto.prod_categoria === categoriaSeleccionada);
    }

    if (terminoBusqueda) {
      filtered = filtered.filter(producto =>
        producto.prod_nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
        producto.prod_desc.toLowerCase().includes(terminoBusqueda.toLowerCase())
      );
    }

    setFilteredProductos(filtered);
  }, [productos, categoriaSeleccionada, terminoBusqueda]);

  const categorias = ['Todos', ...new Set(productos.map(p => p.prod_categoria))];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(price);
  };

  const handleAddOfertaToCart = (producto) => {
    agregarProducto(producto.prod_codigo, 1, '', producto.prod_precio_oferta);
  };

  return (
    <div style={{ backgroundColor: '#FFF5E1', paddingTop: '100px', paddingBottom: '40px' }}>
      <div className="container py-4">
        {}
        <div className="text-center mb-4">
          <h1 style={{ 
            color: '#8B4513', 
            fontFamily: 'Pacifico, cursive', 
            fontSize: '3rem' 
          }}>
            Nuestros Productos
          </h1>
          <p className="text-muted fs-5">
            Descubre todos nuestros deliciosos productos
          </p>
        </div>

        {}
        <div className="card mb-4 shadow">
          <div className="card-body">
            {}
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar productos..."
                value={terminoBusqueda}
                onChange={(e) => setTerminoBusqueda(e.target.value)}
              />
            </div>

            {}
            <div className="d-flex flex-wrap gap-2 justify-content-center">
              {categorias.map(categoria => (
                <button
                  key={categoria}
                  className={`btn rounded-pill ${
                    categoriaSeleccionada === categoria 
                      ? 'text-white' 
                      : 'btn-outline-secondary'
                  }`}
                  style={{
                    backgroundColor: categoriaSeleccionada === categoria ? '#D2691E' : 'transparent',
                    borderColor: '#D2691E'
                  }}
                  onClick={() => setCategoriaSeleccionada(categoria)}
                >
                  {categoria}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sección de Ofertas */}
        {ofertas.length > 0 && (
          <div className="ofertas-container">
            <div className="ofertas-header text-center">
              <h2 className="ofertas-title">🎁 Ofertas Especiales</h2>
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
                        src={producto.prod_imagen || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200"%3E%3Crect width="300" height="200" fill="%23D2691E"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="20" fill="%23FFF"%3EProducto%3C/text%3E%3C/svg%3E'} 
                        alt={producto.prod_nombre}
                        className="oferta-image"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200"%3E%3Crect width="300" height="200" fill="%23D2691E"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="20" fill="%23FFF"%3EProducto%3C/text%3E%3C/svg%3E';
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

        {/* Título para el resto de productos */}
        <div className="text-center mb-4">
          <h2 style={{ 
            color: '#8B4513', 
            fontFamily: 'Pacifico, cursive', 
            fontSize: '2rem' 
          }}>
            Todos Nuestros Productos
          </h2>
        </div>

        {}
        <div className="row g-4">
          {filteredProductos.map(producto => (
            <div key={producto.prod_codigo} className="col-lg-4 col-md-6">
              <ProductCard producto={producto} />
            </div>
          ))}
        </div>

        {filteredProductos.length === 0 && (
          <div className="text-center py-5">
            <h3 className="text-muted">No se encontraron productos</h3>
            <p>No hay productos que coincidan con tu búsqueda.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Productos;
