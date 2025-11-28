import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import { getProductos, getUsuarios, updateProducto, registerUser, updateUsuario } from '../utils/apiHelper';
import { regionesComunas } from '../components/admin/data/regionesComunas';
import { estilos } from '../components/admin/styles/adminStyles';
import Sidebar from '../components/admin/components/Sidebar';
import Tablero from '../components/admin/components/Tablero';
import Productos from '../components/admin/components/Productos';
import Usuarios from '../components/admin/components/Usuarios';
import NuevoUsuario from '../components/admin/components/NuevoUsuario';
import ModalEditarProducto from '../components/admin/components/ModalEditarProducto';
import ModalEditarUsuario from '../components/admin/components/ModalEditarUsuario';
import ProductosCriticos from '../components/admin/components/ProductosCriticos';
import Reportes from '../components/admin/components/Reportes';
import Perfil from './Perfil';
import { 
  validarRUT, 
  formatearRUTEnTiempoReal, 
  obtenerMensajeErrorRUT 
} from '../utils/rutUtils';

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
  const { productosStock } = useCarrito();
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
    dia_nacimiento: '',
    mes_nacimiento: '',
    ano_nacimiento: '',
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
    categoria: '',
    tieneDescuento: false,
    precioConDescuento: ''
  });
  const [modalEditarUsuario, setModalEditarUsuario] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [usuarioEditado, setUsuarioEditado] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    run: '',
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

    // Cargar productos desde el backend
    const cargarProductos = async () => {
      const productosDB = await getProductos();
      if (productosDB && productosDB.length > 0) {
        const productosConStock = productosDB.map(producto => ({
          id: producto.p_id,
          codigo: producto.p_codigo,
          nombre: producto.p_nombre,
          precio: producto.p_precio,
          descripcion: producto.p_descripcion,
          categoria: producto.p_categoria,
          stock: producto.p_stock,
          imagen: producto.p_imagen,
          stock_critico: producto.p_stock_critico,
          precioEspecial: producto.p_precio_oferta || null
        }));
        setProductos(productosConStock);
      }
    };

    // Cargar usuarios desde el backend
    const cargarUsuarios = async () => {
      const usuariosDB = await getUsuarios();
      if (usuariosDB && usuariosDB.length > 0) {
        const usuariosFormateados = usuariosDB.map(usuario => ({
          id: usuario.u_id,
          run: usuario.u_run || '',
          nombre: usuario.u_nombre,
          apellidos: usuario.u_apellido,
          correo: usuario.u_correo,
          fecha_nacimiento: usuario.u_f_nacimiento || '',
          region: usuario.u_region,
          comuna: usuario.u_comuna,
          direccion: usuario.u_direccion,
          isAdmin: usuario.u_rol === 'ADMIN',
          fechaRegistro: usuario.u_f_registro
        }));
        setUsuarios(usuariosFormateados);
      }
    };

    cargarProductos();
    cargarUsuarios();
  }, [navigate]);

  const alternarMenu = () => {
    setMenuColapsado(!menuColapsado);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Manejo especial para el campo RUT
    if (name === 'run') {
      const valorFormateado = formatearRUTEnTiempoReal(value);
      setNuevoUsuario(prev => ({
        ...prev,
        [name]: valorFormateado
      }));
    } else {
      setNuevoUsuario(prev => ({
        ...prev,
        [name]: value
      }));
    }

    if (name === 'region') {
      setComunas(regionesComunas[value] || []);
      setNuevoUsuario(prev => ({
        ...prev,
        comuna: '' 
      }));
    }
  };

  const handleSubmitUsuario = async (e) => {
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

    // Validar RUT
    const errorRUT = obtenerMensajeErrorRUT(nuevoUsuario.run);
    if (errorRUT) {
      setResultado(errorRUT);
      return;
    }

    // Convertir fecha de nacimiento al formato correcto
    let fechaNacimientoFormateada = '';
    if (nuevoUsuario.dia_nacimiento && nuevoUsuario.mes_nacimiento && nuevoUsuario.ano_nacimiento) {
      fechaNacimientoFormateada = `${nuevoUsuario.ano_nacimiento}-${nuevoUsuario.mes_nacimiento}-${nuevoUsuario.dia_nacimiento}`;
    }

    const usuarioParaBackend = {
      u_nombre: nuevoUsuario.nombre,
      u_apellido: nuevoUsuario.apellidos,
      u_correo: nuevoUsuario.correo,
      u_contrasenia: nuevoUsuario.password,
      u_direccion: nuevoUsuario.direccion,
      u_f_nacimiento: fechaNacimientoFormateada,
      u_f_registro: new Date().toISOString(),
      u_rol: nuevoUsuario.rol === 'admin' ? 'ADMIN' : 'USER',
      u_comuna: nuevoUsuario.comuna,
      u_region: nuevoUsuario.region,
      u_descuento_10: false,
      u_descuento_50: false,
      u_regalo_cumpleanios: false
    };

    const response = await registerUser(usuarioParaBackend);

    if (response.success) {
      setResultado('¡Usuario registrado exitosamente!');

      // Recargar usuarios desde el backend
      const usuariosDB = await getUsuarios();
      if (usuariosDB && usuariosDB.length > 0) {
        const usuariosFormateados = usuariosDB.map(usuario => ({
          id: usuario.u_id,
          run: usuario.u_run || '',
          nombre: usuario.u_nombre,
          apellidos: usuario.u_apellido,
          correo: usuario.u_correo,
          fecha_nacimiento: usuario.u_f_nacimiento || '',
          region: usuario.u_region,
          comuna: usuario.u_comuna,
          direccion: usuario.u_direccion,
          isAdmin: usuario.u_rol === 'ADMIN',
          fechaRegistro: usuario.u_f_registro
        }));
        setUsuarios(usuariosFormateados);
      }

      setNuevoUsuario({
        rol: '',
        run: '',
        nombre: '',
        apellidos: '',
        correo: '',
        fecha_nacimiento: '',
        dia_nacimiento: '',
        mes_nacimiento: '',
        ano_nacimiento: '',
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
    } else {
      setResultado(response.message || 'Error al registrar usuario');
    }
  };

  const abrirModalEditar = (producto) => {
    setProductoEditando(producto);
    setProductoEditado({
      nombre: producto.nombre,
      descripcion: producto.descripcion || '',
      precio: producto.precio,
      stock: producto.stock,
      categoria: producto.categoria,
      tieneDescuento: producto.precioEspecial ? true : false,
      precioConDescuento: producto.precioEspecial || ''
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
      categoria: '',
      tieneDescuento: false,
      precioConDescuento: ''
    });
  };

  const handleInputChangeProducto = (e) => {
    const { name, value, type, checked } = e.target;
    setProductoEditado(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmitEditarProducto = async (e) => {
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

    // Validar precio con descuento si tiene descuento activado
    let precioEspecial = null;
    if (productoEditado.tieneDescuento) {
      if (!productoEditado.precioConDescuento) {
        alert('Por favor ingrese el precio con descuento');
        return;
      }
      const precioDesc = parseInt(productoEditado.precioConDescuento);
      if (isNaN(precioDesc) || precioDesc <= 0) {
        alert('El precio con descuento debe ser un número válido mayor a 0');
        return;
      }
      if (precioDesc >= parseInt(productoEditado.precio)) {
        alert('El precio con descuento debe ser menor al precio normal');
        return;
      }
      precioEspecial = precioDesc;
    }

    // Preparar objeto para el backend
    const productoParaBackend = {
      p_id: productoEditando.id,
      p_codigo: productoEditando.codigo,
      p_nombre: productoEditado.nombre,
      p_descripcion: productoEditado.descripcion,
      p_precio: parseInt(productoEditado.precio),
      p_stock: parseInt(productoEditado.stock),
      p_categoria: productoEditado.categoria,
      p_imagen: productoEditando.imagen,
      p_stock_critico: productoEditando.stock_critico,
      p_precio_oferta: precioEspecial
    };

    const response = await updateProducto(productoParaBackend);

    if (response.success) {
      // Actualizar lista local
      const productosActualizados = productos.map(producto => 
        producto.codigo === productoEditando.codigo 
          ? { 
              ...producto, 
              nombre: productoEditado.nombre,
              descripcion: productoEditado.descripcion,
              precio: parseInt(productoEditado.precio),
              stock: parseInt(productoEditado.stock),
              categoria: productoEditado.categoria,
              precioEspecial: precioEspecial
            }
          : producto
      );
      
      setProductos(productosActualizados);
      
      // Disparar evento para actualizar productos en otras páginas
      window.dispatchEvent(new Event('productosActualizados'));
      
      alert('Producto actualizado exitosamente');
      cerrarModalEditar();
    } else {
      alert(response.message || 'Error al actualizar producto');
    }
  };

  const abrirModalEditarUsuario = (usuario) => {
    setUsuarioEditando(usuario);
    setUsuarioEditado({
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      correo: usuario.correo,
      run: usuario.run || '',
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
    
    // Manejo especial para el campo RUT
    if (name === 'run') {
      const valorFormateado = formatearRUTEnTiempoReal(value);
      setUsuarioEditado(prev => ({
        ...prev,
        [name]: valorFormateado
      }));
    } else {
      setUsuarioEditado(prev => ({
        ...prev,
        [name]: value
      }));
    }

    if (name === 'region') {
      setComunas(regionesComunas[value] || []);
      setUsuarioEditado(prev => ({
        ...prev,
        region: value,
        comuna: '' 
      }));
    }
  };

  const handleSubmitEditarUsuario = async (e) => {
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

    // Validar RUT si se proporciona
    if (usuarioEditado.run && usuarioEditado.run.trim() !== '') {
      const errorRUT = obtenerMensajeErrorRUT(usuarioEditado.run);
      if (errorRUT) {
        alert(errorRUT);
        return;
      }
    }

    // Encontrar usuario original para mantener datos que no se editan
    const usuarioOriginal = usuarios.find(u => u.id === usuarioEditando.id);

    const usuarioParaBackend = {
      u_id: usuarioEditando.id,
      u_nombre: usuarioEditado.nombre,
      u_apellido: usuarioEditado.apellidos,
      u_correo: usuarioEditado.correo,
      u_contrasenia: usuarioOriginal.password || '123', // Mantener contraseña original
      u_direccion: usuarioEditado.direccion,
      u_f_nacimiento: usuarioEditado.fecha_nacimiento,
      u_f_registro: usuarioOriginal.fechaRegistro,
      u_rol: usuarioOriginal.isAdmin ? 'ADMIN' : 'USER',
      u_comuna: usuarioEditado.comuna,
      u_region: usuarioEditado.region,
      u_descuento_10: false,
      u_descuento_50: false,
      u_regalo_cumpleanios: false
    };

    const response = await updateUsuario(usuarioParaBackend);

    if (response.success) {
      // Actualizar lista local
      const usuariosActualizados = usuarios.map(usuario => 
        usuario.id === usuarioEditando.id 
          ? { 
              ...usuario, 
              nombre: usuarioEditado.nombre,
              apellidos: usuarioEditado.apellidos,
              correo: usuarioEditado.correo,
              run: usuarioEditado.run,
              fecha_nacimiento: usuarioEditado.fecha_nacimiento,
              region: usuarioEditado.region,
              comuna: usuarioEditado.comuna,
              direccion: usuarioEditado.direccion
            }
          : usuario
      );
      
      setUsuarios(usuariosActualizados);
      
      alert('Usuario actualizado exitosamente');
      cerrarModalEditarUsuario();
    } else {
      alert(response.message || 'Error al actualizar usuario');
    }
  };

  const descargarReporteCSV = (tipoReporte) => {
    let datos = [];
    let nombreArchivo = '';
    
    if (tipoReporte === 'productos') {
      datos = productos.map(producto => ({
        'Código': producto.codigo,
        'Nombre': producto.nombre,
        'Categoría': producto.categoria,
        'Precio': producto.precio,
        'Stock': producto.stock,
        'Stock Crítico': producto.stock_critico,
        'Estado': producto.stock === 0 ? 'Sin Stock' : 
                 producto.stock <= 5 ? 'Stock Crítico' : 'Normal'
      }));
      nombreArchivo = 'reporte_productos.csv';
    } else if (tipoReporte === 'usuarios') {
      datos = usuarios.map(usuario => ({
        'ID': usuario.id,
        'RUN': usuario.run,
        'Nombre': usuario.nombre,
        'Apellidos': usuario.apellidos,
        'Correo': usuario.correo,
        'Fecha Nacimiento': usuario.fecha_nacimiento || 'No especificada',
        'Región': usuario.region,
        'Comuna': usuario.comuna,
        'Dirección': usuario.direccion,
        'Tipo': usuario.isAdmin ? 'Administrador' : 'Usuario',
        'Fecha Registro': new Date(usuario.fechaRegistro).toLocaleDateString('es-CL')
      }));
      nombreArchivo = 'reporte_usuarios.csv';
    }

    if (datos.length === 0) {
      alert(`No hay ${tipoReporte} para exportar`);
      return;
    }

    const headers = Object.keys(datos[0]);
    
    const escaparValorCSV = (value) => {
      if (value === null || value === undefined) return '';
      const str = String(value);
      return `"${str.replace(/"/g, '""')}"`;
    };

    const csvContent = [
      headers.map(h => `"${h}"`).join(','),
      ...datos.map(row => 
        headers.map(header => escaparValorCSV(row[header])).join(',')
      )
    ].join('\n');

    const BOM = '\uFEFF';
    const csvWithBOM = BOM + csvContent;
    const blob = new Blob([csvWithBOM], { type: 'application/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', nombreArchivo);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      
      try {
        link.click();
        
        const evento = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: false
        });
        link.dispatchEvent(evento);
        
      } catch (error) {
        window.open(url, '_blank');
      }
      
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 1000);
      
      alert(`Reporte ${tipoReporte} descargado exitosamente`);
    } else {
      alert('Tu navegador no soporta la descarga de archivos');
    }
  };

  const renderContenido = () => {
    switch (vistaActiva) {
      case 'productos':
        return <Productos 
          productos={productos} 
          abrirModalEditar={abrirModalEditar} 
          estilos={estilos}
          descargarReporteCSV={() => descargarReporteCSV('productos')}
        />;
      case 'productosCriticos':
        return <ProductosCriticos 
          productos={productos}
          setVistaActiva={setVistaActiva}
          abrirModalEditar={abrirModalEditar}
          estilos={estilos}
        />;
      case 'reportes':
        return <Reportes 
          productos={productos}
          usuarios={usuarios}
          setVistaActiva={setVistaActiva}
          descargarReporteCSV={descargarReporteCSV}
          estilos={estilos}
        />;
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
      case 'perfil':
        return (
          <div style={{ padding: '2rem', marginTop: '-60px' }}>
            <Perfil />
          </div>
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
        {vistaActiva !== 'perfil' && (
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
                 vistaActiva === 'productosCriticos' ? 'Productos Críticos' :
                 vistaActiva === 'reportes' ? 'Reportes' :
                 vistaActiva === 'usuarios' ? 'Usuarios' : 
                 vistaActiva === 'nuevoUsuario' ? 'Nuevo Usuario' :
                 vistaActiva === 'perfil' ? 'Mi Perfil' : 'Tablero'}
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
        )}

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
