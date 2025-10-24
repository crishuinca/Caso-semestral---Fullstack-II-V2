import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  const usuario = JSON.parse(localStorage.getItem("usuarioActual") || "null");
  if(!localStorage.getItem("historial_boletas")){localStorage.setItem("historial_boletas", JSON.stringify([]))}

  return (
    <div style={{ backgroundColor: '#FFF5E1', minHeight: '100vh', paddingTop: '290px' }}>
      {}
      <div className="text-center py-4" style={{ marginTop: '50px' }}>
        <h1 style={{ 
          color: '#8B4513', 
          fontFamily: 'Pacifico, cursive', 
          fontSize: '3rem' 
        }}>
          {usuario ? `¡Bienvenido ${usuario.nombre}!` : 'Bienvenido'}
        </h1>
      </div>

      {}
      <div className="text-center mb-4">
        <img 
          src="/img/imagen_fondo.png" 
          alt="Imagen principal" 
          className="img-fluid rounded"
          style={{ maxHeight: '400px' }}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/800x400/8B4513/FFF8DC?text=Mil+Sabores';
          }}
        />
      </div>

      {}
      <div className="container">
        <div className="row g-4">
          {}
          <div className="col-md-6">
            <div className="card h-100 shadow">
              <div className="card-body text-center">
                <h2 style={{ color: '#8B4513', fontFamily: 'Pacifico, cursive' }}>
                  ¿Buscas algún producto?
                </h2>
                <p className="text-muted">
                  Descubre nuestras deliciosas tortas y postres
                </p>
                
                {}
                <div id="productCarousel" className="carousel slide mb-3" data-bs-ride="carousel">
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img 
                        src="/img/PT001.jpg" 
                        className="d-block w-100 rounded" 
                        alt="Torta 1"
                        style={{ height: '200px', objectFit: 'cover' }}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x200/D2691E/FFF?text=Producto+1';
                        }}
                      />
                    </div>
                    <div className="carousel-item">
                      <img 
                        src="/img/PT002.jpg" 
                        className="d-block w-100 rounded" 
                        alt="Torta 2"
                        style={{ height: '200px', objectFit: 'cover' }}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x200/D2691E/FFF?text=Producto+2';
                        }}
                      />
                    </div>
                    <div className="carousel-item">
                      <img 
                        src="/img/PG001.jpg" 
                        className="d-block w-100 rounded" 
                        alt="Postre 1"
                        style={{ height: '200px', objectFit: 'cover' }}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x200/D2691E/FFF?text=Postre+1';
                        }}
                      />
                    </div>
                  </div>
                  <button 
                    className="carousel-control-prev" 
                    type="button" 
                    data-bs-target="#productCarousel" 
                    data-bs-slide="prev"
                  >
                    <span className="carousel-control-prev-icon"></span>
                  </button>
                  <button 
                    className="carousel-control-next" 
                    type="button" 
                    data-bs-target="#productCarousel" 
                    data-bs-slide="next"
                  >
                    <span className="carousel-control-next-icon"></span>
                  </button>
                </div>
                
                <Link 
                  to="/productos" 
                  className="btn text-white rounded-pill px-4"
                  style={{ backgroundColor: '#D2691E' }}
                >
                  Ver Catálogo
                </Link>
              </div>
            </div>
          </div>

          {}
          <div className="col-md-6">
            <div className="card h-100 shadow">
              <div className="card-body text-center">
                <h2 style={{ color: '#8B4513', fontFamily: 'Pacifico, cursive' }}>
                  Conócenos
                </h2>
                <p className="text-muted">
                  Descubre nuestra historia, misión y valores
                </p>
                <img 
                  src="/img/nosotros.jpg" 
                  alt="Nosotros" 
                  className="img-fluid rounded mb-3"
                  style={{ height: '200px', objectFit: 'cover', width: '100%' }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200/8B4513/FFF?text=Nosotros';
                  }}
                />
                <Link 
                  to="/nosotros" 
                  className="btn text-white rounded-pill px-4"
                  style={{ backgroundColor: '#D2691E' }}
                >
                  Conocer más
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {}
      <footer 
        className="text-center text-white py-3 mt-5"
        style={{ backgroundColor: '#8B4513' }}
      >
        &copy; 2025 Mil Sabores. Todos los derechos reservados.
      </footer>
    </div>
  );
}

export default Home;
