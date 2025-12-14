import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductos, getBoletas, getDetalleBoletas } from '../utils/apiHelper';
import { estilos } from '../components/admin/styles/adminStyles';
import Productos from '../components/admin/components/Productos';
import CardBoletasPreview from '../components/cardBoletasPreview/CardBoletasPreview';
import '../styles/cssESCALONA.css';
import '../styles/AdminPanel.css';

function VendedorDashboard() {
  const navigate = useNavigate();
  const [vistaActiva, setVistaActiva] = useState('tablero');
  const [productos, setProductos] = useState([]);
  const [boletas, setBoletas] = useState([]);
  const [menuColapsado, setMenuColapsado] = useState(false);

  useEffect(() => {
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual') || '{}');
    if (!usuarioActual.isVendedor && !usuarioActual.isAdmin) {
      navigate('/');
      return;
    }

    // Cargar productos
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

    // Cargar boletas
    const cargarBoletas = async () => {
      const boletasDB = await getBoletas();
      const detallesDB = await getDetalleBoletas();
      
      if (boletasDB && boletasDB.length > 0) {
        const boletasConDetalle = boletasDB.map(boleta => {
          const detalle = detallesDB?.find(d => d.db_id_boleta === boleta.b_id) || null;
          
          return {
            n_boleta: boleta.b_id,
            monto_total: boleta.b_monto_total,
            fecha_compra: detalle?.db_fecha_compra || new Date().toISOString(),
            comprador: {
              nombre_comprador: boleta.b_nombre_comprador || detalle?.db_nombre_comprador || 'Sin nombre'
            },
            recibidor: {
              nombre_recibidor: boleta.b_nombre_recibidor || detalle?.db_nombre_recibidor || 'Sin nombre'
            },
            direccion_despacho: detalle?.db_direccion_despacho || 'Sin dirección',
            fecha_despacho: detalle?.db_fecha_despacho || '',
            cantidad_total: detalle?.db_cantidad_total || 0,
            productos_comprados: detalle?.db_id_productos_comprados ? 
              JSON.parse(detalle.db_id_productos_comprados) : []
          };
        });
        setBoletas(boletasConDetalle);
      }
    };

    cargarProductos();
    cargarBoletas();
  }, [navigate]);

  const alternarMenu = () => {
    setMenuColapsado(!menuColapsado);
  };

  const verDetalleBoleta = (codigo) => {
    localStorage.setItem("BOLETA_SELECTED", JSON.stringify(codigo));
    navigate("/vendedor/boletas/detalle-boleta");
  };

  const renderContenido = () => {
    switch (vistaActiva) {
      case 'productos':
        return (
          <Productos 
            productos={productos} 
            abrirModalEditar={() => {}} // Vendedor no puede editar
            estilos={estilos}
            descargarReporteCSV={() => {}}
            onEliminar={() => {}} // Vendedor no puede eliminar
            soloLectura={true} // Modo solo lectura para vendedores
          />
        );
      case 'boletas':
        return (
          <div className="area-contenido" style={estilos.areaContenido}>
            <div style={estilos.encabezadoSeccion}>
              <h2>Historial de Boletas</h2>
            </div>
            <div>
              {boletas.map(boleta => (
                <div key={boleta.n_boleta}>
                  <CardBoletasPreview
                    lsb={boleta}
                    ver={() => verDetalleBoleta(boleta.n_boleta)}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div style={estilos.areaContenido}>
            <div style={estilos.encabezadoSeccion}>
              <h2>Panel Vendedor</h2>
            </div>
            <div style={{
              padding: '2rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}>
              <div style={{
                ...estilos.tarjetaProducto,
                padding: '2rem',
                textAlign: 'center',
                cursor: 'pointer'
              }}
              onClick={() => setVistaActiva('productos')}
              >
                <i className="fas fa-birthday-cake" style={{ fontSize: '3rem', color: '#8B4513', marginBottom: '1rem' }}></i>
                <h3 style={{ color: '#8B4513', marginBottom: '0.5rem' }}>Productos</h3>
                <p style={{ color: '#666' }}>Ver catálogo de productos</p>
                <div style={{ marginTop: '1rem', fontSize: '1.2rem', fontWeight: 'bold', color: '#8B4513' }}>
                  {productos.length} productos
                </div>
              </div>
              
              <div style={{
                ...estilos.tarjetaProducto,
                padding: '2rem',
                textAlign: 'center',
                cursor: 'pointer'
              }}
              onClick={() => setVistaActiva('boletas')}
              >
                <i className="fas fa-receipt" style={{ fontSize: '3rem', color: '#8B4513', marginBottom: '1rem' }}></i>
                <h3 style={{ color: '#8B4513', marginBottom: '0.5rem' }}>Boletas</h3>
                <p style={{ color: '#666' }}>Ver historial de boletas</p>
                <div style={{ marginTop: '1rem', fontSize: '1.2rem', fontWeight: 'bold', color: '#8B4513' }}>
                  {boletas.length} boletas
                </div>
              </div>
            </div>
          </div>
        );
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
  const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual') || '{}');

  return (
    <div style={estilos.contenedorAdmin}>
      {/* Sidebar */}
      <aside style={{
        width: menuColapsado ? '80px' : '280px',
        background: 'linear-gradient(180deg, #8B4513 0%, #A0522D 100%)',
        color: 'white',
        position: 'fixed',
        height: '100vh',
        left: 0,
        top: 0,
        zIndex: 1000,
        transition: 'all 0.3s ease',
        boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
        overflowY: 'auto',
        overflowX: 'hidden'
      }}>
        <div style={{
          ...estilos.encabezadoBarraLateral,
          padding: menuColapsado ? '1.5rem 0.5rem' : '2rem 1.5rem'
        }}>
          {menuColapsado ? (
            <img 
              src="/img/logo_chico_color.png" 
              alt="Logo" 
              style={{
                width: '55px',
                height: 'auto',
                display: 'block',
                margin: '0 auto'
              }}
            />
          ) : (
            <h2 style={estilos.tituloBarraLateral}>
              Panel Vendedor
            </h2>
          )}
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
                <i className="fas fa-home" style={{...estilos.iconoNavegacion, marginRight: menuColapsado ? 0 : '1rem'}}></i>
                {!menuColapsado && <span>Inicio</span>}
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
                <i className="fas fa-birthday-cake" style={{...estilos.iconoNavegacion, marginRight: menuColapsado ? 0 : '1rem'}}></i>
                {!menuColapsado && <span>Productos</span>}
              </a>
            </li>
            <li style={estilos.elementoNavegacion}>
              <a
                onClick={() => setVistaActiva('boletas')}
                style={{
                  ...estilos.enlaceNavegacion,
                  ...(vistaActiva === 'boletas' ? estilos.enlaceNavegacionActivo : {})
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                onMouseLeave={(e) => {
                  if (vistaActiva !== 'boletas') {
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <i className="fas fa-receipt" style={{...estilos.iconoNavegacion, marginRight: menuColapsado ? 0 : '1rem'}}></i>
                {!menuColapsado && <span>Boletas</span>}
              </a>
            </li>
          </ul>
        </nav>
        
        <div style={estilos.pieBarraLateral}>
          <button
            onClick={() => {
              localStorage.removeItem('usuarioActual');
              navigate('/');
            }}
            style={estilos.botonSalir}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(220, 53, 69, 0.4)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(220, 53, 69, 0.2)'}
          >
            <i className="fas fa-sign-out-alt" style={{...estilos.iconoNavegacion, marginRight: menuColapsado ? 0 : '1rem'}}></i>
            {!menuColapsado && <span>Salir</span>}
          </button>
        </div>
      </aside>

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
               vistaActiva === 'boletas' ? 'Boletas' : 
               'Panel Vendedor'}
            </h1>
          </div>
          <div style={estilos.derechaEncabezado}>
            <div style={estilos.informacionUsuario}>
              <span style={estilos.textoBienvenida}>
                Bienvenido, {usuarioActual.nombre || 'Vendedor'}
              </span>
              <div style={estilos.avatarUsuario}>
                <i className="fas fa-user-circle"></i>
              </div>
            </div>
          </div>
        </header>

        {renderContenido()}
      </main>
    </div>
  );
}

export default VendedorDashboard;
