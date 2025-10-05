import React from 'react';
import './BankInfo.css';

const BankInfo = () => {
  return (
    <div className="bank-info-section">
      <div className="bank-info-content">
        <div className="bank-info-title">
          Banco de la Nación | Ministerio de Economía y Finanzas
        </div>
        <div className="bank-info-details">
          <p>Oficina Principal: Av. Javier Prado Este 2499. San Borja. Central Telefónica: 519 2000.</p>
          <p>Atención en Oficinas Administrativas: Lunes a Viernes de 08:30 a 17:30. Refrigerio de: 13:00-14:00.</p>
          <p>Atención en Oficina de Trámite Documentario: Lunes a Viernes de 8:30 a 16:30 (horario corrido).</p>
        </div>
      </div>
    </div>
  );
};

export default BankInfo;