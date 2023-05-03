<?php

namespace App\Jobs;

use App\Http\Controllers\Api\SaqCatalogueController;
use App\Http\Controllers\Api\SaqProductController;
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
        $SaqCatalogueController = new SaqCatalogueController();
        $totalPages = 100; 
        for ($i = 1; $i <= $totalPages; $i++) {
            $SaqCatalogueController->getProduits(24,$i);
        }

        $SaqProductController = new SaqProductController();
        $SaqProductController->getItem();
    }
}
