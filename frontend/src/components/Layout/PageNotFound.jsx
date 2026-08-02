import React from 'react';
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <div className="container container-fluid d-flex flex-column align-items-center justify-content-center not-found-container">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle mb-4">Page Not Found</h2>
        <p className="not-found-text mb-4">Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn not-found-btn">
          Go back to Homepage
        </Link>
      </div>
    </>
  )
}

export default PageNotFound