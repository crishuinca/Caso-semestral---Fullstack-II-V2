import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';

function AdminPanel() {
  const navigate = useNavigate();
  const { productosDisponibles } = useCarrito();
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

    const productosGuardados = JSON.parse(localStorage.getItem('productosAdmin') || 'null');
    
    if (productosGuardados) {
      const productosConStock = productosGuardados.map(producto => ({
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
      setProductos(productosConStock);
    } else {
      const productosConStock = productosDisponibles.map(producto => ({
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
      setProductos(productosConStock);
      
      const productosParaStorage = productosConStock.map(producto => ({
        prod_codigo: producto.codigo,
        nombre: producto.nombre,
        precio: producto.precio,
        descripcion: producto.descripcion,
        imagen: producto.imagen,
        stock: producto.stock,
        categoria: producto.categoria,
        stock_critico: producto.stock_critico
      }));
      localStorage.setItem('productosAdmin', JSON.stringify(productosParaStorage));
    }

    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios') || '[]');
    setUsuarios(usuariosGuardados);
  }, [navigate]);

  const alternarMenu = () => {
    setMenuColapsado(!menuColapsado);
  };

  const salirDelPanel = () => {
    
    navigate('/');
  };
  const irBoletas = ()=>{
    navigate("/admin/boletas")
  }

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

    const productosActualizados = productos.map(producto => 
      producto.codigo === productoEditando.codigo 
        ? { 
            ...producto, 
            nombre: productoEditado.nombre,
            descripcion: productoEditado.descripcion,
            precio: parseInt(productoEditado.precio),
            stock: parseInt(productoEditado.stock),
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
      categoria: producto.categoria,
      stock_critico: producto.stock_critico
    }));
    
    localStorage.setItem('productosAdmin', JSON.stringify(productosParaStorage));
    
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
    <div className="area-contenido" style={estilos.areaContenido}>
      <div style={estilos.encabezadoSeccion}>
        <h2>Panel de Control</h2>
      </div>
      <div style={estilos.estadisticas}>
        <div 
          style={{
            ...estilos.tarjetaEstadistica,
            ...estilos.tarjetaClickeable
          }}
          onClick={() => setVistaActiva('productos')}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-4px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          <div style={estilos.iconoEstadistica}>
            <i className="fas fa-birthday-cake"></i>
          </div>
          <div style={estilos.infoEstadistica}>
            <h3>{productos.length}</h3>
            <p>Productos</p>
          </div>
          <div style={estilos.flechaNavegacion}>
            <i className="fas fa-arrow-right"></i>
          </div>
        </div>
        <div 
          style={{
            ...estilos.tarjetaEstadistica,
            ...estilos.tarjetaClickeable
          }}
          onClick={() => setVistaActiva('usuarios')}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-4px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          <div style={estilos.iconoEstadistica}>
            <i className="fas fa-users"></i>
          </div>
          <div style={estilos.infoEstadistica}>
            <h3>{usuarios.length}</h3>
            <p>Usuarios</p>
          </div>
          <div style={estilos.flechaNavegacion}>
            <i className="fas fa-arrow-right"></i>
          </div>
        </div>
        <div 
          style={{
            ...estilos.tarjetaEstadistica,
            ...estilos.tarjetaClickeable
          }}
          onClick={() => setVistaActiva('productos')}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-4px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          <div style={estilos.iconoEstadistica}>
            <i className="fas fa-box"></i>
          </div>
          <div style={estilos.infoEstadistica}>
            <h3>{productos.reduce((total, p) => total + p.stock, 0)}</h3>
            <p>Stock Total</p>
          </div>
          <div style={estilos.flechaNavegacion}>
            <i className="fas fa-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProductos = () => (
    <div className="area-contenido" style={estilos.areaContenido}>
      <div style={estilos.encabezadoSeccion}>
        <h2>Catálogo de Productos</h2>
      </div>
      <div style={estilos.contenedorProductos}>
        {productos.map(producto => (
          <div 
            key={producto.codigo} 
            style={estilos.tarjetaProducto}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
            }}
          >
            <div style={estilos.avatarProductoTarjeta}>
              <i className="fas fa-birthday-cake" style={estilos.iconoProducto}></i>
            </div>
            <div style={estilos.informacionProductoTarjeta}>
              <div style={estilos.nombreProducto}>{producto.nombre}</div>
              <div style={estilos.categoriaProducto}>{producto.categoria}</div>
              <div style={estilos.descripcionProducto}>
                <strong>Descripción:</strong> {producto.descripcion || 'Sin descripción disponible'}
              </div>
              <div style={estilos.detallesProducto}>
                <div><strong>Precio:</strong> ${producto.precio.toLocaleString()}</div>
                <div style={estilos.stockInfo}>
                  <strong>Stock:</strong> 
                  <span style={{
                    ...estilos.badgeStock,
                    backgroundColor: producto.stock > 10 ? '#28a745' : producto.stock > 5 ? '#ffc107' : '#dc3545'
                  }}>
                    {producto.stock}
                  </span>
                </div>
              </div>
              <div style={estilos.imagenProductoContainer}>
                <img 
                  src={producto.imagen} 
                  alt={producto.nombre}
                  style={estilos.imagenProducto}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div style={estilos.accionesProducto}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    abrirModalEditar(producto);
                  }}
                  style={estilos.botonEditar}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#A0522D'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#8B4513'}
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

  const renderUsuarios = () => (
    <div className="area-contenido" style={estilos.areaContenido}>
      <div style={estilos.encabezadoSeccion}>
        <h2>Lista de Usuarios</h2>
      </div>
      <div style={estilos.contenedorUsuarios}>
        {usuarios.map(usuario => (
          <div 
            key={usuario.id} 
            style={estilos.tarjetaUsuario}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
            }}
          >
            <div style={estilos.avatarUsuarioTarjeta}>
              <i className="fas fa-user-circle" style={estilos.iconoUsuario}></i>
            </div>
            <div style={estilos.informacionUsuarioTarjeta}>
              <div style={estilos.nombreUsuario}>{usuario.nombre} {usuario.apellidos}</div>
              <div style={estilos.correoUsuario}>{usuario.correo}</div>
              <div style={estilos.detallesUsuario}>
                <div><strong>Región:</strong> {usuario.region}</div>
                <div><strong>Comuna:</strong> {usuario.comuna}</div>
                <div style={estilos.tipoUsuarioInfo}>
                  <strong>Tipo:</strong> 
                  <span style={{
                    ...estilos.badgeUsuario,
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
                <div style={estilos.accionesUsuario}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      abrirModalEditarUsuario(usuario);
                    }}
                    style={estilos.botonEditar}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#A0522D'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#8B4513'}
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
    <div className="area-contenido" style={estilos.areaContenido}>
      <div style={estilos.encabezadoSeccion}>
        <h2>Registro de Usuario</h2>
      </div>
      <div style={estilos.registerCard}>
        <form onSubmit={handleSubmitUsuario} style={estilos.form} noValidate>
          {}
          <div style={estilos.inputGroup}>
            <label htmlFor="rol" style={estilos.label}>Rol*</label>
            <select 
              id="rol" 
              name="rol" 
              required
              value={nuevoUsuario.rol}
              onChange={handleInputChange}
              style={estilos.select}
            >
              <option value="">Seleccionar rol</option>
              <option value="cliente">Cliente</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          {}
          <div style={estilos.inputGroup}>
            <label htmlFor="run" style={estilos.label}>RUN*</label>
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
              style={estilos.input}
            />
          </div>

          {}
          <div style={estilos.inputGroup}>
            <label htmlFor="nombre" style={estilos.label}>Nombre*</label>
            <input 
              type="text" 
              id="nombre" 
              name="nombre" 
              maxLength="50" 
              required
              value={nuevoUsuario.nombre}
              onChange={handleInputChange}
              style={estilos.input}
            />
          </div>

          {}
          <div style={estilos.inputGroup}>
            <label htmlFor="apellidos" style={estilos.label}>Apellidos*</label>
            <input 
              type="text" 
              id="apellidos" 
              name="apellidos" 
              maxLength="100" 
              required
              value={nuevoUsuario.apellidos}
              onChange={handleInputChange}
              style={estilos.input}
            />
          </div>

          {}
          <div style={estilos.inputGroup}>
            <label htmlFor="correo" style={estilos.label}>Correo*</label>
            <input 
              type="email" 
              id="correo" 
              name="correo" 
              maxLength="100" 
              required 
              placeholder="ejemplo@duoc.cl"
              value={nuevoUsuario.correo}
              onChange={handleInputChange}
              style={estilos.input}
            />
          </div>

          {}
          <div style={estilos.inputGroup}>
            <label htmlFor="fecha_nacimiento" style={estilos.label}>Fecha de nacimiento</label>
            <input 
              type="date" 
              id="fecha_nacimiento" 
              name="fecha_nacimiento"
              value={nuevoUsuario.fecha_nacimiento}
              onChange={handleInputChange}
              style={estilos.input}
            />
          </div>

          {}
          <div style={estilos.inputGroup}>
            <label htmlFor="region" style={estilos.label}>Región*</label>
            <select 
              id="region" 
              name="region" 
              required
              value={nuevoUsuario.region}
              onChange={handleInputChange}
              style={estilos.select}
            >
              <option value="">Seleccione región</option>
              {Object.keys(regionesComunas).map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>

          {}
          <div style={estilos.inputGroup}>
            <label htmlFor="comuna" style={estilos.label}>Comuna*</label>
            <select 
              id="comuna" 
              name="comuna" 
              required
              value={nuevoUsuario.comuna}
              onChange={handleInputChange}
              style={estilos.select}
              disabled={!nuevoUsuario.region}
            >
              <option value="">Seleccione comuna</option>
              {comunas.map(comuna => (
                <option key={comuna} value={comuna}>{comuna}</option>
              ))}
            </select>
          </div>

          {}
          <div style={estilos.inputGroup}>
            <label htmlFor="direccion" style={estilos.label}>Dirección*</label>
            <input 
              type="text" 
              id="direccion" 
              name="direccion" 
              maxLength="300" 
              required
              value={nuevoUsuario.direccion}
              onChange={handleInputChange}
              style={estilos.input}
            />
          </div>

          {}
          <div style={estilos.inputGroup}>
            <label htmlFor="password" style={estilos.label}>Contraseña*</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              maxLength="30" 
              required
              value={nuevoUsuario.password}
              onChange={handleInputChange}
              style={estilos.input}
            />
          </div>

          {}
          <div style={estilos.inputGroup}>
            <label htmlFor="confirmPassword" style={estilos.label}>Confirmar Contraseña*</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              maxLength="30" 
              required
              value={nuevoUsuario.confirmPassword}
              onChange={handleInputChange}
              style={estilos.input}
            />
          </div>

          {}
          <div style={estilos.inputGroup}>
            <label htmlFor="codigo_descuento" style={estilos.label}>Código de descuento</label>
            <input 
              type="text" 
              id="codigo_descuento" 
              name="codigo_descuento" 
              maxLength="20" 
              placeholder="Opcional"
              value={nuevoUsuario.codigo_descuento}
              onChange={handleInputChange}
              style={estilos.input}
            />
          </div>

          <button 
            type="submit"
            style={estilos.submitButton}
          >
            Registrar Usuario
          </button>

          {resultado && (
            <div style={{
              ...estilos.resultado,
              color: resultado.includes('exitosamente') ? '#28a745' : '#dc3545'
            }}>
              {resultado}
            </div>
          )}
        </form>
      </div>
    </div>
  );

  const renderContenido = () => {
    switch (vistaActiva) {
      case 'productos':
        return renderProductos();
      case 'usuarios':
        return renderUsuarios();
      case 'nuevoUsuario':
        return renderNuevoUsuario();
      default:
        return renderTablero();
    }
  };

  const estilos = {
    contenedorAdmin: {
      display: 'flex',
      minHeight: '100vh',
      fontFamily: "'Lato', sans-serif"
    },
    barraLateral: {
      width: menuColapsado ? '80px' : '280px',
      background: 'linear-gradient(180deg, #8B4513 0%, #A0522D 100%)',
      color: 'white',
      position: 'fixed',
      height: '100vh',
      left: 0,
      top: 0,
      zIndex: 1000,
      transition: 'all 0.3s ease',
      boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)'
    },
    encabezadoBarraLateral: {
      padding: '2rem 1.5rem',
      textAlign: 'center',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    },
    tituloBarraLateral: {
      fontSize: '1.2rem',
      fontWeight: '700',
      color: '#FFC0CB'
    },
    navegacionBarraLateral: {
      padding: '1rem 0'
    },
    menuNavegacion: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    elementoNavegacion: {
      marginBottom: '0.5rem'
    },
    enlaceNavegacion: {
      display: 'flex',
      alignItems: 'center',
      padding: '1rem 1.5rem',
      color: 'white',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    enlaceNavegacionActivo: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRight: '4px solid #FFC0CB'
    },
    iconoNavegacion: {
      marginRight: menuColapsado ? 0 : '1rem',
      fontSize: '1.2rem',
      width: '20px'
    },
    textoNavegacion: {
      display: menuColapsado ? 'none' : 'block'
    },
    pieBarraLateral: {
      position: 'absolute',
      bottom: '1rem',
      left: 0,
      right: 0,
      padding: '0 1.5rem'
    },
    botonSalir: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      padding: '1rem',
      color: 'white',
      textDecoration: 'none',
      backgroundColor: 'rgba(220, 53, 69, 0.2)',
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      border: 'none'
    },
    contenidoPrincipal: {
      flex: 1,
      marginLeft: menuColapsado ? '80px' : '280px',
      transition: 'margin-left 0.3s ease',
      backgroundColor: '#f8f9fa'
    },
    encabezadoContenido: {
      backgroundColor: 'white',
      padding: '1rem 2rem',
      borderBottom: '1px solid #e9ecef',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    izquierdaEncabezado: {
      display: 'flex',
      alignItems: 'center'
    },
    alternarMenu: {
      backgroundColor: 'transparent',
      border: 'none',
      fontSize: '1.2rem',
      color: '#8B4513',
      cursor: 'pointer',
      marginRight: '1rem'
    },
    tituloPagina: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#333',
      margin: 0
    },
    derechaEncabezado: {
      display: 'flex',
      alignItems: 'center'
    },
    informacionUsuario: {
      display: 'flex',
      alignItems: 'center'
    },
    textoBienvenida: {
      marginRight: '1rem',
      color: '#666',
      fontSize: '0.9rem'
    },
    avatarUsuario: {
      fontSize: '2rem',
      color: '#8B4513'
    },
    areaContenido: {
      padding: '1rem 1.5rem 1.5rem 1.5rem',
      marginTop: '1rem'
    },
    encabezadoSeccion: {
      marginTop: '1rem',
      marginBottom: '2rem'
    },
    estadisticas: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem',
      marginBottom: '2rem'
    },
    tarjetaEstadistica: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'center',
      position: 'relative'
    },
    tarjetaClickeable: {
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      border: '2px solid transparent'
    },
    flechaNavegacion: {
      marginLeft: 'auto',
      color: '#8B4513',
      fontSize: '1.5rem',
      opacity: 0.7,
      transition: 'all 0.3s ease'
    },
    iconoEstadistica: {
      fontSize: '3rem',
      color: '#8B4513',
      marginRight: '1.5rem'
    },
    infoEstadistica: {
      flex: 1
    },
    contenedorTabla: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden'
    },
    tabla: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    filaEncabezado: {
      backgroundColor: '#8B4513'
    },
    celdaEncabezado: {
      padding: '1rem',
      textAlign: 'left',
      color: 'white',
      fontWeight: '600'
    },
    fila: {
      borderBottom: '1px solid #e9ecef'
    },
    celda: {
      padding: '1rem',
      color: '#333'
    },
    badge: {
      padding: '0.25rem 0.5rem',
      borderRadius: '4px',
      color: 'white',
      fontSize: '0.8rem',
      fontWeight: '600'
    },
    registerCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '25rem 1.5rem 1.5rem 1.5rem',
      maxWidth: '600px',
      margin: '0 auto'
    },
    form: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1.5rem'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '0.5rem'
    },
    label: {
      color: '#8B4513',
      fontWeight: '600',
      marginBottom: '0.5rem'
    },
    input: {
      border: '1.5px solid #FFC0CB',
      borderRadius: '8px',
      padding: '0.8rem',
      fontSize: '1rem',
      fontFamily: "'Lato', sans-serif",
      color: '#5D4037',
      background: '#FFF5E1',
      outline: 'none',
      transition: 'border 0.2s'
    },
    select: {
      border: '1.5px solid #FFC0CB',
      borderRadius: '8px',
      padding: '0.8rem',
      fontSize: '1rem',
      fontFamily: "'Lato', sans-serif",
      color: '#5D4037',
      background: '#FFF5E1',
      outline: 'none',
      transition: 'border 0.2s'
    },
    submitButton: {
      gridColumn: '1 / -1',
      background: '#8B4513',
      color: 'white',
      border: 'none',
      padding: '1rem 2rem',
      borderRadius: '12px',
      cursor: 'pointer',
      fontSize: '1.1rem',
      fontWeight: '700',
      marginTop: '1rem',
      boxShadow: '0 5px 8px rgba(139,69,19,0.2)',
      transition: 'all 0.3s ease',
      fontFamily: "'Lato', sans-serif"
    },
    resultado: {
      gridColumn: '1 / -1',
      marginTop: '1rem',
      fontSize: '1rem',
      fontWeight: 'bold',
      textAlign: 'center',
      padding: '1rem',
      borderRadius: '8px',
      backgroundColor: '#f8f9fa'
    },
    accionesRapidas: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      marginBottom: '2rem'
    },
    tituloSeccion: {
      color: '#8B4513',
      marginBottom: '1.5rem',
      fontSize: '1.3rem',
      fontWeight: '600'
    },
    botonesAccion: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem'
    },
    botonAccion: {
      backgroundColor: '#8B4513',
      color: 'white',
      border: 'none',
      padding: '1.2rem 1.5rem',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
      boxShadow: '0 3px 6px rgba(139, 69, 19, 0.2)'
    },
    iconoBoton: {
      marginRight: '0.8rem',
      fontSize: '1.2rem'
    },
    actividadReciente: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    tarjetasResumen: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1rem'
    },
    tarjetaResumen: {
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      padding: '1.5rem',
      border: '1px solid #e9ecef'
    },
    contenidoResumen: {
      display: 'flex',
      alignItems: 'center'
    },
    estadoPositivo: {
      color: '#28a745',
      fontSize: '2rem',
      marginRight: '1rem'
    },
    estadoInfo: {
      color: '#17a2b8',
      fontSize: '2rem',
      marginRight: '1rem'
    },
    estadoAdvertencia: {
      color: '#ffc107',
      fontSize: '2rem',
      marginRight: '1rem'
    },
    contenedorProductos: {
      display: 'grid',
      padding: '65rem 1.5rem 1.5rem 1.5rem',
      gridTemplateColumns: 'repeat(3, minmax(150px, 1fr))',
      gap: '1rem',
      overflowX: 'auto'
    },
    tarjetaProducto: {
      background: 'white',
      borderRadius: '10px',
      padding: '0.8rem',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.8rem',
      cursor: 'pointer'
    },
    avatarProductoTarjeta: {
      flexShrink: 0
    },
    iconoProducto: {
      fontSize: '3rem',
      color: '#8B4513',
      background: 'linear-gradient(135deg, #FFC0CB, #FFB6C1)',
      borderRadius: '50%',
      padding: '0.5rem'
    },
    informacionProductoTarjeta: {
      flex: 1
    },
    nombreProducto: {
      color: '#8B4513',
      fontSize: '1.2rem',
      fontWeight: '700',
      marginBottom: '0.3rem'
    },
    categoriaProducto: {
      color: '#6c757d',
      fontSize: '0.9rem',
      marginBottom: '0.5rem'
    },
    descripcionProducto: {
      color: '#6c757d',
      fontSize: '0.85rem',
      marginBottom: '0.5rem',
      lineHeight: '1.3'
    },
    detallesProducto: {
      marginBottom: '1rem'
    },
    stockInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    badgeStock: {
      padding: '0.25rem 0.5rem',
      borderRadius: '4px',
      color: 'white',
      fontSize: '0.8rem',
      fontWeight: '600'
    },
    imagenProductoContainer: {
      marginTop: '1rem'
    },
    imagenProducto: {
      maxWidth: '100px',
      maxHeight: '80px',
      borderRadius: '8px',
      objectFit: 'cover',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    },
    contenedorUsuarios: {

      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '1.5rem'
    },
    tarjetaUsuario: {
      background: 'white',
      borderRadius: '15px',
      padding: '1.5rem',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '1rem',
      cursor: 'pointer'
    },
    avatarUsuarioTarjeta: {
      flexShrink: 0
    },
    iconoUsuario: {
      fontSize: '3rem',
      color: '#8B4513',
      background: 'linear-gradient(135deg, #FFC0CB, #FFB6C1)',
      borderRadius: '50%',
      padding: '0.5rem'
    },
    informacionUsuarioTarjeta: {
      flex: 1
    },
    nombreUsuario: {
      color: '#8B4513',
      fontSize: '1.2rem',
      fontWeight: '700',
      marginBottom: '0.3rem'
    },
    correoUsuario: {
      color: '#6c757d',
      fontSize: '0.9rem',
      marginBottom: '0.5rem'
    },
    detallesUsuario: {
      marginBottom: '1rem'
    },
    tipoUsuarioInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    badgeUsuario: {
      padding: '0.25rem 0.5rem',
      borderRadius: '4px',
      color: 'white',
      fontSize: '0.8rem',
      fontWeight: '600'
    },
    accionesProducto: {
      marginTop: '1rem',
      display: 'flex',
      justifyContent: 'flex-end'
    },
    accionesUsuario: {
      marginTop: '1rem',
      display: 'flex',
      justifyContent: 'flex-end'
    },
    botonEditar: {
      backgroundColor: '#8B4513',
      color: 'white',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center'
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '0',
      maxWidth: '500px',
      width: '90%',
      maxHeight: '80vh',
      overflow: 'auto',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.5rem',
      borderBottom: '1px solid #e9ecef',
      backgroundColor: '#8B4513',
      color: 'white',
      borderRadius: '12px 12px 0 0'
    },
    botonCerrar: {
      backgroundColor: 'transparent',
      border: 'none',
      color: 'white',
      fontSize: '1.5rem',
      cursor: 'pointer',
      padding: '0.25rem'
    },
    modalForm: {
      padding: '2rem'
    },
    modalActions: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'flex-end',
      marginTop: '2rem'
    },
    botonCancelar: {
      backgroundColor: '#6c757d',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '600'
    },
    botonGuardar: {
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '600'
    }
  };

  const renderModalEditarProducto = () => (
    modalEditarProducto && (
      <div style={estilos.modalOverlay}>
        <div style={estilos.modalContent}>
          <div style={estilos.modalHeader}>
            <h3>Editar Producto</h3>
            <button 
              onClick={cerrarModalEditar}
              style={estilos.botonCerrar}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <form onSubmit={handleSubmitEditarProducto} style={estilos.modalForm}>
            <div style={estilos.inputGroup}>
              <label style={estilos.label}>Nombre del Producto*</label>
              <input
                type="text"
                name="nombre"
                value={productoEditado.nombre}
                onChange={handleInputChangeProducto}
                style={estilos.input}
                required
              />
            </div>
            
            <div style={estilos.inputGroup}>
              <label style={estilos.label}>Descripción</label>
              <textarea
                name="descripcion"
                value={productoEditado.descripcion}
                onChange={handleInputChangeProducto}
                style={{...estilos.input, minHeight: '80px', resize: 'vertical'}}
                rows="3"
              />
            </div>
            
            <div style={estilos.inputGroup}>
              <label style={estilos.label}>Precio*</label>
              <input
                type="number"
                name="precio"
                value={productoEditado.precio}
                onChange={handleInputChangeProducto}
                style={estilos.input}
                min="0"
                required
              />
            </div>
            
            <div style={estilos.inputGroup}>
              <label style={estilos.label}>Stock*</label>
              <input
                type="number"
                name="stock"
                value={productoEditado.stock}
                onChange={handleInputChangeProducto}
                style={estilos.input}
                min="0"
                required
              />
            </div>
            
            <div style={estilos.inputGroup}>
              <label style={estilos.label}>Categoría</label>
              <select
                name="categoria"
                value={productoEditado.categoria}
                onChange={handleInputChangeProducto}
                style={estilos.select}
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
            
            <div style={estilos.modalActions}>
              <button 
                type="button" 
                onClick={cerrarModalEditar}
                style={estilos.botonCancelar}
              >
                Cancelar
              </button>
              <button 
                type="submit"
                style={estilos.botonGuardar}
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
      <div style={estilos.modalOverlay}>
        <div style={estilos.modalContent}>
          <div style={estilos.modalHeader}>
            <h3>Editar Usuario</h3>
            <button 
              onClick={cerrarModalEditarUsuario}
              style={estilos.botonCerrar}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <form onSubmit={handleSubmitEditarUsuario} style={estilos.modalForm}>
            <div style={estilos.inputGroup}>
              <label style={estilos.label}>Nombre*</label>
              <input
                type="text"
                name="nombre"
                value={usuarioEditado.nombre}
                onChange={handleInputChangeUsuario}
                style={estilos.input}
                required
              />
            </div>

            <div style={estilos.inputGroup}>
              <label style={estilos.label}>Apellidos*</label>
              <input
                type="text"
                name="apellidos"
                value={usuarioEditado.apellidos}
                onChange={handleInputChangeUsuario}
                style={estilos.input}
                required
              />
            </div>

            <div style={estilos.inputGroup}>
              <label style={estilos.label}>Correo Electrónico*</label>
              <input
                type="email"
                name="correo"
                value={usuarioEditado.correo}
                onChange={handleInputChangeUsuario}
                style={estilos.input}
                required
              />
            </div>

            <div style={estilos.inputGroup}>
              <label style={estilos.label}>Fecha de Nacimiento</label>
              <input
                type="date"
                name="fecha_nacimiento"
                value={usuarioEditado.fecha_nacimiento}
                onChange={handleInputChangeUsuario}
                style={estilos.input}
              />
            </div>

            <div style={estilos.inputGroup}>
              <label style={estilos.label}>Región*</label>
              <select
                name="region"
                value={usuarioEditado.region}
                onChange={handleInputChangeUsuario}
                style={estilos.select}
                required
              >
                <option value="">Seleccionar región</option>
                {Object.keys(regionesComunas).map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>

            <div style={estilos.inputGroup}>
              <label style={estilos.label}>Comuna*</label>
              <select
                name="comuna"
                value={usuarioEditado.comuna}
                onChange={handleInputChangeUsuario}
                style={estilos.select}
                required
                disabled={!usuarioEditado.region}
              >
                <option value="">Seleccionar comuna</option>
                {comunas.map(comuna => (
                  <option key={comuna} value={comuna}>{comuna}</option>
                ))}
              </select>
            </div>

            <div style={estilos.inputGroup}>
              <label style={estilos.label}>Dirección*</label>
              <input
                type="text"
                name="direccion"
                value={usuarioEditado.direccion}
                onChange={handleInputChangeUsuario}
                style={estilos.input}
                required
              />
            </div>

            <div style={estilos.modalActions}>
              <button 
                type="button" 
                onClick={cerrarModalEditarUsuario}
                style={estilos.botonCancelar}
              >
                Cancelar
              </button>
              <button 
                type="submit"
                style={estilos.botonGuardar}
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
  
    <div style={estilos.contenedorAdmin}>
      {}
      <aside style={estilos.barraLateral}>
        <div style={estilos.encabezadoBarraLateral}>
          <h2 style={estilos.tituloBarraLateral}>
            {menuColapsado ? 'PA' : 'Panel de Admin'}
          </h2>
        </div>
        
        <nav style={estilos.navegacionBarraLateral}>
          <ul style={estilos.menuNavegacion}>
            <li style={estilos.elementoNavegacion}>
              <a
                onClick={() => setVistaActiva('tablero')}
                style={{
                  ...estilos.enlaceNavegacion,
                  ...(vistaActiva === 'tablero' ? estilos.enlaceNavegacionActivo : {})
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                onMouseLeave={(e) => {
                  if (vistaActiva !== 'tablero') {
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <i className="fas fa-home" style={estilos.iconoNavegacion}></i>
                <span style={estilos.textoNavegacion}>Tablero</span>
              </a>
            </li>
            <li style={estilos.elementoNavegacion}>
              <a
                onClick={() => setVistaActiva('productos')}
                style={{
                  ...estilos.enlaceNavegacion,
                  ...(vistaActiva === 'productos' ? estilos.enlaceNavegacionActivo : {})
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                onMouseLeave={(e) => {
                  if (vistaActiva !== 'productos') {
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <i className="fas fa-birthday-cake" style={estilos.iconoNavegacion}></i>
                <span style={estilos.textoNavegacion}>Productos</span>
              </a>
            </li>
            <li style={estilos.elementoNavegacion}>
              <a
                onClick={() => setVistaActiva('usuarios')}
                style={{
                  ...estilos.enlaceNavegacion,
                  ...(vistaActiva === 'usuarios' ? estilos.enlaceNavegacionActivo : {})
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                onMouseLeave={(e) => {
                  if (vistaActiva !== 'usuarios') {
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <i className="fas fa-users" style={estilos.iconoNavegacion}></i>
                <span style={estilos.textoNavegacion}>Usuarios</span>
              </a>
            </li>
            <li style={estilos.elementoNavegacion}>
              <a
                onClick={() => setVistaActiva('nuevoUsuario')}
                style={{
                  ...estilos.enlaceNavegacion,
                  ...(vistaActiva === 'nuevoUsuario' ? estilos.enlaceNavegacionActivo : {})
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                onMouseLeave={(e) => {
                  if (vistaActiva !== 'nuevoUsuario') {
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <i className="fas fa-user-plus" style={estilos.iconoNavegacion}></i>
                <span style={estilos.textoNavegacion}>Nuevo Usuario</span>
              </a>
            </li>
            <li>
              <a onClick={irBoletas}>Boletas</a>
            </li>
          </ul>
        </nav>
        
        <div style={estilos.pieBarraLateral}>
          <button
            onClick={salirDelPanel}
            style={estilos.botonSalir}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(220, 53, 69, 0.4)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(220, 53, 69, 0.2)'}
          >
            <i className="fas fa-sign-out-alt" style={estilos.iconoNavegacion}></i>
            <span style={estilos.textoNavegacion}>Salir</span>
          </button>
        </div>
      </aside>

      {}
      <main style={estilos.contenidoPrincipal}>
        {}
        <header style={estilos.encabezadoContenido}>
          <div style={estilos.izquierdaEncabezado}>
            <button 
              onClick={alternarMenu}
              style={estilos.alternarMenu}
            >
              <i className="fas fa-bars"></i>
            </button>
            <h1 style={estilos.tituloPagina}>
              {vistaActiva === 'productos' ? 'Productos' : 
               vistaActiva === 'usuarios' ? 'Usuarios' : 
               vistaActiva === 'nuevoUsuario' ? 'Nuevo Usuario' : 'Tablero'}
            </h1>
          </div>
          <div style={estilos.derechaEncabezado}>
            <div style={estilos.informacionUsuario}>
              <span style={estilos.textoBienvenida}>Bienvenido, Admin</span>
              <div style={estilos.avatarUsuario}>
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
