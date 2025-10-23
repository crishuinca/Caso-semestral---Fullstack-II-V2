import React from 'react';
import { Link } from 'react-router-dom';

function FormularioRegister({ 
  formData, 
  handleInputChange, 
  handleSubmit, 
  resultado, 
  regiones, 
  comunas 
}) {
  return (
    <>
      <form onSubmit={handleSubmit} className="register-form" noValidate>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="run" className="form-label">RUN*</label>
            <input 
              type="text" 
              id="run" 
              name="run" 
              maxLength="9" 
              minLength="7" 
              required 
              placeholder="Ej: 19011022K"
              value={formData.run}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="nombre" className="form-label">Nombre*</label>
            <input 
              type="text" 
              id="nombre" 
              name="nombre" 
              maxLength="50" 
              required
              value={formData.nombre}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="apellidos" className="form-label">Apellidos*</label>
          <input 
            type="text" 
            id="apellidos" 
            name="apellidos" 
            maxLength="100" 
            required
            value={formData.apellidos}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="correo" className="form-label">Correo*</label>
          <input 
            type="email" 
            id="correo" 
            name="correo" 
            maxLength="100" 
            required 
            placeholder="ejemplo@duoc.cl"
            value={formData.correo}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="fecha_nacimiento" className="form-label">Fecha de nacimiento</label>
          <input 
            type="date" 
            id="fecha_nacimiento" 
            name="fecha_nacimiento"
            value={formData.fecha_nacimiento}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="region" className="form-label">Región*</label>
            <select 
              id="region" 
              name="region" 
              required
              value={formData.region}
              onChange={handleInputChange}
              className="form-input"
            >
              <option value="">Seleccione región</option>
              {regiones.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="comuna" className="form-label">Comuna*</label>
            <select 
              id="comuna" 
              name="comuna" 
              required
              value={formData.comuna}
              onChange={handleInputChange}
              className="form-input"
              disabled={!formData.region}
            >
              <option value="">Seleccione comuna</option>
              {comunas.map(comuna => (
                <option key={comuna} value={comuna}>{comuna}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="direccion" className="form-label">Dirección*</label>
          <input 
            type="text" 
            id="direccion" 
            name="direccion" 
            maxLength="300" 
            required
            value={formData.direccion}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="password" className="form-label">Contraseña*</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              maxLength="30" 
              required
              value={formData.password}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña*</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              maxLength="30" 
              required
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="codigo_descuento" className="form-label">Código de descuento</label>
          <input 
            type="text" 
            id="codigo_descuento" 
            name="codigo_descuento" 
            maxLength="20" 
            placeholder="Opcional"
            value={formData.codigo_descuento}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <button type="submit" className="register-button">
          Registrarse
        </button>

        {resultado && (
          <div className="error-message">
            {resultado}
          </div>
        )}
      </form>
      
      <div className="login-link">
        <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
      </div>
    </>
  );
}

export default FormularioRegister;
