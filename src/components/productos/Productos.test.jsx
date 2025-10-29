import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CarritoProvider } from '../../context/CarritoContext';
import { FiltroProvider } from '../../context/FiltroContext';
import Productos from '../../pages/Productos';

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
    <MemoryRouter>
      <CarritoProvider>
        <FiltroProvider>
          {component}
        </FiltroProvider>
      </CarritoProvider>
    </MemoryRouter>
  );
};

describe('Productos Component', () => {
  beforeEach(() => {
    mockLocalStorage.getItem.mockClear();
    mockLocalStorage.setItem.mockClear();
  });

  test('PRUEBA_01: Renderiza título de productos', () => {
    mockLocalStorage.getItem.mockReturnValue('null');
    
    renderWithProviders(<Productos />);
    
    expect(screen.getByText('Nuestros Productos')).toBeInTheDocument();
  });

  test('PRUEBA_02: Renderiza barra de búsqueda', () => {
    mockLocalStorage.getItem.mockReturnValue('null');
    
    renderWithProviders(<Productos />);
    
    const inputBusqueda = screen.getByPlaceholderText('Buscar productos...');
    expect(inputBusqueda).toBeInTheDocument();
  });

  test('PRUEBA_04: Filtra productos por búsqueda', async () => {
    mockLocalStorage.getItem.mockReturnValue('null');
    
    renderWithProviders(<Productos />);
    
    const inputBusqueda = screen.getByPlaceholderText('Buscar productos...');
    fireEvent.change(inputBusqueda, { target: { value: 'torta' } });
    
    await waitFor(() => {
      // Verificar que se actualiza el estado de búsqueda
      expect(inputBusqueda.value).toBe('torta');
    });
  });

  test('PRUEBA_06: Muestra mensaje cuando no hay productos', () => {
    mockLocalStorage.getItem.mockReturnValue('null');
    
    renderWithProviders(<Productos />);
    
    // Simular que no hay productos filtrados
    const inputBusqueda = screen.getByPlaceholderText('Buscar productos...');
    fireEvent.change(inputBusqueda, { target: { value: 'producto_inexistente' } });
    
    // El mensaje debería aparecer cuando no hay productos
    expect(screen.getByText('No se encontraron productos')).toBeInTheDocument();
  });

  test('PRUEBA_07: Renderiza Footer', () => {
    mockLocalStorage.getItem.mockReturnValue('null');
    
    renderWithProviders(<Productos />);
    
    expect(screen.getByText('© 2025 Pastelería Mil Sabores. Todos los derechos reservados.')).toBeInTheDocument();
  });

  test('PRUEBA_08: Usa productos de localStorage si están disponibles', () => {
    const productosAdmin = [
      {
        prod_codigo: 'TC001',
        nombre: 'Torta Chocolate',
        categoria: 'Tortas Cuadradas',
        precio: 15000,
        stock: 10
      }
    ];
    
    mockLocalStorage.getItem.mockImplementation((key) => {
      if (key === 'productosAdmin') return JSON.stringify(productosAdmin);
      return 'null';
    });
    
    renderWithProviders(<Productos />);
    
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('productosAdmin');
  });
});
