import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/BlogCard.css';

function BlogCard({ title, content, imageUrl, blogUrl, imagePosition = 'right' }) {
  const imageBlock = (
    <div className="col-lg-4">
      <div className="p-3">
        <img 
          src={imageUrl} 
          alt={title}
          className="img-fluid rounded blog-image"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/400x350/D2691E/FFF?text=${title.replace(/\s/g, '+')}`;
          }}
        />
      </div>
    </div>
  );

  const textBlock = (
    <div className="col-lg-8">
      <div className="card-body p-5">
        <h2 className="blog-title">{title}</h2>
        <p className="blog-content">{content}</p>
        <Link to={blogUrl} className="btn text-white px-4 py-2 blog-button">
          VER BLOG
        </Link>
      </div>
    </div>
  );

  return (
    <div className="mb-5">
      <div className="card border-0 blog-card">
        <div className="row no-gutters align-items-center">
          {imagePosition === 'left' ? (
            <>
              {imageBlock}
              {textBlock}
            </>
          ) : (
            <>
              {textBlock}
              {imageBlock}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
