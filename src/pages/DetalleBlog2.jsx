import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/DetalleBlog.css';
import AsideBlogs from '../components/blogs/AsideBlogs';

function DetalleBlog2() {
  return (
    <div className="cuerpo-detalle-blog">
      <div className="container-fluid py-4">
        <div className="row fila-detalle-margen">
          
          {}
          <div className="col-lg-3">
            <AsideBlogs />
          </div>

          {}
          <div className="col-lg-9">
            <article className="card tarjeta-articulo" role="article" aria-labelledby="blog-title">
              <div className="card-body p-5">
                <h1 id="blog-title" className="titulo-articulo">
                  El Secreto del Dulzor
                </h1>

                <div className="contenido-articulo">
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
                      className="img-fluid rounded imagen-articulo"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x300/D2691E/FFF?text=Secreto+Dulzor+1';
                      }}
                    />
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <img 
                      src="/img/blog2.1.jpg" 
                      alt="El Secreto del Dulzor - Imagen 2"
                      className="img-fluid rounded imagen-articulo"
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
