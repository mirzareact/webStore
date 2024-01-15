import React from "react";

const CartProduct = ({ product, onRemove }) => {
  const handleRemoveClick = () => {
    onRemove(product);
  };
  return (
    <div className="flex items-center justify-between text-base py-4 ">
      <div className="flex gap-2">
        <img src={product.product.images[0]} className="h-20" />
        <div>
          <h3 className="text-gray-900 font-semibold">
            {product.product.name}, <span>{product.size}</span>
          </h3>
          <p className="text-black mt-1">{product.product.price} KM</p>
          <p>
            x<span>{product.quantity}</span>
          </p>
        </div>
      </div>
      <div>
        <button
          onClick={handleRemoveClick}
          className="ml-2 py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg"
        >
          Ukloni
        </button>
      </div>
    </div>
  );
};

export default CartProduct;
