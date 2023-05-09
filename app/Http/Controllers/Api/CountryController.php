<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Country;
use Illuminate\Http\Request;

class CountryController extends Controller
{
    public function index()
    {
        // utilisé pour les options de filtrage
        $countries = Country::orderBy('name', 'asc')->get();
        return response()->json($countries);
    }
}
