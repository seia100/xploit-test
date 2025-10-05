import React from 'react';
import { Link } from 'react-router-dom';
import successIcon from '../assets/success-icon.svg';
import './SuccessPage.css';

const SuccessPage = () => {
  return (
    <div className="success-page">
      <div className="success-container">
        <div className="success-icon">
          <img src={successIcon} alt="Éxito" />
        </div>
        <h2>¡Verificación Completada!</h2>
        <p className="message">
          Tu información ha sido verificada correctamente. 
          La actualización de tu cuenta está en proceso.
        </p>
        <p className="wait-message">
          Por motivos de seguridad, tu acceso a Banca por Internet 
          estará disponible dentro de 24 a 48 horas.
        </p>
        <div className="buttons">
          <Link to="/" className="btn-primary">
            Volver al Inicio
          </Link>
        </div>
        <div className="note">
          <p>
            Si necesitas asistencia inmediata, por favor contacta a nuestro 
            centro de atención al cliente al 0800-10-700.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;