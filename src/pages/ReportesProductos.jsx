import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ReportesProductos.css';

function ReportesProductos() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState('todos');

  useEffect(() => {
    // Verificar si es admin
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual') || '{}');
    if (!usuarioActual.isAdmin) {
      navigate('/');
      return;
    }

    // Cargar productos
    const productosStock = JSON.parse(localStorage.getItem('productosStock')) || [];
    const productosAdmin = JSON.parse(localStorage.getItem('productosAdmin') || 'null');
    
    let productosFinales;
    
    if (productosStock.length > 0) {
      productosFinales = productosStock.map(producto => ({
        codigo: producto.prod_codigo,
        nombre: producto.nombre,
        precio: producto.precio,
        descripcion: producto.descripcion,
        categoria: producto.categoria,
        stock: producto.stock,
        stock_critico: producto.stock_critico
      }));
    } else if (productosAdmin) {
      productosFinales = productosAdmin.map(producto => ({
        codigo: producto.prod_codigo,
        nombre: producto.nombre,
        precio: producto.precio,
        descripcion: producto.descripcion,
        categoria: producto.categoria,
        stock: producto.stock,
        stock_critico: producto.stock_critico
      }));
    } else {
      productosFinales = [];
    }

    setProductos(productosFinales);

    const actualizarProductos = () => {
      const productosStock = JSON.parse(localStorage.getItem('productosStock')) || [];
      const productosAdmin = JSON.parse(localStorage.getItem('productosAdmin') || 'null');
      
      let productosActualizados;
      
      if (productosStock.length > 0) {
        productosActualizados = productosStock.map(producto => ({
          codigo: producto.prod_codigo,
          nombre: producto.nombre,
          precio: producto.precio,
          descripcion: producto.descripcion,
          categoria: producto.categoria,
          stock: producto.stock,
          stock_critico: producto.stock_critico
        }));
      } else if (productosAdmin) {
        productosActualizados = productosAdmin.map(producto => ({
          codigo: producto.prod_codigo,
          nombre: producto.nombre,
          precio: producto.precio,
          descripcion: producto.descripcion,
          categoria: producto.categoria,
          stock: producto.stock,
          stock_critico: producto.stock_critico
        }));
      } else {
        productosActualizados = [];
      }

      setProductos(productosActualizados);
    };

    window.addEventListener('productosActualizados', actualizarProductos);
    
    return () => {
      window.removeEventListener('productosActualizados', actualizarProductos);
    };
  }, [navigate]);

  const volver = () => {
    navigate('/admin');
  };

  const descargarReporte = () => {
    let datosReporte;
    
    if (productoSeleccionado === 'todos') {
      datosReporte = productos;
    } else {
      datosReporte = productos.filter(p => p.codigo === productoSeleccionado);
    }

    if (datosReporte.length === 0) {
      alert('No hay datos para descargar');
      return;
    }

    // Preparar datos para CSV
    const csvData = datosReporte.map(producto => ({
      'Código': producto.codigo,
      'Nombre': producto.nombre,
      'Categoría': producto.categoria,
      'Precio': producto.precio,
      'Stock': producto.stock,
      'Stock Crítico': producto.stock_critico,
      'Estado': producto.stock === 0 ? 'Agotado' : producto.stock <= 5 ? 'Crítico' : 'Normal'
    }));

    // Convertir a CSV
    const headers = Object.keys(csvData[0]);
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => headers.map(header => `"${row[header]}"`).join(','))
    ].join('\n');

    // Descargar CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    const nombreArchivo = productoSeleccionado === 'todos' 
      ? `reporte_todos_productos_${new Date().toISOString().slice(0, 10)}.csv`
      : `reporte_producto_${productoSeleccionado}_${new Date().toISOString().slice(0, 10)}.csv`;
    link.download = nombreArchivo;
    link.click();
  };

  return (
    <div className="contenedor-reportes-productos">
      <header className="encabezado-reportes">
        <button onClick={volver} className="boton-volver">
          <i className="fas fa-arrow-left"></i>
          Volver
        </button>
        <h1 className="titulo-reportes">Reportes de Productos</h1>
      </header>

      <main className="contenido-reportes">
        <div className="area-contenido">
          <div className="encabezado-seccion">
            <h2>Reportes del Sistema - Productos</h2>
            <p>Análisis y estadísticas de productos de la pastelería</p>
          </div>
          
          <div className="contenedor-reportes">
            <div className="reporte-seccion">
              <div className="encabezado-reporte">
                <h3>
                  <i className="fas fa-birthday-cake"></i>
                  Reporte de Productos
                </h3>
                <p>Selecciona un producto específico o todos los productos</p>
              </div>
              
              <div className="contenido-reporte">
                <div className="metricas-reporte">
                  <div className="metrica-card">
                    <div className="metrica-info">
                      <span className="metrica-numero">{productos.length}</span>
                      <span className="metrica-label">Total Productos</span>
                    </div>
                  </div>
                  <div className="metrica-card">
                    <div className="metrica-info">
                      <span className="metrica-numero">
                        {productos.filter(p => p.stock <= 5).length}
                      </span>
                      <span className="metrica-label">Stock Crítico</span>
                    </div>
                  </div>
                  <div className="metrica-card">
                    <div className="metrica-info">
                      <span className="metrica-numero">
                        {productos.filter(p => p.stock === 0).length}
                      </span>
                      <span className="metrica-label">Sin Stock</span>
                    </div>
                  </div>
                </div>

                <div className="selector-producto">
                  <label htmlFor="producto-select">Seleccionar Producto:</label>
                  <select 
                    id="producto-select"
                    value={productoSeleccionado}
                    onChange={(e) => setProductoSeleccionado(e.target.value)}
                    className="select-producto"
                    style={{
                      backgroundColor: '#FFF5E1',
                      background: '#FFF5E1',
                      WebkitAppearance: 'none',
                      MozAppearance: 'none',
                      appearance: 'none'
                    }}
                  >
                    <option value="todos">Todos los productos</option>
                    {productos.map(producto => (
                      <option key={producto.codigo} value={producto.codigo}>
                        {producto.nombre} ({producto.codigo})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="acciones-reporte">
                  <button 
                    className="boton-descargar-csv"
                    onClick={descargarReporte}
                  >
                    <i className="fas fa-download"></i>
                    Descargar reporte en CSV
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ReportesProductos;