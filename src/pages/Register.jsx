import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Register.css';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    run: '',
    nombre: '',
    apellidos: '',
    correo: '',
    fecha_nacimiento: '',
    region: '',
    comuna: '',
    direccion: '',
    password: '',
    confirmPassword: '',
    codigo_descuento: ''
  });
  const [resultado, setResultado] = useState('');
  const [regiones, setRegiones] = useState([]);
  const [comunas, setComunas] = useState([]);

  const regionesComunas = {
    "Región de Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
    "Región de Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"],
    "Región de Antofagasta": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"],
    "Región de Atacama": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"],
    "Región de Coquimbo": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"],
    "Región de Valparaíso": ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Limache", "Olmué", "Villa Alemana"],
    "Región Metropolitana": ["Santiago", "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"],
    "Región del Libertador General Bernardo O'Higgins": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"],
    "Región del Maule": ["Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "Retiro", "San Javier", "Villa Alegre", "Yerbas Buenas"],
    "Región de Ñuble": ["Chillán", "Bulnes", "Cobquecura", "Coelemu", "Coihueco", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"],
    "Región del Biobío": ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío"],
    "Región de La Araucanía": ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre Las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"],
    "Región de Los Ríos": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"],
    "Región de Los Lagos": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"],
    "Región Aysén del General Carlos Ibáñez del Campo": ["Coyhaique", "Lago Verde", "Aysén", "Cisnes", "Guaitecas", "Cochrane", "O'Higgins", "Tortel", "Chile Chico", "Río Ibáñez"],
    "Región de Magallanes y de la Antártica Chilena": ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos", "Antártica", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"]
  };

  useEffect(() => {
    setRegiones(Object.keys(regionesComunas));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'region') {
      setComunas(regionesComunas[value] || []);
      setFormData(prev => ({
        ...prev,
        comuna: '' 
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.run || !formData.nombre || !formData.apellidos || !formData.correo || 
        !formData.region || !formData.comuna || !formData.direccion || !formData.password || 
        !formData.confirmPassword) {
      setResultado('Por favor complete todos los campos obligatorios (*)');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setResultado('Las contraseñas no coinciden');
      return;
    }

    if (formData.run.length < 7 || formData.run.length > 9) {
      setResultado('El RUN debe tener entre 7 y 9 caracteres');
      return;
    }

    const usuariosExistentes = JSON.parse(localStorage.getItem('usuarios') || '[]');
    if (usuariosExistentes.find(u => u.correo === formData.correo)) {
      setResultado('Ya existe un usuario con este correo electrónico');
      return;
    }

    const nuevoUsuario = {
      id: Date.now(),
      ...formData,
      fechaRegistro: new Date().toISOString()
    };

    usuariosExistentes.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuariosExistentes));

    setResultado('¡Registro exitoso! Redirigiendo al login...');

    setFormData({
      run: '',
      nombre: '',
      apellidos: '',
      correo: '',
      fecha_nacimiento: '',
      region: '',
      comuna: '',
      direccion: '',
      password: '',
      confirmPassword: '',
      codigo_descuento: ''
    });

    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h2 className="register-title">Registro de Usuario</h2>
          <p className="register-subtitle">Crea tu cuenta para disfrutar de nuestros pasteles</p>
        </div>
        <form onSubmit={handleSubmit} className="register-form" noValidate>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="run" className="form-label">RUN*</label>
              <input 
                type="text" 
                id="run" 
                name="run" 
                maxLength="9" 
                minLength="7" 
                required 
                placeholder="Ej: 19011022K"
                value={formData.run}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="nombre" className="form-label">Nombre*</label>
              <input 
                type="text" 
                id="nombre" 
                name="nombre" 
                maxLength="50" 
                required
                value={formData.nombre}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="apellidos" className="form-label">Apellidos*</label>
            <input 
              type="text" 
              id="apellidos" 
              name="apellidos" 
              maxLength="100" 
              required
              value={formData.apellidos}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="correo" className="form-label">Correo*</label>
            <input 
              type="email" 
              id="correo" 
              name="correo" 
              maxLength="100" 
              required 
              placeholder="ejemplo@duoc.cl"
              value={formData.correo}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="fecha_nacimiento" className="form-label">Fecha de nacimiento</label>
            <input 
              type="date" 
              id="fecha_nacimiento" 
              name="fecha_nacimiento"
              value={formData.fecha_nacimiento}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="region" className="form-label">Región*</label>
              <select 
                id="region" 
                name="region" 
                required
                value={formData.region}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="">Seleccione región</option>
                {regiones.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="comuna" className="form-label">Comuna*</label>
              <select 
                id="comuna" 
                name="comuna" 
                required
                value={formData.comuna}
                onChange={handleInputChange}
                className="form-input"
                disabled={!formData.region}
              >
                <option value="">Seleccione comuna</option>
                {comunas.map(comuna => (
                  <option key={comuna} value={comuna}>{comuna}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="direccion" className="form-label">Dirección*</label>
            <input 
              type="text" 
              id="direccion" 
              name="direccion" 
              maxLength="300" 
              required
              value={formData.direccion}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password" className="form-label">Contraseña*</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                maxLength="30" 
                required
                value={formData.password}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña*</label>
              <input 
                type="password" 
                id="confirmPassword" 
                name="confirmPassword" 
                maxLength="30" 
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="codigo_descuento" className="form-label">Código de descuento</label>
            <input 
              type="text" 
              id="codigo_descuento" 
              name="codigo_descuento" 
              maxLength="20" 
              placeholder="Opcional"
              value={formData.codigo_descuento}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>

          <button type="submit" className="register-button">
            Registrarse
          </button>

          {resultado && (
            <div className="error-message">
              {resultado}
            </div>
          )}
        </form>
        
        <div className="login-link">
          <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;
