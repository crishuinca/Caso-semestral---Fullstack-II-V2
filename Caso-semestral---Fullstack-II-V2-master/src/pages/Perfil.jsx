import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Perfil.css';

function Perfil() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual') || 'null');
    if (!usuarioActual) {
      navigate('/login');
      return;
    }
    setUsuario(usuarioActual);
    
    // Cargar histórico de pedidos si existe
    const pedidosGuardados = JSON.parse(localStorage.getItem('pedidos') || '[]');
    const pedidosUsuario = pedidosGuardados.filter(p => p.usuario_id === usuarioActual.id);
    setPedidos(pedidosUsuario);
  }, [navigate]);

  if (!usuario) {
    return null;
  }

  const getIniciales = (nombre, apellidos) => {
    return `${nombre?.charAt(0) || ''}${apellidos?.charAt(0) || ''}`.toUpperCase();
  };

  return (
    <div className="perfil-container">
      <div className="perfil-wrapper">
        {/* Avatar y Header */}
        <div className="perfil-avatar-section">
          <div className="avatar-circle">
            <span className="avatar-iniciales">{getIniciales(usuario.nombre, usuario.apellidos)}</span>
          </div>
          <h1 className="perfil-name">{usuario.nombre} {usuario.apellidos}</h1>
          <p className="perfil-email">{usuario.correo}</p>
          {usuario.isAdmin && (
            <span className="badge-admin-header">👑 Administrador</span>
          )}
        </div>

        {/* Card Principal */}
        <div className="perfil-card">
          <div className="perfil-content">
            {/* Información Personal */}
            <div className="perfil-section">
              <div className="section-header">
                <span className="section-icon">👤</span>
                <h3 className="section-title">Información Personal</h3>
              </div>
              <div className="info-grid">
                <div className="info-item">
                  <div className="info-icon">✉️</div>
                  <div className="info-content">
                    <span className="info-label">Correo Electrónico</span>
                    <span className="info-value">{usuario.correo}</span>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon">🆔</div>
                  <div className="info-content">
                    <span className="info-label">RUN</span>
                    <span className="info-value">{usuario.run}</span>
                  </div>
                </div>
                {usuario.fecha_nacimiento && (
                  <div className="info-item">
                    <div className="info-icon">🎂</div>
                    <div className="info-content">
                      <span className="info-label">Fecha de Nacimiento</span>
                      <span className="info-value">{new Date(usuario.fecha_nacimiento).toLocaleDateString('es-CL')}</span>
                    </div>
                  </div>
                )}
                <div className="info-item">
                  <div className="info-icon">📅</div>
                  <div className="info-content">
                    <span className="info-label">Miembro desde</span>
                    <span className="info-value">{new Date(usuario.fechaRegistro).toLocaleDateString('es-CL')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dirección */}
            <div className="perfil-section">
              <div className="section-header">
                <span className="section-icon">📍</span>
                <h3 className="section-title">Mi Dirección</h3>
              </div>
              <div className="info-grid">
                <div className="info-item full-width">
                  <div className="info-icon">🏠</div>
                  <div className="info-content">
                    <span className="info-label">Dirección</span>
                    <span className="info-value">{usuario.direccion}</span>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon">🗺️</div>
                  <div className="info-content">
                    <span className="info-label">Región</span>
                    <span className="info-value">{usuario.region}</span>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon">🏙️</div>
                  <div className="info-content">
                    <span className="info-label">Comuna</span>
                    <span className="info-value">{usuario.comuna}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Código de Descuento */}
            {usuario.codigo_descuento && (
              <div className="perfil-section codigo-section">
                <div className="section-header">
                  <span className="section-icon">🎫</span>
                  <h3 className="section-title">Mi Código de Descuento</h3>
                </div>
                <div className="codigo-display">
                  <span className="codigo-value">{usuario.codigo_descuento}</span>
                </div>
              </div>
            )}

            {/* Historial de Pedidos */}
            {pedidos.length > 0 && (
              <div className="perfil-section">
                <div className="section-header">
                  <span className="section-icon">📦</span>
                  <h3 className="section-title">Mis Pedidos</h3>
                </div>
                <div className="pedidos-list">
                  {pedidos.map((pedido, index) => (
                    <div key={index} className="pedido-item">
                      <div className="pedido-info">
                        <span className="pedido-fecha">
                          {new Date(pedido.fecha).toLocaleDateString('es-CL')}
                        </span>
                        <span className="pedido-total">
                          ${pedido.total.toLocaleString('es-CL')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Acciones */}
            <div className="perfil-actions">
              <Link to="/productos" className="btn-action btn-productos">
                🛍️ Ver Productos
              </Link>
              <Link to="/carrito" className="btn-action btn-carrito">
                🛒 Mi Carrito
              </Link>
              <button 
                className="btn-action btn-home"
                onClick={() => navigate('/')}
              >
                🏠 Ir a Inicio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
