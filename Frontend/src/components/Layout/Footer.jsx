import React from 'react';

function Footer() {
  return (
    <footer>
      <div className="container text-center">
        <div className="declaration">
          <p className="mb-1">Crafted with <span style={{ color: '#c0392b' }}>&#9829;</span></p>
          <p className="mb-1">&copy; <strong>Mum Mum</strong> - Food Ordering Website - {new Date().getFullYear()}</p>
          <p className="small text-muted mb-0">All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
