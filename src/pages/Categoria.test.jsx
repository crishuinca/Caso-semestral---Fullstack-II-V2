import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CarritoProvider } from '../context/CarritoContext';
import Categoria from './Categoria';

// Mock useParams
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ categoria: 'Tortas Cuadradas' }),
  useNavigate: () => jest.fn(),
}));

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

describe('Categoria Component', () => {
  beforeEach(() => {
    mockLocalStorage.getItem.mockClear();
    mockLocalStorage.setItem.mockClear();
  });

  test('PRUEBA_01: Renderiza título de categoría', () => {
    mockLocalStorage.getItem.mockReturnValue('null');
    
    renderWithProviders(<Categoria />);
    
    expect(screen.getByText('🍰 Categoría')).toBeInTheDocument();
    expect(screen.getByText('Tortas Cuadradas')).toBeInTheDocument();
  });

  test('PRUEBA_02: Renderiza descripción de categoría', () => {
    mockLocalStorage.getItem.mockReturnValue('null');
    
    renderWithProviders(<Categoria />);
    
    expect(screen.getByText('Descubre todos nuestros deliciosos productos de tortas cuadradas')).toBeInTheDocument();
  });

  test('PRUEBA_03: Renderiza productos filtrados por categoría', () => {
    const productosMock = [
      {
        prod_codigo: 'TC001',
        nombre: 'Torta Chocolate',
        categoria: 'Tortas Cuadradas',
        precio: 15000,
        stock: 10
      }
    ];
    
    mockLocalStorage.getItem.mockImplementation((key) => {
      if (key === 'productosAdmin') return JSON.stringify(productosMock);
      return 'null';
    });
    
    renderWithProviders(<Categoria />);
    
    expect(screen.getByText('Torta Chocolate')).toBeInTheDocument();
  });

  test('PRUEBA_04: Muestra mensaje cuando no hay productos en categoría', () => {
    mockLocalStorage.getItem.mockReturnValue('null');
    
    renderWithProviders(<Categoria />);
    
    expect(screen.getByText('No se encontraron productos en esta categoría')).toBeInTheDocument();
  });

  test('PRUEBA_05: Renderiza botón "Ver Todos los Productos"', () => {
    mockLocalStorage.getItem.mockReturnValue('null');
    
    renderWithProviders(<Categoria />);
    
    const botonVerTodos = screen.getByText('Ver Todos los Productos');
    expect(botonVerTodos).toBeInTheDocument();
  });

  test('PRUEBA_06: Maneja categoría "Todos" correctamente', () => {
    // Mock para categoría "Todos"
    jest.doMock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useParams: () => ({ categoria: 'Todos' }),
      useNavigate: () => jest.fn(),
    }));
    
    mockLocalStorage.getItem.mockReturnValue('null');
    
    renderWithProviders(<Categoria />);
    
    expect(screen.getByText('Todos los Productos')).toBeInTheDocument();
  });

  test('PRUEBA_07: Renderiza Footer', () => {
    mockLocalStorage.getItem.mockReturnValue('null');
    
    renderWithProviders(<Categoria />);
    
    expect(screen.getByText('© 2025 Pastelería Mil Sabores. Todos los derechos reservados.')).toBeInTheDocument();
  });

  test('PRUEBA_08: Filtra productos correctamente por categoría', () => {
    const productosMock = [
      {
        prod_codigo: 'TC001',
        nombre: 'Torta Chocolate',
        categoria: 'Tortas Cuadradas',
        precio: 15000,
        stock: 10
      },
      {
        prod_codigo: 'TC002',
        nombre: 'Torta Vainilla',
        categoria: 'Tortas Circulares',
        precio: 12000,
        stock: 5
      }
    ];
    
    mockLocalStorage.getItem.mockImplementation((key) => {
      if (key === 'productosAdmin') return JSON.stringify(productosMock);
      return 'null';
    });
    
    renderWithProviders(<Categoria />);
    
    // Solo debería mostrar productos de "Tortas Cuadradas"
    expect(screen.getByText('Torta Chocolate')).toBeInTheDocument();
    expect(screen.queryByText('Torta Vainilla')).not.toBeInTheDocument();
  });
});
