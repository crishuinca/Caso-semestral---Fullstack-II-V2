import React from 'react';

function FormularioContacto({ formData, onInputChange, onSubmit }) {
  return (
    <section style={{
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <div style={{
        background: '#FFEFCF',
        padding: '3rem',
        borderRadius: '20px',
        boxShadow: '0 15px 40px rgba(139, 69, 19, 0.15)'
      }}>
        <h2 style={{
          fontFamily: "'Pacifico', cursive",
          fontSize: '2.2rem',
          textAlign: 'center',
          marginBottom: '2rem',
          color: '#8B4513'
        }}>
          Contáctanos
        </h2>

        <form onSubmit={onSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column'
          }}>
            <label 
              htmlFor="nombre" 
              style={{
                fontWeight: 'bold',
                marginBottom: '0.5rem',
                color: '#8B4513',
                fontSize: '1.1rem'
              }}
            >
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
              style={{
                padding: '1rem',
                border: '2px solid #FFC0CB',
                borderRadius: '12px',
                fontFamily: "'Lato', sans-serif",
                fontSize: '1rem',
                backgroundColor: '#FFF5E1',
                color: '#8B4513',
                transition: 'border-color 0.3s, box-shadow 0.3s',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#8B4513';
                e.target.style.boxShadow = '0 0 0 3px rgba(139, 69, 19, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#FFC0CB';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column'
          }}>
            <label 
              htmlFor="correo" 
              style={{
                fontWeight: 'bold',
                marginBottom: '0.5rem',
                color: '#8B4513',
                fontSize: '1.1rem'
              }}
            >
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
              style={{
                padding: '1rem',
                border: '2px solid #FFC0CB',
                borderRadius: '12px',
                fontFamily: "'Lato', sans-serif",
                fontSize: '1rem',
                backgroundColor: '#FFF5E1',
                color: '#8B4513',
                transition: 'border-color 0.3s, box-shadow 0.3s',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#8B4513';
                e.target.style.boxShadow = '0 0 0 3px rgba(139, 69, 19, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#FFC0CB';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column'
          }}>
            <label 
              htmlFor="razon" 
              style={{
                fontWeight: 'bold',
                marginBottom: '0.5rem',
                color: '#8B4513',
                fontSize: '1.1rem'
              }}
            >
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
              style={{
                padding: '1rem',
                border: '2px solid #FFC0CB',
                borderRadius: '12px',
                fontFamily: "'Lato', sans-serif",
                fontSize: '1rem',
                backgroundColor: '#FFF5E1',
                color: '#8B4513',
                transition: 'border-color 0.3s, box-shadow 0.3s',
                outline: 'none',
                resize: 'vertical',
                minHeight: '120px'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#8B4513';
                e.target.style.boxShadow = '0 0 0 3px rgba(139, 69, 19, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#FFC0CB';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <button 
            type="submit"
            style={{
              backgroundColor: '#FFC0CB',
              color: '#8B4513',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '12px',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              cursor: 'pointer',
              transition: 'background-color 0.3s, transform 0.2s',
              marginTop: '1rem',
              fontFamily: "'Lato', sans-serif"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#8B4513';
              e.target.style.color = '#FFF5E1';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#FFC0CB';
              e.target.style.color = '#8B4513';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Enviar Mensaje
          </button>
        </form>
      </div>
    </section>
  );
}

export default FormularioContacto;