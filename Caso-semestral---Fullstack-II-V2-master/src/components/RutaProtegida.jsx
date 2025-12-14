import { Navigate } from 'react-router-dom';

/**
 * Componente para proteger rutas según autenticación y rol
 * @param {Object} props
 * @param {React.ReactNode} props.children 
 * @param {boolean} props.requiereAdmin 
 * @param {boolean} props.requiereVendedor 
 */
const RutaProtegida = ({ children, requiereAdmin = false, requiereVendedor = false }) => {
  const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual') || 'null');

  // Si no hay usuario logueado, redirigir a login
  if (!usuarioActual) {
    return <Navigate to="/login" replace />;
  }

  // Si la ruta requiere admin y el usuario no es admin, redirigir a home
  if (requiereAdmin && !usuarioActual.isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Si la ruta requiere vendedor y el usuario no es vendedor ni admin, redirigir a home
  if (requiereVendedor && !usuarioActual.isVendedor && !usuarioActual.isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Usuario tiene acceso, renderizar el componente
  return children;
};

export default RutaProtegida;
