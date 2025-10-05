import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Canales de Atención</h4>
            <ul>
              <li>Agencias</li>
              <li>Cajeros Automáticos</li>
              <li>Agentes</li>
              <li>Banca por Internet</li>
              <li>Banca Móvil</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Información</h4>
            <ul>
              <li>Términos y Condiciones</li>
              <li>Transparencia</li>
              <li>Tarifario</li>
              <li>Reclamos</li>
              <li>Libro de Reclamaciones</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contáctanos</h4>
            <ul>
              <li>Teléfono: 0800-10-700</li>
              <li>Central: (01) 517-0000</li>
              <li>consultas@bn.com.pe</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Banco de la Nación. Todos los derechos reservados.</p>
          <p className="disclaimer">Este sitio es solo para fines educativos.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;