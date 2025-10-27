import React from 'react';

function Tablero({ productos, usuarios, setVistaActiva, estilos }) {
  return (
    <div className="area-contenido" style={estilos.areaContenido}>
      <div style={estilos.encabezadoSeccion}>
        <h2>Panel de Control</h2>
      </div>
      <div style={estilos.estadisticas}>
        <div 
          style={{
            ...estilos.tarjetaEstadistica,
            ...estilos.tarjetaClickeable
          }}
          onClick={() => setVistaActiva('productos')}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-4px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          <div style={estilos.iconoEstadistica}>
            <i className="fas fa-birthday-cake"></i>
          </div>
          <div style={estilos.infoEstadistica}>
            <h3>{productos.length}</h3>
            <p>Productos</p>
          </div>
          <div style={estilos.flechaNavegacion}>
            <i className="fas fa-arrow-right"></i>
          </div>
        </div>
        <div 
          style={{
            ...estilos.tarjetaEstadistica,
            ...estilos.tarjetaClickeable
          }}
          onClick={() => setVistaActiva('usuarios')}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-4px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          <div style={estilos.iconoEstadistica}>
            <i className="fas fa-users"></i>
          </div>
          <div style={estilos.infoEstadistica}>
            <h3>{usuarios.length}</h3>
            <p>Usuarios</p>
          </div>
          <div style={estilos.flechaNavegacion}>
            <i className="fas fa-arrow-right"></i>
          </div>
        </div>
        <div 
          style={{
            ...estilos.tarjetaEstadistica,
            ...estilos.tarjetaClickeable
          }}
          onClick={() => setVistaActiva('productos')}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-4px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          <div style={estilos.iconoEstadistica}>
            <i className="fas fa-box"></i>
          </div>
          <div style={estilos.infoEstadistica}>
            <h3>{productos.reduce((total, p) => total + p.stock, 0)}</h3>
            <p>Stock Total</p>
          </div>
          <div style={estilos.flechaNavegacion}>
            <i className="fas fa-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tablero;



