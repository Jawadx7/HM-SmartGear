import { Star } from "lucide-react";
import { useCartStore } from "../../store/AppStore";
import { Link } from "react-router-dom";
import Button from "./Button";

const ProductCard = ({ product }) => {
  const { addItem } = useCartStore((state) => state);
  return (
    <div className="hover:shadow-lg rounded-lg group overflow-hidden">
      <div className="w-full h-[12rem] sm:h-[18rem] relative overflow-hidden flex items-center justify-center bg-gray-300 z-[-10]">
        <img
          src={product?.image}
          alt=""
          className="h-full w-full absolute mx-auto rounded-t-lg transition-all duration-300 z-[-10]"
        />
      </div>

      <div className="p-2 cursor-default">
        <p className="text-gray-500 line-clamp-1">{product?.name}</p>
        <p className="my-3">GHC {product?.price}</p>
        <Button type="button" onClick={() => addItem(product)}>
          Buy Now
        </Button>
      </div>
    </div>
  );
};
export default ProductCard;
