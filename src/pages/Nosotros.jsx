import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../components/footer/Footer';

function Nosotros() {
  return (
    <div style={{ backgroundColor: '#FFF5E1', minHeight: '100vh', paddingTop: '80px' }}>
      <div className="container py-4">
        {}
        <div className="text-center mb-5" style={{ marginTop: '80px' }}>
          <h1 style={{ 
            color: '#8B4513', 
            fontFamily: 'Pacifico, cursive', 
            fontSize: '3.5rem',
            marginBottom: '2rem'
          }}>
            Nosotros
          </h1>
        </div>

        {}
        <section className="mb-5">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <div className="card border-0" style={{ backgroundColor: '#FFFFFF' }}>
                <div className="card-body p-4">
                  <h2 style={{ 
                    color: '#8B4513', 
                    fontFamily: 'Pacifico, cursive', 
                    fontSize: '2.5rem',
                    marginBottom: '1.5rem'
                  }}>
                    Nuestra Historia
                  </h2>
                  <p style={{ 
                    fontSize: '1.1rem', 
                    lineHeight: '1.8',
                    color: '#5D4037',
                    textAlign: 'justify'
                  }}>
                    Pastelería Mil Sabores celebra con orgullo su 50° aniversario como un referente de la repostería chilena. 
                    A lo largo de estos años, hemos sido reconocidos por nuestra calidad, creatividad y dedicación a ofrecer 
                    productos excepcionales. Un hito memorable de nuestra historia fue en 1995, cuando formamos parte del equipo 
                    que logró un récord Guinness al crear la torta más grande del mundo, un logro que consolidó nuestro lugar 
                    en la historia de la pastelería.
                  </p>
                  <p style={{ 
                    fontSize: '1.1rem', 
                    lineHeight: '1.8',
                    color: '#5D4037',
                    textAlign: 'justify'
                  }}>
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
                  className="img-fluid rounded"
                  style={{ maxHeight: '400px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x400/D2691E/FFF?text=Nuestro+Equipo';
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {}
        <section className="mb-5">
          <div className="row align-items-center">
            <div className="col-lg-4">
              <div className="text-center">
                <img 
                  src="/img/nosotros.mision.jpg" 
                  alt="Misión Pastelería Mil Sabores"
                  className="img-fluid rounded"
                  style={{ maxHeight: '350px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x350/D2691E/FFF?text=Nuestra+Mision';
                  }}
                />
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card border-0" style={{ backgroundColor: '#FFFFFF' }}>
                <div className="card-body p-4">
                  <h2 style={{ 
                    color: '#8B4513', 
                    fontFamily: 'Pacifico, cursive', 
                    fontSize: '2.5rem',
                    marginBottom: '1.5rem'
                  }}>
                    Nuestra Misión
                  </h2>
                  <p style={{ 
                    fontSize: '1.1rem', 
                    lineHeight: '1.8',
                    color: '#5D4037',
                    textAlign: 'justify'
                  }}>
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

        {}
        <section className="mb-5">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card border-0" style={{ backgroundColor: '#FFFFFF' }}>
                <div className="card-body p-4 text-center">
                  <h2 style={{ 
                    color: '#8B4513', 
                    fontFamily: 'Pacifico, cursive', 
                    fontSize: '2.5rem',
                    marginBottom: '1.5rem'
                  }}>
                    Nuestra Visión
                  </h2>
                  <p style={{ 
                    fontSize: '1.1rem', 
                    lineHeight: '1.8',
                    color: '#5D4037',
                    textAlign: 'justify'
                  }}>
                    En Pastelería Mil Sabores, aspiramos a convertirnos en la tienda online líder de productos de repostería 
                    en Chile, destacándonos por nuestra innovación, calidad y el impacto positivo en la comunidad. Nos 
                    enorgullece fomentar el crecimiento de nuevos talentos en gastronomía, apoyando el desarrollo de futuras 
                    generaciones de reposteros y chefs, y llevando la tradición pastelera chilena a nuevas alturas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {}
        <section className="mb-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card border-0" style={{ backgroundColor: '#FFC0CB' }}>
                <div className="card-body p-4 text-center">
                  <h2 style={{ 
                    color: '#8B4513', 
                    fontFamily: 'Pacifico, cursive', 
                    fontSize: '2.5rem',
                    marginBottom: '1.5rem'
                  }}>
                    Búscanos
                  </h2>
                  <p style={{ 
                    fontSize: '1.2rem', 
                    color: '#5D4037',
                    marginBottom: '1.5rem'
                  }}>
                    Nos puedes escribir, llamar o visitar.
                  </p>
                  
                  <div className="row text-start">
                    <div className="col-md-4 mb-3">
                      <div className="d-flex align-items-center">
                        <i className="fas fa-envelope me-3" style={{ color: '#D2691E', fontSize: '1.5rem' }}></i>
                        <div>
                          <strong style={{ color: '#8B4513' }}>Email:</strong><br />
                          <span style={{ color: '#5D4037' }}>contacto@milsabores.cl</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-md-4 mb-3">
                      <div className="d-flex align-items-center">
                        <i className="fas fa-phone me-3" style={{ color: '#D2691E', fontSize: '1.5rem' }}></i>
                        <div>
                          <strong style={{ color: '#8B4513' }}>Teléfono:</strong><br />
                          <span style={{ color: '#5D4037' }}>+56 9 1234 5678</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-md-4 mb-3">
                      <div className="d-flex align-items-center">
                        <i className="fas fa-map-marker-alt me-3" style={{ color: '#D2691E', fontSize: '1.5rem' }}></i>
                        <div>
                          <strong style={{ color: '#8B4513' }}>Dirección:</strong><br />
                          <span style={{ color: '#5D4037' }}>Av. Buenaventura 123, Santiago, Chile</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {}
        <section className="text-center mb-5">
          <img 
            src="/img/Logotipo_pasteleria.png" 
            alt="Logotipo Pastelería Mil Sabores"
            style={{ maxHeight: '120px', opacity: 0.8 }}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/200x120/D2691E/FFF?text=Mil+Sabores';
            }}
          />
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Nosotros;
