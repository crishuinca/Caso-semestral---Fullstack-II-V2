import React from 'react';

function SeccionContacto() {
  return (
    <section className="mb-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 tarjeta-contacto">
            <div className="card-body p-4 text-center">
              <h2 className="titulo-seccion-nosotros">
                Búscanos
              </h2>
              <p className="texto-contacto">
                Nos puedes escribir, llamar o visitar.
              </p>
              
              <div className="row text-start">
                <div className="col-md-4 mb-3">
                  <div className="d-flex align-items-center">
                    <i className="fas fa-envelope me-3 icono-contacto"></i>
                    <div>
                      <strong className="etiqueta-contacto">Email:</strong><br />
                      <span className="dato-contacto">contacto@milsabores.cl</span>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-4 mb-3">
                  <div className="d-flex align-items-center">
                    <i className="fas fa-phone me-3 icono-contacto"></i>
                    <div>
                      <strong className="etiqueta-contacto">Teléfono:</strong><br />
                      <span className="dato-contacto">+56 9 1234 5678</span>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-4 mb-3">
                  <div className="d-flex align-items-center">
                    <i className="fas fa-map-marker-alt me-3 icono-contacto"></i>
                    <div>
                      <strong className="etiqueta-contacto">Dirección:</strong><br />
                      <span className="dato-contacto">Av. Buenaventura 123, Santiago, Chile</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SeccionContacto;
