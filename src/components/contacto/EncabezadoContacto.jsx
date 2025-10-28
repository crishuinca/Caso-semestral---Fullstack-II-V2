import React from 'react';

function EncabezadoContacto() {
  return (
    <section style={{
      padding: '4rem 2rem',
      textAlign: 'center',
      marginBottom: '3rem'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <img 
          src="/img/Logotipo_pasteleria.png" 
          alt="Pastelería Mil Sabores"
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            marginBottom: '2rem',
            boxShadow: '0 15px 40px rgba(139, 69, 19, 0.25)',
            objectFit: 'cover'
          }}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/150x150/FFC0CB/8B4513?text=Logo';
          }}
        />
        <h1 style={{
          fontFamily: "'Pacifico', cursive",
          fontSize: '3rem',
          marginBottom: '1rem',
          color: '#8B4513'
        }}>
          Pastelería Mil Sabores
        </h1>
      </div>
    </section>
  );
}

export default EncabezadoContacto;