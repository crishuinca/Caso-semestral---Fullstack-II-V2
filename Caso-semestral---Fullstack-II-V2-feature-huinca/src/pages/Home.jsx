import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Home.css';
import EncabezadoHome from '../components/home/EncabezadoHome';
import SeccionProductosHome from '../components/home/SeccionProductosHome';
import SeccionNosotrosHome from '../components/home/SeccionNosotrosHome';

function Home() {
  const usuario = JSON.parse(localStorage.getItem("usuarioActual") || "null");

  return (
    <div className="cuerpo-home">
      <EncabezadoHome usuario={usuario} />

      {}
      <div className="container">
        <div className="mb-4">
          <img
            src="/img/imagen_fondo.png"
            alt="Imagen principal"
            className="img-fluid rounded imagen-principal"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/800x400/8B4513/FFF8DC?text=Mil+Sabores';
            }}
          />
        </div>
        <div className="row g-4">
          <SeccionProductosHome />

          <SeccionNosotrosHome />
        </div>
      </div>

      {}
      <footer className="text-center text-white py-3 mt-5 pie-home">
        &copy; 2025 Mil Sabores. Todos los derechos reservados.
      </footer>
    </div>
  );
}

export default Home;
