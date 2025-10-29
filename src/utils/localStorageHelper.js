
// Funciones para manejar localStorage
export const guardarEnLocalStorage = (clave, datos) => {
  try {
    localStorage.setItem(clave, JSON.stringify(datos));
  } catch (error) {
    console.error('Error al guardar en localStorage:', error);
  }
};

export const cargarDesdeLocalStorage = (clave) => {
  try {
    const datos = localStorage.getItem(clave);
    return datos ? JSON.parse(datos) : null;
  } catch (error) {
    console.error('Error al cargar desde localStorage:', error);
    return null;
  }
};

export const limpiarLocalStorage = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error al limpiar localStorage:', error);
  }
};

export const obtenerUsuarioActual = () => {
  try {
    const usuario = localStorage.getItem('usuarioActual');
    return usuario ? JSON.parse(usuario) : null;
  } catch (error) {
    console.error('Error al obtener usuario actual:', error);
    return null;
  }
};

export const guardarUsuarioActual = (usuario) => {
  try {
    localStorage.setItem('usuarioActual', JSON.stringify(usuario));
  } catch (error) {
    console.error('Error al guardar usuario actual:', error);
  }
};

export const limpiarUsuarioActual = () => {
  try {
    localStorage.removeItem('usuarioActual');
  } catch (error) {
    console.error('Error al limpiar usuario actual:', error);
  }
};

// Objeto helper para compatibilidad con código existente
export const localStorageHelper = {
  getCart: () => {
    try {
      return JSON.parse(localStorage.getItem('carritoCompras') || '[]');
    } catch (error) {
      console.error('Error al leer carrito:', error);
      return [];
    }
  },

  setCart: (cart) => {
    try {
      localStorage.setItem('carritoCompras', JSON.stringify(cart));
    } catch (error) {
      console.error('Error al guardar carrito:', error);
    }
  },

  getUser: () => {
    try {
      return JSON.parse(localStorage.getItem('usuarioActual') || 'null');
    } catch (error) {
      console.error('Error al leer usuario:', error);
      return null;
    }
  },

  setUser: (user) => {
    try {
      localStorage.setItem('usuarioActual', JSON.stringify(user));
    } catch (error) {
      console.error('Error al guardar usuario:', error);
    }
  },

  clearAll: () => {
    localStorage.removeItem('carritoCompras');
    localStorage.removeItem('usuarioActual');
  }
};
