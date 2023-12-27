import React from 'react';
import {Link} from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <div className="container container-fluid">
        <div className="d-flex position-relative error-block">
          <img src="/Images/404Error.png" className="flex-shrink-0 me-3" alt=" " id="image-404"/>
          <div className="inner-block">
            <h1>404 ERROR</h1>
            <h2>Page Not Found...</h2>
            <p>Go to <Link to="/users/login" id="error_link">Login Page</Link></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default PageNotFound
