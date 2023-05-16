<?php

namespace Database\Seeders;

use App\Models\Cellar;
use App\Models\Bottle;
use App\Models\CellarHasBottle;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;
use Illuminate\Support\Carbon;

class CellarHasBottleSeeder extends Seeder
{
    public function run()
    {
        
        $bottleIds = Bottle::pluck('id')->toArray();

        Cellar::all()->each(function ($cellar) use ($bottleIds) {
           
            $numBottles = random_int(15, 100);

            for ($i = 0; $i < $numBottles; $i++) {
                
                $bottle_id = Arr::random($bottleIds);

                
                $created_at = Carbon::now()->subMonths(6)->addSeconds(random_int(0, 6 * 30 * 24 * 60 * 60));

                CellarHasBottle::create([
                    'cellar_id' => $cellar->id,
                    'bottle_id' => $bottle_id,
                    'quantity' => random_int(1, 10),
                    'created_at' => $created_at,
                ]);
            }
        });
    }
}
