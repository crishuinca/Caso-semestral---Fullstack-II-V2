import React from 'react';

function CarritoResumen({ carrito, productosDisponibles, total, onContinuar, onVaciar }) {
  return (
    <div className="resumen-carrito p-4">
      <h3>Resumen del carrito:</h3>

      <strong>Productos en el carrito:</strong>
      <div className="row margen-superior-10">
        <div>
          {carrito.map((item, index) => {
            const producto = productosDisponibles.find(p => p.prod_codigo === item.codigo);
            return (
              <div key={index} className="margen-inferior-5">
                {producto?.nombre} (x{item.cantidad})
              </div>
            );
          })}
        </div>
      </div>

      <div className="row margen-superior-10">
        <strong>Total productos:</strong>
        <p>{carrito.reduce((acc, it) => acc + it.cantidad, 0)}</p>
      </div>

      <div className="row margen-superior-10">
        <strong>Total de la compra:</strong>
        <p>${total.toLocaleString()}</p>
      </div>

      <button className="boton-confirmar" onClick={onContinuar} disabled={carrito.length === 0}>
        Continuar
      </button>

      <button className="boton-confirmar" onClick={onVaciar}>
        Vaciar carrito
      </button>
    </div>
  );
}

export default CarritoResumen;
