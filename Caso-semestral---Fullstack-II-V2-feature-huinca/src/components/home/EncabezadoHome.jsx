import React from 'react';

function EncabezadoHome({ usuario }) {
  const titulo = usuario ? `¡Bienvenido ${usuario.nombre}!` : 'Bienvenido';
  return (
    <div className="text-center py-4 encabezado-home">
      <h1 className="titulo-bienvenida">{titulo}</h1>
    </div>
  );
}

export default EncabezadoHome;
