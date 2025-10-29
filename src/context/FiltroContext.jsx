import { createContext, useContext, useState } from 'react';

const FiltroContext = createContext();

export const useFiltro = () => {
  const context = useContext(FiltroContext);
  if (!context) {
    throw new Error('useFiltro debe ser usado dentro de un FiltroProvider');
  }
  return context;
};

export const FiltroProvider = ({ children }) => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  const limpiarFiltros = () => {
    setCategoriaSeleccionada('Todos');
    setTerminoBusqueda('');
  };

  const value = {
    categoriaSeleccionada,
    setCategoriaSeleccionada,
    terminoBusqueda,
    setTerminoBusqueda,
    limpiarFiltros
  };

  return (
    <FiltroContext.Provider value={value}>
      {children}
    </FiltroContext.Provider>
  );
};
