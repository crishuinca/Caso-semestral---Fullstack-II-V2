import React from 'react';

function Reportes({ 
  productos, 
  usuarios, 
  setVistaActiva, 
  descargarReporteCSV, 
  estilos 
}) {
  return (
    <div style={estilos.areaContenido}>
      <div style={estilos.encabezadoSeccion}>
        <h2 style={{...estilos.tituloPagina, color: '#8B4513'}}>Reportes del Sistema</h2>
        <p>Análisis y estadísticas de la pastelería</p>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }}>
          <div style={{
            background: '#FFC0CB',
            color: 'white',
            padding: '1.5rem 2rem'
          }}>
            <h3 style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              margin: '0 0 0.5rem 0',
              fontSize: '1.5rem',
              fontWeight: '600'
            }}>
              <i className="fas fa-birthday-cake"></i>
              Reporte de Productos
            </h3>
            <p style={{ margin: '0', opacity: '0.9', fontSize: '0.95rem' }}>
              Análisis del inventario y ventas de productos
            </p>
          </div>
          <div style={{ padding: '2rem' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                background: '#f8f9fa',
                borderRadius: '10px',
                padding: '1.5rem',
                textAlign: 'center',
                borderLeft: '4px solid #8B4513'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <span style={{ fontSize: '2rem', fontWeight: '700', color: '#8B4513' }}>
                    {productos.length}
                  </span>
                  <span style={{ fontSize: '0.9rem', color: '#6c757d', fontWeight: '500' }}>
                    Total Productos
                  </span>
                </div>
              </div>
              <div style={{
                background: '#f8f9fa',
                borderRadius: '10px',
                padding: '1.5rem',
                textAlign: 'center',
                borderLeft: '4px solid #8B4513'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <span style={{ fontSize: '2rem', fontWeight: '700', color: '#8B4513' }}>
                    {productos.filter(p => p.stock <= 5).length}
                  </span>
                  <span style={{ fontSize: '0.9rem', color: '#8B4513', fontWeight: '500' }}>
                    Stock Crítico
                  </span>
                </div>
              </div>
              <div style={{
                background: '#f8f9fa',
                borderRadius: '10px',
                padding: '1.5rem',
                textAlign: 'center',
                borderLeft: '4px solid #8B4513'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <span style={{ fontSize: '2rem', fontWeight: '700', color: '#8B4513' }}>
                    {productos.filter(p => p.stock === 0).length}
                  </span>
                  <span style={{ fontSize: '0.9rem', color: '#6c757d', fontWeight: '500' }}>
                    Sin Stock
                  </span>
                </div>
              </div>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              marginTop: '2rem',
              paddingTop: '2rem',
              borderTop: '1px solid #e9ecef'
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
                  boxShadow: '0 2px 8px rgba(139, 69, 19, 0.2)'
                }}
                onClick={() => descargarReporteCSV('productos')}
              >
                <i className="fas fa-download"></i>
                Descargar reporte en CSV
              </button>
              <button 
                style={{
                  background: '#bd2130',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.8rem 1.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 2px 4px rgba(220, 53, 69, 0.2)'
                }}
                onClick={() => setVistaActiva('productosCriticos')}
              >
                <i className="fas fa-exclamation-triangle"></i>
                Ver Productos Críticos
              </button>
            </div>
          </div>
        </div>
        
        {/* Tarjeta de Reporte de Usuarios */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }}>
          <div style={{
            background: '#FFC0CB',
            color: 'white',
            padding: '1.5rem 2rem'
          }}>
            <h3 style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              margin: '0 0 0.5rem 0',
              fontSize: '1.5rem',
              fontWeight: '600'
            }}>
              <i className="fas fa-users"></i>
              Reporte de Usuarios
            </h3>
            <p style={{ margin: '0', opacity: '0.9', fontSize: '0.95rem' }}>
              Análisis y estadísticas de usuarios registrados
            </p>
          </div>
          <div style={{ padding: '2rem' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                background: '#f8f9fa',
                borderRadius: '10px',
                padding: '1.5rem',
                textAlign: 'center',
                borderLeft: '4px solid #8B4513'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <span style={{ fontSize: '2rem', fontWeight: '700', color: '#8B4513' }}>
                    {usuarios.length}
                  </span>
                  <span style={{ fontSize: '0.9rem', color: '#6c757d', fontWeight: '500' }}>
                    Total Usuarios
                  </span>
                </div>
              </div>
              <div style={{
                background: '#f8f9fa',
                borderRadius: '10px',
                padding: '1.5rem',
                textAlign: 'center',
                borderLeft: '4px solid #8B4513'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <span style={{ fontSize: '2rem', fontWeight: '700', color: '#8B4513' }}>
                    {usuarios.filter(u => u.isAdmin).length}
                  </span>
                  <span style={{ fontSize: '0.9rem', color: '#8B4513', fontWeight: '500' }}>
                    Administradores
                  </span>
                </div>
              </div>
              <div style={{
                background: '#f8f9fa',
                borderRadius: '10px',
                padding: '1.5rem',
                textAlign: 'center',
                borderLeft: '4px solid #8B4513'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <span style={{ fontSize: '2rem', fontWeight: '700', color: '#8B4513' }}>
                    {usuarios.filter(u => !u.isAdmin).length}
                  </span>
                  <span style={{ fontSize: '0.9rem', color: '#6c757d', fontWeight: '500' }}>
                    Usuarios Regulares
                  </span>
                </div>
              </div>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              marginTop: '2rem',
              paddingTop: '2rem',
              borderTop: '1px solid #e9ecef'
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
                  boxShadow: '0 2px 8px rgba(139, 69, 19, 0.2)'
                }}
                onClick={() => descargarReporteCSV('usuarios')}
              >
                <i className="fas fa-download"></i>
                Descargar reporte en CSV
              </button>
              <button 
                style={{
                  background: '#FFC0CB',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.8rem 1.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 2px 4px rgba(255, 192, 203, 0.2)'
                }}
                onClick={() => setVistaActiva('usuarios')}
              >
                <i className="fas fa-eye"></i>
                Ver Todos los Usuarios
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reportes;