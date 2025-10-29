import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../components/Footer';

function Home() {
  const usuario = JSON.parse(localStorage.getItem("usuarioActual") || "null");
  
  // Inicializar historial de boletas con datos de ejemplo si está vacío
  if(!localStorage.getItem("historial_boletas")){
    const boletasEjemplo = [
      {
        n_boleta: "HBLT_0",
        recibidor: {
          nombre_recibidor: "Juan Pérez",
          rut_recibidor: "12345678-9",
          direccion_recibidor: "Av. Principal 123, Santiago"
        },
        comprador: {
          nombre_comprador: "María González",
          rut_comprador: "98765432-1",
          fecha_compra: "2024-10-28T10:30:00"
        },
        productos_comprados: [
          {
            codigo_producto: "TC001",
            cantidad_producto: "2"
          },
          {
            codigo_producto: "TT001", 
            cantidad_producto: "1"
          }
        ]
      },
      {
        n_boleta: "HBLT_1",
        recibidor: {
          nombre_recibidor: "Ana Silva",
          rut_recibidor: "11223344-5",
          direccion_recibidor: "Los Pinos 456, Providencia"
        },
        comprador: {
          nombre_comprador: "Carlos Rojas",
          rut_comprador: "55667788-9",
          fecha_compra: "2024-10-27T15:45:00"
        },
        productos_comprados: [
          {
            codigo_producto: "TC002",
            cantidad_producto: "1"
          },
          {
            codigo_producto: "CU001",
            cantidad_producto: "6"
          }
        ]
      }
    ];
    localStorage.setItem("historial_boletas", JSON.stringify(boletasEjemplo));
  }

  return (
    <div style={{ backgroundColor: '#FFF5E1', minHeight: '100vh', paddingTop: '80px' }}>
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
      <div className="container mb-4">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="text-center">
              <img 
                src="/img/imagen_fondo.png" 
                alt="Imagen principal" 
                className="img-fluid rounded"
                style={{ 
                  maxHeight: '400px',
                  width: '100%',
                  maxWidth: '100%',
                  objectFit: 'cover'
                }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x400/8B4513/FFF8DC?text=Mil+Sabores';
                }}
              />
            </div>
          </div>
        </div>
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
      <Footer />
    </div>
  );
}

export default Home;
