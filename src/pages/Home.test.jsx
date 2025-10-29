import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CarritoProvider } from '../context/CarritoContext';
import Home from './Home';

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

describe('Home Component', () => {
  beforeEach(() => {
    mockLocalStorage.getItem.mockClear();
    mockLocalStorage.setItem.mockClear();
  });

  test('PRUEBA_01: Renderiza mensaje de bienvenida sin usuario', () => {
    mockLocalStorage.getItem.mockReturnValue('null');
    
    renderWithProviders(<Home />);
    
    expect(screen.getByText('Bienvenido')).toBeInTheDocument();
  });

  test('PRUEBA_02: Renderiza mensaje de bienvenida con usuario logueado', () => {
    const usuarioMock = {
      nombre: 'Juan Pérez',
      run: '12345678-9'
    };
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(usuarioMock));
    
    renderWithProviders(<Home />);
    
    expect(screen.getByText('¡Bienvenido Juan Pérez!')).toBeInTheDocument();
  });

  test('PRUEBA_03: Renderiza imagen principal', () => {
    mockLocalStorage.getItem.mockReturnValue('null');
    
    renderWithProviders(<Home />);
    
    const imagen = screen.getByAltText('Imagen principal');
    expect(imagen).toBeInTheDocument();
    expect(imagen).toHaveAttribute('src', '/img/imagen_fondo.png');
  });

  test('PRUEBA_04: Renderiza sección de productos', () => {
    mockLocalStorage.getItem.mockReturnValue('null');
    
    renderWithProviders(<Home />);
    
    expect(screen.getByText('¿Buscas algún producto?')).toBeInTheDocument();
    expect(screen.getByText('Descubre nuestras deliciosas tortas y postres')).toBeInTheDocument();
  });

  test('PRUEBA_05: Renderiza sección de historial de boletas', () => {
    mockLocalStorage.getItem.mockReturnValue('null');
    
    renderWithProviders(<Home />);
    
    expect(screen.getByText('¿Quieres ver tu historial de compras?')).toBeInTheDocument();
  });

  test('PRUEBA_06: Inicializa historial de boletas si está vacío', () => {
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

  test('PRUEBA_07: No inicializa historial si ya existe', () => {
    const boletasExistentes = [{ n_boleta: 'HBLT_0' }];
    mockLocalStorage.getItem.mockImplementation((key) => {
      if (key === 'usuarioActual') return 'null';
      if (key === 'historial_boletas') return JSON.stringify(boletasExistentes);
      return null;
    });
    
    renderWithProviders(<Home />);
    
    expect(mockLocalStorage.setItem).not.toHaveBeenCalledWith(
      'historial_boletas',
      expect.any(String)
    );
  });

  test('PRUEBA_08: Renderiza Footer', () => {
    mockLocalStorage.getItem.mockReturnValue('null');
    
    renderWithProviders(<Home />);
    
    expect(screen.getByText('© 2025 Pastelería Mil Sabores. Todos los derechos reservados.')).toBeInTheDocument();
  });
});
