import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CarritoProvider } from '../../context/CarritoContext';
import Footer from './Footer';

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <CarritoProvider>
        {component}
      </CarritoProvider>
    </BrowserRouter>
  );
};

describe('Footer Component', () => {
  test('PRUEBA_01: Renderiza footer con copyright', () => {
    renderWithProviders(<Footer />);
    
    expect(screen.getByText('© 2025 Pastelería Mil Sabores. Todos los derechos reservados.')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    
    const footer = screen.getByRole('contentinfo');
    const styles = window.getComputedStyle(footer);
    expect(styles.textAlign).toBe('center');
  });
});
