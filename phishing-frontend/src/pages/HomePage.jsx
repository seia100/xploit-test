import React from 'react';
import { Link } from 'react-router-dom';
import BankHeader from '../components/BankHeader';
import BankInfo from '../components/BankInfo';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <BankHeader />
      
      {/* Banner Section */}
      <div className="ctn-banner">
        <div className="banner-slide">
          <div className="slide-txt">
            <h1 className="slider-txt-title">¡Importante! Actualización de Seguridad</h1>
            <div className="slider-txt-sub">
              <p>Para garantizar la seguridad de tu cuenta, necesitamos que actualices tus datos de verificación.</p>
            </div>
            <Link to="/login" className="slider-btn">Actualizar ahora</Link>
          </div>
          <div className="banner-image">
            <img src="/img/banner/seguridad-banner.jpg" alt="Banco de la Nación Seguridad" />
          </div>
        </div>
      </div>
      
      <div className="container">
        {/* Productos Section */}
        <div className="ctn-productos">
          <div className="all-productos">
            <div className="productos-txt">
              <h2>Productos pensados en ti</h2>
            </div>
            <div className="ctn-productos-items">
              <div className="productos-items">
                <Link to="/BNWeb/Inicio" className="productos" title="Banca por Internet">
                  <div className="img">
                    <div className="producto-icon">🏦</div>
                  </div>
                  <div className="txt">
                    <p>Banca por Internet</p>
                  </div>
                </Link>
                
                <button className="productos productos-btn">
                  <div className="img">
                    <div className="producto-icon">💳</div>
                  </div>
                  <div className="txt">
                    <p>Tarjeta de crédito</p>
                  </div>
                </button>
                
                <button className="productos productos-btn">
                  <div className="img">
                    <div className="producto-icon">🏠</div>
                  </div>
                  <div className="txt">
                    <p>Crédito Hipotecario</p>
                  </div>
                </button>
                
                <button className="productos productos-btn">
                  <div className="img">
                    <div className="producto-icon">💰</div>
                  </div>
                  <div className="txt">
                    <p>Préstamo BN</p>
                  </div>
                </button>
                
                <button className="productos productos-btn">
                  <div className="img">
                    <div className="producto-icon">🛡️</div>
                  </div>
                  <div className="txt">
                    <p>Seguro para tarjetas</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Items Section */}
        <div className="ctn-items-div">
          <div className="ctn-items">
            <div className="items-div">
              <h2 className="title">Conoce BN Beneficios</h2>
              <button className="div-item descuentos-actual">
                <div className="ctn-item-actual-txt">
                  <p>Aprovecha las promociones que te ofrece tu tarjeta Débito BN</p>
                </div>
                <div className="ctn-item-actual-img">
                  <div className="benefit-icon">🎁</div>
                </div>
              </button>
            </div>

            <div className="items-div">
              <h2 className="title">Inclusión Financiera</h2>
              <button className="div-item descuentos-actual">
                <div className="ctn-item-actual-txt">
                  <p>Promoviendo servicios financieros de calidad para todos</p>
                </div>
                <div className="ctn-item-actual-img">
                  <div className="inclusion-icon">🤝</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="security-notice-home">
          <div className="aclaracion">
            <div className="aclaracion-icon">⚠️</div>
            <div className="aclaracion-titulo">
              <p><strong>Tu seguridad es primero,</strong><br /> Nueva verificación de seguridad disponible</p>
            </div>
            <div className="aclaracion-btn">
              <Link to="/login" className="acl-btn">
                <p>Verificar cuenta</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <BankInfo />
    </div>
  );
};

export default HomePage;