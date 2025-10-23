import React from 'react';
import { Link } from 'react-router-dom';

function AsideBlogs() {
  return (
    <aside className="card border-0 aside-relacionados" role="complementary" aria-label="Navegación y enlaces relacionados">
      <div className="card-body p-4">
        <Link to="/blogs" className="btn d-flex align-items-center mb-4 boton-volver">
          <i className="fas fa-arrow-left me-2"></i>
          Volver
        </Link>

        <h3 className="titulo-otros-blogs">Otros Blogs</h3>
        <ol className="list-unstyled">
          <li className="mb-2">
            <Link to="/blog/harina-magica" className="enlace-relacionado">
              El Secreto de la Harina Mágica
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/blog/secreto-dulzor" className="enlace-relacionado">
              El Secreto del Dulzor
            </Link>
          </li>
        </ol>
      </div>
    </aside>
  );
}

export default AsideBlogs;
