import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EncabezadoContacto from './EncabezadoContacto';

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('EncabezadoContacto Component', () => {
  test('PRUEBA_01: Renderiza título principal', () => {
    renderWithProviders(<EncabezadoContacto />);
    
    expect(screen.getByText('Contáctanos')).toBeInTheDocument();
  });

  test('PRUEBA_02: Renderiza subtítulo', () => {
    renderWithProviders(<EncabezadoContacto />);
    
    expect(screen.getByText('Estamos aquí para ayudarte')).toBeInTheDocument();
  });

  test('PRUEBA_03: Renderiza descripción', () => {
    renderWithProviders(<EncabezadoContacto />);
    
    expect(screen.getByText(/Si tienes alguna pregunta/)).toBeInTheDocument();
  });

  test('PRUEBA_04: Renderiza información de contacto', () => {
    renderWithProviders(<EncabezadoContacto />);
    
    expect(screen.getByText('Información de Contacto')).toBeInTheDocument();
    expect(screen.getByText('📧 Correo:')).toBeInTheDocument();
    expect(screen.getByText('📞 Teléfono:')).toBeInTheDocument();
    expect(screen.getByText('📍 Dirección:')).toBeInTheDocument();
  });

  test('PRUEBA_05: Muestra datos de contacto correctos', () => {
    renderWithProviders(<EncabezadoContacto />);
    
    expect(screen.getByText('contacto@milsabores.cl')).toBeInTheDocument();
    expect(screen.getByText('+56 9 1234 5678')).toBeInTheDocument();
    expect(screen.getByText('Av. Principal 123, Santiago')).toBeInTheDocument();
  });

  test('PRUEBA_06: Renderiza horarios de atención', () => {
    renderWithProviders(<EncabezadoContacto />);
    
    expect(screen.getByText('Horarios de Atención')).toBeInTheDocument();
    expect(screen.getByText('Lunes a Viernes:')).toBeInTheDocument();
    expect(screen.getByText('Sábados:')).toBeInTheDocument();
    expect(screen.getByText('Domingos:')).toBeInTheDocument();
  });

  test('PRUEBA_07: Muestra horarios correctos', () => {
    renderWithProviders(<EncabezadoContacto />);
    
    expect(screen.getByText('8:00 AM - 8:00 PM')).toBeInTheDocument();
    expect(screen.getByText('9:00 AM - 6:00 PM')).toBeInTheDocument();
    expect(screen.getByText('10:00 AM - 4:00 PM')).toBeInTheDocument();
  });

  test('PRUEBA_08: Renderiza con estilos correctos', () => {
    renderWithProviders(<EncabezadoContacto />);
    
    const titulo = screen.getByText('Contáctanos');
    expect(titulo).toHaveClass('contacto-title');
  });

  test('PRUEBA_09: Renderiza iconos correctamente', () => {
    renderWithProviders(<EncabezadoContacto />);
    
    expect(screen.getByText('📧')).toBeInTheDocument();
    expect(screen.getByText('📞')).toBeInTheDocument();
    expect(screen.getByText('📍')).toBeInTheDocument();
  });

  test('PRUEBA_10: Estructura del componente es correcta', () => {
    renderWithProviders(<EncabezadoContacto />);
    
    // Verificar que tiene la estructura esperada
    const container = screen.getByText('Contáctanos').closest('div');
    expect(container).toBeInTheDocument();
  });
});
