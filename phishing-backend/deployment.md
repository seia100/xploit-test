# Instrucciones de Despliegue - Backend de Phishing (Laboratorio)

Este documento proporciona instrucciones detalladas para desplegar el backend de phishing en un entorno de laboratorio controlado.

## Requisitos previos

- PHP 8.1 o superior
- Composer
- MySQL o SQLite
- Servidor web (Apache/Nginx) o PHP artisan serve

## Paso 1: Configuración del entorno

1. Asegúrate de tener instalado PHP y Composer en tu sistema.
2. Configura el archivo `.env` con las variables de entorno correctas:

```bash
cd /media/luiss/D/upch/cyb/xploit/phishing-backend
cp .env.example .env
```

3. Edita el archivo `.env` con la información de tu base de datos:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=phishing_lab
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña
```

Si prefieres usar SQLite, modifica `.env`:

```
DB_CONNECTION=sqlite
# Comenta o elimina el resto de líneas DB_*
```

Y crea el archivo de base de datos:

```bash
touch database/database.sqlite
```

## Paso 2: Instalación de dependencias

```bash
composer install
```

## Paso 3: Generar clave de aplicación

```bash
php artisan key:generate
```

## Paso 4: Ejecutar migraciones

```bash
php artisan migrate
```

## Paso 5: Configurar servidor web

### Opción 1: Servidor de desarrollo (para pruebas)

```bash
php artisan serve
```

Esto iniciará un servidor de desarrollo en http://localhost:8000

### Opción 2: Apache o Nginx (para un entorno más realista)

#### Apache

Crea un archivo de host virtual (`/etc/apache2/sites-available/phishing-lab.conf`):

```apache
<VirtualHost *:80>
    ServerName phishing-lab.local
    DocumentRoot "/media/luiss/D/upch/cyb/xploit/phishing-backend/public"
    
    <Directory "/media/luiss/D/upch/cyb/xploit/phishing-backend/public">
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

Activa el sitio y reinicia Apache:

```bash
sudo a2ensite phishing-lab.conf
sudo service apache2 restart
```

Añade la entrada al archivo hosts:

```bash
echo "127.0.0.1 phishing-lab.local" | sudo tee -a /etc/hosts
```

#### Nginx

Crea un archivo de configuración (`/etc/nginx/sites-available/phishing-lab`):

```nginx
server {
    listen 80;
    server_name phishing-lab.local;
    root /media/luiss/D/upch/cyb/xploit/phishing-backend/public;

    index index.php index.html;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

Activa el sitio y reinicia Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/phishing-lab /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

Añade la entrada al archivo hosts:

```bash
echo "127.0.0.1 phishing-lab.local" | sudo tee -a /etc/hosts
```

## Paso 6: Configurar permisos de archivos

```bash
chmod -R 775 storage
chmod -R 775 bootstrap/cache
```

## Paso 7: Verificar la instalación

Visita la URL principal en tu navegador:
- Con el servidor de desarrollo: http://localhost:8000/banco
- Con Apache/Nginx: http://phishing-lab.local/banco

Deberías ver la página de phishing imitando el sitio del Banco de la Nación.

## Notas importantes

- Este proyecto es ÚNICAMENTE para fines educativos en un entorno de laboratorio controlado.
- Usar técnicas de phishing en entornos reales es ilegal y está sujeto a consecuencias legales.
- Asegúrate de tener los permisos adecuados antes de realizar pruebas de phishing, incluso en entornos controlados.