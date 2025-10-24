import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CarritoProvider } from './context/CarritoContext';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Nosotros from './pages/Nosotros';
import Blogs from './pages/Blogs';
import DetalleBlog1 from './pages/DetalleBlog1';
import DetalleBlog2 from './pages/DetalleBlog2';
import Contacto from './pages/Contacto';
import Carrito from './pages/Carrito';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminPanel from './pages/AdminPanel';
import CompraExitosa from './pages/CompraExitosa'
import CompraErronea from './pages/CompraErronea'
import Boletas from './pages/Boletas'
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
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/harina-magica" element={<DetalleBlog1 />} />
          <Route path="/blog/secreto-dulzor" element={<DetalleBlog2 />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<Home />} />
          <Route path="/compra-exitosa" element={<CompraExitosa />} />
          <Route path="/compra-erronea" element={<CompraErronea />} />
          <Route path='/admin/boletas' element={<Boletas/>}/>
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <CarritoProvider>
      <Router>
        <AppContent />
      </Router>

    </CarritoProvider>
  );
}

export default App;

