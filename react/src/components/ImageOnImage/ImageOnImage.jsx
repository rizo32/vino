import "./style/ImageOnImage.css";
import bgImgRedWine from "../../assets/img/bgImgRedWineDark.webp";
import bgImgWhiteWine from "../../assets/img/bgImgWhiteWineDark2.webp";
import bgImgDefault from "../../assets/img/bgImgOtherWineDark2.webp";

const ImageOnImage = ({ src, alt, type }) => {

    // Image de fond différente selon le type de vin
    let imageSrc;

    if (type === "Vin rouge") {
        imageSrc = bgImgRedWine;
    } else if (type === "Vin blanc") {
        imageSrc = bgImgWhiteWine;
    } else {
        imageSrc = bgImgDefault;
    }

    return (
        <div className="relative h-80 w-full overflow-hidden">
            <img
                className="absolute object-cover w-full h-full blur-xs"
                src={imageSrc}
                alt="vignoble"
            />
            <div className="flex flex-column relative justify-center items-end">
                <img id="shit" className="h-80" src={src} alt={alt} />
            </div>
        </div>
    );
};

export default ImageOnImage;
