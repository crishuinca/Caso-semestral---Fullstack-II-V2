import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import EncabezadoLogin from '../components/login/EncabezadoLogin';
import FormularioLogin from '../components/login/FormularioLogin';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    correo: '',
    password: ''
  });
  const [resultado, setResultado] = useState('');

  useEffect(() => {
    const usuariosExistentes = JSON.parse(localStorage.getItem('usuarios') || '[]');

    const adminExiste = usuariosExistentes.find(u => u.correo === 'admin@gmail.com');
    
    if (!adminExiste) {
      
      const adminUser = {
        id: 'admin-001',
        run: '11111111-1',
        nombre: 'Administrador',
        apellidos: 'Sistema',
        correo: 'admin@gmail.com',
        fecha_nacimiento: '',
        region: 'Región Metropolitana',
        comuna: 'Santiago',
        direccion: 'Oficina Central',
        password: '123',
        codigo_descuento: '',
        isAdmin: true,
        fechaRegistro: new Date().toISOString()
      };
      
      usuariosExistentes.push(adminUser);
      localStorage.setItem('usuarios', JSON.stringify(usuariosExistentes));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.correo || !formData.password) {
      setResultado('Por favor complete todos los campos');
      return;
    }

    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuario = usuariosGuardados.find(u => 
      u.correo === formData.correo && u.password === formData.password
    );

    if (usuario) {
      
      localStorage.setItem('usuarioActual', JSON.stringify(usuario));
      
      window.dispatchEvent(new Event('usuarioActualizado'));
      
      if (usuario.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      setResultado('Correo o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container">
      <main>
        <div className="login-card">
          <EncabezadoLogin />
          <FormularioLogin 
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            resultado={resultado}
          />
        </div>
      </main>
    </div>
  );
}

export default Login;
