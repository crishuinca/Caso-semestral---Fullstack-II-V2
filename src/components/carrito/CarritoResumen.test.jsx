import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CarritoProvider } from '../context/CarritoContext';
import CarritoResumen from './CarritoResumen';

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <CarritoProvider>
        {component}
      </CarritoProvider>
    </BrowserRouter>
  );
};

describe('CarritoResumen Component', () => {
  const mockCarrito = [
    {
      codigo: 'TC001',
      nombre: 'Torta Chocolate',
      precio: 15000,
      cantidad: 2
    },
    {
      codigo: 'TC002',
      nombre: 'Torta Vainilla',
      precio: 12000,
      cantidad: 1
    }
  ];

  const mockProps = {
    carrito: mockCarrito,
    total: 42000,
    onContinuar: jest.fn(),
    onVaciarCarrito: jest.fn()
  };

  beforeEach(() => {
    mockProps.onContinuar.mockClear();
    mockProps.onVaciarCarrito.mockClear();
  });

  test('PRUEBA_01: Renderiza resumen del carrito', () => {
    renderWithProviders(<CarritoResumen {...mockProps} />);
    
    expect(screen.getByText('Resumen del Carrito')).toBeInTheDocument();
    expect(screen.getByText('Torta Chocolate')).toBeInTheDocument();
    expect(screen.getByText('Torta Vainilla')).toBeInTheDocument();
  });

  test('PRUEBA_02: Muestra cantidades correctas', () => {
    renderWithProviders(<CarritoResumen {...mockProps} />);
    
    expect(screen.getByText('Cantidad: 2')).toBeInTheDocument();
    expect(screen.getByText('Cantidad: 1')).toBeInTheDocument();
  });

  test('PRUEBA_03: Muestra precios correctos', () => {
    renderWithProviders(<CarritoResumen {...mockProps} />);
    
    expect(screen.getByText('$15.000')).toBeInTheDocument();
    expect(screen.getByText('$12.000')).toBeInTheDocument();
  });

  test('PRUEBA_04: Calcula total correctamente', () => {
    renderWithProviders(<CarritoResumen {...mockProps} />);
    
    expect(screen.getByText('Total: $42.000')).toBeInTheDocument();
  });

  test('PRUEBA_05: Ejecuta función continuar al hacer click', () => {
    renderWithProviders(<CarritoResumen {...mockProps} />);
    
    const botonContinuar = screen.getByText('Continuar con la Compra');
    fireEvent.click(botonContinuar);
    
    expect(mockProps.onContinuar).toHaveBeenCalled();
  });

  test('PRUEBA_06: Ejecuta función vaciar carrito', () => {
    renderWithProviders(<CarritoResumen {...mockProps} />);
    
    const botonVaciar = screen.getByText('Vaciar Carrito');
    fireEvent.click(botonVaciar);
    
    expect(mockProps.onVaciarCarrito).toHaveBeenCalled();
  });

  test('PRUEBA_07: Muestra mensaje cuando carrito está vacío', () => {
    const propsCarritoVacio = {
      ...mockProps,
      carrito: [],
      total: 0
    };
    
    renderWithProviders(<CarritoResumen {...propsCarritoVacio} />);
    
    expect(screen.getByText('Tu carrito está vacío')).toBeInTheDocument();
  });

  test('PRUEBA_08: Deshabilita botón continuar cuando carrito está vacío', () => {
    const propsCarritoVacio = {
      ...mockProps,
      carrito: [],
      total: 0
    };
    
    renderWithProviders(<CarritoResumen {...propsCarritoVacio} />);
    
    const botonContinuar = screen.getByText('Continuar con la Compra');
    expect(botonContinuar).toBeDisabled();
  });

  test('PRUEBA_09: Muestra subtotales por producto', () => {
    renderWithProviders(<CarritoResumen {...mockProps} />);
    
    expect(screen.getByText('Subtotal: $30.000')).toBeInTheDocument();
    expect(screen.getByText('Subtotal: $12.000')).toBeInTheDocument();
  });

  test('PRUEBA_10: Maneja carrito con un solo producto', () => {
    const propsUnProducto = {
      ...mockProps,
      carrito: [mockCarrito[0]],
      total: 30000
    };
    
    renderWithProviders(<CarritoResumen {...propsUnProducto} />);
    
    expect(screen.getByText('Torta Chocolate')).toBeInTheDocument();
    expect(screen.getByText('Total: $30.000')).toBeInTheDocument();
    expect(screen.queryByText('Torta Vainilla')).not.toBeInTheDocument();
  });
});
