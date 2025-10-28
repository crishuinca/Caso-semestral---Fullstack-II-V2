import React from 'react';
import { Link } from 'react-router-dom';

function SeccionProductosHome() {
  return (
    <div className="col-md-6">
      <div className="card h-100 shadow tarjeta-home">
        <div className="card-body text-center">
          <h2 className="titulo-seccion-home">¿Buscas algún producto?</h2>
          <p className="text-muted">Descubre nuestras deliciosas tortas y postres</p>

          <div id="productCarousel" className="carousel slide mb-3" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="/img/PT001.jpg"
                  className="d-block w-100 rounded imagen-seccion"
                  alt="Torta 1"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200/D2691E/FFF?text=Producto+1';
                  }}
                />
              </div>
              <div className="carousel-item">
                <img
                  src="/img/PT002.jpg"
                  className="d-block w-100 rounded imagen-seccion"
                  alt="Torta 2"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200/D2691E/FFF?text=Producto+2';
                  }}
                />
              </div>
              <div className="carousel-item">
                <img
                  src="/img/PG001.jpg"
                  className="d-block w-100 rounded imagen-seccion"
                  alt="Postre 1"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200/D2691E/FFF?text=Postre+1';
                  }}
                />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon"></span>
            </button>
          </div>

          <Link to="/productos" className="btn text-white rounded-pill px-4 boton-catalogo">
            Ver Catálogo
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SeccionProductosHome;
