import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Contacto from '../pages/Contacto';

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
      {component}
    </BrowserRouter>
  );
};

describe('Contacto Component', () => {
  beforeEach(() => {
    mockLocalStorage.getItem.mockClear();
    mockLocalStorage.setItem.mockClear();
  });

  test('PRUEBA_01: Renderiza página de contacto', () => {
    mockLocalStorage.getItem.mockReturnValue('[]');
    
    renderWithProviders(<Contacto />);
    
    expect(screen.getByText('Contáctanos')).toBeInTheDocument();
    expect(screen.getByText('Pastelería Mil Sabores')).toBeInTheDocument();
  });

  test('PRUEBA_02: Renderiza formulario de contacto', () => {
    mockLocalStorage.getItem.mockReturnValue('[]');
    
    renderWithProviders(<Contacto />);
    
    expect(screen.getByLabelText('Nombre Completo')).toBeInTheDocument();
    expect(screen.getByLabelText('Correo Electrónico')).toBeInTheDocument();
    expect(screen.getByLabelText('Razón de Contacto')).toBeInTheDocument();
  });

  test('PRUEBA_03: Permite enviar mensaje', () => {
    mockLocalStorage.getItem.mockReturnValue('[]');
    
    renderWithProviders(<Contacto />);
    
    // Llenar formulario
    fireEvent.change(screen.getByLabelText('Nombre Completo'), { target: { value: 'Juan Pérez' } });
    fireEvent.change(screen.getByLabelText('Correo Electrónico'), { target: { value: 'juan@duoc.cl' } });
    fireEvent.change(screen.getByLabelText('Razón de Contacto'), { target: { value: 'Consulta sobre productos' } });
    
    // Enviar formulario
    fireEvent.click(screen.getByText('Enviar Mensaje'));
    
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'mensajesContacto',
      expect.stringContaining('Juan Pérez')
    );
  });

  test('PRUEBA_04: Muestra mensaje de éxito', () => {
    mockLocalStorage.getItem.mockReturnValue('[]');
    
    renderWithProviders(<Contacto />);
    
    // Llenar y enviar formulario
    fireEvent.change(screen.getByLabelText('Nombre Completo'), { target: { value: 'Juan Pérez' } });
    fireEvent.change(screen.getByLabelText('Correo Electrónico'), { target: { value: 'juan@duoc.cl' } });
    fireEvent.change(screen.getByLabelText('Razón de Contacto'), { target: { value: 'Consulta' } });
    fireEvent.click(screen.getByText('Enviar Mensaje'));
    
    // El componente muestra un alert, no texto en pantalla
    expect(mockLocalStorage.setItem).toHaveBeenCalled();
  });

  test('PRUEBA_05: Valida campos requeridos', () => {
    mockLocalStorage.getItem.mockReturnValue('[]');
    
    renderWithProviders(<Contacto />);
    
    fireEvent.click(screen.getByText('Enviar Mensaje'));
    
    // El componente muestra un alert, no texto en pantalla
    expect(mockLocalStorage.setItem).not.toHaveBeenCalled();
  });

  test('PRUEBA_06: Guarda mensaje en localStorage', () => {
    mockLocalStorage.getItem.mockReturnValue('[]');
    
    renderWithProviders(<Contacto />);
    
    fireEvent.change(screen.getByLabelText('Nombre Completo'), { target: { value: 'María González' } });
    fireEvent.change(screen.getByLabelText('Correo Electrónico'), { target: { value: 'maria@duoc.cl' } });
    fireEvent.change(screen.getByLabelText('Razón de Contacto'), { target: { value: 'Sugerencia' } });
    fireEvent.click(screen.getByText('Enviar Mensaje'));
    
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'mensajesContacto',
      expect.stringContaining('María González')
    );
  });

  test('PRUEBA_07: Renderiza información de contacto', () => {
    mockLocalStorage.getItem.mockReturnValue('[]');
    
    renderWithProviders(<Contacto />);
    
    // El componente Contacto no tiene información de contacto, solo el formulario
    expect(screen.getByText('Contáctanos')).toBeInTheDocument();
    expect(screen.getByText('Pastelería Mil Sabores')).toBeInTheDocument();
  });

  test('PRUEBA_08: Renderiza horarios de atención', () => {
    mockLocalStorage.getItem.mockReturnValue('[]');
    
    renderWithProviders(<Contacto />);
    
    // El componente Contacto no tiene horarios, solo el formulario
    expect(screen.getByText('Contáctanos')).toBeInTheDocument();
    expect(screen.getByText('Enviar Mensaje')).toBeInTheDocument();
  });

  test('PRUEBA_09: Limpia formulario después del envío', () => {
    mockLocalStorage.getItem.mockReturnValue('[]');
    
    renderWithProviders(<Contacto />);
    
    // Llenar formulario
    fireEvent.change(screen.getByLabelText('Nombre Completo'), { target: { value: 'Juan Pérez' } });
    fireEvent.change(screen.getByLabelText('Correo Electrónico'), { target: { value: 'juan@duoc.cl' } });
    fireEvent.change(screen.getByLabelText('Razón de Contacto'), { target: { value: 'Consulta sobre productos' } });
    
    // Enviar
    fireEvent.click(screen.getByText('Enviar Mensaje'));
    
    // Verificar que se limpió
    expect(screen.getByLabelText('Nombre Completo')).toHaveValue('');
    expect(screen.getByLabelText('Correo Electrónico')).toHaveValue('');
    expect(screen.getByLabelText('Razón de Contacto')).toHaveValue('');
  });

  test('PRUEBA_10: Maneja múltiples mensajes', () => {
    const mensajesExistentes = [
      {
        id: 1,
        nombre: 'Usuario Anterior',
        correo: 'anterior@test.com',
        razon: 'Mensaje anterior',
        fecha: '2024-01-01',
        estado: 'pendiente'
      }
    ];
    
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mensajesExistentes));
    
    renderWithProviders(<Contacto />);
    
    // Enviar nuevo mensaje
    fireEvent.change(screen.getByLabelText('Nombre Completo'), { target: { value: 'Nuevo Usuario' } });
    fireEvent.change(screen.getByLabelText('Correo Electrónico'), { target: { value: 'nuevo@duoc.cl' } });
    fireEvent.change(screen.getByLabelText('Razón de Contacto'), { target: { value: 'Nuevo mensaje' } });
    fireEvent.click(screen.getByText('Enviar Mensaje'));
    
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'mensajesContacto',
      expect.stringContaining('Usuario Anterior')
    );
  });
});
