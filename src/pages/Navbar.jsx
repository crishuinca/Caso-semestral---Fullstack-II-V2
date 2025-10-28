import { Link, useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Navbar.css';

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

  const cerrarNavbar = (e) => {
    // Obtener el elemento del navbar
    const navCollapse = document.getElementById('navbarNav');
    if (navCollapse && navCollapse.classList.contains('show')) {
      // Quitar la clase show para cerrar el menú
      navCollapse.classList.remove('show');
      // Actualizar el aria-expanded del botón
      const navbarToggler = document.querySelector('.navbar-toggler');
      if (navbarToggler) {
        navbarToggler.setAttribute('aria-expanded', 'false');
      }
    }
    
    // Pequeño delay para asegurar que el navegador procese la navegación
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 50);
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
              height="50"
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
                  onClick={cerrarNavbar}
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
                  onClick={cerrarNavbar}
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
                  onClick={cerrarNavbar}
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
                  onClick={cerrarNavbar}
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
                  onClick={cerrarNavbar}
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
                  onClick={cerrarNavbar}
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
                  {!usuarioActual.isAdmin && (
                    <li className="nav-item" role="none">
                      <Link 
                        className="nav-link px-4 py-2 rounded" 
                        to="/perfil"
                        style={{ color: '#8B4513' }}
                        role="menuitem"
                        aria-label="Ver mi perfil"
                        onClick={cerrarNavbar}
                      >
                        Mi Perfil
                      </Link>
                    </li>
                  )}
                  <li className="nav-item" role="none">
                    <button
                      className="nav-link px-4 py-2 rounded btn btn-link"
                      onClick={() => {
                        cerrarNavbar();
                        cerrarSesion();
                      }}
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
                        onClick={cerrarNavbar}
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
                    onClick={cerrarNavbar}
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
