/**
 * Auteur: rizo
 * ------------
 * Input
 * -----
 * text: le texte à afficher
 * imagePath: le lien à partir de la classe parent
 * alt: nom alternatif
 * objectTop: classe css custom pour déterminer la position vertical de l'image
 * contrast, saturation, brightness: classes css customs pour déterminer les filtres appliqués à l'image
 * (à ajouté au besoin dans le fichier textOnImage.css)
 */

import "./style/textOnImage.css";

const TextOnImage = ({
  text,
  imagePath,
  objectTop,
  contrast,
  saturation,
  brightness,
  alt,
}) => {
  return (
    <div className="relative h-48 overflow-hidden">
      <img
        className={`absolute object-cover w-full h-full product-img
          ${objectTop}
          ${contrast}
          ${saturation}
          ${brightness}
          `}
        src={imagePath}
        alt={alt}
      />
      <div className="flex flex-column relative py-6 px-4 text-white text-center w-full h-full  justify-center items-center pl-52">
        <p className="text-2xl font-bold">{text}</p>
      </div>
    </div>
  );
};

export default TextOnImage;
