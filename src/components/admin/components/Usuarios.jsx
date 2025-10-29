import React from 'react';

function Usuarios({ usuarios, abrirModalEditarUsuario, estilos }) {
  return (
    <div className="area-contenido" style={estilos.areaContenido}>
      <div style={estilos.encabezadoSeccion}>
        <h2>Lista de Usuarios</h2>
      </div>
      <div style={estilos.contenedorUsuarios}>
        {usuarios.map(usuario => (
          <div 
            key={usuario.id} 
            style={{
              ...estilos.tarjetaUsuario,
              cursor: 'pointer'
            }}
            onClick={() => abrirModalEditarUsuario(usuario)}
          >
            <div style={estilos.avatarUsuarioTarjeta}>
              <i className="fas fa-user-circle" style={estilos.iconoUsuario}></i>
            </div>
            <div style={estilos.informacionUsuarioTarjeta}>
              <div style={estilos.nombreUsuario}>{usuario.nombre} {usuario.apellidos}</div>
              <div style={estilos.correoUsuario}>{usuario.correo}</div>
              <div style={estilos.detallesUsuario}>
                <div><strong>Región:</strong> {usuario.region}</div>
                <div><strong>Comuna:</strong> {usuario.comuna}</div>
                {usuario.run && (
                  <div><strong>RUT:</strong> {usuario.run}</div>
                )}
                <div style={estilos.tipoUsuarioInfo}>
                  <strong>Tipo:</strong> 
                  <span style={{
                    ...estilos.badgeUsuario,
                    backgroundColor: usuario.isAdmin ? '#8B4513' : '#6c757d'
                  }}>
                    {usuario.isAdmin ? 'Admin' : 'Usuario'}
                  </span>
                </div>
                {usuario.direccion && (
                  <div><strong>Dirección:</strong> {usuario.direccion}</div>
                )}
              </div>
              <div style={estilos.accionesUsuario}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    abrirModalEditarUsuario(usuario);
                  }}
                  style={estilos.botonEditar}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#A0522D'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#8B4513'}
                >
                  <i className="fas fa-edit me-1"></i>
                  Editar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Usuarios;



