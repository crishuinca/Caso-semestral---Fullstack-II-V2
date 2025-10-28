import React from 'react';

function EncabezadoContacto() {
  return (
    <section className="seccion-encabezado-contacto">
      <div className="contenedor-encabezado-contacto">
        <img 
          src="/img/Logotipo_pasteleria.png" 
          alt="Pastelería Mil Sabores"
          className="logo-contacto"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/150x150/FFC0CB/8B4513?text=Logo';
          }}
        />
        <h1 className="titulo-principal-contacto">
          Pastelería Mil Sabores
        </h1>
      </div>
    </section>
  );
}

export default EncabezadoContacto;
