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
    
    expect(screen.getByText('Pastelería Mil Sabores')).toBeInTheDocument();
  });

  test('PRUEBA_02: Renderiza imagen del logo', () => {
    renderWithProviders(<EncabezadoContacto />);
    
    const logo = screen.getByAltText('Pastelería Mil Sabores');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/img/Logotipo_pasteleria.png');
  });

  test('PRUEBA_03: Renderiza sección con estilos correctos', () => {
    renderWithProviders(<EncabezadoContacto />);
    
    const section = screen.getByText('Pastelería Mil Sabores').closest('section');
    expect(section).toBeInTheDocument();
  });

  test('PRUEBA_04: Logo tiene estilos correctos', () => {
    renderWithProviders(<EncabezadoContacto />);
    
    const logo = screen.getByAltText('Pastelería Mil Sabores');
    expect(logo).toHaveStyle({
      width: '150px',
      height: '150px',
      borderRadius: '50%'
    });
  });

  test('PRUEBA_05: Título tiene estilos correctos', () => {
    renderWithProviders(<EncabezadoContacto />);
    
    const titulo = screen.getByText('Pastelería Mil Sabores');
    expect(titulo).toHaveStyle({
      fontFamily: "'Pacifico', cursive",
      fontSize: '3rem',
      color: '#8B4513'
    });
  });

  test('PRUEBA_06: Maneja error de imagen', () => {
    renderWithProviders(<EncabezadoContacto />);
    
    const logo = screen.getByAltText('Pastelería Mil Sabores');
    fireEvent.error(logo);
    
    expect(logo).toHaveAttribute('src', 'https://via.placeholder.com/150x150/FFC0CB/8B4513?text=Logo');
  });

  test('PRUEBA_07: Renderiza sin errores', () => {
    expect(() => renderWithProviders(<EncabezadoContacto />)).not.toThrow();
  });

  test('PRUEBA_08: Estructura del componente es correcta', () => {
    renderWithProviders(<EncabezadoContacto />);
    
    const section = screen.getByText('Pastelería Mil Sabores').closest('section');
    const div = section.querySelector('div');
    expect(div).toBeInTheDocument();
  });

  test('PRUEBA_09: Contenedor tiene estilos responsivos', () => {
    renderWithProviders(<EncabezadoContacto />);
    
    const div = screen.getByText('Pastelería Mil Sabores').closest('div');
    expect(div).toHaveStyle({
      maxWidth: '800px',
      margin: '0 auto'
    });
  });

  test('PRUEBA_10: Sección tiene padding correcto', () => {
    renderWithProviders(<EncabezadoContacto />);
    
    const section = screen.getByText('Pastelería Mil Sabores').closest('section');
    expect(section).toHaveStyle({
      padding: '4rem 2rem',
      textAlign: 'center',
      marginBottom: '3rem'
    });
  });
});
