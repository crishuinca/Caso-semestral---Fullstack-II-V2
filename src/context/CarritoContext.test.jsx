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
    mockLocalStorage.removeItem.mockClear();
    mockLocalStorage.clear.mockClear();
    
    // Mock para productosAdmin y productosStock por defecto
    mockLocalStorage.getItem.mockImplementation((key) => {
      if (key === 'productosAdmin') return null;
      if (key === 'productosStock') return null;
      if (key === 'carritoCompras') return '[]';
      return null;
    });
  });

  test('PRUEBA_01: Maneja carrito inicial y agregar/incrementar productos', () => {
    mockLocalStorage.getItem.mockImplementation((key) => {
      if (key === 'productosAdmin') return null;
      if (key === 'productosStock') return null;
      if (key === 'carritoCompras') return '[]';
      return null;
    });
    
    const { result } = renderHook(() => useCarrito(), { wrapper });
    
    expect(result.current.carrito).toEqual([]);
    expect(result.current.productosDisponibles.length).toBeGreaterThan(0);
    
    // Agregar producto
    act(() => {
      result.current.agregarProducto('TC001', 1);
    });
    
    expect(result.current.carrito).toHaveLength(1);
    expect(result.current.carrito[0].cantidad).toBe(1);
    
    // Incrementar cantidad
    act(() => {
      result.current.agregarProducto('TC001', 1);
    });
    
    expect(result.current.carrito[0].cantidad).toBe(2);
  });

  test('PRUEBA_02: Elimina productos y vacía carrito', () => {
    const carritoInicial = [
      { codigo: 'TC001', nombre: 'Torta Chocolate', precio: 15000, cantidad: 2 }
    ];
    
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(carritoInicial));
    
    const { result } = renderHook(() => useCarrito(), { wrapper });
    
    expect(result.current.carrito).toHaveLength(1);
    
    act(() => {
      result.current.eliminarProducto('TC001');
    });
    
    expect(result.current.carrito).toHaveLength(0);
  });

  test('PRUEBA_03: Calcula totales correctamente', () => {
    const carritoInicial = [
      { codigo: 'TC001', nombre: 'Torta Chocolate', precio: 45000, cantidad: 2 },
      { codigo: 'TC002', nombre: 'Torta Frutas', precio: 50000, cantidad: 1 }
    ];
    
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(carritoInicial));
    
    const { result } = renderHook(() => useCarrito(), { wrapper });
    
    expect(result.current.calcularTotal()).toBe(140000);
    expect(result.current.obtenerCantidadTotal()).toBe(3);
  });

  test('PRUEBA_04: Persiste en localStorage correctamente', () => {
    const carritoGuardado = [
      { codigo: 'TC001', nombre: 'Torta Chocolate', precio: 15000, cantidad: 2 }
    ];
    
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(carritoGuardado));
    
    const { result } = renderHook(() => useCarrito(), { wrapper });
    
    expect(result.current.carrito).toEqual(carritoGuardado);
  });
});
