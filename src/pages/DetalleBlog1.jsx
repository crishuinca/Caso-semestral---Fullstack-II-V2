import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/DetalleBlog.css';
import AsideBlogs from '../components/blogs/AsideBlogs';

function DetalleBlog1() {
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
                  El Secreto de la Harina Mágica
                </h1>

                <div className="contenido-articulo">
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
                      className="img-fluid rounded imagen-articulo"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x300/D2691E/FFF?text=Harina+Magica+1';
                      }}
                    />
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <img 
                      src="/img/blog1.2.jpg" 
                      alt="El Secreto de la Harina Mágica - Imagen 2"
                      className="img-fluid rounded imagen-articulo"
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
