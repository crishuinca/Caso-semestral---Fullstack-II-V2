import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function DetalleBlog2() {
  return (
    <div style={{ backgroundColor: '#FFF5E1', minHeight: '100vh', paddingTop: '80px' }}>
      <div className="container-fluid py-4">
        <div className="row" style={{ marginTop: '80px' }}>
          
          {}
          <div className="col-lg-3">
            <div className="card border-0" style={{ backgroundColor: '#FFC0CB', position: 'sticky', top: '150px' }}>
              <div className="card-body p-4">
                {}
                <Link 
                  to="/blogs" 
                  className="btn d-flex align-items-center mb-4"
                  style={{ 
                    backgroundColor: '#8B4513',
                    color: 'white',
                    border: 'none',
                    borderRadius: '25px',
                    padding: '10px 20px',
                    textDecoration: 'none'
                  }}
                >
                  <i className="fas fa-arrow-left me-2"></i>
                  Volver
                </Link>

                {}
                <nav aria-label="Navegación entre blogs relacionados">
                  <h3 style={{ 
                    color: '#8B4513', 
                    fontFamily: 'Pacifico, cursive', 
                    fontSize: '1.5rem',
                    marginBottom: '1rem'
                  }}>
                    Otros Blogs
                  </h3>
                
                <ol className="list-unstyled">
                  <li className="mb-2">
                    <Link 
                      to="/blog/harina-magica" 
                      style={{ 
                        color: '#5D4037',
                        textDecoration: 'none',
                        fontSize: '1rem',
                        fontWeight: 'bold'
                      }}
                      onMouseEnter={(e) => e.target.style.color = '#D2691E'}
                      onMouseLeave={(e) => e.target.style.color = '#5D4037'}
                    >
                      El Secreto de la Harina Mágica
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link 
                      to="/blog/secreto-dulzor" 
                      style={{ 
                        color: '#5D4037',
                        textDecoration: 'none',
                        fontSize: '1rem',
                        fontWeight: 'bold'
                      }}
                      onMouseEnter={(e) => e.target.style.color = '#D2691E'}
                      onMouseLeave={(e) => e.target.style.color = '#5D4037'}
                    >
                      El Secreto del Dulzor
                    </Link>
                  </li>
                </ol>
                </nav>
              </div>
            </div>
          </div>

          {}
          <div className="col-lg-9">
            <article className="card border-0" style={{ backgroundColor: '#FFFFFF' }} role="article" aria-labelledby="blog-title">
              <div className="card-body p-5">
                <h1 id="blog-title" style={{ 
                  color: '#8B4513', 
                  fontFamily: 'Pacifico, cursive', 
                  fontSize: '3rem',
                  marginBottom: '2rem',
                  textAlign: 'center'
                }}>
                  El Secreto del Dulzor
                </h1>

                <div style={{ 
                  fontSize: '1.2rem', 
                  lineHeight: '2',
                  color: '#5D4037',
                  textAlign: 'justify'
                }}>
                  <p>
                    En nuestro taller, cada pastel comienza con un secreto heredado de 
                    generaciones: la miel de una colmena que se encuentra en lo alto de las montañas.
                  </p>
                  
                  <p>
                    Esta miel, recogida a mano por apicultores locales, tiene un 
                    sabor floral único, ya que las abejas polinizan flores raras y silvestres.
                  </p>
                  
                  <p>
                    Usada en nuestras masas, no solo endulza, sino que añade una suavidad natural y un toque dorado que se fusiona perfectamente con los sabores de frutas frescas y cremosos rellenos.
                  </p>
                  
                  <p>
                    Lo mejor de todo es que, al ser cruda, conserva todas sus 
                    propiedades antioxidantes y vitaminas, lo que convierte cada bocado no solo en un placer para el paladar, sino también en un regalo para el cuerpo.
                  </p>
                  
                  <p>
                    Así, cada pastel que sale de nuestras manos es un reflejo de la pureza y el cariño con que lo hacemos.
                  </p>
                  
                  <p>
                    Pero hay algo más: 
                    la miel aporta una humedad especial que mantiene las masas tiernas
                    por más tiempo, realzando la intensidad de cada ingrediente y dando 
                    como resultado un equilibrio perfecto entre dulzura y frescura.
                  </p>

                  <p>
                    No es una simple repostería, es un homenaje a la naturaleza, a la 
                    dedicación de quienes cuidan las colmenas y a la pasión que ponemos 
                    en transformar lo sencillo en extraordinario.
                  </p>
                  
                  <p>
                    Cuando pruebas uno de nuestros pasteles, no solo disfrutas de un postre, sino de una historia que viaja desde las flores de montaña hasta tu mesa, hecha con la misma paciencia y amor con que trabajan las abejas.
                  </p>
                </div>

                {}
                <div className="row mt-5">
                  <div className="col-md-6 mb-3">
                    <img 
                      src="/img/blog2.jpg" 
                      alt="El Secreto del Dulzor - Imagen 1"
                      className="img-fluid rounded"
                      style={{ 
                        width: '100%',
                        height: '300px',
                        objectFit: 'cover',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                      }}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x300/D2691E/FFF?text=Secreto+Dulzor+1';
                      }}
                    />
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <img 
                      src="/img/blog2.1.jpg" 
                      alt="El Secreto del Dulzor - Imagen 2"
                      className="img-fluid rounded"
                      style={{ 
                        width: '100%',
                        height: '300px',
                        objectFit: 'cover',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                      }}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x300/D2691E/FFF?text=Secreto+Dulzor+2';
                      }}
                    />
                  </div>
                </div>
              </div>
            </article>
          </div>

        </div>
      </div>
    </div>
  );
}

export default DetalleBlog2;
