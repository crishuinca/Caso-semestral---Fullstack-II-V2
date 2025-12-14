import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CarritoProvider } from '../../context/CarritoContext';
import ProductCard from './ProductCard';

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
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

describe('ProductCard - Stock Bajo', () => {
  const productoMock = {
    prod_codigo: 'TC001',
    prod_nombre: 'Torta Chocolate',
    prod_categoria: 'Tortas Cuadradas',
    prod_desc: 'Deliciosa torta de chocolate',
    prod_precio: 15000,
    prod_imagen: '/img/torta.jpg',
    stock: 3, // Stock bajo
    stock_critico: 5
  };

  beforeEach(() => {
    mockLocalStorage.getItem.mockClear();
    mockLocalStorage.setItem.mockClear();
  });

  test('PRUEBA_01: Muestra alertas de stock bajo correctamente', () => {
    mockLocalStorage.getItem.mockReturnValue('[]');
    
    renderWithProviders(<ProductCard producto={productoMock} />);
    
    expect(screen.getByText('⚠️ Últimas unidades')).toBeInTheDocument();
    expect(screen.getByText('¡Solo quedan 3 unidades!')).toBeInTheDocument();
    expect(screen.getByText('Stock: 3')).toHaveClass('bg-warning');
  });

  test('PRUEBA_02: No muestra alertas con stock normal', () => {
    const productoStockNormal = { ...productoMock, stock: 10 };
    mockLocalStorage.getItem.mockReturnValue('[]');
    
    renderWithProviders(<ProductCard producto={productoStockNormal} />);
    
    expect(screen.queryByText('⚠️ Últimas unidades')).not.toBeInTheDocument();
    expect(screen.queryByText(/¡Solo quedan/)).not.toBeInTheDocument();
  });

  test('PRUEBA_03: Botón funciona correctamente con stock bajo', () => {
    mockLocalStorage.getItem.mockReturnValue('[]');
    
    renderWithProviders(<ProductCard producto={productoMock} />);
    
    const botonAgregar = screen.getByText('Agregar al Carrito');
    expect(botonAgregar).not.toBeDisabled();
    expect(botonAgregar).toHaveStyle({ backgroundColor: '#D2691E' });
  });
});