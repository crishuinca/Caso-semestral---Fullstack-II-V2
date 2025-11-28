import React, { useState, useEffect } from 'react';
import { useCarrito } from '../context/CarritoContext';
import CartItem from '../components/carrito/CartItem';
import CarritoResumen from '../components/carrito/CarritoResumen';
import ConfirmacionModal from '../components/carrito/ConfirmacionModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Carrito.css';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from 'react-router-dom';
import { 
  validarRUT, 
  formatearRUTEnTiempoReal, 
  obtenerMensajeErrorRUT 
} from '../utils/rutUtils';
import { getProductos, updateProducto } from '../utils/apiHelper';

function Carrito() {

  const navigate = useNavigate()
  const {
    carrito,
    productosStock,
    eliminarProducto,
    actualizarCantidad,
    actualizarMensaje,
    vaciarCarrito,
    calcularTotal,
    mostrarMensaje
  } = useCarrito();
  const [btnpago, setBtnpago] = useState(false)
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [datosCompra, setDatosCompra] = useState({
    nombre: '',
    rut: '',
    direccion: '',
    dia: '',
    mes: '',
    ano: '',
    tipoEntrega: 'despacho'
  });
  const [prodsBDD, setProdsBDD] = useState([])

  useEffect(()=>{
    const recuperarPRODS = async()=>{
      const productos_enBDD = await getProductos()
      let productos_guardados;
      productos_guardados = productos_enBDD.map(producto => ({
        prod_codigo: producto.p_codigo,
        prod_nombre: producto.p_nombre,
        prod_desc: producto.p_descripcion || 'Sin descripción',
        prod_categoria: producto.p_categoria,
        prod_precio: producto.p_precio,
        prod_imagen: producto.p_imagen,
        prod_stock: producto.p_stock,
        prod_stock_critico: producto.p_stock_critico,
        prod_precio_oferta: producto.p_precio_oferta || null
      }));
      setProdsBDD(productos_guardados)
    }
    recuperarPRODS()
  },[])

  const actualizarStock = async () => {
    try {
      const productos_enBDD = await getProductos()
      const productos_guardados = productos_enBDD.map(p => ({
        p_id: p.p_id,
        p_codigo: p.p_codigo,
        p_nombre: p.p_nombre,
        p_descripcion: p.p_descripcion || 'Sin descripción',
        p_categoria: p.p_categoria,
        p_precio: p.p_precio,
        p_imagen: p.p_imagen,
        p_stock: p.p_stock,
        p_stock_critico: p.p_stock_critico,
        p_precio_oferta: p.p_precio_oferta ?? null
      }))

      let stock_productos = JSON.parse(localStorage.getItem("productosStock") || "null")
      if (!stock_productos) {return}

      // traduccion pa entender: 
      // contruye un producto por cada uno de la lista de productos
      for (const producto of productos_guardados) {
        const stock_pagina = stock_productos.find( s =>
          s.prod_codigo == producto.p_codigo ||
          s.p_codigo == producto.p_codigo
        )
        // esto codigo hace que si no encuentra algo, 
        // pase al siguiente, para evitar un error
        if (!stock_pagina) continue

        const producto_actualizado = {
          ...producto, p_stock: parseInt(stock_pagina.stock)
        }
        await updateProducto(producto_actualizado)
      }
      
    } catch (error) {
      console.error("Error en actualizarStock:", error)
      throw error
    }
  }

  // Cargar datos del usuario si está logueado
  const cargarDatosUsuario = () => {
    try {
      const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual') || 'null');
      if (usuarioActual) {
        setDatosCompra(prev => ({
          ...prev,
          nombre: usuarioActual.nombre || '',
          rut: usuarioActual.run || '',
          direccion: usuarioActual.direccion || ''
        }));
      }
    } catch (error) {
      console.error('Error al cargar datos del usuario:', error);
    }
  };

  // Cargar datos del usuario al montar el componente
  useEffect(() => {
    cargarDatosUsuario();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Manejo especial para el campo RUT
    if (name === 'rut') {
      const valorFormateado = formatearRUTEnTiempoReal(value);
      setDatosCompra(prev => ({
        ...prev,
        [name]: valorFormateado
      }));
    } else {
      setDatosCompra(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

//-----------------------------------------------------------------------------------
  const confirmarPedido = () => {
    
    if (!datosCompra.nombre.trim()) {
      mostrarMensaje('Ingrese el nombre del comprador', 'error');
      return;
    }
    if (!datosCompra.rut.trim()) {
      mostrarMensaje('Ingrese el RUT del comprador', 'error');
      return;
    }
    
    // Validar RUT
    const errorRUT = obtenerMensajeErrorRUT(datosCompra.rut);
    if (errorRUT) {
      mostrarMensaje(errorRUT, 'error');
      return;
    }
    if (datosCompra.tipoEntrega === 'despacho' && !datosCompra.direccion.trim()) {
      mostrarMensaje('Ingrese la dirección de despacho', 'error');
      return;
    }
    if (!datosCompra.dia || !datosCompra.mes || !datosCompra.ano) {
      mostrarMensaje('Ingrese la fecha de entrega completa', 'error');
      return;
    }

    // Validar que la fecha no sea pasada
    const fechaSeleccionada = new Date(parseInt(datosCompra.ano), parseInt(datosCompra.mes) - 1, parseInt(datosCompra.dia));
    const fechaHoy = new Date();
    fechaHoy.setHours(0, 0, 0, 0); // Resetear horas para comparar solo fechas
    
    if (fechaSeleccionada < fechaHoy) {
      mostrarMensaje('La fecha de entrega no puede ser anterior a hoy', 'error');
      return;
    }

    setBtnpago(true)
    
    const pedido = {
      productos: carrito,
      total: calcularTotal(),
      cliente_despachar: datosCompra,
      fecha_despacho: new Date().toISOString(),
      direccion_despacho: datosCompra.direccion,
    };
    localStorage.setItem("temporal_info", JSON.stringify(pedido))

  };
//---------------------------------------------------------------------------
  const handleContinuar = () => {
    if (carrito.length > 0) {
      cargarDatosUsuario();
      setMostrarConfirmacion(true);
    }
  };

  const handleTipoEntregaChange = (tipo) => {
    setDatosCompra(prev => ({ ...prev, tipoEntrega: tipo }));
  };

  const handleCancelarModal = () => {
    setMostrarConfirmacion(false);
    // Resetear datos al cerrar
    setDatosCompra({
      nombre: '',
      rut: '',
      direccion: '',
      dia: '',
      mes: '',
      ano: '',
      tipoEntrega: 'despacho'
    });
  };
//-----------------------------------------------------------------------------------
  const redirigir = (details) => {
  try {
    localStorage.setItem("temporal_info_quien_pago", JSON.stringify(details));
  } catch (e) {
    console.error("Error guardando info de pago:", e);
    localStorage.setItem("temporal_info_quien_pago", "");
  }
  navigate("/compra-exitosa");
  vaciarCarrito();
};
//-----------------------------------------------------------------------------------
  const redirigirFallo = (error) => {
    try {
      const tipo_error = {
        insuficiente: /INSTRUMENT_DECLINED|INSUFFICIENT_FUNDS/i,
        expiro: /EXPIRED_CARD/i,
        rechazado: /CARD_DECLINED|REJECTED/i,
        procesando: /PROCESSING_ERROR/i,
      }
      var errorTxt = String(error)

      if(tipo_error.insuficiente.test(errorTxt)){
        localStorage.setItem("error_compra", "Pago rechazado, fondos insuficientes o metodo no disponible")
        return}
      if(tipo_error.expiro.test(errorTxt)){
        localStorage.setItem("error_compra", "Tarjeta expirada, usa otra tarjeta o metodo de pago")
        return}
      if(tipo_error.rechazado.test(errorTxt)){
        localStorage.setItem("error_compra", "Tarjeta rechazada por el banco, pruebe otro metodo")
        return}
      if(tipo_error.procesando.test(errorTxt)){
        localStorage.setItem("error_compra", "Error de procesamiento, intente de nuevo mas tarde")
        return}
      
      localStorage.setItem("error_compra", "Error al procesar el pago")
      console.error(error)

    } catch (e) {
      console.error("Error guardando info de fallo:", e);
      localStorage.setItem("error_compra", "ERROR DESCONOCIDO");
    }
    navigate("/compra-erronea");
  };
//-----------------------------------------------------------------------------------
  const estilos = {
    body: {
      backgroundColor: '#FFF5E1',
      minHeight: '100vh',
      paddingTop: '80px',
      fontFamily: 'sans-serif',
      color: '#5D4037'
    },
    tituloCarrito: {
      color: '#5D4037',
      fontFamily: 'Pacifico',
      fontSize: '35px',
      marginTop: '3.5rem',
      marginBottom: '3.5rem',
      marginLeft: '2.1rem',
      marginRight: '2.1rem'
    },
    resumenCarro: {
      fontFamily: 'sans-serif',
      color: '#5D4037',
      border: '1px solid #ff2600a9',
      borderRadius: '5px',
      backgroundColor: '#ffefcf'
    },
    inputCarrito: {
      fontFamily: 'sans-serif',
      color: '#5D4037',
      backgroundColor: '#fff5e1',
      border: '1px solid #ff2600a9',
      marginBottom: '15px',
      borderRadius: '2px'
    },
    btnConfirmar: {
      backgroundColor: '#FFC0CB',
      color: '#8B4513',
      border: '1px solid #ff2600a9',
      borderRadius: '5px',
      padding: '10px 20px',
      margin: '5px',
      cursor: 'pointer',
      fontWeight: 'bold'
    },
    modalConfirmar: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 1050,
      border: '1px solid #ff2600a9',
      borderRadius: '5px',
      padding: '1.5rem',
      backgroundColor: '#ffefcf',
      fontFamily: 'sans-serif',
      color: '#5D4037',
      maxWidth: '780px',
      maxHeight: '85vh',
      overflowY: 'auto',
      width: '100%'
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1040
    }
  };
//-----------------------------------------------------------------------------------
  const initialOptions = {
        clientId: "AR36SqRE30K24Cv_7MIVRq0qBamsHC1vhgU_hiXCwRNoGehpT1hzCrSTgTjWEgNFFssFeZr4SlkqlFYN",
        currency: "USD",
        intent: "capture",
        style: ""
    };
//-----------------------------------------------------------------------------------
  return (
    <div style={estilos.body}>
      <main>
        <p style={estilos.tituloCarrito}>Mi carrito de compras</p>
        
        <div className="row g-0 m-0">
          {}
          {/* Productos del carrito */}
          <div className="col-lg-7 col-md-12 col-sm-12">
            <div className="pb-4 pt-4 ps-4">
              {carrito.length === 0 ? (
                <div className="text-center p-5">
                  <h4 style={{ color: '#5D4037' }}>Tu carrito está vacío</h4>
                  <p>Agrega algunos productos deliciosos</p>
                </div>
              ) : (
                carrito.map((item, index) => {
                  const producto = productosStock.find(p => p.prod_codigo === item.codigo);
                  if (!producto) return null;
                  
                  return (
                    <CartItem
                      key={index}
                      item={item}
                      producto={producto}
                      onCantidadChange={actualizarCantidad}
                      onMensajeChange={actualizarMensaje}
                      onEliminar={eliminarProducto}
                      estilos={estilos}
                    />
                  );
                })
              )}
            </div>
          </div>

          {/* Resumen del carrito */}
          <div className="col-lg-5 col-sm-12 pb-4 pt-4 ps-4 pe-4">
            <CarritoResumen
              carrito={carrito}
              productosDisponibles={productosStock}
              calcularTotal={calcularTotal}
              onContinuar={handleContinuar}
              onVaciar={vaciarCarrito}
              estilos={estilos}
            />
          </div>
        </div>

        {/* Modal de confirmación */}
        <ConfirmacionModal
          mostrarConfirmacion={mostrarConfirmacion}
          datosCompra={datosCompra}
          onInputChange={handleInputChange}
          onTipoEntregaChange={handleTipoEntregaChange}
          carrito={carrito}
          productosDisponibles={productosStock}
          calcularTotal={calcularTotal}
          onConfirmar={confirmarPedido}
          onCancelar={handleCancelarModal}
          estilos={estilos}
          btnpago={btnpago}
          initialOptions={initialOptions}
          actualizar_el_stock={()=>actualizarStock()}

          redirigirFallo={redirigirFallo}
          redirigir={redirigir}
        />
      </main>
    </div>
  );
}

export default Carrito;