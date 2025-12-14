import { renderHook, act } from '@testing-library/react';
import { FiltroProvider, useFiltro } from '../context/FiltroContext';
import React from 'react';

const wrapper = ({ children }) => (
  <FiltroProvider>{children}</FiltroProvider>
);

describe('FiltroContext', () => {
  test('PRUEBA_01: Estado inicial y funciones básicas', () => {
    const { result } = renderHook(() => useFiltro(), { wrapper });
    
    // Estado inicial
    expect(result.current.categoriaSeleccionada).toBe('Todos');
    expect(result.current.terminoBusqueda).toBe('');
    
    // Funciones disponibles
    expect(typeof result.current.setCategoriaSeleccionada).toBe('function');
    expect(typeof result.current.setTerminoBusqueda).toBe('function');
    expect(typeof result.current.limpiarFiltros).toBe('function');
  });

  test('PRUEBA_02: Cambios de categoría y búsqueda', () => {
    const { result } = renderHook(() => useFiltro(), { wrapper });
    
    act(() => {
      result.current.setCategoriaSeleccionada('Tortas Cuadradas');
      result.current.setTerminoBusqueda('chocolate');
    });
    
    expect(result.current.categoriaSeleccionada).toBe('Tortas Cuadradas');
    expect(result.current.terminoBusqueda).toBe('chocolate');
  });

  test('PRUEBA_03: Limpia filtros correctamente', () => {
    const { result } = renderHook(() => useFiltro(), { wrapper });
    
    // Establecer filtros
    act(() => {
      result.current.setCategoriaSeleccionada('Tortas Circulares');
      result.current.setTerminoBusqueda('vainilla');
    });
    
    // Limpiar filtros
    act(() => {
      result.current.limpiarFiltros();
    });
    
    expect(result.current.categoriaSeleccionada).toBe('Todos');
    expect(result.current.terminoBusqueda).toBe('');
  });
});
