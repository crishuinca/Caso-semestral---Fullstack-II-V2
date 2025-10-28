import React from 'react';

function ProductosCriticos({ 
  productos, 
  setVistaActiva, 
  abrirModalEditar, 
  estilos 
}) {
  const productosCriticos = productos.filter(producto => producto.stock <= 5);
  
  return (
    <div style={estilos.areaContenido}>
      <div style={estilos.encabezadoSeccion}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            style={{
              background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '0.75rem 1.25rem',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 12px rgba(139, 69, 19, 0.3)',
              transition: 'all 0.3s ease',
              textDecoration: 'none'
            }}
            onClick={() => setVistaActiva('reportes')}
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #A0522D 0%, #8B4513 100%)';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(139, 69, 19, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(139, 69, 19, 0.3)';
            }}
          >
            <i className="fas fa-arrow-left"></i>
            Volver a Reportes
          </button>
          <h2 style={{...estilos.tituloPagina, color: '#8B4513'}}>Productos con Stock Crítico</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{
            background: '#c82333',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontWeight: '600',
            fontSize: '0.9rem'
          }}>
            {productosCriticos.length} productos críticos encontrados
          </span>
        </div>
      </div>
      
      {productosCriticos.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          margin: '2rem 0'
        }}>
          <h3>¡Muy Bien!</h3>
          <p>No hay productos con stock crítico en este momento.</p>
          <button 
            style={estilos.botonPrimario}
            onClick={() => setVistaActiva('productos')}
          >
            Volver al catálogo
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {productosCriticos.map(producto => (
            <div 
              key={producto.codigo} 
              style={{
                ...estilos.tarjetaProducto,
                border: '2px solid #dc3545',
                position: 'relative'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: '#dc3545',
                color: 'white',
                padding: '0.3rem 0.8rem',
                borderRadius: '12px',
                fontSize: '0.8rem',
                fontWeight: '600'
              }}>
                <i className="fas fa-exclamation-triangle"></i> Stock Crítico
              </div>
              <div style={estilos.avatarProducto}>
                <i className="fas fa-birthday-cake" style={estilos.iconoProducto}></i>
              </div>
              <div style={estilos.informacionProducto}>
                <div style={estilos.nombreProducto}>{producto.nombre}</div>
                <div style={estilos.categoriaProducto}>{producto.categoria}</div>
                <div style={estilos.descripcionProducto}>
                  <strong>Descripción:</strong> {producto.descripcion || 'Sin descripción disponible'}
                </div>
                <div style={estilos.detallesProducto}>
                  <div><strong>Precio:</strong> ${producto.precio.toLocaleString()}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <strong>Stock:</strong> 
                    <span style={{
                      padding: '0.2rem 0.6rem',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      background: producto.stock === 0 ? '#dc3545' : '#ffc107',
                      color: producto.stock === 0 ? 'white' : '#212529'
                    }}>
                      {producto.stock}
                    </span>
                  </div>
                  <div><strong>Stock Crítico:</strong> {producto.stock_critico}</div>
                </div>
                <div style={estilos.accionesProducto}>
                  <button
                    onClick={() => abrirModalEditar(producto)}
                    style={estilos.botonEditar}
                  >
                    <i className="fas fa-edit"></i>
                    Editar 
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductosCriticos;