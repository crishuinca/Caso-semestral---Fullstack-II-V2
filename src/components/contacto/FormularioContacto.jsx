import React from 'react';

function FormularioContacto({ formData, onInputChange, onSubmit }) {
  return (
    <section className="seccion-formulario-contacto">
      <div className="contenedor-formulario-contacto">
        <h2 className="titulo-formulario-contacto">
          Contáctanos
        </h2>

        <form onSubmit={onSubmit} className="formulario-contacto">
          <div className="grupo-campo-contacto">
            <label htmlFor="nombre" className="etiqueta-campo-contacto">
              Nombre Completo
            </label>
            <input 
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={onInputChange}
              required
              minLength="3"
              maxLength="100"
              className="input-campo-contacto"
            />
          </div>

          <div className="grupo-campo-contacto">
            <label htmlFor="correo" className="etiqueta-campo-contacto">
              Correo Electrónico
            </label>
            <input 
              type="email"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={onInputChange}
              required
              maxLength="100"
              pattern=".*@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$"
              title="Solo se aceptan correos con dominios: @duoc.cl, @profesor.duoc.cl, @gmail.com"
              className="input-campo-contacto"
            />
          </div>

          <div className="grupo-campo-contacto">
            <label htmlFor="razon" className="etiqueta-campo-contacto">
              Razón de Contacto
            </label>
            <textarea 
              id="razon"
              name="razon"
              value={formData.razon}
              onChange={onInputChange}
              required
              minLength="5"
              maxLength="500"
              rows="5"
              placeholder="Cuéntanos cómo podemos ayudarte..."
              className="textarea-campo-contacto"
            />
          </div>

          <button type="submit" className="boton-enviar-contacto">
            Enviar Mensaje
          </button>
        </form>
      </div>
    </section>
  );
}

export default FormularioContacto;
