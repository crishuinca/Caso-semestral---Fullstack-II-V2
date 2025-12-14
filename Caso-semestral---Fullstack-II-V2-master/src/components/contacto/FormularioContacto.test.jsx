import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FormularioContacto from './FormularioContacto';

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('FormularioContacto Component', () => {
  const mockProps = {
    formData: {
      nombre: '',
      correo: '',
      razon: ''
    },
    onInputChange: vi.fn(),
    onSubmit: vi.fn()
  };

  beforeEach(() => {
    mockProps.onInputChange.mockClear();
    mockProps.onSubmit.mockClear();
  });

  test('PRUEBA_01: Renderiza formulario correctamente', () => {
    renderWithProviders(<FormularioContacto {...mockProps} />);
    
    expect(screen.getByText('Contáctanos')).toBeInTheDocument();
    expect(screen.getByLabelText('Nombre Completo')).toBeInTheDocument();
    expect(screen.getByLabelText('Correo Electrónico')).toBeInTheDocument();
    expect(screen.getByLabelText('Razón de Contacto')).toBeInTheDocument();
  });

  test('PRUEBA_02: Permite ingresar datos', () => {
    renderWithProviders(<FormularioContacto {...mockProps} />);
    
    const inputNombre = screen.getByLabelText('Nombre Completo');
    fireEvent.change(inputNombre, { target: { value: 'Juan Pérez' } });
    
    expect(mockProps.onInputChange).toHaveBeenCalled();
  });

  test('PRUEBA_03: Valida campos requeridos', () => {
    renderWithProviders(<FormularioContacto {...mockProps} />);
    
    const inputNombre = screen.getByLabelText('Nombre Completo');
    const inputCorreo = screen.getByLabelText('Correo Electrónico');
    const textareaRazon = screen.getByLabelText('Razón de Contacto');
    
    expect(inputNombre).toBeRequired();
    expect(inputCorreo).toBeRequired();
    expect(inputCorreo).toHaveAttribute('type', 'email');
    expect(textareaRazon).toHaveAttribute('maxLength', '500');
  });

  test('PRUEBA_04: Submit y estructura funcionan correctamente', () => {
    renderWithProviders(<FormularioContacto {...mockProps} />);
    
    const botonEnviar = screen.getByText('Enviar Mensaje');
    expect(botonEnviar).toBeInTheDocument();
    expect(botonEnviar).toHaveAttribute('type', 'submit');
    expect(screen.getByText('Contáctanos')).toBeInTheDocument();
  });
});
