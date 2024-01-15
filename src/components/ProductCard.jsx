import { useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="max-w-sm relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transform: hovered ? "scale(1.1)" : "scale(1)",
        transition: "transform 0.3s ease-in-out",
        border: hovered ? "1px solid black" : "none",
      }}
    >
      <Link
        key={product._id}
        to={`/proizvodi/${product._id}`}
        className="group"
      >
        <div
          className="w-full overflow-hidden relative"
        >
          <img
            src={product.images[0]}
            className="h-full w-full object-cover object-center transition-opacity duration-300 ease-in-out"
            style={{ opacity: hovered ? 0 : 1 }}
          />
          <img
            src={product.images[1]}
            className="h-full w-full object-cover object-center transition-opacity duration-300 ease-in-out absolute top-0 left-0"
            style={{ opacity: hovered ? 1 : 0 }}
          />
        </div>
        <h3 className="ml-2 mt-4 text-lg text-black font-semibold">
          {product.name}
        </h3>
        <p className="ml-2 pb-3 text-lg font-medium text-gray-900">
          {product.price} KM
        </p>
      </Link>
    </div>
  );
};

export default ProductCard;
