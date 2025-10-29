import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ConfirmacionModal from './ConfirmacionModal';

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

describe('ConfirmacionModal Component', () => {
  const mockProps = {
    mostrarConfirmacion: true,
    datosCompra: {
      nombre: 'Juan Pérez',
      rut: '12345678-9',
      direccion: 'Av. Principal 123',
      tipoEntrega: 'despacho',
      dia: '25',
      mes: '12',
      ano: '2024'
    },
    carrito: [
      { id: 1, nombre: 'Producto Test', precio: 100, cantidad: 2 }
    ],
    productosDisponibles: [
      { id: 1, nombre: 'Producto Test', precio: 100, stock: 10 }
    ],
    calcularTotal: () => 200,
    estilos: {
      overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 1000
      },
      modalConfirmar: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        zIndex: 1001
      },
      inputCarrito: {
        width: '100%',
        padding: '8px',
        margin: '4px 0',
        border: '1px solid #ccc',
        borderRadius: '4px'
      },
      btnConfirmar: {
        backgroundColor: '#007bff',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }
    },
    btnpago: false,
    initialOptions: {},
    redirigir: vi.fn(),
    redirigirFallo: vi.fn(),
    onInputChange: vi.fn(),
    onTipoEntregaChange: vi.fn(),
    onConfirmar: vi.fn(),
    onCancelar: vi.fn()
  };

  beforeEach(() => {
    mockProps.onInputChange.mockClear();
    mockProps.onConfirmar.mockClear();
    mockProps.onCancelar.mockClear();
  });

  test('PRUEBA_01: Renderiza modal con datos del comprador', () => {
    renderWithProviders(<ConfirmacionModal {...mockProps} />);
    
    expect(screen.getByDisplayValue('Juan Pérez')).toBeInTheDocument();
    expect(screen.getByDisplayValue('12345678-9')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Av. Principal 123')).toBeInTheDocument();
  });

  test('PRUEBA_02: Permite editar datos y cambiar fecha', () => {
    renderWithProviders(<ConfirmacionModal {...mockProps} />);
    
    const inputNombre = screen.getByDisplayValue('Juan Pérez');
    fireEvent.change(inputNombre, { target: { value: 'María González' } });
    
    const selectorDia = screen.getByDisplayValue('25');
    fireEvent.change(selectorDia, { target: { value: '26' } });
    
    expect(mockProps.onInputChange).toHaveBeenCalledTimes(2);
  });

  test('PRUEBA_03: Botón cancelar y advertencia funcionan', () => {
    renderWithProviders(<ConfirmacionModal {...mockProps} />);
    
    const botonCancelar = screen.getByText('Cancelar');
    fireEvent.click(botonCancelar);
    
    expect(mockProps.onCancelar).toHaveBeenCalled();
    expect(screen.getByText('⚠️ No se pueden seleccionar fechas pasadas')).toBeInTheDocument();
  });

});
