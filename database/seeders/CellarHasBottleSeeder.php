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
        /* obtien tout les id des bouteilles dans la BD */
        $bottleIds = Bottle::pluck('id')->toArray();

        /*Pour chaque Cellier existant */
        Cellar::all()->each(function ($cellar) use ($bottleIds) {
           
            $numBottles = random_int(5, 40); /* nombre de bouteilles random entre 5 et 40 */
 
            for ($i = 0; $i < $numBottles; $i++) {
                /* boucle pour l'ajout  */
                
                $bottle_id = Arr::random($bottleIds); /* ajout de bouteille random pris du tableau comporant tout les id bouteilles */

                 /* Creation d'une date a aléatoire pour l'ajout de bouteilles */
                $created_at = Carbon::now()->subMonths(6)->addSeconds(random_int(0, 6 * 30 * 24 * 60 * 60));

                /* Créer une entrés(bouteilles ajoutés ) dans le cellier avec les informations déclaré */
                CellarHasBottle::create([
                    'cellar_id' => $cellar->id,
                    'bottle_id' => $bottle_id,
                    'quantity' => random_int(1, 3),
                    'created_at' => $created_at,
                ]);
            }
        });
    }
}
