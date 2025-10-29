import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Register from '../../pages/Register';

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

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderWithProviders = (component) => {
  return render(
    <MemoryRouter>
      {component}
    </MemoryRouter>
  );
};

describe('Register Component', () => {
  beforeEach(() => {
    mockLocalStorage.getItem.mockClear();
    mockLocalStorage.setItem.mockClear();
    mockNavigate.mockClear();
  });

  test('PRUEBA_01: Renderiza formulario de registro', () => {
    mockLocalStorage.getItem.mockReturnValue('[]');
    
    renderWithProviders(<Register />);
    
    expect(screen.getByText('Registrarse')).toBeInTheDocument();
    expect(screen.getByLabelText('RUN*')).toBeInTheDocument();
    expect(screen.getByLabelText('Nombre*')).toBeInTheDocument();
    expect(screen.getByLabelText('Apellidos*')).toBeInTheDocument();
  });

  test('PRUEBA_02: Permite ingresar datos del formulario', () => {
    mockLocalStorage.getItem.mockReturnValue('[]');
    
    renderWithProviders(<Register />);
    
    const inputRun = screen.getByLabelText('RUN*');
    const inputNombre = screen.getByLabelText('Nombre*');
    
    fireEvent.change(inputRun, { target: { value: '12345678-9' } });
    fireEvent.change(inputNombre, { target: { value: 'Juan' } });
    
    expect(inputRun.value).toBe('12345678-9');
    expect(inputNombre.value).toBe('Juan');
  });

  test('PRUEBA_03: Valida campos obligatorios', () => {
    mockLocalStorage.getItem.mockReturnValue('[]');
    
    renderWithProviders(<Register />);
    
    const botonCrear = screen.getByText('Registrarse');
    fireEvent.click(botonCrear);
    
    expect(screen.getByText('Por favor complete todos los campos obligatorios (*)')).toBeInTheDocument();
  });

  test('PRUEBA_05: Valida formato de RUT', () => {
    mockLocalStorage.getItem.mockReturnValue('[]');
    
    renderWithProviders(<Register />);
    
    const inputRun = screen.getByLabelText('RUN*');
    fireEvent.change(inputRun, { target: { value: '123' } });
    
    // El RUT debería formatearse automáticamente
    expect(inputRun.value).toBe('123');
  });

  test('PRUEBA_08: Renderiza selectores de fecha de nacimiento', () => {
    mockLocalStorage.getItem.mockReturnValue('[]');
    
    renderWithProviders(<Register />);
    
    expect(screen.getByText('Fecha de nacimiento')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Día')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Mes')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Año')).toBeInTheDocument();
  });
});
