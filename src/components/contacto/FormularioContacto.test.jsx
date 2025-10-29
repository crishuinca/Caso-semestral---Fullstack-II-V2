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
    onInputChange: jest.fn(),
    onSubmit: jest.fn()
  };

  beforeEach(() => {
    mockProps.onInputChange.mockClear();
    mockProps.onSubmit.mockClear();
  });

  test('PRUEBA_01: Renderiza formulario de contacto', () => {
    renderWithProviders(<FormularioContacto {...mockProps} />);
    
    expect(screen.getByText('Envíanos un Mensaje')).toBeInTheDocument();
    expect(screen.getByLabelText('Nombre')).toBeInTheDocument();
    expect(screen.getByLabelText('Correo Electrónico')).toBeInTheDocument();
    expect(screen.getByLabelText('Razón de Contacto')).toBeInTheDocument();
  });

  test('PRUEBA_02: Permite ingresar nombre', () => {
    renderWithProviders(<FormularioContacto {...mockProps} />);
    
    const inputNombre = screen.getByLabelText('Nombre');
    fireEvent.change(inputNombre, { target: { value: 'Juan Pérez' } });
    
    expect(mockProps.onInputChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          name: 'nombre',
          value: 'Juan Pérez'
        })
      })
    );
  });

  test('PRUEBA_03: Permite ingresar correo', () => {
    renderWithProviders(<FormularioContacto {...mockProps} />);
    
    const inputCorreo = screen.getByLabelText('Correo Electrónico');
    fireEvent.change(inputCorreo, { target: { value: 'juan@test.com' } });
    
    expect(mockProps.onInputChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          name: 'correo',
          value: 'juan@test.com'
        })
      })
    );
  });

  test('PRUEBA_04: Permite ingresar razón de contacto', () => {
    renderWithProviders(<FormularioContacto {...mockProps} />);
    
    const textareaRazon = screen.getByLabelText('Razón de Contacto');
    fireEvent.change(textareaRazon, { target: { value: 'Consulta sobre productos' } });
    
    expect(mockProps.onInputChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          name: 'razon',
          value: 'Consulta sobre productos'
        })
      })
    );
  });

  test('PRUEBA_05: Ejecuta función onSubmit al enviar formulario', () => {
    renderWithProviders(<FormularioContacto {...mockProps} />);
    
    const botonEnviar = screen.getByText('Enviar Mensaje');
    fireEvent.click(botonEnviar);
    
    expect(mockProps.onSubmit).toHaveBeenCalled();
  });

  test('PRUEBA_06: Muestra placeholders correctos', () => {
    renderWithProviders(<FormularioContacto {...mockProps} />);
    
    expect(screen.getByPlaceholderText('Tu nombre completo')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('tu@email.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Cuéntanos en qué podemos ayudarte...')).toBeInTheDocument();
  });

  test('PRUEBA_07: Campos son requeridos', () => {
    renderWithProviders(<FormularioContacto {...mockProps} />);
    
    const inputNombre = screen.getByLabelText('Nombre');
    const inputCorreo = screen.getByLabelText('Correo Electrónico');
    const textareaRazon = screen.getByLabelText('Razón de Contacto');
    
    expect(inputNombre).toBeRequired();
    expect(inputCorreo).toBeRequired();
    expect(textareaRazon).toBeRequired();
  });

  test('PRUEBA_08: Valida tipo de correo', () => {
    renderWithProviders(<FormularioContacto {...mockProps} />);
    
    const inputCorreo = screen.getByLabelText('Correo Electrónico');
    expect(inputCorreo).toHaveAttribute('type', 'email');
  });

  test('PRUEBA_09: Textarea tiene atributos correctos', () => {
    renderWithProviders(<FormularioContacto {...mockProps} />);
    
    const textareaRazon = screen.getByLabelText('Razón de Contacto');
    expect(textareaRazon).toHaveAttribute('rows', '5');
    expect(textareaRazon).toHaveAttribute('maxLength', '500');
  });

  test('PRUEBA_10: Muestra valores iniciales del formulario', () => {
    const propsConDatos = {
      ...mockProps,
      formData: {
        nombre: 'Juan Pérez',
        correo: 'juan@test.com',
        razon: 'Consulta sobre productos'
      }
    };
    
    renderWithProviders(<FormularioContacto {...propsConDatos} />);
    
    expect(screen.getByDisplayValue('Juan Pérez')).toBeInTheDocument();
    expect(screen.getByDisplayValue('juan@test.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Consulta sobre productos')).toBeInTheDocument();
  });

  test('PRUEBA_11: Renderiza botón de envío', () => {
    renderWithProviders(<FormularioContacto {...mockProps} />);
    
    const botonEnviar = screen.getByText('Enviar Mensaje');
    expect(botonEnviar).toBeInTheDocument();
    expect(botonEnviar).toHaveAttribute('type', 'submit');
  });

  test('PRUEBA_12: Formulario tiene estructura correcta', () => {
    renderWithProviders(<FormularioContacto {...mockProps} />);
    
    const formulario = screen.getByRole('form');
    expect(formulario).toBeInTheDocument();
  });
});
