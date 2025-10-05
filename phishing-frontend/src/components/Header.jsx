import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logoBN.svg';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Banco de la Nación" />
          </Link>
        </div>
        <nav className="main-nav">
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/login">Banca por Internet</Link></li>
            <li><Link to="/">Personas</Link></li>
            <li><Link to="/">Empresas</Link></li>
            <li><Link to="/">Servicios</Link></li>
            <li><Link to="/">Ubícanos</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;