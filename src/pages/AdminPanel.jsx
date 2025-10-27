import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import { regionesComunas } from '../components/admin/data/regionesComunas';
import { estilos } from '../components/admin/styles/adminStyles';
import Sidebar from '../components/admin/components/Sidebar';
import Tablero from '../components/admin/components/Tablero';
import Productos from '../components/admin/components/Productos';
import Usuarios from '../components/admin/components/Usuarios';
import NuevoUsuario from '../components/admin/components/NuevoUsuario';
import ModalEditarProducto from '../components/admin/components/ModalEditarProducto';
import ModalEditarUsuario from '../components/admin/components/ModalEditarUsuario';

function AdminPanel() {
  const [esMovil, setEsMovil] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setEsMovil(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
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
  }, [navigate, productosDisponibles]);

  const alternarMenu = () => {
    setMenuColapsado(!menuColapsado);
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

  const renderContenido = () => {
    switch (vistaActiva) {
      case 'productos':
        return <Productos productos={productos} abrirModalEditar={abrirModalEditar} estilos={estilos} />;
      case 'usuarios':
        return <Usuarios usuarios={usuarios} abrirModalEditarUsuario={abrirModalEditarUsuario} estilos={estilos} />;
      case 'nuevoUsuario':
        return (
          <NuevoUsuario 
            nuevoUsuario={nuevoUsuario}
            comunas={comunas}
            handleInputChange={handleInputChange}
            handleSubmitUsuario={handleSubmitUsuario}
            resultado={resultado}
            regionesComunas={regionesComunas}
            estilos={estilos}
          />
        );
      default:
        return <Tablero productos={productos} usuarios={usuarios} setVistaActiva={setVistaActiva} estilos={estilos} />;
    }
  };

  const getEstilosDinamicos = () => ({
    ...estilos,
    barraLateral: {
      ...estilos.barraLateral,
      width: menuColapsado ? '80px' : '280px'
    },
    iconoNavegacion: {
      ...estilos.iconoNavegacion,
      marginRight: menuColapsado ? 0 : '1rem'
    },
    textoNavegacion: {
      display: menuColapsado ? 'none' : 'block'
    },
    contenidoPrincipal: {
      ...estilos.contenidoPrincipal,
      marginLeft: menuColapsado ? '80px' : '280px',
      position: 'relative',
      overflowY: 'auto',
      height: '100vh'
    }
  });

  const estilosDinamicos = getEstilosDinamicos();

  return (
    <div style={estilos.contenedorAdmin}>
      <Sidebar 
        menuColapsado={menuColapsado}
        vistaActiva={vistaActiva}
        setVistaActiva={setVistaActiva}
        estilos={estilos}
      />

      <main style={estilosDinamicos.contenidoPrincipal}>
        <header style={estilos.encabezadoContenido}>
          <div style={estilos.izquierdaEncabezado}>
            <button 
              onClick={alternarMenu}
              style={estilos.alternarMenu}
            >
              <i className="fas fa-bars"></i>
            </button>
            <h1 style={{
              ...estilos.tituloPagina,
              color: '#8B4513'
            }}>
              {vistaActiva === 'productos' ? 'Productos' : 
               vistaActiva === 'usuarios' ? 'Usuarios' : 
               vistaActiva === 'nuevoUsuario' ? 'Nuevo Usuario' : 'Tablero'}
            </h1>
          </div>
          {!esMovil && (
          <div style={estilos.derechaEncabezado}>
            <div style={estilos.informacionUsuario}>
              <span style={estilos.textoBienvenida}>Bienvenido, Admin</span>
              <div style={estilos.avatarUsuario}>
                <i className="fas fa-user-circle"></i>
              </div>
            </div>
          </div>
          )}
        </header>

        {renderContenido()}
      </main>
      
      <ModalEditarProducto 
        modalEditarProducto={modalEditarProducto}
        productoEditado={productoEditado}
        handleInputChangeProducto={handleInputChangeProducto}
        handleSubmitEditarProducto={handleSubmitEditarProducto}
        cerrarModalEditar={cerrarModalEditar}
        estilos={estilos}
      />
      
      <ModalEditarUsuario
        modalEditarUsuario={modalEditarUsuario}
        usuarioEditado={usuarioEditado}
        comunas={comunas}
        handleInputChangeUsuario={handleInputChangeUsuario}
        handleSubmitEditarUsuario={handleSubmitEditarUsuario}
        cerrarModalEditarUsuario={cerrarModalEditarUsuario}
        estilos={estilos}
      />
    </div>
  );
}

export default AdminPanel;
