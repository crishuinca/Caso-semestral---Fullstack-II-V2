import { useState, useEffect } from 'react';
import { useCarrito } from '../context/CarritoContext';
import '../styles/Productos.css';
import EncabezadoProductos from '../components/productos/EncabezadoProductos';
import FiltrosProductos from '../components/productos/FiltrosProductos';
import ListadoProductos from '../components/productos/ListadoProductos';

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
    <div className="cuerpo-productos">
      <div className="container py-4">
        <EncabezadoProductos />

        <FiltrosProductos
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categorias={categorias}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <ListadoProductos productos={filteredProductos} />
      </div>
    </div>
  );
}

export default Productos;
