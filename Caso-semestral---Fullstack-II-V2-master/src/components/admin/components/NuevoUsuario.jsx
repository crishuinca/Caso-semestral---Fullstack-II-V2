import React from 'react';
import { regionesComunas } from '../data/regionesComunas';

function NuevoUsuario({ 
  nuevoUsuario, 
  comunas, 
  handleInputChange, 
  handleSubmitUsuario, 
  resultado,
  regionesComunas: regiones,
  estilos 
}) {
  const registerCardResponsive = {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '2rem 1.5rem',
    maxWidth: '1000px',
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box'
  };

  const formResponsive = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
    width: '100%',
    boxSizing: 'border-box'
  };

  return (
    <div className="area-contenido" style={estilos.areaContenido}>
      <div style={estilos.encabezadoSeccion}>
        <h2>Registro de Usuario</h2>
      </div>
      <div style={registerCardResponsive}>
        <form onSubmit={handleSubmitUsuario} style={formResponsive} noValidate>
          <div style={estilos.inputGroup}>
            <label htmlFor="rol" style={estilos.label}>Rol*</label>
            <select 
              id="rol" 
              name="rol" 
              required
              value={nuevoUsuario.rol}
              onChange={handleInputChange}
              style={{ 
                ...estilos.input,
                width: '100%',
                backgroundColor: '#FFF5E1',
                background: '#FFF5E1',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                appearance: 'none',
                boxSizing: 'border-box'
              }}
            >
              <option value="">Seleccionar rol</option>
              <option value="cliente">Cliente</option>
              <option value="admin">Administrador</option>
              <option value="vendedor">Vendedor</option>
            </select>
          </div>

          <div style={estilos.inputGroup}>
            <label htmlFor="run" style={estilos.label}>RUN*</label>
            <input 
              type="text" 
              id="run" 
              name="run" 
              maxLength="10" 
              required 
              placeholder="Ej: 12345678-9"
              value={nuevoUsuario.run}
              onChange={handleInputChange}
              style={{
                ...estilos.input,
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={estilos.inputGroup}>
            <label htmlFor="nombre" style={estilos.label}>Nombre*</label>
            <input 
              type="text" 
              id="nombre" 
              name="nombre" 
              maxLength="50" 
              required
              value={nuevoUsuario.nombre}
              onChange={handleInputChange}
              style={{
                ...estilos.input,
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={estilos.inputGroup}>
            <label htmlFor="apellidos" style={estilos.label}>Apellidos*</label>
            <input 
              type="text" 
              id="apellidos" 
              name="apellidos" 
              maxLength="100" 
              required
              value={nuevoUsuario.apellidos}
              onChange={handleInputChange}
              style={{
                ...estilos.input,
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={estilos.inputGroup}>
            <label htmlFor="correo" style={estilos.label}>Correo*</label>
            <input 
              type="email" 
              id="correo" 
              name="correo" 
              maxLength="100" 
              required 
              placeholder="ejemplo@duoc.cl"
              value={nuevoUsuario.correo}
              onChange={handleInputChange}
              style={{
                ...estilos.input,
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ 
            ...estilos.inputGroup, 
            gridColumn: '1 / -1',
            marginBottom: '1rem'
          }}>
            <label htmlFor="fecha_nacimiento" style={estilos.label}>Fecha de nacimiento</label>
            <div style={{ 
              display: 'flex', 
              gap: '10px',
              flexWrap: 'wrap',
              width: '100%',
              boxSizing: 'border-box'
            }}>
              <select
                name="dia_nacimiento"
                value={nuevoUsuario.dia_nacimiento || ''}
                onChange={handleInputChange}
                style={{ 
                  ...estilos.input, 
                  flex: '1 1 100px',
                  minWidth: '90px',
                  maxWidth: '120px',
                  backgroundColor: '#FFF5E1',
                  background: '#FFF5E1',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none',
                  appearance: 'none',
                  boxSizing: 'border-box'
                }}
              >
                <option value="">Día</option>
                {Array.from({ length: 31 }, (_, i) => i + 1).map(dia => (
                  <option key={dia} value={dia.toString().padStart(2, '0')}>{dia}</option>
                ))}
              </select>
              <select
                name="mes_nacimiento"
                value={nuevoUsuario.mes_nacimiento || ''}
                onChange={handleInputChange}
                style={{ 
                  ...estilos.input, 
                  flex: '1.5 1 150px',
                  minWidth: '130px',
                  maxWidth: '200px',
                  backgroundColor: '#FFF5E1',
                  background: '#FFF5E1',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none',
                  appearance: 'none',
                  boxSizing: 'border-box'
                }}
              >
                <option value="">Mes</option>
                <option value="01">Enero</option>
                <option value="02">Febrero</option>
                <option value="03">Marzo</option>
                <option value="04">Abril</option>
                <option value="05">Mayo</option>
                <option value="06">Junio</option>
                <option value="07">Julio</option>
                <option value="08">Agosto</option>
                <option value="09">Septiembre</option>
                <option value="10">Octubre</option>
                <option value="11">Noviembre</option>
                <option value="12">Diciembre</option>
              </select>
              <select
                name="ano_nacimiento"
                value={nuevoUsuario.ano_nacimiento || ''}
                onChange={handleInputChange}
                style={{ 
                  ...estilos.input, 
                  flex: '1 1 110px',
                  minWidth: '110px',
                  maxWidth: '140px',
                  backgroundColor: '#FFF5E1',
                  background: '#FFF5E1',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none',
                  appearance: 'none',
                  boxSizing: 'border-box'
                }}
              >
                <option value="">Año</option>
                {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(ano => (
                  <option key={ano} value={ano}>{ano}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={estilos.inputGroup}>
            <label htmlFor="region" style={estilos.label}>Región*</label>
            <select 
              id="region" 
              name="region" 
              required
              value={nuevoUsuario.region}
              onChange={handleInputChange}
              style={{ 
                ...estilos.input,
                width: '100%',
                backgroundColor: '#FFF5E1',
                background: '#FFF5E1',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                appearance: 'none',
                boxSizing: 'border-box'
              }}
            >
              <option value="">Seleccione región</option>
              {Object.keys(regiones).map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>

          <div style={estilos.inputGroup}>
            <label htmlFor="comuna" style={estilos.label}>Comuna*</label>
            <select 
              id="comuna" 
              name="comuna" 
              required
              value={nuevoUsuario.comuna}
              onChange={handleInputChange}
              style={{ 
                ...estilos.input,
                width: '100%',
                backgroundColor: '#FFF5E1',
                background: '#FFF5E1',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                appearance: 'none',
                boxSizing: 'border-box'
              }}
              disabled={!nuevoUsuario.region}
            >
              <option value="">Seleccione comuna</option>
              {comunas.map(comuna => (
                <option key={comuna} value={comuna}>{comuna}</option>
              ))}
            </select>
          </div>

          <div style={{ 
            ...estilos.inputGroup, 
            gridColumn: '1 / -1'
          }}>
            <label htmlFor="direccion" style={estilos.label}>Dirección*</label>
            <input 
              type="text" 
              id="direccion" 
              name="direccion" 
              maxLength="300" 
              required
              value={nuevoUsuario.direccion}
              onChange={handleInputChange}
              style={{
                ...estilos.input,
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={estilos.inputGroup}>
            <label htmlFor="password" style={estilos.label}>Contraseña*</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              maxLength="30" 
              required
              value={nuevoUsuario.password}
              onChange={handleInputChange}
              style={{
                ...estilos.input,
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={estilos.inputGroup}>
            <label htmlFor="confirmPassword" style={estilos.label}>Confirmar Contraseña*</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              maxLength="30" 
              required
              value={nuevoUsuario.confirmPassword}
              onChange={handleInputChange}
              style={{
                ...estilos.input,
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={estilos.inputGroup}>
            <label htmlFor="codigo_descuento" style={estilos.label}>Código de descuento</label>
            <input 
              type="text" 
              id="codigo_descuento" 
              name="codigo_descuento" 
              maxLength="20" 
              placeholder="Opcional"
              value={nuevoUsuario.codigo_descuento}
              onChange={handleInputChange}
              style={{
                ...estilos.input,
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button 
            type="submit"
            style={{
              gridColumn: '1 / -1',
              background: '#8B4513',
              color: 'white',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: '700',
              marginTop: '1rem',
              boxShadow: '0 5px 8px rgba(139,69,19,0.2)',
              transition: 'all 0.3s ease',
              fontFamily: "'Lato', sans-serif"
            }}
          >
            Registrar Usuario
          </button>

          {resultado && (
            <div style={{
              gridColumn: '1 / -1',
              marginTop: '1rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              textAlign: 'center',
              padding: '1rem',
              borderRadius: '8px',
              backgroundColor: '#f8f9fa',
              color: resultado.includes('exitosamente') ? '#28a745' : '#dc3545'
            }}>
              {resultado}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default NuevoUsuario;

