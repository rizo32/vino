import ProductCard from "../../components/ProductCard/ProductCard";
import TextOnImage from "../../components/TextOnImage/TextOnImage";
import img from "./img/white-wine.webp";
import "./style/catalog.css";

export default function Catalog() {
  return (
    <div className="flex flex-col gap-2">
      <TextOnImage
        text="Vins blancs"
        imagePath={img}
        alt="vins blancs"
        objectTop="object-top-20"
        contrast="contrast-120"
        saturation="saturation-70"
        brightness="brightness-90"
      />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
}
