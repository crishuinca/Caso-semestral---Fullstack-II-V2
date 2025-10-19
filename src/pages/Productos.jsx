import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useCarrito } from '../context/CarritoContext';

function Productos() {
  const { productosDisponibles } = useCarrito();
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    
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
        prod_stock_critico: producto.stock_critico
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
    setFilteredProductos(productosFinales);
  }, [productosDisponibles]);

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
          prod_stock_critico: producto.stock_critico
        }));
        setProductos(productosActualizados);
        setFilteredProductos(productosActualizados);
      }
    };

    window.addEventListener('productosActualizados', handleProductosActualizados);
    
    return () => {
      window.removeEventListener('productosActualizados', handleProductosActualizados);
    };
  }, []);

  useEffect(() => {
    let filtered = productos;

    if (selectedCategory !== 'Todos') {
      filtered = filtered.filter(producto => producto.prod_categoria === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(producto =>
        producto.prod_nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        producto.prod_desc.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProductos(filtered);
  }, [productos, selectedCategory, searchTerm]);

  const categorias = ['Todos', ...new Set(productos.map(p => p.prod_categoria))];

  return (
    <div style={{ backgroundColor: '#FFF5E1', minHeight: '100vh', paddingTop: '2500px' }}>
      <div className="container py-4">
        {}
        <div className="text-center mb-4" style={{ marginTop: '100px' }}>
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {}
            <div className="d-flex flex-wrap gap-2 justify-content-center">
              {categorias.map(categoria => (
                <button
                  key={categoria}
                  className={`btn rounded-pill ${
                    selectedCategory === categoria 
                      ? 'text-white' 
                      : 'btn-outline-secondary'
                  }`}
                  style={{
                    backgroundColor: selectedCategory === categoria ? '#D2691E' : 'transparent',
                    borderColor: '#D2691E'
                  }}
                  onClick={() => setSelectedCategory(categoria)}
                >
                  {categoria}
                </button>
              ))}
            </div>
          </div>
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
    </div>
  );
}

export default Productos;
