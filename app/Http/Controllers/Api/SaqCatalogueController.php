<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Bottle;
use App\Models\Format;
use App\Models\Type;
use App\Models\Country;
use Illuminate\Http\Request;
use DOMDocument;
use stdClass;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\StreamedResponse;
use App\Http\Controllers\Api\SaqProductController;

class SaqCatalogueController extends Controller

{
 public function getProduits($nombre = 24, $page = 1) /* recupere la liste de bouteilles a partir de l'url donner (SAQ) */
    {
        $url = "https://www.saq.com/fr/produits/vin?p=" . $page;

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
        $elements = $doc->getElementsByTagName("li");
        $products = [];

        /* Boucle a traver les element recceuillis et pour ceux qui ont la classe "product-item" appele des methode ajouteProduit et recupereInfo */
        foreach ($elements as $key => $noeud) {
            if (strpos($noeud->getAttribute('class'), "product-item") !== false) {
                $info = $this->recupereInfo($noeud);
                $result = $this->ajouteProduit($info);
                $products[] = array_merge((array)$info, ['result' => $result]);
            }
        }

        return response()->json($products); /* Retourne une liste de produit JSON */
    }


    private function get_inner_html($node) /* recupere le contenue HTML d'un element */
    {
        $innerHTML = '';
        $children = $node->childNodes;
        foreach ($children as $child) {
            $innerHTML .= $child->ownerDocument->saveXML($child);
        }

        return $innerHTML;
    }

    private function nettoyerEspace($chaine) /* nettoie les espaces indesirables d'une chaine de caracteres */
    {
        return preg_replace('/\s+/', ' ', $chaine);
    }


    private function nettoyer_image_url($url)
    {
        $pattern = "/(\.(?:png|jpg|jpeg|gif))(.*)/";
        $newUrl = preg_replace($pattern, '$1', $url);
        return $newUrl;
    }

    private function image_par_default($url)
    {
        if (str_contains($url, 'product_tags') || str_contains($url, 'scene7')) {
            return   $url = 'https://www.saq.com/media/wysiwyg/placeholder/category/06.png';/* image par default */
        } else {
            return $url;
        }
    }

    private function get_id($model, $name)
    {
        /* definitiosn des models et attributs correspondant */
        $models = [
            'Type' => ['class' => Type::class, 'attribute' => 'name'],
            'Format' => ['class' => Format::class, 'attribute' => 'name'],
            'Country' => ['class' => Country::class, 'attribute' => 'name'],
        ];

        $modelClass = $models[$model]['class'] ?? null;
        $attribute = $models[$model]['attribute'] ?? null;
        /* si la classe ou l'attribut existe pas -> retourne null */
        if (!$modelClass || !$attribute) {
            return null;
        }
        /* si une instance existe -> retourne l'id */
        $instance = $modelClass::where($attribute, $name)->first();

        if ($instance) {
            return $instance->id;
        }

        /* si aucune instance est trouver -> creation de l'instance (peuplement dynamique) */
        $newInstance = new $modelClass();
        $newInstance->$attribute = $name;
        $newInstance->save();
        /* ensuite -> retourne l'id */
        return $newInstance->id;
    }




    private function recupereInfo($noeud)
    {


        $info = new stdClass(); /*  crte*/

        /* extraction specifique  et nettoyage pour stocker dans l'objet */
        $info->img = $noeud->getElementsByTagName("img")->item(0)->getAttribute('src');
        $info->img = $this->nettoyer_image_url($info->img);
        $info->img = $this->image_par_default($info->img);
        $a_titre = $noeud->getElementsByTagName("a")->item(0);
        $info->url = $a_titre->getAttribute('href');

        //var_dump($noeud -> getElementsByTagName("a")->item(1)->textContent);
        $nom = $noeud->getElementsByTagName("a")->item(1)->textContent;
        //var_dump($a_titre);
        $info->nom = self::nettoyerEspace(trim($nom));
        //var_dump($info -> nom);
        // Type, format et pays
        $aElements = $noeud->getElementsByTagName("strong");
        foreach ($aElements as $node) {
            if ($node->getAttribute('class') == 'product product-item-identity-format') {
                $info->desc = new stdClass();
                $info->desc->texte = $node->textContent;
                $info->desc->texte = self::nettoyerEspace($info->desc->texte);
                $aDesc = explode("|", $info->desc->texte); // Type, Format, Pays
                if (count($aDesc) == 3) {

                    $info->desc->type_id = $this->get_id('Type', trim($aDesc[0]));
                    $info->desc->format_id = $this->get_id('Format', trim($aDesc[1]));
                    $info->desc->country_id = $this->get_id('Country', trim($aDesc[2]));
                }

                $info->desc->texte = trim($info->desc->texte);
            }
        }

        //Code SAQ
        $aElements = $noeud->getElementsByTagName("div");
        foreach ($aElements as $node) {
            if ($node->getAttribute('class') == 'saq-code') {
                if (preg_match("/\d+/", $node->textContent, $aRes)) {
                    $info->desc->code_SAQ = trim($aRes[0]);
                }
            }
        }

        // Rating
        $info->rating = null; /* initialisation de la variable pour contrer les cas ou il n'y a pas de rating*/
        $aElements = $noeud->getElementsByTagName("div");
        foreach ($aElements as $node) {
            if ($node->getAttribute('class') == 'rating-result') {
                $ratingSpan = $node->getElementsByTagName("span")->item(0);
                if (preg_match("/\d+%/", $ratingSpan->textContent, $aRes)) {
                    $info->rating = floatval(trim($aRes[0]));
                    /* Log::info($info->rating); */
                }
            }
        }

        // Prix , est-ce qu"ont le garde
        $aElements = $noeud->getElementsByTagName("span");
        foreach ($aElements as $node) {
            if ($node->getAttribute('class') == 'price') {
                $info->prix = trim($node->textContent);
            }
        }




        //Nombre de rating
        $info->num_comments = null; /* initialisation de la variable pour contrer les cas ou il n'y a pas de rating*/
        $aElements = $noeud->getElementsByTagName("div");
        foreach ($aElements as $node) {
            if ($node->getAttribute('class') == 'reviews-actions') {
                $commentsLink = $node->getElementsByTagName("a")->item(0);
                if (preg_match("/\d+/", $commentsLink->textContent, $aRes)) {
                    $info->num_comments = intval(trim($aRes[0]));
                    /* Log::info($info->num_comments); */
                }
            }
        }


        //var_dump($info);
        return $info; /* renvoie de l'objet */
    }
    



