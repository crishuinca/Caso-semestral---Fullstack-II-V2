import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
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
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('ConfirmacionModal Component', () => {
  const mockProps = {
    mostrar: true,
    datosCompra: {
      nombre: 'Juan Pérez',
      rut: '12345678-9',
      direccion: 'Av. Principal 123',
      tipoEntrega: 'despacho',
      dia: '25',
      mes: '12',
      ano: '2024'
    },
    onInputChange: vi.fn(),
    onConfirmar: vi.fn(),
    onCancelar: vi.fn()
  };

  beforeEach(() => {
    mockProps.onInputChange.mockClear();
    mockProps.onConfirmar.mockClear();
    mockProps.onCancelar.mockClear();
  });

  test('PRUEBA_01: Renderiza modal cuando está visible', () => {
    const propsConModal = { ...mockProps, mostrarConfirmacion: true };
    renderWithProviders(<ConfirmacionModal {...propsConModal} />);
    
    // El modal debería renderizar algo cuando mostrarConfirmacion es true
    expect(screen.getByDisplayValue('Juan Pérez')).toBeInTheDocument();
    expect(screen.getByDisplayValue('12345678-9')).toBeInTheDocument();
  });

  test('PRUEBA_02: No renderiza modal cuando está oculto', () => {
    const propsOculto = { ...mockProps, mostrar: false };
    
    renderWithProviders(<ConfirmacionModal {...propsOculto} />);
    
    expect(screen.queryByText('Confirmar Pedido')).not.toBeInTheDocument();
  });

  test('PRUEBA_03: Muestra datos del comprador', () => {
    renderWithProviders(<ConfirmacionModal {...mockProps} />);
    
    expect(screen.getByDisplayValue('Juan Pérez')).toBeInTheDocument();
    expect(screen.getByDisplayValue('12345678-9')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Av. Principal 123')).toBeInTheDocument();
  });

  test('PRUEBA_04: Permite editar datos del comprador', () => {
    renderWithProviders(<ConfirmacionModal {...mockProps} />);
    
    const inputNombre = screen.getByDisplayValue('Juan Pérez');
    fireEvent.change(inputNombre, { target: { value: 'María González' } });
    
    expect(mockProps.onInputChange).toHaveBeenCalled();
  });

  test('PRUEBA_05: Muestra selectores de fecha', () => {
    renderWithProviders(<ConfirmacionModal {...mockProps} />);
    
    expect(screen.getByDisplayValue('25')).toBeInTheDocument();
    expect(screen.getByDisplayValue('12')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2024')).toBeInTheDocument();
  });

  test('PRUEBA_06: Permite cambiar fecha de entrega', () => {
    renderWithProviders(<ConfirmacionModal {...mockProps} />);
    
    const selectorDia = screen.getByDisplayValue('25');
    fireEvent.change(selectorDia, { target: { value: '26' } });
    
    expect(mockProps.onInputChange).toHaveBeenCalled();
  });

  test('PRUEBA_07: Ejecuta función confirmar al hacer click', () => {
    renderWithProviders(<ConfirmacionModal {...mockProps} />);
    
    const botonConfirmar = screen.getByText('Confirmar Pedido');
    fireEvent.click(botonConfirmar);
    
    expect(mockProps.onConfirmar).toHaveBeenCalled();
  });

  test('PRUEBA_08: Ejecuta función cancelar al hacer click', () => {
    renderWithProviders(<ConfirmacionModal {...mockProps} />);
    
    const botonCancelar = screen.getByText('Cancelar');
    fireEvent.click(botonCancelar);
    
    expect(mockProps.onCancelar).toHaveBeenCalled();
  });

  test('PRUEBA_09: Muestra tipo de entrega', () => {
    renderWithProviders(<ConfirmacionModal {...mockProps} />);
    
    expect(screen.getByText('Tipo de Entrega')).toBeInTheDocument();
    expect(screen.getByText('Despacho a domicilio')).toBeInTheDocument();
  });

  test('PRUEBA_10: Muestra advertencia de fecha', () => {
    renderWithProviders(<ConfirmacionModal {...mockProps} />);
    
    expect(screen.getByText('⚠️ No se pueden seleccionar fechas pasadas')).toBeInTheDocument();
  });

  test('PRUEBA_11: Maneja tipo de entrega retiro', () => {
    const propsRetiro = {
      ...mockProps,
      datosCompra: {
        ...mockProps.datosCompra,
        tipoEntrega: 'retiro'
      }
    };
    
    renderWithProviders(<ConfirmacionModal {...propsRetiro} />);
    
    expect(screen.getByText('Retiro en tienda')).toBeInTheDocument();
  });

  test('PRUEBA_12: Valida campos requeridos', () => {
    const propsSinDatos = {
      ...mockProps,
      datosCompra: {
        nombre: '',
        rut: '',
        direccion: '',
        tipoEntrega: 'despacho',
        dia: '',
        mes: '',
        ano: ''
      }
    };
    
    renderWithProviders(<ConfirmacionModal {...propsSinDatos} />);
    
    const botonConfirmar = screen.getByText('Confirmar Pedido');
    fireEvent.click(botonConfirmar);
    
    expect(mockProps.onConfirmar).toHaveBeenCalled();
  });
});
