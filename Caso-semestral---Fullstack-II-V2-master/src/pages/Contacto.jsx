import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import EncabezadoContacto from '../components/contacto/EncabezadoContacto';
import FormularioContacto from '../components/contacto/FormularioContacto';

function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    razon: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailPattern = /.*@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
    if (!emailPattern.test(formData.correo)) {
      alert('Solo se aceptan correos con dominios: @duoc.cl, @profesor.duoc.cl, @gmail.com');
      return;
    }

    if (formData.nombre.length < 3 || formData.nombre.length > 100) {
      alert('El nombre debe tener entre 3 y 100 caracteres');
      return;
    }

    if (formData.correo.length > 100) {
      alert('El correo no puede tener más de 100 caracteres');
      return;
    }

    if (formData.razon.length < 5 || formData.razon.length > 500) {
      alert('La razón de contacto debe tener entre 5 y 500 caracteres');
      return;
    }

    // Guardar mensaje de contacto en localStorage
    const mensajeContacto = {
      id: Date.now(),
      nombre: formData.nombre,
      correo: formData.correo,
      razon: formData.razon,
      fecha: new Date().toISOString(),
      estado: 'pendiente'
    };

    // Obtener mensajes existentes o crear array vacío
    const mensajesExistentes = JSON.parse(localStorage.getItem('mensajesContacto') || '[]');
    
    // Agregar nuevo mensaje
    mensajesExistentes.push(mensajeContacto);
    
    // Guardar en localStorage
    localStorage.setItem('mensajesContacto', JSON.stringify(mensajesExistentes));

    alert('¡Mensaje enviado exitosamente! Nos contactaremos contigo pronto.');

    setFormData({
      nombre: '',
      correo: '',
      razon: ''
    });
  };

  return (
    <div style={{ 
      backgroundColor: '#FFF5E1', 
      minHeight: '100vh',
      paddingTop: '80px',
      fontFamily: "'Lato', sans-serif",
      color: '#8B4513'
    }}>
      <EncabezadoContacto />
      <FormularioContacto 
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
      
      <footer style={{
        marginTop: '2rem',
        textAlign: 'center',
        padding: '2rem',
        color: '#8B4513',
        fontFamily: "'Lato', sans-serif",
        fontSize: '1rem'
      }}>
        <p>&copy; 2025 Pastelería Mil Sabores. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default Contacto;
