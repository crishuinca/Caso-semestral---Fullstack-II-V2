import React from 'react';
import { Link } from 'react-router-dom';

function EnlacesNavegacion({ cantidadTotal }) {
  return (
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
    </ul>
  );
}

export default EnlacesNavegacion;
