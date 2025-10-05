import React from 'react';
import './BankHeader.css';

const BankHeader = () => {
  return (
    <div id="cabecera">
      <div id="logo-multired">
        <img src="/imagenes/logo-multired.jpg" alt="Logotipo Multired" />
      </div>
      <div id="logo-bn">
        <img src="/imagenes/Logo_BN.jpg" alt="Logotipo del Banco de la Nación" />
      </div>
    </div>
  );
};

export default BankHeader;