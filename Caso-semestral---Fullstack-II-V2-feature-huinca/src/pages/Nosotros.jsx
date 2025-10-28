import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Nosotros.css';
import EncabezadoNosotros from '../components/nosotros/EncabezadoNosotros';
import SeccionHistoria from '../components/nosotros/SeccionHistoria';
import SeccionMision from '../components/nosotros/SeccionMision';
import SeccionVision from '../components/nosotros/SeccionVision';
import SeccionContacto from '../components/nosotros/SeccionContacto';

function Nosotros() {
  return (
    <div className="cuerpo-nosotros">
      <div className="container py-4">
        <EncabezadoNosotros />
        
        <SeccionHistoria />
        
        <SeccionMision />
        
        <SeccionVision />
        
        <SeccionContacto />

        <section className="text-center mb-5">
          <img 
            src="/img/Logotipo_pasteleria.png" 
            alt="Logotipo Pastelería Mil Sabores"
            className="logo-nosotros"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/200x120/D2691E/FFF?text=Mil+Sabores';
            }}
          />
        </section>
      </div>
    </div>
  );
}

export default Nosotros;
