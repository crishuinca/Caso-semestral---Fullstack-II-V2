import React from 'react';
import { Link } from 'react-router-dom';

function LogoNavbar() {
  return (
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
  );
}

export default LogoNavbar;
