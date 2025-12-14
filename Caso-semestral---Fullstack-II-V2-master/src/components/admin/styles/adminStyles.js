export const estilos = {
  contenedorAdmin: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: "'Lato', sans-serif"
  },
  barraLateral: {
    width: (menuColapsado) => menuColapsado ? '80px' : '280px',
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
    marginRight: (menuColapsado) => menuColapsado ? 0 : '1rem',
    fontSize: '1.2rem',
    width: '20px'
  },
  textoNavegacion: {
    display: (menuColapsado) => menuColapsado ? 'none' : 'block'
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
    marginLeft: (menuColapsado) => menuColapsado ? '80px' : '280px',
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
    marginBottom: '0.5rem',
    width: '100%',
    boxSizing: 'border-box'
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
    transition: 'border 0.2s',
    width: '100%',
    boxSizing: 'border-box'
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
    transition: 'border 0.2s',
    width: '100%',
    boxSizing: 'border-box'
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

// Helper function to resolve dynamic styles
export const getDynamicStyles = (estilos, menuColapsado) => {
  return {
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
      marginLeft: menuColapsado ? '80px' : '280px'
    }
  };
};

