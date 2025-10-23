import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Contacto.css';
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

    alert('¡Mensaje enviado exitosamente! Nos contactaremos contigo pronto.');

    setFormData({
      nombre: '',
      correo: '',
      razon: ''
    });
  };

  return (
    <div className="cuerpo-contacto">
      <EncabezadoContacto />
      <FormularioContacto 
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
      <footer className="pie-pagina-contacto">
        <p>&copy; 2025 Pastelería Mil Sabores. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default Contacto;
