import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Productos from './Productos';

const productosMock = [
  {
    codigo: '001',
    nombre: 'Pastel de Chocolate',
    categoria: 'Postres',
    descripcion: 'Delicioso pastel de chocolate',
    precio: 500,
    precioEspecial: 450,
    stock: 12,
    imagen: 'https://via.placeholder.com/150'
  },
  {
    codigo: '002',
    nombre: 'Galletas',
    categoria: 'Postres',
    descripcion: '',
    precio: 100,
    stock: 4,
    imagen: ''
  }
];

const estilosMock = {
  areaContenido: {},
  encabezadoSeccion: {},
  tarjetaProducto: {},
  avatarProductoTarjeta: {},
  iconoProducto: {},
  informacionProductoTarjeta: {},
  nombreProducto: {},
  categoriaProducto: {},
  descripcionProducto: {},
  detallesProducto: {},
  stockInfo: {},
  badgeStock: {},
  imagenProductoContainer: {},
  imagenProducto: {},
  accionesProducto: {},
  botonEditar: {}
};

// Mock manual sin Jest
function crearMock() {
  const mock = (...args) => {
    mock.calls.push(args);
    return mock.returnValue;
  };
  mock.calls = [];
  mock.returnValue = undefined;
  return mock;
}

describe('Componente Productos', () => {
  test('Productos PRUEBA_01: Renderiza correctamente la lista de productos', () => {
    render(
      <Productos 
        productos={productosMock} 
        abrirModalEditar={() => {}} 
        estilos={estilosMock} 
      />
    );

    expect(screen.getByText('Pastel de Chocolate')).toBeInTheDocument();
    expect(screen.getByText('Galletas')).toBeInTheDocument();
    expect(screen.getByText('Sin descripción disponible')).toBeInTheDocument();
  });

  test('Productos PRUEBA_02: Ejecuta función abrirModalEditar al hacer click en la tarjeta', () => {
    const abrirModalEditarMock = crearMock();

    render(
      <Productos 
        productos={productosMock} 
        abrirModalEditar={abrirModalEditarMock} 
        estilos={estilosMock} 
      />
    );

    // Hacer click en la tarjeta del producto (no en el botón específico)
    const tarjetaProducto = screen.getByText('Pastel de Chocolate').closest('div');
    fireEvent.click(tarjetaProducto);

    if (abrirModalEditarMock.calls.length !== 1) {
      throw new Error('abrirModalEditar no fue llamado');
    }
    if (abrirModalEditarMock.calls[0][0] !== productosMock[0]) {
      throw new Error('abrirModalEditar fue llamado con argumentos incorrectos');
    }
  });

  test('Productos PRUEBA_03: Ejecuta descargarReporteCSV al hacer click en el botón de descarga', () => {
    const descargarReporteCSVMock = crearMock();

    render(
      <Productos 
        productos={productosMock} 
        abrirModalEditar={() => {}} 
        estilos={estilosMock} 
        descargarReporteCSV={descargarReporteCSVMock}
      />
    );

    const botonDescarga = screen.getByText(/Descargar reporte en CSV/i);
    fireEvent.click(botonDescarga);

    if (descargarReporteCSVMock.calls.length !== 1) {
      throw new Error('descargarReporteCSV no fue llamado');
    }
  });
});
