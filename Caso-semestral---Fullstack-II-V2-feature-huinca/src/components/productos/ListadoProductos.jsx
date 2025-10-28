import React from 'react';
import ProductCard from './ProductCard';

function ListadoProductos({ productos }) {
  if (productos.length === 0) {
    return (
      <div className="mensaje-sin-productos">
        <h3 className="text-muted">No se encontraron productos</h3>
        <p>No hay productos que coincidan con tu búsqueda.</p>
      </div>
    );
  }

  return (
    <div className="row g-4">
      {productos.map(producto => (
        <div key={producto.prod_codigo} className="col-lg-4 col-md-6">
          <ProductCard producto={producto} />
        </div>
      ))}
    </div>
  );
}

export default ListadoProductos;
