import React from 'react';

function Productos({ productos, abrirModalEditar, estilos, descargarReporteCSV }) {
  const contenedorProductosResponsive = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
    padding: '1rem',
    gap: '1rem',
    width: '100%'
  };

  return (
    <div className="area-contenido" style={estilos.areaContenido}>
      <div style={estilos.encabezadoSeccion}>
        <h2>Catálogo de Productos</h2>
      </div>
      <div style={contenedorProductosResponsive}>
        {productos.map(producto => (
          <div 
            key={producto.codigo} 
            style={{
              ...estilos.tarjetaProducto,
              maxWidth: '100%',
              padding: '1rem',
              flexDirection: 'column'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
            }}
          >
            <div style={{
              ...estilos.avatarProductoTarjeta,
              display: 'flex',
              justifyContent: 'center',
              width: '100%'
            }}>
              <i className="fas fa-birthday-cake" style={estilos.iconoProducto}></i>
            </div>
            <div style={{
              ...estilos.informacionProductoTarjeta,
              textAlign: 'center'
            }}>
              <div style={estilos.nombreProducto}>{producto.nombre}</div>
              <div style={estilos.categoriaProducto}>{producto.categoria}</div>
              <div style={estilos.descripcionProducto}>
                <strong>Descripción:</strong> {producto.descripcion || 'Sin descripción disponible'}
              </div>
              <div style={estilos.detallesProducto}>
                <div>
                  <strong>Precio:</strong> 
                  {producto.precioEspecial ? (
                    <>
                      <span style={{ textDecoration: 'line-through', color: '#999', marginRight: '8px' }}>
                        ${producto.precio.toLocaleString()}
                      </span>
                      <span style={{ color: '#dc3545', fontWeight: 'bold', fontSize: '1.1rem' }}>
                        ${producto.precioEspecial.toLocaleString()}
                      </span>
                      <span style={{ marginLeft: '8px', color: '#dc3545', fontWeight: 'bold' }}>
                        🎁 OFERTA
                      </span>
                    </>
                  ) : (
                    <span> ${producto.precio.toLocaleString()}</span>
                  )}
                </div>
                <div style={estilos.stockInfo}>
                  <strong>Stock:</strong> 
                  <span style={{
                    ...estilos.badgeStock,
                    backgroundColor: producto.stock > 10 ? '#28a745' : producto.stock > 5 ? '#ffc107' : '#dc3545'
                  }}>
                    {producto.stock}
                  </span>
                </div>
              </div>
              <div style={{
                ...estilos.imagenProductoContainer,
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                marginBottom: '0.5rem'
              }}>
                <img 
                  src={producto.imagen} 
                  alt={producto.nombre}
                  style={{
                    ...estilos.imagenProducto,
                    maxWidth: '100%',
                    width: '150px',
                    height: '120px'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div style={{
                ...estilos.accionesProducto,
                justifyContent: 'center',
                marginTop: '1rem'
              }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    abrirModalEditar(producto);
                  }}
                  style={estilos.botonEditar}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#A0522D'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#8B4513'}
                >
                  <i className="fas fa-edit me-1"></i>
                  Editar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Botón de descarga de reporte */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '2rem 1rem',
        marginTop: '1rem'
      }}>
        <button 
          style={{
            background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '0.75rem 1.5rem',
            fontSize: '0.9rem',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 2px 8px rgba(139, 69, 19, 0.2)',
            transition: 'all 0.3s ease'
          }}
          onClick={() => descargarReporteCSV && descargarReporteCSV()}
          onMouseEnter={(e) => {
            e.target.style.background = 'linear-gradient(135deg, #A0522D 0%, #8B4513 100%)';
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 4px 12px rgba(139, 69, 19, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 2px 8px rgba(139, 69, 19, 0.2)';
          }}
        >
          <i className="fas fa-download"></i>
          Descargar reporte en CSV
        </button>
      </div>
    </div>
  );
}

export default Productos;

