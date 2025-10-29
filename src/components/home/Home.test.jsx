import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CarritoProvider } from '../../context/CarritoContext';
import Home from '../../pages/Home';

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
        {component}
      </CarritoProvider>
    </MemoryRouter>
  );
};

describe('Home Component', () => {
  beforeEach(() => {
    mockLocalStorage.getItem.mockClear();
    mockLocalStorage.setItem.mockClear();
  });

  test('PRUEBA_01: Renderiza elementos principales y mensajes de bienvenida', () => {
    mockLocalStorage.getItem.mockReturnValue('null');
    
    renderWithProviders(<Home />);
    
    expect(screen.getByText('Bienvenido')).toBeInTheDocument();
    expect(screen.getByAltText('Imagen principal')).toHaveAttribute('src', '/img/imagen_fondo.png');
    expect(screen.getByText('¿Buscas algún producto?')).toBeInTheDocument();
    expect(screen.getByText('© 2025 Pastelería Mil Sabores. Todos los derechos reservados.')).toBeInTheDocument();
  });

  test('PRUEBA_02: Maneja historial de boletas correctamente', () => {
    mockLocalStorage.getItem.mockImplementation((key) => {
      if (key === 'usuarioActual') return 'null';
      if (key === 'historial_boletas') return null;
      return null;
    });
    
    renderWithProviders(<Home />);
    
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'historial_boletas',
      expect.stringContaining('HBLT_0')
    );
  });
});
