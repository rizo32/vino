import axios from "axios"
import ProductCard from "../components/ProductCard/ProductCard"

export default function Catalog() {
  return (
    <div className="flex flex-col gap-2">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  )
}

