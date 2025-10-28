import React from 'react';

function FiltrosProductos({ searchTerm, setSearchTerm, categorias, selectedCategory, setSelectedCategory }) {
  return (
    <div className="card mb-4 shadow">
      <div className="card-body">
        {/* Barra de búsqueda */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Botones de categorías */}
        <div className="d-flex flex-wrap gap-2 justify-content-center">
          {categorias.map(categoria => (
            <button
              key={categoria}
              className={`btn rounded-pill boton-categoria ${
                selectedCategory === categoria 
                  ? 'boton-categoria-activo' 
                  : 'btn-outline-secondary boton-categoria-inactivo'
              }`}
              onClick={() => setSelectedCategory(categoria)}
            >
              {categoria}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FiltrosProductos;
