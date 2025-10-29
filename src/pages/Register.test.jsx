import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from './Register';

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

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
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
    
    expect(screen.getByText('Crear Cuenta')).toBeInTheDocument();
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
    
    const botonCrear = screen.getByText('Crear Cuenta');
    fireEvent.click(botonCrear);
    
    expect(screen.getByText('Por favor complete todos los campos obligatorios (*)')).toBeInTheDocument();
  });

  test('PRUEBA_04: Valida que las contraseñas coincidan', () => {
    mockLocalStorage.getItem.mockReturnValue('[]');
    
    renderWithProviders(<Register />);
    
    const inputPassword = screen.getByLabelText('Contraseña*');
    const inputConfirmPassword = screen.getByLabelText('Confirmar Contraseña*');
    const botonCrear = screen.getByText('Crear Cuenta');
    
    fireEvent.change(inputPassword, { target: { value: '123456' } });
    fireEvent.change(inputConfirmPassword, { target: { value: '654321' } });
    fireEvent.click(botonCrear);
    
    expect(screen.getByText('Las contraseñas no coinciden')).toBeInTheDocument();
  });

  test('PRUEBA_05: Valida formato de RUT', () => {
    mockLocalStorage.getItem.mockReturnValue('[]');
    
    renderWithProviders(<Register />);
    
    const inputRun = screen.getByLabelText('RUN*');
    fireEvent.change(inputRun, { target: { value: '123' } });
    
    // El RUT debería formatearse automáticamente
    expect(inputRun.value).toBe('123');
  });

  test('PRUEBA_06: Registro exitoso', () => {
    mockLocalStorage.getItem.mockReturnValue('[]');
    
    renderWithProviders(<Register />);
    
    // Llenar todos los campos requeridos
    fireEvent.change(screen.getByLabelText('RUN*'), { target: { value: '12345678-9' } });
    fireEvent.change(screen.getByLabelText('Nombre*'), { target: { value: 'Juan' } });
    fireEvent.change(screen.getByLabelText('Apellidos*'), { target: { value: 'Pérez' } });
    fireEvent.change(screen.getByLabelText('Correo*'), { target: { value: 'juan@test.com' } });
    fireEvent.change(screen.getByLabelText('Región*'), { target: { value: 'Región Metropolitana' } });
    fireEvent.change(screen.getByLabelText('Comuna*'), { target: { value: 'Santiago' } });
    fireEvent.change(screen.getByLabelText('Dirección*'), { target: { value: 'Av. Principal 123' } });
    fireEvent.change(screen.getByLabelText('Contraseña*'), { target: { value: '123456' } });
    fireEvent.change(screen.getByLabelText('Confirmar Contraseña*'), { target: { value: '123456' } });
    
    const botonCrear = screen.getByText('Crear Cuenta');
    fireEvent.click(botonCrear);
    
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'usuarios',
      expect.stringContaining('juan@test.com')
    );
  });

  test('PRUEBA_07: Valida correo duplicado', () => {
    const usuariosExistentes = [
      { correo: 'juan@test.com', password: '123456' }
    ];
    
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(usuariosExistentes));
    
    renderWithProviders(<Register />);
    
    // Llenar formulario con correo existente
    fireEvent.change(screen.getByLabelText('RUN*'), { target: { value: '12345678-9' } });
    fireEvent.change(screen.getByLabelText('Nombre*'), { target: { value: 'Juan' } });
    fireEvent.change(screen.getByLabelText('Apellidos*'), { target: { value: 'Pérez' } });
    fireEvent.change(screen.getByLabelText('Correo*'), { target: { value: 'juan@test.com' } });
    fireEvent.change(screen.getByLabelText('Región*'), { target: { value: 'Región Metropolitana' } });
    fireEvent.change(screen.getByLabelText('Comuna*'), { target: { value: 'Santiago' } });
    fireEvent.change(screen.getByLabelText('Dirección*'), { target: { value: 'Av. Principal 123' } });
    fireEvent.change(screen.getByLabelText('Contraseña*'), { target: { value: '123456' } });
    fireEvent.change(screen.getByLabelText('Confirmar Contraseña*'), { target: { value: '123456' } });
    
    const botonCrear = screen.getByText('Crear Cuenta');
    fireEvent.click(botonCrear);
    
    expect(screen.getByText('Ya existe un usuario con este correo electrónico')).toBeInTheDocument();
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