    private function ajouteProduit($bte)
    {
        $retour = new stdClass(); /* creation d'un objet pour stocker les resultat */
    
        /* valeur par default */
        $retour->succes = false;
        $retour->raison = '';
        $retour->erreur = 0;
        $retour->insert = 0;
        $retour->double = 0;
    
        $existingBottle = Bottle::where('code_saq', $bte->desc->code_SAQ)->first(); /* verifie si la bouteille existe deja */
    
        if (!$existingBottle) { /* si la bouteille n'existe pas deja */
            /* creation d'une instance de la class bottle */
            $newBottle = new Bottle();
            /* assignation des valeurs */ 
            $newBottle->name = substr($bte->nom, 0, 191);
            $newBottle->code_saq = $bte->desc->code_SAQ;
            $newBottle->price_saq = round(floatval($bte->prix), 2);
            $newBottle->url_saq = $bte->url;
            $newBottle->image_url = $bte->img;
            $newBottle->format_id = $bte->desc->format_id;
            $newBottle->country_id = $bte->desc->country_id;
            $newBottle->type_id = $bte->desc->type_id;
            $newBottle->rating_saq = $bte->rating;
            $newBottle->num_comments = $bte->num_comments;
            /* attribution d'id attribut si elle existe sinon -> Null -> fixe pour contraintre de valeur par default  */
            $newBottle->region_id = isset($bte->desc->region_id) ? $bte->desc->region_id : NULL;
            $newBottle->cepage_id = isset($bte->desc->cepage_id) ? $bte->desc->cepage_id : NULL;
            $newBottle->designation_reglemente_id = isset($bte->desc->designation_reglemente_id) ? $bte->desc->designation_reglemente_id : NULL;
            $newBottle->taux_alcool_id = isset($bte->desc->taux_alcool_id) ? $bte->desc->taux_alcool_id : NULL;
            $newBottle->taux_sucre_id = isset($bte->desc->taux_sucre_id) ? $bte->desc->taux_sucre_id : NULL;
            $newBottle->producteur_id = isset($bte->desc->producteur_id) ? $bte->desc->producteur_id : NULL; 
            $newBottle->temperature_service_id = isset($bte->desc->temperature_service_id) ? $bte->desc->temperature_service_id : NULL; 
            $newBottle->aroma_id = isset($bte->desc->aroma_id) ? $bte->desc->aroma_id : NULL; 
    
            /* Enregistrement de la bouteille dans la base de données */
            if ($newBottle->save()) {
                $retour->succes = true;
                $retour->raison = 'Nouvelle bouteille insérée';
                $retour->insert++;
            } else {
                $retour->succes = false;
                $retour->raison = 'Erreur lors de l\'insertion';
                $retour->erreur++;
            }
        } else {
            /*  La bouteille existe déjà dans la base de données */
            $retour->succes = false;
            $retour->raison = 'Duplication';
            $retour->double++;
        }
    
        return $retour; /* Retorune objet + resultat */
    }
    


    public function fetchProduits()
{
    ini_set('max_execution_time', 0); // Cette fonction peut rouler infiniment /* a ajuster lorsque tout les test seront terminer  */

    $totalPages = 300;  // nombre de pages voulues -> max 342; /* a ajuster lorsque tout les test seront terminer  */

    $produits = []; // Tableau qui contiendra les produits

    /* parcourir chaque pages */
    for ($i = 1; $i <= $totalPages; $i++) {
        $response = $this->getProduits(24, $i);
        $data = $response->getData();
        /* creation d'un tableaux de produits */
        $produits = array_merge($produits, $data);
    }
    /* ajout d'autres informations avec le 2e crawler */
    $moreProduits = new SaqProductController;
    $moreProduits->getItem();

    return response()->json(['done' => true, 'produits' => $produits]); /* retour desuets -> a modifier apres les test */
}

}
