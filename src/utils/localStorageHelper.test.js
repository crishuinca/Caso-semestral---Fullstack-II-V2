import {
  guardarEnLocalStorage,
  cargarDesdeLocalStorage,
  limpiarLocalStorage,
  obtenerUsuarioActual,
  guardarUsuarioActual,
  limpiarUsuarioActual
} from '../utils/localStorageHelper';

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('localStorageHelper', () => {
  beforeEach(() => {
    mockLocalStorage.getItem.mockClear();
    mockLocalStorage.setItem.mockClear();
    mockLocalStorage.removeItem.mockClear();
    mockLocalStorage.clear.mockClear();
  });

  describe('guardarEnLocalStorage', () => {
    test('PRUEBA_01: Guarda datos en localStorage', () => {
      const datos = { nombre: 'Juan', edad: 30 };
      guardarEnLocalStorage('test', datos);
      
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'test',
        JSON.stringify(datos)
      );
    });

    test('PRUEBA_02: Maneja errores de localStorage', () => {
      mockLocalStorage.setItem.mockImplementation(() => {
        throw new Error('localStorage error');
      });
      
      const datos = { nombre: 'Juan' };
      expect(() => guardarEnLocalStorage('test', datos)).not.toThrow();
    });
  });

  describe('cargarDesdeLocalStorage', () => {
    test('PRUEBA_03: Carga datos desde localStorage', () => {
      const datos = { nombre: 'Juan', edad: 30 };
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(datos));
      
      const resultado = cargarDesdeLocalStorage('test');
      
      expect(resultado).toEqual(datos);
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('test');
    });

    test('PRUEBA_04: Retorna null si no hay datos', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      
      const resultado = cargarDesdeLocalStorage('test');
      
      expect(resultado).toBeNull();
    });

    test('PRUEBA_05: Maneja JSON inválido', () => {
      mockLocalStorage.getItem.mockReturnValue('invalid json');
      
      const resultado = cargarDesdeLocalStorage('test');
      
      expect(resultado).toBeNull();
    });

    test('PRUEBA_06: Maneja errores de localStorage', () => {
      mockLocalStorage.getItem.mockImplementation(() => {
        throw new Error('localStorage error');
      });
      
      const resultado = cargarDesdeLocalStorage('test');
      
      expect(resultado).toBeNull();
    });
  });

  describe('limpiarLocalStorage', () => {
    test('PRUEBA_07: Limpia localStorage', () => {
      limpiarLocalStorage();
      
      expect(mockLocalStorage.clear).toHaveBeenCalled();
    });

    test('PRUEBA_08: Maneja errores de localStorage', () => {
      mockLocalStorage.clear.mockImplementation(() => {
        throw new Error('localStorage error');
      });
      
      expect(() => limpiarLocalStorage()).not.toThrow();
    });
  });

  describe('obtenerUsuarioActual', () => {
    test('PRUEBA_09: Obtiene usuario actual', () => {
      const usuario = {
        id: 1,
        nombre: 'Juan',
        correo: 'juan@test.com'
      };
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(usuario));
      
      const resultado = obtenerUsuarioActual();
      
      expect(resultado).toEqual(usuario);
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('usuarioActual');
    });

    test('PRUEBA_10: Retorna null si no hay usuario', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      
      const resultado = obtenerUsuarioActual();
      
      expect(resultado).toBeNull();
    });
  });

  describe('guardarUsuarioActual', () => {
    test('PRUEBA_11: Guarda usuario actual', () => {
      const usuario = {
        id: 1,
        nombre: 'Juan',
        correo: 'juan@test.com'
      };
      
      guardarUsuarioActual(usuario);
      
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'usuarioActual',
        JSON.stringify(usuario)
      );
    });

    test('PRUEBA_12: Maneja errores al guardar usuario', () => {
      mockLocalStorage.setItem.mockImplementation(() => {
        throw new Error('localStorage error');
      });
      
      const usuario = { nombre: 'Juan' };
      expect(() => guardarUsuarioActual(usuario)).not.toThrow();
    });
  });

  describe('limpiarUsuarioActual', () => {
    test('PRUEBA_13: Limpia usuario actual', () => {
      limpiarUsuarioActual();
      
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('usuarioActual');
    });

    test('PRUEBA_14: Maneja errores al limpiar usuario', () => {
      mockLocalStorage.removeItem.mockImplementation(() => {
        throw new Error('localStorage error');
      });
      
      expect(() => limpiarUsuarioActual()).not.toThrow();
    });
  });

  describe('Funciones de utilidad', () => {
    test('PRUEBA_15: Todas las funciones están definidas', () => {
      expect(typeof guardarEnLocalStorage).toBe('function');
      expect(typeof cargarDesdeLocalStorage).toBe('function');
      expect(typeof limpiarLocalStorage).toBe('function');
      expect(typeof obtenerUsuarioActual).toBe('function');
      expect(typeof guardarUsuarioActual).toBe('function');
      expect(typeof limpiarUsuarioActual).toBe('function');
    });

    test('PRUEBA_16: Funciones manejan datos complejos', () => {
      const datosComplejos = {
        usuarios: [
          { id: 1, nombre: 'Juan' },
          { id: 2, nombre: 'María' }
        ],
        configuracion: {
          tema: 'oscuro',
          idioma: 'es'
        }
      };
      
      guardarEnLocalStorage('datos', datosComplejos);
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(datosComplejos));
      
      const resultado = cargarDesdeLocalStorage('datos');
      
      expect(resultado).toEqual(datosComplejos);
    });
  });
});
