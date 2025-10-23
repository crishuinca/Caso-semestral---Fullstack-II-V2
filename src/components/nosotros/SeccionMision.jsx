import React from 'react';

function SeccionMision() {
  return (
    <section className="mb-5">
      <div className="row align-items-center">
        <div className="col-lg-4">
          <div className="text-center">
            <img 
              src="/img/nosotros.mision.jpg" 
              alt="Misión Pastelería Mil Sabores"
              className="img-fluid rounded imagen-mision"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x350/D2691E/FFF?text=Nuestra+Mision';
              }}
            />
          </div>
        </div>
        <div className="col-lg-8">
          <div className="card border-0 tarjeta-nosotros">
            <div className="card-body p-4">
              <h2 className="titulo-seccion-nosotros">
                Nuestra Misión
              </h2>
              <p className="texto-nosotros">
                En Pastelería Mil Sabores, nos comprometemos a ofrecer una experiencia dulce y memorable a nuestros clientes, 
                brindando tortas y productos de repostería de alta calidad para todas las ocasiones. Celebramos nuestras 
                raíces históricas y, al mismo tiempo, fomentamos la creatividad en cada receta, buscando siempre sorprender 
                y deleitar a quienes eligen nuestros productos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SeccionMision;
