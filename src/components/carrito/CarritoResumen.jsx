import React from 'react';

function CarritoResumen({ 
  carrito, 
  productosDisponibles, 
  calcularTotal, 
  onContinuar, 
  onVaciar, 
  estilos 
}) {
  return (
    <div style={estilos.resumenCarro} className="p-4">
      <h3>Resumen del carrito:</h3>
      
      <strong>Productos en el carrito:</strong>
      <div className="row" style={{ marginTop: '10px' }}>
        <div>
          {carrito.map((item, index) => {
            const producto = productosDisponibles.find(p => p.prod_codigo === item.codigo);
            return (
              <div key={index} style={{ marginBottom: '5px' }}>
                {producto?.nombre} (x{item.cantidad})
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="row" style={{ marginTop: '10px' }}>
        <strong>Total productos:</strong>
        <p>{carrito.reduce((total, item) => total + item.cantidad, 0)}</p>
      </div>
      
      <div className="row" style={{ marginTop: '10px' }}>
        <strong>Total de la compra:</strong>
        <p>${calcularTotal().toLocaleString()}</p>
      </div>
      
      <button
        style={estilos.btnConfirmar}
        onClick={onContinuar}
        disabled={carrito.length === 0}
      >
        Continuar
      </button>
      
      <button
        style={estilos.btnConfirmar}
        onClick={onVaciar}
      >
        Vaciar carrito
      </button>
    </div>
  );
}

export default CarritoResumen;