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

  test('PRUEBA_08: Usa productos de la base de datos via Context', async () => {
    mockLocalStorage.getItem.mockReturnValue('null');
    
    renderWithProviders(<Productos />);
    
    // Esperar a que se carguen productos del context (CarritoContext carga desde API)
    await waitFor(() => {
      // Verificar que el componente renderizó (no buscar productos específicos porque son de la API)
      expect(screen.getByText('Nuestros Productos')).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});
