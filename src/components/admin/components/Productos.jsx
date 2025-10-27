import React from 'react';

function Productos({ productos, abrirModalEditar, estilos }) {
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
                <div><strong>Precio:</strong> ${producto.precio.toLocaleString()}</div>
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
    </div>
  );
}

export default Productos;

