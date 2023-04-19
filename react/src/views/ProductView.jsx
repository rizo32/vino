import { useParams } from "react-router-dom";

export default function ProductView() {
  const { id } = useParams();
  return (
    <div>
      <h1>Produit</h1>
    </div>
  );
}
