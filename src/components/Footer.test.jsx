import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CarritoProvider } from '../context/CarritoContext';
import Footer from '../components/Footer';

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
  test('PRUEBA_01: Renderiza footer correctamente', () => {
    renderWithProviders(<Footer />);
    
    expect(screen.getByText('© 2025 Pastelería Mil Sabores. Todos los derechos reservados.')).toBeInTheDocument();
  });

  test('PRUEBA_02: Tiene estilos correctos', () => {
    renderWithProviders(<Footer />);
    
    const footer = screen.getByText('© 2025 Pastelería Mil Sabores. Todos los derechos reservados.').closest('footer');
    expect(footer).toBeInTheDocument();
  });

  test('PRUEBA_03: Contiene información de copyright', () => {
    renderWithProviders(<Footer />);
    
    expect(screen.getByText(/© 2025/)).toBeInTheDocument();
    expect(screen.getByText(/Pastelería Mil Sabores/)).toBeInTheDocument();
    expect(screen.getByText(/Todos los derechos reservados/)).toBeInTheDocument();
  });

  test('PRUEBA_04: Es un elemento footer semántico', () => {
    renderWithProviders(<Footer />);
    
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  test('PRUEBA_05: Tiene estructura simple', () => {
    renderWithProviders(<Footer />);
    
    const footer = screen.getByRole('contentinfo');
    const parrafo = footer.querySelector('p');
    expect(parrafo).toBeInTheDocument();
  });

  test('PRUEBA_06: Renderiza sin errores', () => {
    expect(() => renderWithProviders(<Footer />)).not.toThrow();
  });

  test('PRUEBA_07: Es reutilizable', () => {
    const { container } = renderWithProviders(<Footer />);
    const { container: container2 } = renderWithProviders(<Footer />);
    
    expect(container.innerHTML).toBe(container2.innerHTML);
  });

  test('PRUEBA_08: Mantiene consistencia visual', () => {
    renderWithProviders(<Footer />);
    
    const footer = screen.getByRole('contentinfo');
    const styles = window.getComputedStyle(footer);
    
    expect(styles.textAlign).toBe('center');
  });
});
