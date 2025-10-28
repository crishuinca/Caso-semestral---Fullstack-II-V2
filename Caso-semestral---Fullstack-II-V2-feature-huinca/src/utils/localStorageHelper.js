

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
