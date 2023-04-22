<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Bottle;
use Illuminate\Http\Request;
use DOMDocument;
use stdClass;
class SaqController extends Controller
{

    private function getTypeID($type) /* retourne l'id du type de vin en fonction de son nom */
{
    // remplacement et traitement des types
    $types = [
        ['id' => 1, 'name' => 'Vin rouge'],
        ['id' => 2, 'name' => 'Vin blanc'],
        ['id' => 3, 'name' => 'Vin rose'],
    ];

    foreach ($types as $typeData) {
        if (strtolower($typeData['name']) === strtolower($type)) { /* si les nom matchs retour id correspondant */
            return $typeData['id'];
        }
    }

    return 1; // Sinon, ajout d'un type par défaut
}

/* 
 */

public function getProduits(Request $request, $nombre = 24, $page = 1) /* recupere la liste de bouteilles a partir de l'url donner (SAQ) */
{
    $url = "https://www.saq.com/fr/produits/vin/vin-rouge?p=" . $page . "&product_list_limit=" . $nombre . "&product_list_order=name_asc";

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

private function recupereInfo($noeud)
{
  
		
		$info = new stdClass(); /*  crte*/

        /* extraction specifique  et nettoyage pour stocker dans l'objet */
		$info -> img = $noeud -> getElementsByTagName("img") -> item(0) -> getAttribute('src'); //TODO : Nettoyer le lien
		$a_titre = $noeud -> getElementsByTagName("a") -> item(0);
		$info -> url = $a_titre->getAttribute('href');
		
        //var_dump($noeud -> getElementsByTagName("a")->item(1)->textContent);
        $nom = $noeud -> getElementsByTagName("a")->item(1)->textContent;
        //var_dump($a_titre);
		$info -> nom = self::nettoyerEspace(trim($nom));
		//var_dump($info -> nom);
		// Type, format et pays
		$aElements = $noeud -> getElementsByTagName("strong");
		foreach ($aElements as $node) {
			if ($node -> getAttribute('class') == 'product product-item-identity-format') {
				$info -> desc = new stdClass();
				$info -> desc -> texte = $node -> textContent;
				$info->desc->texte = self::nettoyerEspace($info->desc->texte);
				$aDesc = explode("|", $info->desc->texte); // Type, Format, Pays
				if (count ($aDesc) == 3) {
					
					$info -> desc -> type = trim($aDesc[0]);
					$info -> desc -> format = trim($aDesc[1]);
					$info -> desc -> pays = trim($aDesc[2]);
				}
				
				$info -> desc -> texte = trim($info -> desc -> texte);
			}
		}

		//Code SAQ
		$aElements = $noeud -> getElementsByTagName("div");
		foreach ($aElements as $node) {
			if ($node -> getAttribute('class') == 'saq-code') {
				if(preg_match("/\d+/", $node -> textContent, $aRes))
				{
					$info -> desc -> code_SAQ = trim($aRes[0]);
				}
				
				
				
			}
		}

		$aElements = $noeud -> getElementsByTagName("span");
		foreach ($aElements as $node) {
			if ($node -> getAttribute('class') == 'price') {
				$info -> prix = trim($node -> textContent);
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

    $type_id = $this->getTypeID($bte->desc->type); /* recupere l'id du type de produit */

    $existingBottle = Bottle::where('code_saq', $bte->desc->code_SAQ)->first(); /* verifie si la bouteille existe deja */

    if (!$existingBottle) { /* si la bouteille n'existe pas deja */
        /* creation d'une instance de la class bottle */
        $newBottle = new Bottle(); 
        /* assignation des valeurs */
        $newBottle->name = $bte->nom;
        $newBottle->image_path = $bte->img;
        $newBottle->code_saq = $bte->desc->code_SAQ;
        $newBottle->description = $bte->desc->texte;
        $newBottle->price_saq = round(floatval($bte->prix), 2);
        $newBottle->url_saq = $bte->url;
        $newBottle->image_url = $bte->img;
        $newBottle->format_id = $bte->desc->format;
        $newBottle->country_id = 1;
        $newBottle->type_id = $type_id;
  
        /* Enregistrement de la bouteille dans la base de données */
        if ($newBottle->save()) { 
            $retour->succes = true;
            $retour->raison = 'Nouvelle bouteille insérée';
        } else {
            $retour->succes = false;
            $retour->raison = 'Erreur lors de l\'insertion';
        }
    } else {
        /*  La bouteille existe déjà dans la base de données */
        $retour->succes = false;
        $retour->raison = 'Duplication';
    }

    return $retour; /* Retorune objet + resultat */
}


public function fetchProduits(Request $request)
{
    /* Récupération du nombre d'éléments à retourner et de la page demandée */
    $nombre = intval($request->input('nombre', 24));
    $page = intval($request->input('page', 1));

    return $this->getProduits($request, $nombre, $page); /* Appel de la méthode getProduits pour récupérer la liste des produits */
}



}
