import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import '../styles/AdminPanel.css';

function AdminPanel() {
  const navigate = useNavigate();
  const { productosDisponibles, productosStock, mostrarMensaje } = useCarrito();
  const [vistaActiva, setVistaActiva] = useState('tablero');
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [menuColapsado, setMenuColapsado] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    rol: '',
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
  const [comunas, setComunas] = useState([]);
  const [resultado, setResultado] = useState('');
  const [modalEditarProducto, setModalEditarProducto] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [productoEditado, setProductoEditado] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    stock_critico: '',
    categoria: ''
  });
  const [modalEditarUsuario, setModalEditarUsuario] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [usuarioEditado, setUsuarioEditado] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    fecha_nacimiento: '',
    region: '',
    comuna: '',
    direccion: ''
  });

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
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual') || '{}');
    if (!usuarioActual.isAdmin) {
      navigate('/');
      return;
    }

    const productosStock = JSON.parse(localStorage.getItem('productosStock')) || [];
    const productosAdmin = JSON.parse(localStorage.getItem('productosAdmin') || 'null');
    
    let productosFinales;
    
    if (productosStock.length > 0) {
      productosFinales = productosStock.map(producto => ({
        id: producto.prod_codigo,
        codigo: producto.prod_codigo,
        nombre: producto.nombre,
        precio: producto.precio,
        descripcion: producto.descripcion,
        categoria: producto.categoria,
        stock: producto.stock,
        imagen: producto.imagen,
        stock_critico: producto.stock_critico
      }));
    } else if (productosAdmin) {
      productosFinales = productosAdmin.map(producto => ({
        id: producto.prod_codigo,
        codigo: producto.prod_codigo,
        nombre: producto.nombre,
        precio: producto.precio,
        descripcion: producto.descripcion,
        categoria: producto.categoria,
        stock: producto.stock,
        imagen: producto.imagen,
        stock_critico: producto.stock_critico
      }));
    } else {
      productosFinales = productosStock.map(producto => ({
        id: producto.prod_codigo,
        codigo: producto.prod_codigo,
        nombre: producto.nombre,
        precio: producto.precio,
        descripcion: producto.descripcion,
        categoria: producto.categoria,
        stock: producto.stock,
        imagen: producto.imagen,
        stock_critico: producto.stock_critico
      }));
    }
    
    setProductos(productosFinales);

    const handleProductosActualizados = () => {
      const productosActualizados = JSON.parse(localStorage.getItem('productosStock')) || [];
      if (productosActualizados.length > 0) {
        const nuevoProductos = productosActualizados.map(producto => ({
          id: producto.prod_codigo,
          codigo: producto.prod_codigo,
          nombre: producto.nombre,
          precio: producto.precio,
          descripcion: producto.descripcion,
          categoria: producto.categoria,
          stock: producto.stock,
          imagen: producto.imagen,
          stock_critico: producto.stock_critico
        }));
        setProductos(nuevoProductos);
      }
    };

    window.addEventListener('productosActualizados', handleProductosActualizados);

    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios') || '[]');
    setUsuarios(usuariosGuardados);

    return () => {
      window.removeEventListener('productosActualizados', handleProductosActualizados);
    };
  }, [navigate, productosDisponibles, productosStock]);

  const alternarMenu = () => {
    setMenuColapsado(!menuColapsado);
  };

  const salirDelPanel = () => {
    
    navigate('/');
  };

  const determinarCategoria = (nombre) => {
    if (nombre.toLowerCase().includes('torta')) return 'Tortas';
    if (nombre.toLowerCase().includes('tarta')) return 'Tartas';
    if (nombre.toLowerCase().includes('cheesecake')) return 'Cheesecakes';
    if (nombre.toLowerCase().includes('postre gourmet')) return 'Postres Gourmet';
    if (nombre.toLowerCase().includes('postre saludable')) return 'Postres Saludables';
    if (nombre.toLowerCase().includes('postre individual')) return 'Postres Individuales';
    if (nombre.toLowerCase().includes('pastel vegano')) return 'Pasteles Veganos';
    if (nombre.toLowerCase().includes('especial')) return 'Especialidades';
    return 'Otros';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'region') {
      setComunas(regionesComunas[value] || []);
      setNuevoUsuario(prev => ({
        ...prev,
        comuna: '' 
      }));
    }
  };

  const handleSubmitUsuario = (e) => {
    e.preventDefault();

    if (!nuevoUsuario.rol || !nuevoUsuario.run || !nuevoUsuario.nombre || 
        !nuevoUsuario.apellidos || !nuevoUsuario.correo || !nuevoUsuario.region || 
        !nuevoUsuario.comuna || !nuevoUsuario.direccion || !nuevoUsuario.password || 
        !nuevoUsuario.confirmPassword) {
      setResultado('Por favor complete todos los campos obligatorios (*)');
      return;
    }

    if (nuevoUsuario.password !== nuevoUsuario.confirmPassword) {
      setResultado('Las contraseñas no coinciden');
      return;
    }

    if (nuevoUsuario.run.length < 7 || nuevoUsuario.run.length > 9) {
      setResultado('El RUN debe tener entre 7 y 9 caracteres');
      return;
    }

    const usuariosExistentes = JSON.parse(localStorage.getItem('usuarios') || '[]');
    if (usuariosExistentes.find(u => u.correo === nuevoUsuario.correo)) {
      setResultado('Ya existe un usuario con este correo electrónico');
      return;
    }

    const usuarioCreado = {
      id: Date.now(),
      ...nuevoUsuario,
      isAdmin: nuevoUsuario.rol === 'admin',
      fechaRegistro: new Date().toISOString()
    };

    usuariosExistentes.push(usuarioCreado);
    localStorage.setItem('usuarios', JSON.stringify(usuariosExistentes));

    setResultado('¡Usuario registrado exitosamente!');

    setUsuarios(usuariosExistentes);

    setNuevoUsuario({
      rol: '',
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
    setComunas([]);

    setTimeout(() => {
      setResultado('');
    }, 3000);
  };

  const abrirModalEditar = (producto) => {
    setProductoEditando(producto);
    setProductoEditado({
      nombre: producto.nombre,
      descripcion: producto.descripcion || '',
      precio: producto.precio,
      stock: producto.stock,
      stock_critico: producto.stock_critico || 5,
      categoria: producto.categoria
    });
    setModalEditarProducto(true);
  };

  const cerrarModalEditar = () => {
    setModalEditarProducto(false);
    setProductoEditando(null);
    setProductoEditado({
      nombre: '',
      descripcion: '',
      precio: '',
      stock: '',
      stock_critico: '',
      categoria: ''
    });
  };

  const handleInputChangeProducto = (e) => {
    const { name, value } = e.target;
    setProductoEditado(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitEditarProducto = (e) => {
    e.preventDefault();

    if (!productoEditado.nombre || !productoEditado.precio || !productoEditado.stock) {
      alert('Por favor complete todos los campos obligatorios (nombre, precio, stock)');
      return;
    }

    if (isNaN(productoEditado.precio) || productoEditado.precio <= 0) {
      alert('El precio debe ser un número válido mayor a 0');
      return;
    }

    if (isNaN(productoEditado.stock) || productoEditado.stock < 0) {
      alert('El stock debe ser un número válido mayor o igual a 0');
      return;
    }

    if (isNaN(productoEditado.stock_critico) || productoEditado.stock_critico < 0) {
      alert('El stock crítico debe ser un número válido mayor o igual a 0');
      return;
    }

    const productosActualizados = productos.map(producto => 
      producto.codigo === productoEditando.codigo 
        ? { 
            ...producto, 
            nombre: productoEditado.nombre,
            descripcion: productoEditado.descripcion,
            precio: parseInt(productoEditado.precio),
            stock: parseInt(productoEditado.stock),
            stock_critico: parseInt(productoEditado.stock_critico),
            categoria: productoEditado.categoria
          }
        : producto
    );
    
    setProductos(productosActualizados);

    const productosParaStorage = productosActualizados.map(producto => ({
      prod_codigo: producto.codigo,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      imagen: producto.imagen,
      stock: producto.stock,
      stock_critico: producto.stock_critico,
      categoria: producto.categoria
    }));
    
    localStorage.setItem('productosAdmin', JSON.stringify(productosParaStorage));
    localStorage.setItem('productosStock', JSON.stringify(productosParaStorage));
    
    window.dispatchEvent(new Event('productosActualizados'));
    
    alert('Producto actualizado exitosamente');
    cerrarModalEditar();
  };

  const abrirModalEditarUsuario = (usuario) => {
    if (usuario.isAdmin) {
      alert('No se pueden editar usuarios administradores');
      return;
    }
    
    setUsuarioEditando(usuario);
    setUsuarioEditado({
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      correo: usuario.correo,
      fecha_nacimiento: usuario.fecha_nacimiento,
      region: usuario.region,
      comuna: usuario.comuna,
      direccion: usuario.direccion
    });

    if (usuario.region && regionesComunas[usuario.region]) {
      setComunas(regionesComunas[usuario.region]);
    }
    
    setModalEditarUsuario(true);
  };

  const cerrarModalEditarUsuario = () => {
    setModalEditarUsuario(false);
    setUsuarioEditando(null);
    setUsuarioEditado({
      nombre: '',
      apellidos: '',
      correo: '',
      fecha_nacimiento: '',
      region: '',
      comuna: '',
      direccion: ''
    });
    setComunas([]);
  };

  const handleInputChangeUsuario = (e) => {
    const { name, value } = e.target;
    setUsuarioEditado(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'region') {
      setComunas(regionesComunas[value] || []);
      setUsuarioEditado(prev => ({
        ...prev,
        region: value,
        comuna: '' 
      }));
    }
  };

  const handleSubmitEditarUsuario = (e) => {
    e.preventDefault();

    if (!usuarioEditado.nombre || !usuarioEditado.apellidos || !usuarioEditado.correo || 
        !usuarioEditado.region || !usuarioEditado.comuna || !usuarioEditado.direccion) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(usuarioEditado.correo)) {
      alert('Por favor ingrese un correo electrónico válido');
      return;
    }

    const usuariosExistentes = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const correoEnUso = usuariosExistentes.find(u => 
      u.correo === usuarioEditado.correo && u.id !== usuarioEditando.id
    );
    
    if (correoEnUso) {
      alert('El correo electrónico ya está en uso por otro usuario');
      return;
    }

    const usuariosActualizados = usuarios.map(usuario => 
      usuario.id === usuarioEditando.id 
        ? { 
            ...usuario, 
            nombre: usuarioEditado.nombre,
            apellidos: usuarioEditado.apellidos,
            correo: usuarioEditado.correo,
            fecha_nacimiento: usuarioEditado.fecha_nacimiento,
            region: usuarioEditado.region,
            comuna: usuarioEditado.comuna,
            direccion: usuarioEditado.direccion
          }
        : usuario
    );
    
    setUsuarios(usuariosActualizados);

    localStorage.setItem('usuarios', JSON.stringify(usuariosActualizados));
    
    alert('Usuario actualizado exitosamente');
    cerrarModalEditarUsuario();
  };

  const renderTablero = () => (
    <div className="area-contenido">
      <div className="encabezado-seccion">
        <h2>Panel de Control</h2>
      </div>
      <div className="estadisticas">
        <div 
          className="tarjeta-estadistica tarjeta-clickeable"
          onClick={() => setVistaActiva('productos')}
        >
          <div className="icono-estadistica">
            <i className="fas fa-birthday-cake"></i>
          </div>
          <div className="info-estadistica">
            <h3>{productos.length}</h3>
            <p>Productos</p>
          </div>
          <div className="flecha-navegacion">
            <i className="fas fa-arrow-right"></i>
          </div>
        </div>
        <div 
          className="tarjeta-estadistica tarjeta-clickeable"
          onClick={() => setVistaActiva('usuarios')}
        >
          <div className="icono-estadistica">
            <i className="fas fa-users"></i>
          </div>
          <div className="info-estadistica">
            <h3>{usuarios.length}</h3>
            <p>Usuarios</p>
          </div>
          <div className="flecha-navegacion">
            <i className="fas fa-arrow-right"></i>
          </div>
        </div>
        <div 
          className="tarjeta-estadistica tarjeta-clickeable"
          onClick={() => setVistaActiva('productos')}
        >
          <div className="icono-estadistica">
            <i className="fas fa-box"></i>
          </div>
          <div className="info-estadistica">
            <h3>{productos.reduce((total, p) => total + p.stock, 0)}</h3>
            <p>Stock Total</p>
          </div>
          <div className="flecha-navegacion">
            <i className="fas fa-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProductos = () => (
    <div className="area-contenido-productos">
      <div className="encabezado-seccion">
        <h2>Catálogo de Productos</h2>
        <button 
          className="boton-productos-criticos"
          onClick={() => setVistaActiva('productosCriticos')}
        >
          <i className="fas fa-exclamation-triangle"></i>
          Listado de productos críticos
        </button>
      </div>
      <div className="contenedor-productos">
        {productos.map(producto => (
          <div 
            key={producto.codigo} 
            className="tarjeta-producto"
          >
            <div className="avatar-producto-tarjeta">
              <i className="fas fa-birthday-cake icono-producto"></i>
            </div>
            <div className="informacion-producto-tarjeta">
              <div className="nombre-producto">{producto.nombre}</div>
              <div className="categoria-producto">{producto.categoria}</div>
              <div className="descripcion-producto">
                <strong>Descripción:</strong> {producto.descripcion || 'Sin descripción disponible'}
              </div>
              <div className="detalles-producto">
                <div><strong>Precio:</strong> ${producto.precio.toLocaleString()}</div>
                <div className="stock-info">
                  <strong>Stock:</strong> 
                  <span className={`badge-stock ${
                    producto.stock === 0 ? 'stock-agotado' : 
                    producto.stock < producto.stock_critico ? 'stock-critico' : 'stock-normal'
                  }`}>
                    {producto.stock}
                  </span>
                </div>
              </div>
              <div className="imagen-producto-container">
                <img 
                  src={producto.imagen} 
                  alt={producto.nombre}
                  className="imagen-producto"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div className="acciones-producto">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    abrirModalEditar(producto);
                  }}
                  className="boton-editar"
                >
                  <i className="fas fa-edit me-1"></i>
                  Editar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProductosCriticos = () => {
    // Filtrar productos con stock crítico (menor o igual a 5)
    const productosCriticos = productos.filter(producto => producto.stock <= 5);
    
    return (
      <div className="area-contenido-productos-criticos">
        <div className="encabezado-seccion">
          <div className="titulo-con-volver">
            <button 
              className="boton-volver"
              onClick={() => setVistaActiva('productos')}
            >
              <i className="fas fa-arrow-left"></i>
              Volver
            </button>
            <h2>Productos con Stock Crítico</h2>
          </div>
          <div className="info-criticos">
            <span className="contador-criticos">
              {productosCriticos.length} productos críticos encontrados
            </span>
          </div>
        </div>
        
        {productosCriticos.length === 0 ? (
          <div className="mensaje-sin-productos">
            <i ></i>
            <h3>Muy Bien!</h3>
            <p>No hay productos con stock crítico en este momento.</p>
            <button 
              className="boton-volver-principal"
              onClick={() => setVistaActiva('productos')}
            >
              Volver al catálogo
            </button>
          </div>
        ) : (
          <div className="contenedor-productos">
            {productosCriticos.map(producto => (
              <div 
                key={producto.codigo} 
                className="tarjeta-producto tarjeta-critica"
              >
                <div className="alerta-critica">
                  <i ></i>
                  Stock Crítico
                </div>
                <div className="avatar-producto-tarjeta">
                  <i className="fas fa-birthday-cake icono-producto"></i>
                </div>
                <div className="informacion-producto-tarjeta">
                  <div className="nombre-producto">{producto.nombre}</div>
                  <div className="categoria-producto">{producto.categoria}</div>
                  <div className="descripcion-producto">
                    <strong>Descripción:</strong> {producto.descripcion || 'Sin descripción disponible'}
                  </div>
                  <div className="detalles-producto">
                    <div><strong>Precio:</strong> ${producto.precio.toLocaleString()}</div>
                    <div className="stock-info">
                      <strong>Stock:</strong> 
                      <span className={`badge-stock ${
                        producto.stock === 0 ? 'stock-agotado' : 'stock-critico'
                      }`}>
                        {producto.stock}
                      </span>
                    </div>
                  </div>
                  <div className="imagen-producto-container">
                    <img 
                      src={producto.imagen} 
                      alt={producto.nombre}
                      className="imagen-producto"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="acciones-producto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        abrirModalEditar(producto);
                      }}
                      className="boton-editar"
                    >
                      <i className="fas fa-edit me-1"></i>
                      Editar 
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderReportes = () => (
    <div className="area-contenido">
      <div className="encabezado-seccion">
        <h2>Reportes del Sistema</h2>
        <p>Análisis y estadísticas de la pastelería</p>
      </div>
      
      <div className="contenedor-reportes">
        <div className="reporte-seccion">
          <div className="encabezado-reporte">
            <h3>
              <i className="fas fa-birthday-cake"></i>
              Reporte de Productos
            </h3>
            <p>Análisis del inventario y ventas de productos</p>
          </div>
          <div className="contenido-reporte">
            <div className="metricas-reporte">
              <div className="metrica-card">
                <div className="metrica-info">
                  <span className="metrica-numero">{productosDisponibles.length}</span>
                  <span className="metrica-label">Total Productos</span>
                </div>
              </div>
              <div className="metrica-card">
                <div className="metrica-info">
                  <span className="metrica-numero">
                    {productosDisponibles.filter(p => p.stock <= 5).length}
                  </span>
                  <span className="metrica-label">Stock Crítico</span>
                </div>
              </div>
              <div className="metrica-card">
                <div className="metrica-info">
                  <span className="metrica-numero">
                    {productosDisponibles.filter(p => p.stock === 0).length}
                  </span>
                  <span className="metrica-label">Sin Stock</span>
                </div>
              </div>
            </div>
            <div className="acciones-reporte">
              <button 
                className="boton-descargar-csv"
                onClick={() => descargarReporteCSV('productos')}
              >
                <i className="fas fa-download"></i>
                Descargar reporte en CSV
              </button>
            </div>
          </div>
        </div>

        <div className="reporte-seccion">
          <div className="encabezado-reporte">
            <h3>
              <i className="fas fa-users"></i>
              Reporte de Usuarios
            </h3>
            <p>Estadísticas de usuarios registrados</p>
          </div>
          <div className="contenido-reporte">
            <div className="metricas-reporte">
              <div className="metrica-card">
                <div className="metrica-info">
                  <span className="metrica-numero">{usuarios.length}</span>
                  <span className="metrica-label">Total Usuarios</span>
                </div>
              </div>
              <div className="metrica-card">
                <div className="metrica-info">
                  <span className="metrica-numero">
                    {usuarios.filter(u => u.tipo === 'Administrador' || u.isAdmin).length}
                  </span>
                  <span className="metrica-label">Administradores</span>
                </div>
              </div>
              <div className="metrica-card">
                <div className="metrica-info">
                  <span className="metrica-numero">
                    {usuarios.filter(u => {
                      const fechaRegistro = new Date(u.fechaRegistro);
                      const haceUnaSemana = new Date();
                      haceUnaSemana.setDate(haceUnaSemana.getDate() - 7);
                      return fechaRegistro >= haceUnaSemana;
                    }).length}
                  </span>
                  <span className="metrica-label">Nuevos (7 días)</span>
                </div>
              </div>
            </div>
            <div className="acciones-reporte">
              <button 
                className="boton-descargar-csv"
                onClick={() => descargarReporteCSV('usuarios')}
              >
                <i className="fas fa-download"></i>
                Descargar reporte en CSV
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsuarios = () => (
    <div className="area-contenido">
      <div className="encabezado-seccion">
        <h2>Lista de Usuarios</h2>
      </div>
      <div className="contenedor-usuarios">
        {usuarios.map(usuario => (
          <div 
            key={usuario.id} 
            className="tarjeta-usuario"
          >
            <div className="avatar-usuario-tarjeta">
              <i className="fas fa-user-circle icono-usuario"></i>
            </div>
            <div className="informacion-usuario-tarjeta">
              <div className="nombre-usuario">{usuario.nombre} {usuario.apellidos}</div>
              <div className="correo-usuario">{usuario.correo}</div>
              <div className="detalles-usuario">
                <div><strong>Región:</strong> {usuario.region}</div>
                <div><strong>Comuna:</strong> {usuario.comuna}</div>
                <div className="tipo-usuario-info">
                  <strong>Tipo:</strong> 
                  <span className="badge-usuario" style={{
                    backgroundColor: usuario.isAdmin ? '#8B4513' : '#6c757d'
                  }}>
                    {usuario.isAdmin ? 'Admin' : 'Usuario'}
                  </span>
                </div>
                {usuario.direccion && (
                  <div><strong>Dirección:</strong> {usuario.direccion}</div>
                )}
              </div>
              {!usuario.isAdmin && (
                <div className="acciones-usuario">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      abrirModalEditarUsuario(usuario);
                    }}
                    className="boton-editar"
                  >
                    <i className="fas fa-edit me-1"></i>
                    Editar
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNuevoUsuario = () => (
    <div className="area-contenido-usuario">
      <div className="encabezado-seccion">
        <h2>Registro de Usuario</h2>
      </div>
      <div className="register-card">
        <form onSubmit={handleSubmitUsuario} className="form" noValidate>
          {}
          <div className="input-group">
            <label htmlFor="rol" className="label">Rol*</label>
            <select 
              id="rol" 
              name="rol" 
              required
              value={nuevoUsuario.rol}
              onChange={handleInputChange}
              className="select"
            >
              <option value="">Seleccionar rol</option>
              <option value="cliente">Cliente</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          {}
          <div className="input-group">
            <label htmlFor="run" className="label">RUN*</label>
            <input 
              type="text" 
              id="run" 
              name="run" 
              maxLength="9" 
              minLength="7" 
              required 
              placeholder="Ej: 19011022K"
              value={nuevoUsuario.run}
              onChange={handleInputChange}
              className="input"
            />
          </div>

          {}
          <div className="input-group">
            <label htmlFor="nombre" className="label">Nombre*</label>
            <input 
              type="text" 
              id="nombre" 
              name="nombre" 
              maxLength="50" 
              required
              value={nuevoUsuario.nombre}
              onChange={handleInputChange}
              className="input"
            />
          </div>

          {}
          <div className="input-group">
            <label htmlFor="apellidos" className="label">Apellidos*</label>
            <input 
              type="text" 
              id="apellidos" 
              name="apellidos" 
              maxLength="100" 
              required
              value={nuevoUsuario.apellidos}
              onChange={handleInputChange}
              className="input"
            />
          </div>

          {}
          <div className="input-group">
            <label htmlFor="correo" className="label">Correo*</label>
            <input 
              type="email" 
              id="correo" 
              name="correo" 
              maxLength="100" 
              required 
              placeholder="ejemplo@duoc.cl"
              value={nuevoUsuario.correo}
              onChange={handleInputChange}
              className="input"
            />
          </div>

          {}
          <div className="input-group">
            <label htmlFor="fecha_nacimiento" className="label">Fecha de nacimiento</label>
            <input 
              type="date" 
              id="fecha_nacimiento" 
              name="fecha_nacimiento"
              value={nuevoUsuario.fecha_nacimiento}
              onChange={handleInputChange}
              className="input"
            />
          </div>

          {}
          <div className="input-group">
            <label htmlFor="region" className="label">Región*</label>
            <select 
              id="region" 
              name="region" 
              required
              value={nuevoUsuario.region}
              onChange={handleInputChange}
              className="select"
            >
              <option value="">Seleccione región</option>
              {Object.keys(regionesComunas).map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>

          {}
          <div className="input-group">
            <label htmlFor="comuna" className="label">Comuna*</label>
            <select 
              id="comuna" 
              name="comuna" 
              required
              value={nuevoUsuario.comuna}
              onChange={handleInputChange}
              className="select"
              disabled={!nuevoUsuario.region}
            >
              <option value="">Seleccione comuna</option>
              {comunas.map(comuna => (
                <option key={comuna} value={comuna}>{comuna}</option>
              ))}
            </select>
          </div>

          {}
          <div className="input-group">
            <label htmlFor="direccion" className="label">Dirección*</label>
            <input 
              type="text" 
              id="direccion" 
              name="direccion" 
              maxLength="300" 
              required
              value={nuevoUsuario.direccion}
              onChange={handleInputChange}
              className="input"
            />
          </div>

          {}
          <div className="input-group">
            <label htmlFor="password" className="label">Contraseña*</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              maxLength="30" 
              required
              value={nuevoUsuario.password}
              onChange={handleInputChange}
              className="input"
            />
          </div>

          {}
          <div className="input-group">
            <label htmlFor="confirmPassword" className="label">Confirmar Contraseña*</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              maxLength="30" 
              required
              value={nuevoUsuario.confirmPassword}
              onChange={handleInputChange}
              className="input"
            />
          </div>

          {}
          <div className="input-group">
            <label htmlFor="codigo_descuento" className="label">Código de descuento</label>
            <input 
              type="text" 
              id="codigo_descuento" 
              name="codigo_descuento" 
              maxLength="20" 
              placeholder="Opcional"
              value={nuevoUsuario.codigo_descuento}
              onChange={handleInputChange}
              className="input"
            />
          </div>

          <button 
            type="submit"
            className="submit-button"
          >
            Registrar Usuario
          </button>

          {resultado && (
            <div className="resultado" style={{
              color: resultado.includes('exitosamente') ? '#28a745' : '#dc3545'
            }}>
              {resultado}
            </div>
          )}
        </form>
      </div>
    </div>
  );

  const descargarReporteCSV = (tipoReporte) => {
    let datos = [];
    let nombreArchivo = '';
    
    if (tipoReporte === 'productos') {
      // Generar datos de productos
      const productosActuales = productosStock.length > 0 ? productosStock : productosDisponibles;
      datos = productosActuales.map(producto => ({
        'Código': producto.prod_codigo,
        'Nombre': producto.nombre,
        'Categoría': producto.categoria,
        'Precio': producto.precio,
        'Stock': producto.stock,
        'Stock Crítico': producto.stock_critico,
        'Estado': producto.stock === 0 ? 'Sin Stock' : 
                 producto.stock <= producto.stock_critico ? 'Stock Crítico' : 'Normal'
      }));
      nombreArchivo = 'reporte_productos.csv';
    } else if (tipoReporte === 'usuarios') {
      // Generar datos de usuarios - obtener directamente del localStorage
      let usuariosActuales = JSON.parse(localStorage.getItem('usuarios') || '[]');
      
      // Si no hay usuarios, crear datos de ejemplo para la demostración
      if (usuariosActuales.length === 0) {
        usuariosActuales = [
          {
            id: 1,
            run: '12345678-9',
            nombre: 'Administrador',
            apellidos: 'del Sistema',
            correo: 'admin@pasteleriaAA',
            isAdmin: true,
            fechaRegistro: new Date().toISOString(),
            region: 'Metropolitana',
            comuna: 'Santiago'
          },
          {
            id: 2,
            run: '98765432-1',
            nombre: 'Usuario',
            apellidos: 'de Ejemplo',
            correo: 'usuario@example.com',
            isAdmin: false,
            fechaRegistro: new Date().toISOString(),
            region: 'Metropolitana',
            comuna: 'Las Condes'
          }
        ];
      }
      
      datos = usuariosActuales.map(usuario => ({
        'ID': usuario.id || 'N/A',
        'RUT': usuario.run || usuario.rut || 'N/A',
        'Nombre': usuario.nombre || 'N/A',
        'Apellidos': usuario.apellidos || 'N/A',
        'Correo': usuario.correo || 'N/A',
        'Tipo': usuario.isAdmin ? 'Administrador' : 'Usuario',
        'Fecha Registro': usuario.fechaRegistro ? 
          new Date(usuario.fechaRegistro).toLocaleDateString('es-CL') : 'N/A',
        'Región': usuario.region || 'N/A',
        'Comuna': usuario.comuna || 'N/A'
      }));
      nombreArchivo = 'reporte_usuarios.csv';
    }

    // Convertir a CSV
    
    if (datos.length === 0) {
      if (tipoReporte === 'usuarios') {
        alert('No hay usuarios registrados para exportar');
      } else {
        alert('No hay productos para exportar');
      }
      return;
    }

    const headers = Object.keys(datos[0]);
    
    // Función para escapar valores CSV
    const escaparValorCSV = (value) => {
      if (value === null || value === undefined) return '';
      const str = String(value);
      // Siempre encerrar en comillas para evitar problemas con SYLK
      return `"${str.replace(/"/g, '""')}"`;
    };

    const csvContent = [
      headers.map(h => `"${h}"`).join(','), // Headers también entre comillas
      ...datos.map(row => 
        headers.map(header => escaparValorCSV(row[header])).join(',')
      )
    ].join('\n');

    // Agregar BOM para UTF-8 y evitar problema SYLK
    const BOM = '\uFEFF';
    const csvWithBOM = BOM + csvContent;

    // Crear y descargar el archivo con tipo MIME correcto
    const blob = new Blob([csvWithBOM], { type: 'application/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', nombreArchivo);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      
      // Intentar diferentes métodos de descarga
      try {
        // Método 1: Click directo
        link.click();
        
        // Método 2: Evento click programático
        const evento = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: false
        });
        link.dispatchEvent(evento);
        
      } catch (error) {
        // Método alternativo: abrir en nueva ventana
        window.open(url, '_blank');
      }
      
      // Limpiar después de un pequeño delay
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 1000);
      
      // Mostrar mensaje de éxito
      mostrarMensaje(`Reporte ${tipoReporte} descargado exitosamente`, 'ok');
    } else {
      alert('Tu navegador no soporta la descarga de archivos');
    }
  };

  const renderContenido = () => {
    switch (vistaActiva) {
      case 'productos':
        return renderProductos();
      case 'productosCriticos':
        return renderProductosCriticos();
      case 'reportes':
        return renderReportes();
      case 'usuarios':
        return renderUsuarios();
      case 'nuevoUsuario':
        return renderNuevoUsuario();
      default:
        return renderTablero();
    }
  };

  const renderModalEditarProducto = () => (
    modalEditarProducto && (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h3>Editar Producto</h3>
            <button 
              onClick={cerrarModalEditar}
              className="boton-cerrar"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <form onSubmit={handleSubmitEditarProducto} className="modal-form">
            <div className="input-group">
              <label className="label">Nombre del Producto*</label>
              <input
                type="text"
                name="nombre"
                value={productoEditado.nombre}
                onChange={handleInputChangeProducto}
                className="input"
                required
              />
            </div>
            
            
            <div className="input-group">
              <label className="label">Descripción</label>
              <textarea
                name="descripcion"
                value={productoEditado.descripcion}
                onChange={handleInputChangeProducto}
                className="input"
                rows="3"
              />
            </div>
            
            <div className="input-group">
              <label className="label">Precio*</label>
              <input
                type="number"
                name="precio"
                value={productoEditado.precio}
                onChange={handleInputChangeProducto}
                className="input"
                min="0"
                required
              />
            </div>
            
            <div className="input-group">
              <label className="label">Stock*</label>
              <input
                type="number"
                name="stock"
                value={productoEditado.stock}
                onChange={handleInputChangeProducto}
                className="input"
                min="0"
                required
              />
            </div>
            
            <div className="input-group">
              <label className="label">Stock Crítico*</label>
              <input
                type="number"
                name="stock_critico"
                value={productoEditado.stock_critico}
                onChange={handleInputChangeProducto}
                className="input"
                min="0"
                required
              />
              <small>
                Alerta cuando el stock baje de este número
              </small>
            </div>
            
            <div className="input-group">
              <label className="label">Categoría</label>
              <select
                name="categoria"
                value={productoEditado.categoria}
                onChange={handleInputChangeProducto}
                className="select"
              >
                <option value="Tortas Cuadradas">Tortas Cuadradas</option>
                <option value="Tortas Circulares">Tortas Circulares</option>
                <option value="Tortas Especiales">Tortas Especiales</option>
                <option value="Postres Individuales">Postres Individuales</option>
                <option value="Productos Sin Azúcar">Productos Sin Azúcar</option>
                <option value="Productos Sin Gluten">Productos Sin Gluten</option>
                <option value="Productos Veganos">Productos Veganos</option>
                <option value="Pastelería Tradicional">Pastelería Tradicional</option>
              </select>
            </div>
            
            <div className="modal-actions">
              <button 
                type="button" 
                onClick={cerrarModalEditar}
                className="boton-cancelar"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                className="boton-guardar"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );

  const renderModalEditarUsuario = () => (
    modalEditarUsuario && (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h3>Editar Usuario</h3>
            <button 
              onClick={cerrarModalEditarUsuario}
              className="boton-cerrar"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <form onSubmit={handleSubmitEditarUsuario} className="modal-form">
            <div className="input-group">
              <label className="label">Nombre*</label>
              <input
                type="text"
                name="nombre"
                value={usuarioEditado.nombre}
                onChange={handleInputChangeUsuario}
                className="input"
                required
              />
            </div>

            <div className="input-group">
              <label className="label">Apellidos*</label>
              <input
                type="text"
                name="apellidos"
                value={usuarioEditado.apellidos}
                onChange={handleInputChangeUsuario}
                className="input"
                required
              />
            </div>

            <div className="input-group">
              <label className="label">Correo Electrónico*</label>
              <input
                type="email"
                name="correo"
                value={usuarioEditado.correo}
                onChange={handleInputChangeUsuario}
                className="input"
                required
              />
            </div>

            <div className="input-group">
              <label className="label">Fecha de Nacimiento</label>
              <input
                type="date"
                name="fecha_nacimiento"
                value={usuarioEditado.fecha_nacimiento}
                onChange={handleInputChangeUsuario}
                className="input"
              />
            </div>

            <div className="input-group">
              <label className="label">Región*</label>
              <select
                name="region"
                value={usuarioEditado.region}
                onChange={handleInputChangeUsuario}
                className="select"
                required
              >
                <option value="">Seleccionar región</option>
                {Object.keys(regionesComunas).map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label className="label">Comuna*</label>
              <select
                name="comuna"
                value={usuarioEditado.comuna}
                onChange={handleInputChangeUsuario}
                className="select"
                required
                disabled={!usuarioEditado.region}
              >
                <option value="">Seleccionar comuna</option>
                {comunas.map(comuna => (
                  <option key={comuna} value={comuna}>{comuna}</option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label className="label">Dirección*</label>
              <input
                type="text"
                name="direccion"
                value={usuarioEditado.direccion}
                onChange={handleInputChangeUsuario}
                className="input"
                required
              />
            </div>

            <div className="modal-actions">
              <button 
                type="button" 
                onClick={cerrarModalEditarUsuario}
                className="boton-cancelar"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                className="boton-guardar"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );

  return (
    <div className="contenedor-admin">
      {}
      <aside className={`barra-lateral ${menuColapsado ? 'colapsada' : ''}`}>
        <div className="encabezado-barra-lateral">
          <h2 className="titulo-barra-lateral">
            {menuColapsado ? 'PA' : 'Panel de Admin'}
          </h2>
        </div>
        
        <nav className="navegacion-barra-lateral">
          <ul className="menu-navegacion">
            <li className="elemento-navegacion">
              <a
                onClick={() => setVistaActiva('tablero')}
                className={`enlace-navegacion ${vistaActiva === 'tablero' ? 'activo' : ''}`}
              >
                <i className="fas fa-home icono-navegacion"></i>
                <span className="texto-navegacion">Tablero</span>
              </a>
            </li>
            <li className="elemento-navegacion">
              <a
                onClick={() => setVistaActiva('productos')}
                className={`enlace-navegacion ${vistaActiva === 'productos' ? 'activo' : ''}`}
              >
                <i className="fas fa-birthday-cake icono-navegacion"></i>
                <span className="texto-navegacion">Productos</span>
              </a>
            </li>
            <li className="elemento-navegacion">
              <a
                onClick={() => setVistaActiva('reportes')}
                className={`enlace-navegacion ${vistaActiva === 'reportes' ? 'activo' : ''}`}
              >
                <i className="fas fa-chart-bar icono-navegacion"></i>
                <span className="texto-navegacion">Reportes</span>
              </a>
            </li>
            <li className="elemento-navegacion">
              <a
                onClick={() => setVistaActiva('usuarios')}
                className={`enlace-navegacion ${vistaActiva === 'usuarios' ? 'activo' : ''}`}
              >
                <i className="fas fa-users icono-navegacion"></i>
                <span className="texto-navegacion">Usuarios</span>
              </a>
            </li>
            <li className="elemento-navegacion">
              <a
                onClick={() => setVistaActiva('nuevoUsuario')}
                className={`enlace-navegacion ${vistaActiva === 'nuevoUsuario' ? 'activo' : ''}`}
              >
                <i className="fas fa-user-plus icono-navegacion"></i>
                <span className="texto-navegacion">Nuevo Usuario</span>
              </a>
            </li>
          </ul>
        </nav>
        
        <div className="pie-barra-lateral">
          <button
            onClick={salirDelPanel}
            className="boton-salir"
          >
            <i className="fas fa-sign-out-alt icono-navegacion"></i>
            <span className="texto-navegacion">Salir</span>
          </button>
        </div>
      </aside>

      {}
      <main className="contenido-principal">
        {}
        <header className="encabezado-contenido">
          <div className="izquierda-encabezado">
            <button 
              onClick={alternarMenu}
              className="alternar-menu"
            >
              <i className="fas fa-bars"></i>
            </button>
            <h1 className="titulo-pagina">
              {vistaActiva === 'productos' ? 'Productos' : 
               vistaActiva === 'reportes' ? 'Reportes' :
               vistaActiva === 'usuarios' ? 'Usuarios' : 
               vistaActiva === 'nuevoUsuario' ? 'Nuevo Usuario' : 'Tablero'}
            </h1>
          </div>
          <div className="derecha-encabezado">
            <div className="informacion-usuario">
              <span className="texto-bienvenida">Bienvenido, Admin</span>
              <div className="avatar-usuario">
                <i className="fas fa-user-circle"></i>
              </div>
            </div>
          </div>
        </header>

        {}
        {renderContenido()}
      </main>
      
      {}
      {renderModalEditarProducto()}
      
      {}
      {renderModalEditarUsuario()}
    </div>
  );
}

export default AdminPanel;
