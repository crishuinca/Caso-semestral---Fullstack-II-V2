import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Contacto from '../../pages/Contacto';

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
      {component}
    </MemoryRouter>
  );
};

describe('Contacto Component', () => {
  beforeEach(() => {
    mockLocalStorage.getItem.mockClear();
    mockLocalStorage.setItem.mockClear();
  });

  test('PRUEBA_01: Renderiza página con formulario de contacto', () => {
    mockLocalStorage.getItem.mockReturnValue('[]');
    
    renderWithProviders(<Contacto />);
    
    expect(screen.getByText('Contáctanos')).toBeInTheDocument();
    expect(screen.getByText('Pastelería Mil Sabores')).toBeInTheDocument();
    expect(screen.getByLabelText('Nombre Completo')).toBeInTheDocument();
    expect(screen.getByLabelText('Correo Electrónico')).toBeInTheDocument();
    expect(screen.getByLabelText('Razón de Contacto')).toBeInTheDocument();
  });

  test('PRUEBA_02: Permite enviar mensaje y guarda en localStorage', () => {
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
    
    // Verificar limpieza del formulario
    expect(screen.getByLabelText('Nombre Completo')).toHaveValue('');
    expect(screen.getByLabelText('Correo Electrónico')).toHaveValue('');
    expect(screen.getByLabelText('Razón de Contacto')).toHaveValue('');
  });
});
