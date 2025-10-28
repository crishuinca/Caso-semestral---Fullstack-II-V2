import React from 'react';
import { Link } from 'react-router-dom';

function SeccionNosotrosHome() {
  return (
    <div className="col-md-6">
      <div className="card h-100 shadow tarjeta-home">
        <div className="card-body text-center">
          <h2 className="titulo-seccion-home">Conócenos</h2>
          <p className="text-muted">Descubre nuestra historia, misión y valores</p>
          <img
            src="/img/nosotros.jpg"
            alt="Nosotros"
            className="img-fluid rounded mb-3 imagen-seccion"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x200/8B4513/FFF?text=Nosotros';
            }}
          />
          <Link to="/nosotros" className="btn text-white rounded-pill px-4 boton-nosotros">
            Conocer más
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SeccionNosotrosHome;
