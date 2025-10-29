import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CarritoProvider } from '../context/CarritoContext';
import CartItem from './CartItem';

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

describe('CartItem Component', () => {
  const productoMock = {
    codigo: 'TC001',
    nombre: 'Torta Chocolate',
    precio: 15000,
    cantidad: 2,
    imagen: '/img/torta.jpg'
  };

  const mockActualizarCantidad = jest.fn();
  const mockEliminarProducto = jest.fn();

  beforeEach(() => {
    mockActualizarCantidad.mockClear();
    mockEliminarProducto.mockClear();
  });

  test('PRUEBA_01: Renderiza información del producto', () => {
    renderWithProviders(
      <CartItem 
        producto={productoMock}
        actualizarCantidad={mockActualizarCantidad}
        eliminarProducto={mockEliminarProducto}
      />
    );
    
    expect(screen.getByText('Torta Chocolate')).toBeInTheDocument();
    expect(screen.getByText('$15.000')).toBeInTheDocument();
    expect(screen.getByText('Subtotal: $30.000')).toBeInTheDocument();
  });

  test('PRUEBA_02: Muestra cantidad correcta', () => {
    renderWithProviders(
      <CartItem 
        producto={productoMock}
        actualizarCantidad={mockActualizarCantidad}
        eliminarProducto={mockEliminarProducto}
      />
    );
    
    const inputCantidad = screen.getByDisplayValue('2');
    expect(inputCantidad).toBeInTheDocument();
  });

  test('PRUEBA_03: Actualiza cantidad al cambiar input', () => {
    renderWithProviders(
      <CartItem 
        producto={productoMock}
        actualizarCantidad={mockActualizarCantidad}
        eliminarProducto={mockEliminarProducto}
      />
    );
    
    const inputCantidad = screen.getByDisplayValue('2');
    fireEvent.change(inputCantidad, { target: { value: '3' } });
    
    expect(mockActualizarCantidad).toHaveBeenCalledWith('TC001', 3);
  });

  test('PRUEBA_04: Elimina producto al hacer click en botón eliminar', () => {
    renderWithProviders(
      <CartItem 
        producto={productoMock}
        actualizarCantidad={mockActualizarCantidad}
        eliminarProducto={mockEliminarProducto}
      />
    );
    
    const botonEliminar = screen.getByText('Eliminar');
    fireEvent.click(botonEliminar);
    
    expect(mockEliminarProducto).toHaveBeenCalledWith('TC001');
  });

  test('PRUEBA_05: Calcula subtotal correctamente', () => {
    const productoConPrecioDiferente = {
      ...productoMock,
      precio: 20000,
      cantidad: 3
    };
    
    renderWithProviders(
      <CartItem 
        producto={productoConPrecioDiferente}
        actualizarCantidad={mockActualizarCantidad}
        eliminarProducto={mockEliminarProducto}
      />
    );
    
    expect(screen.getByText('Subtotal: $60.000')).toBeInTheDocument();
  });

  test('PRUEBA_06: Renderiza imagen del producto', () => {
    renderWithProviders(
      <CartItem 
        producto={productoMock}
        actualizarCantidad={mockActualizarCantidad}
        eliminarProducto={mockEliminarProducto}
      />
    );
    
    const imagen = screen.getByAltText('Torta Chocolate');
    expect(imagen).toBeInTheDocument();
    expect(imagen).toHaveAttribute('src', '/img/torta.jpg');
  });

  test('PRUEBA_07: Maneja imagen con error', () => {
    renderWithProviders(
      <CartItem 
        producto={productoMock}
        actualizarCantidad={mockActualizarCantidad}
        eliminarProducto={mockEliminarProducto}
      />
    );
    
    const imagen = screen.getByAltText('Torta Chocolate');
    fireEvent.error(imagen);
    
    expect(imagen).toHaveAttribute('src', 'https://via.placeholder.com/200x150/8B4513/FFF8DC?text=Sin+Imagen');
  });

  test('PRUEBA_08: Valida cantidad mínima', () => {
    renderWithProviders(
      <CartItem 
        producto={productoMock}
        actualizarCantidad={mockActualizarCantidad}
        eliminarProducto={mockEliminarProducto}
      />
    );
    
    const inputCantidad = screen.getByDisplayValue('2');
    fireEvent.change(inputCantidad, { target: { value: '0' } });
    
    // Debería mantener la cantidad mínima o eliminar el producto
    expect(mockActualizarCantidad).toHaveBeenCalledWith('TC001', 0);
  });
});
