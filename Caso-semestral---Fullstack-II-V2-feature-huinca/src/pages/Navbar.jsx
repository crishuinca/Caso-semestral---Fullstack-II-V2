import { useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Navbar.css';
import LogoNavbar from '../components/navbar/LogoNavbar';
import EnlacesNavegacion from '../components/navbar/EnlacesNavegacion';
import SeccionUsuario from '../components/navbar/SeccionUsuario';

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
        className="navbar navbar-expand-lg custom-navbar fixed-top" 
        style={{ backgroundColor: '#FFC0CB' }}
        role="navigation"
        aria-label="Navegación principal"
      >
        <div className="container-fluid px-4">
          <LogoNavbar />
          
          <button 
            className="navbar-toggler border-0" 
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
            <EnlacesNavegacion cantidadTotal={cantidadTotal} />
            <SeccionUsuario usuarioActual={usuarioActual} cerrarSesion={cerrarSesion} />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
