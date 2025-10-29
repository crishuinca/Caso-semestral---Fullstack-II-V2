import { renderHook, act } from '@testing-library/react';
import { FiltroProvider, useFiltro } from '../context/FiltroContext';
import React from 'react';

const wrapper = ({ children }) => (
  <FiltroProvider>{children}</FiltroProvider>
);

describe('FiltroContext', () => {
  test('PRUEBA_01: Proporciona estado inicial de filtros', () => {
    const { result } = renderHook(() => useFiltro(), { wrapper });
    
    expect(result.current.categoriaSeleccionada).toBe('Todos');
    expect(result.current.terminoBusqueda).toBe('');
  });

  test('PRUEBA_02: Cambia categoría seleccionada', () => {
    const { result } = renderHook(() => useFiltro(), { wrapper });
    
    act(() => {
      result.current.setCategoriaSeleccionada('Tortas Cuadradas');
    });
    
    expect(result.current.categoriaSeleccionada).toBe('Tortas Cuadradas');
  });

  test('PRUEBA_03: Cambia término de búsqueda', () => {
    const { result } = renderHook(() => useFiltro(), { wrapper });
    
    act(() => {
      result.current.setTerminoBusqueda('chocolate');
    });
    
    expect(result.current.terminoBusqueda).toBe('chocolate');
  });

  test('PRUEBA_04: Limpia filtros', () => {
    const { result } = renderHook(() => useFiltro(), { wrapper });
    
    // Establecer algunos filtros
    act(() => {
      result.current.setCategoriaSeleccionada('Tortas Cuadradas');
      result.current.setTerminoBusqueda('chocolate');
    });
    
    // Limpiar filtros
    act(() => {
      result.current.limpiarFiltros();
    });
    
    expect(result.current.categoriaSeleccionada).toBe('Todos');
    expect(result.current.terminoBusqueda).toBe('');
  });

  test('PRUEBA_05: Mantiene estado entre cambios', () => {
    const { result } = renderHook(() => useFiltro(), { wrapper });
    
    act(() => {
      result.current.setCategoriaSeleccionada('Tortas Circulares');
    });
    
    act(() => {
      result.current.setTerminoBusqueda('vainilla');
    });
    
    expect(result.current.categoriaSeleccionada).toBe('Tortas Circulares');
    expect(result.current.terminoBusqueda).toBe('vainilla');
  });

  test('PRUEBA_06: Proporciona todas las funciones necesarias', () => {
    const { result } = renderHook(() => useFiltro(), { wrapper });
    
    expect(typeof result.current.setCategoriaSeleccionada).toBe('function');
    expect(typeof result.current.setTerminoBusqueda).toBe('function');
    expect(typeof result.current.limpiarFiltros).toBe('function');
  });

  test('PRUEBA_07: Estado inicial es correcto', () => {
    const { result } = renderHook(() => useFiltro(), { wrapper });
    
    expect(result.current.categoriaSeleccionada).toBe('Todos');
    expect(result.current.terminoBusqueda).toBe('');
  });

  test('PRUEBA_08: Maneja múltiples cambios de categoría', () => {
    const { result } = renderHook(() => useFiltro(), { wrapper });
    
    act(() => {
      result.current.setCategoriaSeleccionada('Tortas Cuadradas');
    });
    
    act(() => {
      result.current.setCategoriaSeleccionada('Tortas Circulares');
    });
    
    act(() => {
      result.current.setCategoriaSeleccionada('Postres Individuales');
    });
    
    expect(result.current.categoriaSeleccionada).toBe('Postres Individuales');
  });

  test('PRUEBA_09: Maneja múltiples cambios de búsqueda', () => {
    const { result } = renderHook(() => useFiltro(), { wrapper });
    
    act(() => {
      result.current.setTerminoBusqueda('torta');
    });
    
    act(() => {
      result.current.setTerminoBusqueda('chocolate');
    });
    
    act(() => {
      result.current.setTerminoBusqueda('vainilla');
    });
    
    expect(result.current.terminoBusqueda).toBe('vainilla');
  });

  test('PRUEBA_10: Limpia filtros resetea a valores iniciales', () => {
    const { result } = renderHook(() => useFiltro(), { wrapper });
    
    // Cambiar valores
    act(() => {
      result.current.setCategoriaSeleccionada('Productos Veganos');
      result.current.setTerminoBusqueda('vegano');
    });
    
    // Limpiar
    act(() => {
      result.current.limpiarFiltros();
    });
    
    // Verificar que volvió a los valores iniciales
    expect(result.current.categoriaSeleccionada).toBe('Todos');
    expect(result.current.terminoBusqueda).toBe('');
  });

  test('PRUEBA_11: Contexto proporciona valores correctos', () => {
    const { result } = renderHook(() => useFiltro(), { wrapper });
    
    expect(result.current).toHaveProperty('categoriaSeleccionada');
    expect(result.current).toHaveProperty('terminoBusqueda');
    expect(result.current).toHaveProperty('setCategoriaSeleccionada');
    expect(result.current).toHaveProperty('setTerminoBusqueda');
    expect(result.current).toHaveProperty('limpiarFiltros');
  });

  test('PRUEBA_12: Estado persiste durante la sesión', () => {
    const { result } = renderHook(() => useFiltro(), { wrapper });
    
    act(() => {
      result.current.setCategoriaSeleccionada('Tortas Especiales');
      result.current.setTerminoBusqueda('especial');
    });
    
    // Simular re-render
    const { result: result2 } = renderHook(() => useFiltro(), { wrapper });
    
    expect(result2.current.categoriaSeleccionada).toBe('Tortas Especiales');
    expect(result2.current.terminoBusqueda).toBe('especial');
  });
});
