import { renderHook, act } from '@testing-library/react';
import { CarritoProvider, useCarrito } from '../context/CarritoContext';
import React from 'react';

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

const wrapper = ({ children }) => (
  <CarritoProvider>{children}</CarritoProvider>
);

describe('CarritoContext', () => {
  beforeEach(() => {
    mockLocalStorage.getItem.mockClear();
    mockLocalStorage.setItem.mockClear();
  });

  test('PRUEBA_01: Proporciona carrito inicial vacío', () => {
    mockLocalStorage.getItem.mockReturnValue('[]');
    
    const { result } = renderHook(() => useCarrito(), { wrapper });
    
    expect(result.current.carrito).toEqual([]);
  });

  test('PRUEBA_02: Agrega producto al carrito', () => {
    mockLocalStorage.getItem.mockReturnValue('[]');
    
    const { result } = renderHook(() => useCarrito(), { wrapper });
    
    const producto = {
      codigo: 'TC001',
      nombre: 'Torta Chocolate',
      precio: 15000,
      stock: 10
    };
    
    act(() => {
      result.current.agregarProducto(producto);
    });
    
    expect(result.current.carrito).toHaveLength(1);
    expect(result.current.carrito[0]).toEqual({
      ...producto,
      cantidad: 1
    });
  });

  test('PRUEBA_03: Incrementa cantidad si producto ya existe', () => {
    mockLocalStorage.getItem.mockReturnValue('[]');
    
    const { result } = renderHook(() => useCarrito(), { wrapper });
    
    const producto = {
      codigo: 'TC001',
      nombre: 'Torta Chocolate',
      precio: 15000,
      stock: 10
    };
    
    act(() => {
      result.current.agregarProducto(producto);
      result.current.agregarProducto(producto);
    });
    
    expect(result.current.carrito).toHaveLength(1);
    expect(result.current.carrito[0].cantidad).toBe(2);
  });

  test('PRUEBA_04: Elimina producto del carrito', () => {
    const carritoInicial = [
      {
        codigo: 'TC001',
        nombre: 'Torta Chocolate',
        precio: 15000,
        cantidad: 2
      }
    ];
    
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(carritoInicial));
    
    const { result } = renderHook(() => useCarrito(), { wrapper });
    
    act(() => {
      result.current.eliminarProducto('TC001');
    });
    
    expect(result.current.carrito).toHaveLength(0);
  });

  test('PRUEBA_05: Actualiza cantidad de producto', () => {
    const carritoInicial = [
      {
        codigo: 'TC001',
        nombre: 'Torta Chocolate',
        precio: 15000,
        cantidad: 2
      }
    ];
    
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(carritoInicial));
    
    const { result } = renderHook(() => useCarrito(), { wrapper });
    
    act(() => {
      result.current.actualizarCantidad('TC001', 5);
    });
    
    expect(result.current.carrito[0].cantidad).toBe(5);
  });

  test('PRUEBA_06: Calcula total correctamente', () => {
    const carritoInicial = [
      {
        codigo: 'TC001',
        nombre: 'Torta Chocolate',
        precio: 15000,
        cantidad: 2
      },
      {
        codigo: 'TC002',
        nombre: 'Torta Vainilla',
        precio: 12000,
        cantidad: 1
      }
    ];
    
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(carritoInicial));
    
    const { result } = renderHook(() => useCarrito(), { wrapper });
    
    expect(result.current.calcularTotal()).toBe(42000);
  });

  test('PRUEBA_07: Obtiene cantidad total de productos', () => {
    const carritoInicial = [
      {
        codigo: 'TC001',
        nombre: 'Torta Chocolate',
        precio: 15000,
        cantidad: 3
      },
      {
        codigo: 'TC002',
        nombre: 'Torta Vainilla',
        precio: 12000,
        cantidad: 2
      }
    ];
    
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(carritoInicial));
    
    const { result } = renderHook(() => useCarrito(), { wrapper });
    
    expect(result.current.obtenerCantidadTotal()).toBe(5);
  });

  test('PRUEBA_08: Vacía el carrito', () => {
    const carritoInicial = [
      {
        codigo: 'TC001',
        nombre: 'Torta Chocolate',
        precio: 15000,
        cantidad: 2
      }
    ];
    
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(carritoInicial));
    
    const { result } = renderHook(() => useCarrito(), { wrapper });
    
    act(() => {
      result.current.vaciarCarrito();
    });
    
    expect(result.current.carrito).toHaveLength(0);
  });

  test('PRUEBA_09: Guarda carrito en localStorage', () => {
    mockLocalStorage.getItem.mockReturnValue('[]');
    
    const { result } = renderHook(() => useCarrito(), { wrapper });
    
    const producto = {
      codigo: 'TC001',
      nombre: 'Torta Chocolate',
      precio: 15000,
      stock: 10
    };
    
    act(() => {
      result.current.agregarProducto(producto);
    });
    
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'carrito',
      expect.stringContaining('TC001')
    );
  });

  test('PRUEBA_10: Carga carrito desde localStorage', () => {
    const carritoGuardado = [
      {
        codigo: 'TC001',
        nombre: 'Torta Chocolate',
        precio: 15000,
        cantidad: 2
      }
    ];
    
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(carritoGuardado));
    
    const { result } = renderHook(() => useCarrito(), { wrapper });
    
    expect(result.current.carrito).toEqual(carritoGuardado);
  });

  test('PRUEBA_11: Maneja error en localStorage', () => {
    mockLocalStorage.getItem.mockImplementation(() => {
      throw new Error('localStorage error');
    });
    
    const { result } = renderHook(() => useCarrito(), { wrapper });
    
    expect(result.current.carrito).toEqual([]);
  });

  test('PRUEBA_12: Proporciona productos disponibles', () => {
    mockLocalStorage.getItem.mockReturnValue('[]');
    
    const { result } = renderHook(() => useCarrito(), { wrapper });
    
    expect(result.current.productosDisponibles).toBeDefined();
    expect(Array.isArray(result.current.productosDisponibles)).toBe(true);
  });
});
