import React from 'react';
import { Link } from 'react-router-dom';

function SeccionUsuario({ usuarioActual, cerrarSesion }) {
  return (
    <ul className="navbar-nav ms-2" role="menubar">
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
  );
}

export default SeccionUsuario;
