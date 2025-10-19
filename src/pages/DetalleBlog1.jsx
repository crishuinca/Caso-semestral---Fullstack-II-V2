import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function DetalleBlog1() {
  return (
    <div className="container-fluid" style={{ 
      backgroundColor: '#FFF5E1', 
      minHeight: '100vh',
      paddingTop: '400px'
    }}>
      <div className="container-fluid py-4">
        <div className="row" style={{ marginTop: '80px' }}>
          
          {}
          <div className="col-lg-3">
            <aside className="card border-0" style={{ backgroundColor: '#FFC0CB', position: 'sticky', top: '150px' }} role="complementary" aria-label="Navegación y enlaces relacionados">
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
              </div>
            </aside>
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
                  El Secreto de la Harina Mágica
                </h1>

                <div style={{ 
                  fontSize: '1.2rem', 
                  lineHeight: '2',
                  color: '#5D4037',
                  textAlign: 'justify'
                }}>
                  <p>
                    Nuestra repostería se distingue por el uso de una harina especial,
                    que proviene de una molienda ancestral.
                  </p>
                  
                  <p>
                    Se obtiene de un trigo cultivado en una pequeña granja familiar, donde cada grano se selecciona a mano 
                    y se tritura en un molino de piedra centenario.
                  </p>
                  
                  <p>
                    Este proceso artesanal, lejos de la producción industrial, preserva 
                    las propiedades naturales del cereal, dándole a nuestras masas una textura incomparable: 
                    una miga ligera y aireada, que se deshace en la boca, 
                    pero con una estructura firme que soporta los rellenos más generosos.
                  </p>
                  
                  <p>
                    Cada pastel que elaboramos guarda en su interior esta dedicación: 
                    capas suaves y esponjosas que parecen respirar, 
                    rellenos abundantes preparados con ingredientes frescos y de temporada, y un aroma inconfundible que invade el ambiente apenas sale del horno.
                  </p>

                  <p>
                    El sabor no es solo el resultado de una receta, sino la herencia de 
                    una tradición transmitida de generación en generación, donde lo simple 
                    se convierte en extraordinario.
                  </p>

                  <p>
                    Nuestros clientes no solo prueban un pastel: 
                    descubren una experiencia que despierta recuerdos, que conecta con la
                    esencia de lo hecho a mano y con la calidez de lo auténtico.
                  </p>

                  <p>
                    Por eso, cada bocado es distinto a todo lo que se encuentra en el mercado, un equilibrio entre delicadeza y abundancia, entre historia y presente, que convierte a nuestros pasteles en un verdadero homenaje al arte de la repostería artesanal.
                  </p>
                </div>

                {}
                <div className="row mt-5">
                  <div className="col-md-6 mb-3">
                    <img 
                      src="/img/blog1.jpg" 
                      alt="El Secreto de la Harina Mágica - Imagen 1"
                      className="img-fluid rounded"
                      style={{ 
                        width: '100%',
                        height: '300px',
                        objectFit: 'cover',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                      }}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x300/D2691E/FFF?text=Harina+Magica+1';
                      }}
                    />
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <img 
                      src="/img/blog1.2.jpg" 
                      alt="El Secreto de la Harina Mágica - Imagen 2"
                      className="img-fluid rounded"
                      style={{ 
                        width: '100%',
                        height: '300px',
                        objectFit: 'cover',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                      }}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x300/D2691E/FFF?text=Harina+Magica+2';
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

export default DetalleBlog1;
