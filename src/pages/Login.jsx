import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { iniciarSesion, loginUser } from '../utils/apiHelper';
import '../styles/Login.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    correo: '',
    password: ''
  });
  const [resultado, setResultado] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.correo || !formData.password) {
      setResultado('Por favor complete todos los campos');
      return;
    }

    const response = await loginUser(formData.correo, formData.password);
    
    if (response.success) {
      localStorage.setItem('usuarioActual', JSON.stringify(response.usuario));
      window.dispatchEvent(new Event('usuarioActualizado'));
      
      if (response.usuario.isAdmin) {
        iniciarSesion(response.usuario.correo, response.usuario.password)
        navigate('/admin');
      } else if (response.usuario.isVendedor) {
        iniciarSesion(response.usuario.correo, response.usuario.password)
        navigate('/vendedor');
      } else {
        navigate('/');
      }
    } else {
      setResultado(response.message);
    }
  };

  return (
    <div className="login-container">
      <main>
        <div className="login-card">
          <h2 className="login-title">Iniciar Sesión</h2>
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
        </div>
      </main>
    </div>
  );
}

export default Login;
