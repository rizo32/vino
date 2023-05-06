<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Type;
use Illuminate\Http\Request;

class TypeController extends Controller
{
    public function index()
    {
        // utilisé pour les options de filtrage
        $types = Type::all();
        return response()->json($types);
    }
}
