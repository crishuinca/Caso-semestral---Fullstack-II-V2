import React from 'react';

function SeccionHistoria() {
  return (
    <section className="mb-5">
      <div className="row align-items-center">
        <div className="col-lg-8">
          <div className="card border-0 tarjeta-nosotros">
            <div className="card-body p-4">
              <h2 className="titulo-seccion-nosotros">
                Nuestra Historia
              </h2>
              <p className="texto-nosotros">
                Pastelería Mil Sabores celebra con orgullo su 50° aniversario como un referente de la repostería chilena. 
                A lo largo de estos años, hemos sido reconocidos por nuestra calidad, creatividad y dedicación a ofrecer 
                productos excepcionales. Un hito memorable de nuestra historia fue en 1995, cuando formamos parte del equipo 
                que logró un récord Guinness al crear la torta más grande del mundo, un logro que consolidó nuestro lugar 
                en la historia de la pastelería.
              </p>
              <p className="texto-nosotros">
                Hoy, medio siglo después, nos encontramos renovando nuestra presencia en el mundo digital. Queremos ofrecer 
                una experiencia de compra en línea moderna, ágil y accesible, para que nuestros clientes puedan disfrutar 
                de la misma calidad que nos ha caracterizado, pero con la comodidad y facilidad de las nuevas tecnologías.
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="text-center">
            <img 
              src="/img/nosotros.jpg" 
              alt="Equipo Pastelería Mil Sabores"
              className="img-fluid rounded imagen-nosotros"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x400/D2691E/FFF?text=Nuestro+Equipo';
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SeccionHistoria;
