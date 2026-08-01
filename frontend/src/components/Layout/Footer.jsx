import React from 'react';

function Footer() {
  return (
    <footer className='mt-4'>
      <div className="container text-center">
        <div className="declaration">
          <p className="mb-1">Crafted with <span style={{ color: '#ed4330ff' }}>&#9829;</span></p>
          <p className="mb-1">&copy; <strong>Mum Mum</strong> - Food Ordering Website - {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
