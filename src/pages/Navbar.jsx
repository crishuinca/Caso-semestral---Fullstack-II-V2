import { Link, useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
  const { obtenerCantidadTotal } = useCarrito();
  const navigate = useNavigate();
  const cantidadTotal = obtenerCantidadTotal();
  const [usuarioActual, setUsuarioActual] = useState(null);

  useEffect(() => {
    
    const usuario = JSON.parse(localStorage.getItem('usuarioActual') || 'null');
    setUsuarioActual(usuario);

    const handleStorageChange = () => {
      const usuarioActualizado = JSON.parse(localStorage.getItem('usuarioActual') || 'null');
      setUsuarioActual(usuarioActualizado);
    };

    window.addEventListener('storage', handleStorageChange);
    
    window.addEventListener('usuarioActualizado', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('usuarioActualizado', handleStorageChange);
    };
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('usuarioActual');
    setUsuarioActual(null);
    
    window.dispatchEvent(new Event('usuarioActualizado'));
    navigate('/');
  };
  return (
    <header>
      <nav 
        className="navbar navbar-expand-lg custom-navbar fixed-top pt-1 pb-1" 
        style={{ backgroundColor: '#FFC0CB' }}
        role="navigation"
        aria-label="Navegación principal"
      >
        <div className="container-fluid px-4">
          <Link 
            className="navbar-brand text-white d-flex align-items-center" 
            to="/"
            aria-label="Ir a página principal de Mil Sabores"
          >
            <img 
              src="/img/Logotipo_pasteleria.png" 
              alt="Logo de Pastelería Mil Sabores" 
              height="70"
              className="me-2"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </Link>
          
          <button 
            className="navbar-toggler border-0 " 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Alternar menú de navegación"
            style={{ boxShadow: 'none' }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto" role="menubar">
              <li className="nav-item" role="none">
                <Link 
                  className="nav-link px-4 py-2 rounded" 
                  to="/" 
                  style={{ color: '#8B4513' }}
                  role="menuitem"
                  aria-label="Ir a página de inicio"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item" role="none">
                <Link 
                  className="nav-link px-4 py-2 rounded" 
                  to="/productos" 
                  style={{ color: '#8B4513' }}
                  role="menuitem"
                  aria-label="Ver catálogo de productos"
                >
                  Productos
                </Link>
              </li>
              <li className="nav-item" role="none">
                <Link 
                  className="nav-link px-4 py-2 rounded" 
                  to="/nosotros" 
                  style={{ color: '#8B4513' }}
                  role="menuitem"
                  aria-label="Conocer sobre nosotros"
                >
                  Nosotros
                </Link>
              </li>
              <li className="nav-item" role="none">
                <Link 
                  className="nav-link px-4 py-2 rounded" 
                  to="/blogs" 
                  style={{ color: '#8B4513' }}
                  role="menuitem"
                  aria-label="Leer nuestros blogs"
                >
                  Blogs
                </Link>
              </li>
              <li className="nav-item" role="none">
                <Link 
                  className="nav-link px-4 py-2 rounded" 
                  to="/contacto" 
                  style={{ color: '#8B4513' }}
                  role="menuitem"
                  aria-label="Información de contacto"
                >
                  Contacto
                </Link>
              </li>
              <li className="nav-item" role="none">
                <Link 
                  className="nav-link px-4 py-2 rounded position-relative" 
                  to="/carrito"
                  style={{ color: '#8B4513' }}
                  role="menuitem"
                  aria-label="Ver carrito de compras"
                >
                  <i className="fas fa-cart-shopping me-2"></i>
                  Carrito
                  {cantidadTotal > 0 && (
                    <span 
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                      style={{ fontSize: '0.75rem' }}
                    >
                      {cantidadTotal}
                      <span className="visually-hidden">productos en carrito</span>
                    </span>
                  )}
                </Link>
              </li>
              {usuarioActual ? (
                <>
                  <li className="nav-item" role="none">
                    <button
                      className="nav-link px-4 py-2 rounded btn btn-link"
                      onClick={cerrarSesion}
                      style={{ color: '#8B4513', textDecoration: 'none', border: 'none' }}
                      role="menuitem"
                      aria-label="Cerrar sesión"
                    >
                      Cerrar Sesión
                    </button>
                  </li>
                  {usuarioActual.isAdmin && (
                    <li className="nav-item" role="none">
                      <Link 
                        className="nav-link px-4 py-2 rounded" 
                        to="/admin"
                        style={{ color: '#8B4513' }}
                        role="menuitem"
                        aria-label="Panel de administración"
                      >
                        Panel de Admin
                      </Link>
                    </li>
                  )}
                </>
              ) : (
                <li className="nav-item" role="none">
                  <Link 
                    className="nav-link px-4 py-2 rounded" 
                    to="/login"
                    style={{ color: '#8B4513' }}
                    role="menuitem"
                    aria-label="Iniciar sesión"
                  >
                    Iniciar sesión
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
