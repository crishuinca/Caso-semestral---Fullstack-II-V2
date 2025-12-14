import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../../pages/Login';
import * as apiHelper from '../../utils/apiHelper';

// Mock apiHelper
vi.mock('../../utils/apiHelper', () => ({
  loginUser: vi.fn()
}));

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

describe('Login Component', () => {
  beforeEach(() => {
    mockLocalStorage.getItem.mockClear();
    mockLocalStorage.setItem.mockClear();
    mockNavigate.mockClear();
    apiHelper.loginUser.mockClear();
  });

  test('PRUEBA_01: Renderiza formulario de login', () => {
    renderWithProviders(<Login />);
    
    expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
    expect(screen.getByLabelText('Correo')).toBeInTheDocument();
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();
  });

  test('PRUEBA_02: Permite ingresar correo y contraseña', () => {
    renderWithProviders(<Login />);
    
    const inputCorreo = screen.getByLabelText('Correo');
    const inputPassword = screen.getByLabelText('Contraseña');
    
    fireEvent.change(inputCorreo, { target: { value: 'test@test.com' } });
    fireEvent.change(inputPassword, { target: { value: '123456' } });
    
    expect(inputCorreo.value).toBe('test@test.com');
    expect(inputPassword.value).toBe('123456');
  });

  test('PRUEBA_03: Muestra error cuando campos están vacíos', () => {
    renderWithProviders(<Login />);
    
    const botonIngresar = screen.getByText('Ingresar');
    fireEvent.click(botonIngresar);
    
    expect(screen.getByText('Por favor complete todos los campos')).toBeInTheDocument();
  });

  test('PRUEBA_04: Muestra error cuando credenciales son incorrectas', async () => {
    apiHelper.loginUser.mockResolvedValue({
      success: false,
      message: 'Correo o contraseña incorrectos'
    });
    
    renderWithProviders(<Login />);
    
    const inputCorreo = screen.getByLabelText('Correo');
    const inputPassword = screen.getByLabelText('Contraseña');
    const botonIngresar = screen.getByText('Ingresar');
    
    fireEvent.change(inputCorreo, { target: { value: 'test@test.com' } });
    fireEvent.change(inputPassword, { target: { value: '123456' } });
    fireEvent.click(botonIngresar);
    
    await waitFor(() => {
      expect(screen.getByText('Correo o contraseña incorrectos')).toBeInTheDocument();
    });
  });

  test('PRUEBA_05: Login exitoso para usuario normal', async () => {
    apiHelper.loginUser.mockResolvedValue({
      success: true,
      message: 'Login exitoso',
      usuario: {
        id: 1,
        correo: 'test@test.com',
        isAdmin: false
      }
    });
    
    renderWithProviders(<Login />);
    
    const inputCorreo = screen.getByLabelText('Correo');
    const inputPassword = screen.getByLabelText('Contraseña');
    const botonIngresar = screen.getByText('Ingresar');
    
    fireEvent.change(inputCorreo, { target: { value: 'test@test.com' } });
    fireEvent.change(inputPassword, { target: { value: '123456' } });
    fireEvent.click(botonIngresar);
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  test('PRUEBA_06: Login exitoso para administrador', async () => {
    apiHelper.loginUser.mockResolvedValue({
      success: true,
      message: 'Login exitoso',
      usuario: {
        id: 1,
        correo: 'admin@test.com',
        isAdmin: true
      }
    });
    
    renderWithProviders(<Login />);
    
    const inputCorreo = screen.getByLabelText('Correo');
    const inputPassword = screen.getByLabelText('Contraseña');
    const botonIngresar = screen.getByText('Ingresar');
    
    fireEvent.change(inputCorreo, { target: { value: 'admin@test.com' } });
    fireEvent.change(inputPassword, { target: { value: '123456' } });
    fireEvent.click(botonIngresar);
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/admin');
    });
  });

  test('PRUEBA_07: Renderiza enlaces de navegación', () => {
    renderWithProviders(<Login />);
    
    expect(screen.getByText('Volver a la tienda')).toBeInTheDocument();
    expect(screen.getByText('Crear cuenta')).toBeInTheDocument();
  });
});
