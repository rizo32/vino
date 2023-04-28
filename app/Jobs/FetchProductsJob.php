<?php

namespace App\Jobs;

use App\Http\Controllers\Api\SaqController;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class FetchProductsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct()
    {
        //
    }

    public function handle()
    {
        $saqController = new SaqController();
        $totalPages = 342; 
        for ($i = 1; $i <= $totalPages; $i++) {
            $saqController->getProduits(24,$i);
        }
    }
}
