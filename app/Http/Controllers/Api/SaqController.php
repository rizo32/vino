<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Bottle;
use Illuminate\Http\Request;
use DOMDocument;
use stdClass;
class SaqController extends Controller
{


public function getProduits(Request $request, $nombre = 24, $page = 1)
{
    $url = "https://www.saq.com/fr/produits/vin/vin-rouge?p=" . $page . "&product_list_limit=" . $nombre . "&product_list_order=name_asc";

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

    $webpage = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    $doc = new DOMDocument();
    $doc->recover = true;
    $doc->strictErrorChecking = false;
    @$doc->loadHTML($webpage);
    $elements = $doc->getElementsByTagName("li");
    $products = [];

    foreach ($elements as $key => $noeud) {
        if (strpos($noeud->getAttribute('class'), "product-item") !== false) {
            $info = $this->recupereInfo($noeud);
            $result = $this->ajouteProduit($info);
            $products[] = array_merge((array)$info, ['result' => $result]);
        }
    }

    return response()->json($products);
}


private function get_inner_html($node)
{
    $innerHTML = '';
    $children = $node->childNodes;
    foreach ($children as $child) {
        $innerHTML .= $child->ownerDocument->saveXML($child);
    }

    return $innerHTML;
}

private function nettoyerEspace($chaine)
{
    return preg_replace('/\s+/', ' ', $chaine);
}

private function recupereInfo($noeud)
{
  
		
		$info = new stdClass();
		$info -> img = $noeud -> getElementsByTagName("img") -> item(0) -> getAttribute('src'); //TODO : Nettoyer le lien
		;
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
		return $info;
	
}

private function ajouteProduit($bte)
{
    $retour = new stdClass();
    $retour->succes = false;
    $retour->raison = '';

    $type_id = 1; // Replace this with the appropriate logic to find the type_id based on the $bte->desc->type value.

    $existingBottle = Bottle::where('code_saq', $bte->desc->code_SAQ)->first();

    if (!$existingBottle) {
        $
        $newBottle = new Bottle();
        $newBottle->name = $bte->nom;
        $newBottle->image_path = $bte->img;
        $newBottle->code_saq = $bte->desc->code_SAQ;
        $newBottle->description = $bte->desc->texte;
        $newBottle->price_saq = $bte->prix;
        $newBottle->url_saq = $bte->url;
        $newBottle->image_url = $bte->img;
        $newBottle->format = $bte->desc->format;
        $newBottle->type_id = $type_id;

        if ($newBottle->save()) {
            $retour->succes = true;
            $retour->raison = 'Nouvelle bouteille insérée';
        } else {
            $retour->succes = false;
            $retour->raison = 'Erreur lors de l\'insertion';
        }
    } else {
        $retour->succes = false;
        $retour->raison = 'Duplication';
    }

    return $retour;
}





}
