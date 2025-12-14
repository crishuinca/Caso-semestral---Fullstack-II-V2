import React from 'react';

function ModalEditarProducto({ 
  modalEditarProducto,
  productoEditado,
  handleInputChangeProducto,
  handleSubmitEditarProducto,
  cerrarModalEditar,
  estilos
}) {
  if (!modalEditarProducto) return null;

  return (
    <div style={estilos.modalOverlay}>
      <div style={estilos.modalContent}>
        <div style={estilos.modalHeader}>
          <h3>Editar Producto</h3>
          <button 
            onClick={cerrarModalEditar}
            style={estilos.botonCerrar}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <form onSubmit={handleSubmitEditarProducto} style={estilos.modalForm}>
          <div style={estilos.inputGroup}>
            <label style={estilos.label}>Nombre del Producto*</label>
            <input
              type="text"
              name="nombre"
              value={productoEditado.nombre}
              onChange={handleInputChangeProducto}
              style={estilos.input}
              required
            />
          </div>
          
          <div style={estilos.inputGroup}>
            <label style={estilos.label}>Descripción</label>
            <textarea
              name="descripcion"
              value={productoEditado.descripcion}
              onChange={handleInputChangeProducto}
              style={{...estilos.input, minHeight: '80px', resize: 'vertical'}}
              rows="3"
            />
          </div>
          
          <div style={estilos.inputGroup}>
            <label style={estilos.label}>Precio*</label>
            <input
              type="number"
              name="precio"
              value={productoEditado.precio}
              onChange={handleInputChangeProducto}
              style={estilos.input}
              min="0"
              required
            />
          </div>
          
          <div style={estilos.inputGroup}>
            <label style={{...estilos.label, display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
              <input
                type="checkbox"
                name="tieneDescuento"
                checked={productoEditado.tieneDescuento}
                onChange={handleInputChangeProducto}
                style={{ marginRight: '8px', width: '20px', height: '20px', cursor: 'pointer' }}
              />
              Con descuento
            </label>
          </div>
          
          {productoEditado.tieneDescuento && (
            <div style={estilos.inputGroup}>
              <label style={estilos.label}>Precio con descuento*</label>
              <input
                type="number"
                name="precioConDescuento"
                value={productoEditado.precioConDescuento}
                onChange={handleInputChangeProducto}
                style={estilos.input}
                min="0"
                required
                placeholder="Precio oferta"
              />
              <small style={{ color: '#666', marginTop: '4px', display: 'block' }}>
                Debe ser menor al precio normal
              </small>
            </div>
          )}
          
          <div style={estilos.inputGroup}>
            <label style={estilos.label}>Stock*</label>
            <input
              type="number"
              name="stock"
              value={productoEditado.stock}
              onChange={handleInputChangeProducto}
              style={estilos.input}
              min="0"
              required
            />
          </div>
          
          <div style={estilos.inputGroup}>
            <label style={estilos.label}>Categoría</label>
            <select
              name="categoria"
              value={productoEditado.categoria}
              onChange={handleInputChangeProducto}
              style={{
                ...estilos.select,
                backgroundColor: '#FFF5E1',
                background: '#FFF5E1',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                appearance: 'none'
              }}
            >
              <option value="Tortas Cuadradas">Tortas Cuadradas</option>
              <option value="Tortas Circulares">Tortas Circulares</option>
              <option value="Tortas Especiales">Tortas Especiales</option>
              <option value="Postres Individuales">Postres Individuales</option>
              <option value="Productos Sin Azúcar">Productos Sin Azúcar</option>
              <option value="Productos Sin Gluten">Productos Sin Gluten</option>
              <option value="Productos Veganos">Productos Veganos</option>
              <option value="Pastelería Tradicional">Pastelería Tradicional</option>
            </select>
          </div>
          
          <div style={estilos.modalActions}>
            <button 
              type="button" 
              onClick={cerrarModalEditar}
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

export default ModalEditarProducto;


