import React from 'react';

function ModalCrearProducto({ 
  modalCrearProducto,
  nuevoProducto,
  handleInputChangeProducto,
  handleSubmitCrearProducto,
  cerrarModalCrear,
  estilos
}) {
  if (!modalCrearProducto) return null;

  return (
    <div style={estilos.modalOverlay}>
      <div style={estilos.modalContent}>
        <div style={estilos.modalHeader}>
          <h3>Crear Nuevo Producto</h3>
          <button 
            onClick={cerrarModalCrear}
            style={estilos.botonCerrar}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <form onSubmit={handleSubmitCrearProducto} style={estilos.modalForm}>
          <div style={estilos.inputGroup}>
            <label style={estilos.label}>Código del Producto*</label>
            <input
              type="text"
              name="codigo"
              value={nuevoProducto.codigo}
              onChange={handleInputChangeProducto}
              style={estilos.input}
              placeholder="Ej: TC001, PI002, etc."
              required
            />
          </div>

          <div style={estilos.inputGroup}>
            <label style={estilos.label}>Nombre del Producto*</label>
            <input
              type="text"
              name="nombre"
              value={nuevoProducto.nombre}
              onChange={handleInputChangeProducto}
              style={estilos.input}
              required
            />
          </div>
          
          <div style={estilos.inputGroup}>
            <label style={estilos.label}>Descripción</label>
            <textarea
              name="descripcion"
              value={nuevoProducto.descripcion}
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
              value={nuevoProducto.precio}
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
                checked={nuevoProducto.tieneDescuento}
                onChange={handleInputChangeProducto}
                style={{ marginRight: '8px', width: '20px', height: '20px', cursor: 'pointer' }}
              />
              Con descuento
            </label>
          </div>
          
          {nuevoProducto.tieneDescuento && (
            <div style={estilos.inputGroup}>
              <label style={estilos.label}>Precio con descuento*</label>
              <input
                type="number"
                name="precioConDescuento"
                value={nuevoProducto.precioConDescuento}
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
              value={nuevoProducto.stock}
              onChange={handleInputChangeProducto}
              style={estilos.input}
              min="0"
              required
            />
          </div>

          <div style={estilos.inputGroup}>
            <label style={estilos.label}>Stock Crítico*</label>
            <input
              type="number"
              name="stockCritico"
              value={nuevoProducto.stockCritico}
              onChange={handleInputChangeProducto}
              style={estilos.input}
              min="0"
              required
            />
            <small style={{ color: '#666', marginTop: '4px', display: 'block' }}>
              Nivel mínimo de stock antes de alertar
            </small>
          </div>
          
          <div style={estilos.inputGroup}>
            <label style={estilos.label}>Categoría*</label>
            <select
              name="categoria"
              value={nuevoProducto.categoria}
              onChange={handleInputChangeProducto}
              style={{
                ...estilos.select,
                backgroundColor: '#FFF5E1',
                background: '#FFF5E1',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                appearance: 'none'
              }}
              required
            >
              <option value="">Seleccione una categoría</option>
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

          <div style={estilos.inputGroup}>
            <label style={estilos.label}>URL de Imagen</label>
            <input
              type="text"
              name="imagen"
              value={nuevoProducto.imagen}
              onChange={handleInputChangeProducto}
              style={estilos.input}
              placeholder="/img/TC001.png"
            />
          </div>
          
          <div style={estilos.modalActions}>
            <button 
              type="button" 
              onClick={cerrarModalCrear}
              style={estilos.botonCancelar}
            >
              Cancelar
            </button>
            <button 
              type="submit"
              style={estilos.botonGuardar}
            >
              Crear Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalCrearProducto;

