import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CarritoProvider } from './context/CarritoContext';
import { FiltroProvider } from './context/FiltroContext';
import RutaProtegida from './components/RutaProtegida';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Categoria from './pages/Categoria';
import Nosotros from './pages/Nosotros';
import Blogs from './pages/Blogs';
import DetalleBlog1 from './pages/DetalleBlog1';
import DetalleBlog2 from './pages/DetalleBlog2';
import Contacto from './pages/Contacto';
import Carrito from './pages/Carrito';
import Login from './pages/Login';
import Register from './pages/Register';
import Perfil from './pages/Perfil';
import AdminPanel from './pages/AdminPanel';
import CompraExitosa from './pages/CompraExitosa'
import CompraErronea from './pages/CompraErronea'
import Boletas from './pages/Boletas'
import DetalleBoleta from './pages/DetalleBoleta'
import ComprasHistorial from './pages/ComprasHistorial'
import ComprasDetalle from './pages/ComprasDetalle'
import ReportesProductos from './pages/ReportesProductos';
import DetalleProducto from './pages/DetalleProducto';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="App">
      {!isAdminRoute && <Navbar />}
      <main role="main" aria-label="Contenido principal">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="/categoria/:categoria" element={<Categoria />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/harina-magica" element={<DetalleBlog1 />} />
          <Route path="/blog/secreto-dulzor" element={<DetalleBlog2 />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/perfil" element={<RutaProtegida><Perfil /></RutaProtegida>} />
          <Route path="/admin" element={<RutaProtegida requiereAdmin={true}><AdminPanel /></RutaProtegida>} />
          <Route path="/admin/reportes-productos" element={<RutaProtegida requiereAdmin={true}><ReportesProductos /></RutaProtegida>} />
          <Route path="/compra-exitosa" element={<RutaProtegida><CompraExitosa /></RutaProtegida>} />
          <Route path="/compra-erronea" element={<RutaProtegida><CompraErronea /></RutaProtegida>} />
          <Route path='/admin/boletas' element={<RutaProtegida requiereAdmin={true}><Boletas/></RutaProtegida>}/>
          <Route path="/admin/boletas/detalle-boleta" element={<RutaProtegida requiereAdmin={true}><DetalleBoleta/></RutaProtegida>}/>
          <Route path="/admin/historial-compras" element={<RutaProtegida requiereAdmin={true}><ComprasHistorial/></RutaProtegida>}/>
          <Route path="/admin/historial-compras/detalle-compra" element={<RutaProtegida requiereAdmin={true}><ComprasDetalle/></RutaProtegida>}/>
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <CarritoProvider>
      <FiltroProvider>
        <Router>
          <AppContent />
        </Router>
      </FiltroProvider>
    </CarritoProvider>
  );
}

export default App;

