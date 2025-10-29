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
  test('PRUEBA_01: Renderiza componente correctamente', () => {
    renderWithProviders(<EncabezadoContacto />);
    
    expect(screen.getByText('Pastelería Mil Sabores')).toBeInTheDocument();
    const logo = screen.getByAltText('Pastelería Mil Sabores');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/img/Logotipo_pasteleria.png');
  });

  test('PRUEBA_02: Maneja error de imagen', () => {
    renderWithProviders(<EncabezadoContacto />);
    
    const logo = screen.getByAltText('Pastelería Mil Sabores');
    fireEvent.error(logo);
    
    expect(logo).toHaveAttribute('src', 'https://via.placeholder.com/150x150/FFC0CB/8B4513?text=Logo');
  });
});
