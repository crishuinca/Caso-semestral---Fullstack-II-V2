import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Blogs.css';

function Blogs() {
  return (
    <div className="blogs-container">
      <div className="container py-4">
        <div className="text-center mb-5 blogs-header">
          <h1 className="blogs-title">
            Nuestro Blog
          </h1>
          <p className="blogs-subtitle">
            Conoce los secretos, ingredientes y tradiciones que inspiran cada uno de nuestros pasteles
          </p>
        </div>

        <div className="mb-5">
          <div className="card border-0 blog-card">
            <div className="row no-gutters align-items-center">
              <div className="col-lg-8">
                <div className="card-body p-5">
                  <h2 id="blog1-title" className="blog-title">
                    El Secreto de la Harina Mágica
                  </h2>
                  <p className="blog-content">
                    Nuestra repostería se distingue por el uso de una harina especial, que proviene de una molienda ancestral. 
                    Se obtiene de un trigo cultivado en una pequeña granja familiar, donde cada grano se selecciona a mano 
                    y se tritura en un molino de piedra centenario. Este proceso artesanal, lejos de la producción industrial,
                    preserva las propiedades naturales del cereal, dándole a nuestras masas una textura incomparable:
                    una miga ligera y aireada, que se deshace en la boca, pero con una estructura firme que soporta los rellenos más generosos.
                    El resultado son pasteles con un sabor más profundo y un aroma que evoca la calidez de un hogar,
                    una experiencia que simplemente no se puede replicar con harinas convencionales.
                  </p>
                  <Link 
                    to="/blog/harina-magica"
                    className="btn text-white px-4 py-2 blog-button"
                  >
                    VER BLOG
                  </Link>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="p-3">
                  <img 
                    src="/img/blog1.jpg" 
                    alt="El Secreto de la Harina Mágica"
                    className="img-fluid rounded blog-image"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x350/D2691E/FFF?text=Harina+Magica';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-5">
          <div className="card border-0 blog-card">
            <div className="row no-gutters align-items-center">
              <div className="col-lg-4">
                <div className="p-3">
                  <img 
                    src="/img/blog2.jpg" 
                    alt="El Secreto del Dulzor"
                    className="img-fluid rounded blog-image"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x350/D2691E/FFF?text=Secreto+Dulzor';
                    }}
                  />
                </div>
              </div>
              <div className="col-lg-8">
                <div className="card-body p-5">
                  <h2 id="blog2-title" className="blog-title">
                    El Secreto del Dulzor
                  </h2>
                  <p className="blog-content">
                    En nuestro taller, cada pastel comienza con un secreto heredado de generaciones: la miel de una colmena 
                    que se encuentra en lo alto de las montañas. Esta miel, recogida a mano por apicultores locales, tiene 
                    un sabor floral único, ya que las abejas polinizan flores raras y silvestres. Usada en nuestras masas, 
                    no solo endulza, sino que añade una suavidad natural y un toque dorado que se fusiona perfectamente con 
                    los sabores de frutas frescas y cremosos rellenos. Lo mejor de todo es que, al ser cruda, conserva todas 
                    sus propiedades antioxidantes y vitaminas, lo que convierte cada bocado no solo en un placer para el paladar,
                    sino también en un regalo para el cuerpo. Así, cada pastel que sale de nuestras manos es un reflejo de 
                    la pureza y el cariño con que lo hacemos.
                  </p>
                  <Link 
                    to="/blog/secreto-dulzor"
                    className="btn text-white px-4 py-2 blog-button"
                  >
                    VER BLOG
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Blogs;
