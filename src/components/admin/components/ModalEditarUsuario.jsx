import React from 'react';
import { regionesComunas } from '../data/regionesComunas';

function ModalEditarUsuario({ 
  modalEditarUsuario,
  usuarioEditado,
  comunas,
  handleInputChangeUsuario,
  handleSubmitEditarUsuario,
  cerrarModalEditarUsuario,
  estilos
}) {
  if (!modalEditarUsuario) return null;

  return (
    <div style={estilos.modalOverlay}>
      <div style={estilos.modalContent}>
        <div style={estilos.modalHeader}>
          <h3>Editar Usuario</h3>
          <button 
            onClick={cerrarModalEditarUsuario}
            style={estilos.botonCerrar}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <form onSubmit={handleSubmitEditarUsuario} style={estilos.modalForm}>
          <div style={estilos.inputGroup}>
            <label style={estilos.label}>Nombre*</label>
            <input
              type="text"
              name="nombre"
              value={usuarioEditado.nombre}
              onChange={handleInputChangeUsuario}
              style={estilos.input}
              required
            />
          </div>

          <div style={estilos.inputGroup}>
            <label style={estilos.label}>Apellidos*</label>
            <input
              type="text"
              name="apellidos"
              value={usuarioEditado.apellidos}
              onChange={handleInputChangeUsuario}
              style={estilos.input}
              required
            />
          </div>

          <div style={estilos.inputGroup}>
            <label style={estilos.label}>Correo Electrónico*</label>
            <input
              type="email"
              name="correo"
              value={usuarioEditado.correo}
              onChange={handleInputChangeUsuario}
              style={estilos.input}
              required
            />
          </div>

          <div style={estilos.inputGroup}>
            <label style={estilos.label}>Fecha de Nacimiento</label>
            <input
              type="date"
              name="fecha_nacimiento"
              value={usuarioEditado.fecha_nacimiento}
              onChange={handleInputChangeUsuario}
              style={estilos.input}
            />
          </div>

          <div style={estilos.inputGroup}>
            <label style={estilos.label}>Región*</label>
            <select
              name="region"
              value={usuarioEditado.region}
              onChange={handleInputChangeUsuario}
              style={estilos.select}
              required
            >
              <option value="">Seleccionar región</option>
              {Object.keys(regionesComunas).map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>

          <div style={estilos.inputGroup}>
            <label style={estilos.label}>Comuna*</label>
            <select
              name="comuna"
              value={usuarioEditado.comuna}
              onChange={handleInputChangeUsuario}
              style={estilos.select}
              required
              disabled={!usuarioEditado.region}
            >
              <option value="">Seleccionar comuna</option>
              {comunas.map(comuna => (
                <option key={comuna} value={comuna}>{comuna}</option>
              ))}
            </select>
          </div>

          <div style={estilos.inputGroup}>
            <label style={estilos.label}>Dirección*</label>
            <input
              type="text"
              name="direccion"
              value={usuarioEditado.direccion}
              onChange={handleInputChangeUsuario}
              style={estilos.input}
              required
            />
          </div>

          <div style={estilos.modalActions}>
            <button 
              type="button" 
              onClick={cerrarModalEditarUsuario}
              style={estilos.botonCancelar}
            >
              Cancelar
            </button>
            <button 
              type="submit"
              style={estilos.botonGuardar}
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalEditarUsuario;


