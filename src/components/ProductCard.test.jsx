import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CarritoProvider } from '../context/CarritoContext';
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

  test('PRUEBA_01: Muestra mensaje "Últimas unidades" en imagen cuando stock es bajo', () => {
    mockLocalStorage.getItem.mockReturnValue('[]');
    
    renderWithProviders(<ProductCard producto={productoMock} />);
    
    expect(screen.getByText('⚠️ Últimas unidades')).toBeInTheDocument();
  });

  test('PRUEBA_02: Muestra alerta de stock bajo antes del botón', () => {
    mockLocalStorage.getItem.mockReturnValue('[]');
    
    renderWithProviders(<ProductCard producto={productoMock} />);
    
    expect(screen.getByText('¡Solo quedan 3 unidades!')).toBeInTheDocument();
  });

  test('PRUEBA_03: Badge de stock muestra color warning para stock bajo', () => {
    mockLocalStorage.getItem.mockReturnValue('[]');
    
    renderWithProviders(<ProductCard producto={productoMock} />);
    
    const badgeStock = screen.getByText('Stock: 3');
    expect(badgeStock).toHaveClass('bg-warning');
  });

  test('PRUEBA_04: No muestra mensaje de últimas unidades cuando stock es normal', () => {
    const productoStockNormal = {
      ...productoMock,
      stock: 10
    };
    
    mockLocalStorage.getItem.mockReturnValue('[]');
    
    renderWithProviders(<ProductCard producto={productoStockNormal} />);
    
    expect(screen.queryByText('⚠️ Últimas unidades')).not.toBeInTheDocument();
    expect(screen.queryByText(/¡Solo quedan/)).not.toBeInTheDocument();
  });

  test('PRUEBA_05: No muestra mensaje de últimas unidades cuando stock es 0', () => {
    const productoSinStock = {
      ...productoMock,
      stock: 0
    };
    
    mockLocalStorage.getItem.mockReturnValue('[]');
    
    renderWithProviders(<ProductCard producto={productoSinStock} />);
    
    expect(screen.queryByText('⚠️ Últimas unidades')).not.toBeInTheDocument();
    expect(screen.queryByText(/¡Solo quedan/)).not.toBeInTheDocument();
    expect(screen.getByText('Sin Stock')).toBeInTheDocument();
  });

  test('PRUEBA_06: Actualiza mensaje cuando stock cambia dinámicamente', async () => {
    const productosStock = [
      {
        prod_codigo: 'TC001',
        stock: 2
      }
    ];
    
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(productosStock));
    
    renderWithProviders(<ProductCard producto={productoMock} />);
    
    await waitFor(() => {
      expect(screen.getByText('¡Solo quedan 2 unidades!')).toBeInTheDocument();
    });
  });

  test('PRUEBA_07: Botón sigue funcionando con stock bajo', () => {
    mockLocalStorage.getItem.mockReturnValue('[]');
    
    renderWithProviders(<ProductCard producto={productoMock} />);
    
    const botonAgregar = screen.getByText('Agregar al Carrito');
    expect(botonAgregar).not.toBeDisabled();
    expect(botonAgregar).toHaveStyle({ backgroundColor: '#D2691E' });
  });

  test('PRUEBA_08: Muestra icono de advertencia en alerta', () => {
    mockLocalStorage.getItem.mockReturnValue('[]');
    
    renderWithProviders(<ProductCard producto={productoMock} />);
    
    const iconoAdvertencia = screen.getByRole('img', { hidden: true });
    expect(iconoAdvertencia).toHaveClass('fas', 'fa-exclamation-triangle');
  });
});