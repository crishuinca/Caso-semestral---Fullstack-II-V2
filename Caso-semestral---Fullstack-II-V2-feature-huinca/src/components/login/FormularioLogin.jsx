import React from 'react';
import { Link } from 'react-router-dom';

function FormularioLogin({ formData, handleInputChange, handleSubmit, resultado }) {
  return (
    <form onSubmit={handleSubmit} className="login-form" noValidate>
      <div className="form-group">
        <label htmlFor="correo" className="form-label">Correo</label>
        <input 
          type="email" 
          id="correo" 
          name="correo" 
          placeholder="Correo" 
          required
          value={formData.correo}
          onChange={handleInputChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password" className="form-label">Contraseña</label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          placeholder="Contraseña" 
          required
          value={formData.password}
          onChange={handleInputChange}
          className="form-input"
        />
      </div>
      <button 
        type="submit"
        className="login-button"
      >
        Ingresar
      </button>
      
      {resultado && (
        <div className="error-message">
          {resultado}
        </div>
      )}
      
      <div className="register-link">
        <Link to="/">
          Volver a la tienda
        </Link>
        <span> | </span>
        <Link to="/register">
          Crear cuenta
        </Link>
      </div>
    </form>
  );
}

export default FormularioLogin;
