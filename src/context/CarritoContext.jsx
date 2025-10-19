import React, { createContext, useContext, useState, useEffect } from 'react';

const CarritoContext = createContext();

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe usarse dentro de CarritoProvider');
  }
  return context;
};

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const productosDisponibles = [
    {
      prod_codigo: "TC001",
      nombre: "Torta Cuadrada de Chocolate",
      descripcion: "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales.",
      categoria: "Tortas Cuadradas",
      precio: 45000,
      imagen: "/img/TC001.png",
      stock: 15,
      stock_critico: 3
    },
    {
      prod_codigo: "TC002",
      nombre: "Torta Cuadrada de Frutas",
      descripcion: "Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones.",
      categoria: "Tortas Cuadradas",
      precio: 50000,
      imagen: "/img/TC002.jpg",
      stock: 15,
      stock_critico: 3
    },
    {
      prod_codigo: "TT001",
      nombre: "Torta Circular de Vainilla",
      descripcion: "Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce, perfecto para cualquier ocasión.",
      categoria: "Tortas Circulares",
      precio: 40000,
      imagen: "/img/TT001.png",
      stock: 15,
      stock_critico: 3
    },
    {
      prod_codigo: "TT002",
      nombre: "Torta Circular de Manjar",
      descripcion: "Torta tradicional chilena con manjar y nueces, un deleite para los amantes de los sabores dulces y clásicos.",
      categoria: "Tortas Circulares",
      precio: 42000,
      imagen: "/img/TT002.png",
      stock: 15,
      stock_critico: 3
    },
    {
      prod_codigo: "PI001",
      nombre: "Mousse de Chocolate",
      descripcion: "Postre individual cremoso y suave, hecho con chocolate de alta calidad, ideal para los amantes del chocolate.",
      categoria: "Postres Individuales",
      precio: 5000,
      imagen: "/img/PI001.jpg",
      stock: 15,
      stock_critico: 3
    },
    {
      prod_codigo: "PI002",
      nombre: "Tiramisú Clásico",
      descripcion: "Un postre italiano individual con capas de café, mascarpone y cacao, perfecto para finalizar cualquier comida.",
      categoria: "Postres Individuales",
      precio: 5500,
      imagen: "/img/PI002.png",
      stock: 15,
      stock_critico: 3
    },
    {
      prod_codigo: "PSA001",
      nombre: "Torta Sin Azúcar de Naranja",
      descripcion: "Torta ligera y deliciosa, endulzada naturalmente, ideal para quienes buscan opciones más saludables.",
      categoria: "Productos Sin Azúcar",
      precio: 48000,
      imagen: "/img/PSA001.png",
      stock: 15,
      stock_critico: 3
    },
    {
      prod_codigo: "PSA002",
      nombre: "Cheesecake Sin Azúcar",
      descripcion: "Suave y cremoso, este cheesecake es una opción perfecta para disfrutar sin culpa.",
      categoria: "Productos Sin Azúcar",
      precio: 47000,
      imagen: "/img/PSA002.png",
      stock: 15,
      stock_critico: 3
    },
    {
      prod_codigo: "PT001",
      nombre: "Empanada de Manzana",
      descripcion: "Pastelería tradicional rellena de manzanas especiadas, perfecta para un dulce desayuno o merienda.",
      categoria: "Pastelería Tradicional",
      precio: 3000,
      imagen: "/img/PT001.jpg",
      stock: 15,
      stock_critico: 3
    },
    {
      prod_codigo: "PT002",
      nombre: "Tarta de Santiago",
      descripcion: "Tradicional tarta española hecha con almendras, azúcar, y huevos, una delicia para los amantes de los postres clásicos.",
      categoria: "Pastelería Tradicional",
      precio: 6000,
      imagen: "/img/PT002.jpg",
      stock: 15,
      stock_critico: 3
    },
    {
      prod_codigo: "PG001",
      nombre: "Brownie Sin Gluten",
      descripcion: "Rico y denso, este brownie es perfecto para quienes necesitan evitar el gluten sin sacrificar el sabor.",
      categoria: "Productos Sin Gluten",
      precio: 4000,
      imagen: "/img/PG001.jpg",
      stock: 15,
      stock_critico: 3
    },
    {
      prod_codigo: "PG002",
      nombre: "Pan Sin Gluten",
      descripcion: "Suave y esponjoso, ideal para sándwiches o para acompañar cualquier comida.",
      categoria: "Productos Sin Gluten",
      precio: 3500,
      imagen: "/img/PG002.jpg",
      stock: 15,
      stock_critico: 3
    },
    {
      prod_codigo: "PV001",
      nombre: "Torta Vegana de Chocolate",
      descripcion: "Torta de chocolate húmeda y deliciosa, hecha sin productos de origen animal, perfecta para veganos.",
      categoria: "Productos Veganos",
      precio: 50000,
      imagen: "/img/PV001.jpg",
      stock: 15,
      stock_critico: 3
    },
    {
      prod_codigo: "PV002",
      nombre: "Galletas Veganas de Avena",
      descripcion: "Crujientes y sabrosas, estas galletas son una excelente opción para un snack saludable y vegano.",
      categoria: "Productos Veganos",
      precio: 4500,
      imagen: "/img/PV002.jpg",
      stock: 15,
      stock_critico: 3
    },
    {
      prod_codigo: "TE001",
      nombre: "Torta Especial de Cumpleaños",
      descripcion: "Diseñada especialmente para celebraciones, personalizable con decoraciones y mensajes únicos.",
      categoria: "Tortas Especiales",
      precio: 55000,
      imagen: "/img/TE001.jpg",
      stock: 15,
      stock_critico: 3
    },
    {
      prod_codigo: "TE002",
      nombre: "Torta Especial de Boda",
      descripcion: "Elegante y deliciosa, esta torta está diseñada para ser el centro de atención en cualquier boda.",
      categoria: "Tortas Especiales",
      precio: 60000,
      imagen: "/img/TE002.png",
      stock: 15,
      stock_critico: 3
    }
  ];

  useEffect(() => {
    const carritoGuardado = localStorage.getItem('carritoCompras');
    
    if (carritoGuardado) {
      try {
        const carritoParseado = JSON.parse(carritoGuardado);
        setCarrito(carritoParseado);
      } catch (error) {
        console.error('Error al cargar carrito desde localStorage:', error);
        setCarrito([]);
        localStorage.removeItem('carritoCompras');
      }
    } else {
      setCarrito([]);
    }
  }, []);

  useEffect(() => {
    if (carrito.length > 0) {
      localStorage.setItem('carritoCompras', JSON.stringify(carrito));
    } else {
      localStorage.removeItem('carritoCompras');
    }
  }, [carrito]);

  const mostrarMensaje = (texto, tipo = 'info') => {
    const existente = document.getElementById('toast_carrito');
    if (existente) existente.remove();
    
    const toast = document.createElement('div');
    toast.id = 'toast_carrito';
    toast.textContent = texto;

    const backgroundColor = tipo === 'error' ? '#c0392b' : '#FFC0CB';
    const textColor = tipo === 'error' ? '#fff' : '#8B4513';
    
    toast.style.cssText = `
      position: fixed;
      left: 50%;
      bottom: 24px;
      transform: translateX(-50%);
      background: ${backgroundColor};
      color: ${textColor};
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 10000;
      box-shadow: 0 6px 16px rgba(0,0,0,0.15);
      font-family: 'Lato', sans-serif;
      font-weight: 600;
      font-size: 14px;
      border: 2px solid #8B4513;
      max-width: 400px;
      text-align: center;
    `;
    
    document.body.appendChild(toast);
    setTimeout(() => { 
      toast.style.opacity = '0'; 
      toast.style.transition = 'opacity 0.4s ease'; 
    }, 2500);
    setTimeout(() => { toast.remove(); }, 3000);
  };

  const agregarProducto = (codigo, cantidad = 1, mensaje = '') => {
    const productoExistente = carrito.find(item => item.codigo === codigo);
    const producto = productosDisponibles.find(p => p.prod_codigo === codigo);
    
    if (productoExistente) {
      setCarrito(prev => prev.map(item => 
        item.codigo === codigo 
          ? { ...item, cantidad: item.cantidad + cantidad }
          : item
      ));
    } else {
      setCarrito(prev => [...prev, {
        codigo: codigo,
        cantidad: cantidad,
        mensaje: mensaje,
        enCarrito: true
      }]);
    }
    
    mostrarMensaje(`${producto?.nombre || 'Producto'} agregado al carrito`, 'ok');
  };

  const eliminarProducto = (codigo) => {
    const productoAEliminar = productosDisponibles.find(p => p.prod_codigo === codigo);
    setCarrito(prev => prev.filter(item => item.codigo !== codigo));
    mostrarMensaje(`${productoAEliminar?.nombre || 'Producto'} eliminado del carrito`, 'info');
  };

  const actualizarCantidad = (codigo, nuevaCantidad) => {
    const cantidad = parseInt(nuevaCantidad) || 1;
    
    if (cantidad <= 0) {
      eliminarProducto(codigo);
      return;
    }
    
    setCarrito(prev => prev.map(item => 
      item.codigo === codigo 
        ? { ...item, cantidad: cantidad }
        : item
    ));
  };

  const actualizarMensaje = (codigo, nuevoMensaje) => {
    setCarrito(prev => prev.map(item => 
      item.codigo === codigo 
        ? { ...item, mensaje: nuevoMensaje }
        : item
    ));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    localStorage.removeItem('carritoCompras');
    mostrarMensaje('Carrito vaciado', 'info');
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => {
      const producto = productosDisponibles.find(p => p.prod_codigo === item.codigo);
      return total + (producto ? producto.precio * item.cantidad : 0);
    }, 0);
  };

  const obtenerCantidadTotal = () => {
    return carrito.reduce((total, item) => total + item.cantidad, 0);
  };

  const value = {
    carrito,
    productosDisponibles,
    agregarProducto,
    eliminarProducto,
    actualizarCantidad,
    actualizarMensaje,
    vaciarCarrito,
    calcularTotal,
    obtenerCantidadTotal,
    mostrarMensaje
  };

  return (
    <CarritoContext.Provider value={value}>
      {children}
    </CarritoContext.Provider>
  );
};
