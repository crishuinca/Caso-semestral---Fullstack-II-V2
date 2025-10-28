import React from 'react';

function Sidebar({ menuColapsado, vistaActiva, setVistaActiva, estilos }) {
  return (
    <aside style={{
      width: menuColapsado ? '80px' : '280px',
      background: 'linear-gradient(180deg, #8B4513 0%, #A0522D 100%)',
      color: 'white',
      position: 'fixed',
      height: '100vh',
      left: 0,
      top: 0,
      zIndex: 1000,
      transition: 'all 0.3s ease',
      boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
      overflowY: 'auto',
      overflowX: 'hidden'
    }}>
      <div style={{
        ...estilos.encabezadoBarraLateral,
        padding: menuColapsado ? '1.5rem 0.5rem' : '2rem 1.5rem'
      }}>
        {menuColapsado ? (
          <img 
            src="/img/logo_chico_color.png" 
            alt="Logo" 
            style={{
              width: '55px',
              height: 'auto',
              display: 'block',
              margin: '0 auto'
            }}
          />
        ) : (
          <h2 style={estilos.tituloBarraLateral}>
            Panel de Admin
          </h2>
        )}
      </div>
      
      <nav style={estilos.navegacionBarraLateral}>
        <ul style={estilos.menuNavegacion}>
          <li style={estilos.elementoNavegacion}>
            <a
              onClick={() => setVistaActiva('tablero')}
              style={{
                ...estilos.enlaceNavegacion,
                ...(vistaActiva === 'tablero' ? estilos.enlaceNavegacionActivo : {})
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
              onMouseLeave={(e) => {
                if (vistaActiva !== 'tablero') {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              <i className="fas fa-home" style={{...estilos.iconoNavegacion, marginRight: menuColapsado ? 0 : '1rem'}}></i>
              {!menuColapsado && <span>Tablero</span>}
            </a>
          </li>
          <li style={estilos.elementoNavegacion}>
            <a
              onClick={() => setVistaActiva('productos')}
              style={{
                ...estilos.enlaceNavegacion,
                ...(vistaActiva === 'productos' ? estilos.enlaceNavegacionActivo : {})
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
              onMouseLeave={(e) => {
                if (vistaActiva !== 'productos') {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              <i className="fas fa-birthday-cake" style={{...estilos.iconoNavegacion, marginRight: menuColapsado ? 0 : '1rem'}}></i>
              {!menuColapsado && <span>Productos</span>}
            </a>
          </li>
          <li style={estilos.elementoNavegacion}>
            <a
              onClick={() => setVistaActiva('reportes')}
              style={{
                ...estilos.enlaceNavegacion,
                ...(vistaActiva === 'reportes' ? estilos.enlaceNavegacionActivo : {})
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
              onMouseLeave={(e) => {
                if (vistaActiva !== 'reportes') {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              <i className="fas fa-chart-bar" style={{...estilos.iconoNavegacion, marginRight: menuColapsado ? 0 : '1rem'}}></i>
              {!menuColapsado && <span>Reportes</span>}
            </a>
          </li>
          <li style={estilos.elementoNavegacion}>
            <a
              onClick={() => setVistaActiva('usuarios')}
              style={{
                ...estilos.enlaceNavegacion,
                ...(vistaActiva === 'usuarios' ? estilos.enlaceNavegacionActivo : {})
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
              onMouseLeave={(e) => {
                if (vistaActiva !== 'usuarios') {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              <i className="fas fa-users" style={{...estilos.iconoNavegacion, marginRight: menuColapsado ? 0 : '1rem'}}></i>
              {!menuColapsado && <span>Usuarios</span>}
            </a>
          </li>
          <li style={estilos.elementoNavegacion}>
            <a
              onClick={() => setVistaActiva('nuevoUsuario')}
              style={{
                ...estilos.enlaceNavegacion,
                ...(vistaActiva === 'nuevoUsuario' ? estilos.enlaceNavegacionActivo : {})
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
              onMouseLeave={(e) => {
                if (vistaActiva !== 'nuevoUsuario') {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              <i className="fas fa-user-plus" style={{...estilos.iconoNavegacion, marginRight: menuColapsado ? 0 : '1rem'}}></i>
              {!menuColapsado && <span>Nuevo Usuario</span>}
            </a>
          </li>
          <li style={estilos.elementoNavegacion}>
            <a
              onClick={() => window.location.href = '/admin/boletas'}
              style={{
                ...estilos.enlaceNavegacion
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <i className="fas fa-receipt" style={{...estilos.iconoNavegacion, marginRight: menuColapsado ? 0 : '1rem'}}></i>
              {!menuColapsado && <span>Boletas</span>}
            </a>
          </li>
          <li style={estilos.elementoNavegacion}>
            <a
              onClick={() => window.location.href = '/admin/historial-compras'}
              style={{
                ...estilos.enlaceNavegacion
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <i className="fas fa-history" style={{...estilos.iconoNavegacion, marginRight: menuColapsado ? 0 : '1rem'}}></i>
              {!menuColapsado && <span>Historial Compras</span>}
            </a>
          </li>
          <li style={estilos.elementoNavegacion}>
            <a
              onClick={() => setVistaActiva('perfil')}
              style={{
                ...estilos.enlaceNavegacion,
                ...(vistaActiva === 'perfil' ? estilos.enlaceNavegacionActivo : {})
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
              onMouseLeave={(e) => {
                if (vistaActiva !== 'perfil') {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              <i className="fas fa-user-circle" style={{...estilos.iconoNavegacion, marginRight: menuColapsado ? 0 : '1rem'}}></i>
              {!menuColapsado && <span>Mi Perfil</span>}
            </a>
          </li>
        </ul>
      </nav>
      
      <div style={estilos.pieBarraLateral}>
        <button
          onClick={() => window.location.href = '/'}
          style={estilos.botonSalir}
          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(220, 53, 69, 0.4)'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(220, 53, 69, 0.2)'}
        >
          <i className="fas fa-sign-out-alt" style={{...estilos.iconoNavegacion, marginRight: menuColapsado ? 0 : '1rem'}}></i>
          {!menuColapsado && <span>Salir</span>}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;

