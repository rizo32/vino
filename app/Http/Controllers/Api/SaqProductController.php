<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Bottle;
use App\Models\Aroma;
use App\Models\Cepage;
use App\Models\DesignationReglemente;
use App\Models\Producteur;
use App\Models\Region;
use App\Models\TauxAlcool;
use App\Models\TauxSucre;
use App\Models\TemperatureService;
use Illuminate\Http\Request;
use DOMDocument;
use stdClass;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\StreamedResponse;

class SaqProductController extends Controller
{
    public function getItem()
    {
        ini_set('max_execution_time', 0);

        $codes_saq = Bottle::orderBy('code_saq', 'ASC')->pluck('code_saq')->toArray();
        $allProductDetails = [];

        foreach ($codes_saq as $code_saq) {
            $url = "https://www.saq.com/" . $code_saq;

            /* initialise le cURL et configure les options */
            $ch = curl_init();

            curl_setopt_array($ch, array(
                CURLOPT_URL => $url,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:60.0) Gecko/20100101 Firefox/60.0',
                CURLOPT_ENCODING => 'gzip, deflate',
                CURLOPT_HTTPHEADER => array(
                    'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                    'Accept-Language: en-US,en;q=0.5',
                    'Accept-Encoding: gzip, deflate',
                    'Connection: keep-alive',
                    'Upgrade-Insecure-Requests: 1',
                ),
            ));
            /* recuperation de la page web et verification du status de requete */
            $webpage = curl_exec($ch);
            $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);
            /* chargement de la page dans un objet DOMDocument et recuperation de tout les element "li" */
            $doc = new DOMDocument();
            $doc->recover = true;
            $doc->strictErrorChecking = false;
            @$doc->loadHTML($webpage);

            $xpath = new \DOMXPath($doc);
            $productDetails = [];
            $elements = $xpath->query("//ul[contains(@class, 'list-attributs')]/li");
            $tempService = $xpath->query("//div[contains(@class, 'additional-attributes-wrapper')]//ul[contains(@class, 'tasting-container')]//li//span[contains(text(), 'Température de service')]/following-sibling::strong");
            $aromes = $xpath->query("//div[contains(@class, 'additional-attributes-wrapper')]//ul[contains(@class, 'tasting-container')]//li//span[contains(text(), 'Arômes')]/following-sibling::strong");

            if ($tempService->length > 0) {
                $productDetails["Température de service"] = trim($tempService->item(0)->nodeValue);
            }

            if ($aromes->length > 0) {
                $productDetails["Arômes"] = trim($aromes->item(0)->nodeValue);
            }


            /* Boucle a travers les elements recceuillis et extraire les informations sous les balises "strong" */
            foreach ($elements as $key => $noeud) {
                $span = $noeud->getElementsByTagName('span')->item(0);
                $strong = $noeud->getElementsByTagName('strong')->item(0);

                if ($span && $strong) {
                    $key = $span->nodeValue;
                    $value = $strong->nodeValue;
                    $productDetails[$key] = $value;
                    /* echo $key . " : " . $value . "<br>"; */
                }
            }

            $allProductDetails[$code_saq] = $productDetails;
            $response = response()->json($productDetails);
            $this->updateProduit($productDetails, $code_saq);
        }

        return view('saq', [
            'allProductDetails' => $response->getContent(),
        ]);
    }

    public function updateProduit($productDetails, $code_saq)
    {
        /*   echo "updateProduit called with code_saq: {$code_saq}<br>";
        echo "Received product details for code_saq {$code_saq}:<br>";
       */
        /* print_r($productDetails);
        echo "<br><br>";
        die(); */
        $existingBottle = Bottle::where('code_saq', $code_saq)->first();


        if ($existingBottle) {
            /* echo "Existing bottle found for code_saq: {$code_saq}<br>";
            die(); */
            $updateData = [];

            // Check if the key exists in $productDetails before adding it to $updateData
            if (array_key_exists('Région', $productDetails)) {
                $updateData['region_id'] = $this->nettoyerEspace($productDetails['Région']);
            }
            if (array_key_exists('Cépages', $productDetails)) {
                $updateData['cepage_id'] = $this->nettoyerEspace($productDetails['Cépages']);
            }
            if (array_key_exists('Désignation réglementée', $productDetails)) {
                $updateData['designation_reglemente_id'] = $this->nettoyerEspace($productDetails['Désignation réglementée']);
            }
            if (array_key_exists("Degré d'alcool", $productDetails)) {
                $updateData['taux_alcool_id'] = $this->nettoyerEspace($productDetails["Degré d'alcool"]);
            }
            if (array_key_exists('Taux de sucre', $productDetails)) {
                $updateData['taux_sucre_id'] = $this->nettoyerEspace($productDetails['Taux de sucre']);
            }
            if (array_key_exists('Producteur', $productDetails)) {
                $updateData['producteur_id'] = $this->nettoyerEspace($productDetails['Producteur']);
            }
            if (array_key_exists('Code CUP', $productDetails)) {
                $updateData['code_cup'] = $this->nettoyerEspace($productDetails['Code CUP']);
            }
            if (array_key_exists('Température de service', $productDetails)) {
                $updateData['temperature_service_id'] = $this->nettoyerEspace($productDetails['Température de service']);
            }
            if (array_key_exists('Arômes', $productDetails)) {
                $updateData['aroma_id'] = $this->nettoyerEspace($productDetails['Arômes']);
            }

            // ... (add more fields if needed)

            // Only update if there's at least one field to update
            if (!empty($updateData)) {
                /*  echo "Updating bottle with code_saq: {$code_saq}<br>";
                die(); */


                $existingBottle->update($updateData);
            } else {
                /*   echo "No data to update for code_saq: {$code_saq}<br>";
                die(); */
            }
        } else {
            /*   echo "No existing bottle found for code_saq: {$code_saq}<br>";
            die(); */
        }
    }

    private function nettoyerEspace($chaine) /* nettoie les espaces indesirables d'une chaine de caracteres */
    {
        return preg_replace('/\s+/', ' ', $chaine);
    }

    private function get_id($model, $name)
{
    $models = [
        'Region' => ['class' => Region::class, 'attribute' => 'name'],
        'Cepage' => ['class' => Cepage::class, 'attribute' => 'name'],
        'DesignationReglemente' => ['class' => DesignationReglemente::class, 'attribute' => 'name'],
        'TauxAlcool' => ['class' => TauxAlcool::class, 'attribute' => 'name'],
        'TauxSucre' => ['class' => TauxSucre::class, 'attribute' => 'name'],
        'Producteur' => ['class' => Producteur::class, 'attribute' => 'name'],
        'TemperatureService' => ['class' => TemperatureService::class, 'attribute' => 'name'],
        'Aroma' => ['class' => Aroma::class, 'attribute' => 'name'],
    ];

    $modelClass = $models[$model]['class'] ?? null;
    $attribute = $models[$model]['attribute'] ?? null;

    if (!$modelClass || !$attribute) {
        return null;
    }

    $instance = $modelClass::where($attribute, $name)->first();

    if ($instance) {
        return $instance->id;
    }

    // Create a new instance if not found
    $newInstance = new $modelClass();
    $newInstance->$attribute = $name;
    $newInstance->save();

    return $newInstance->id;
}

}
