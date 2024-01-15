import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import axios from "axios";
import ProductCard from "./ProductCard";
import { BACKENDLOCALHOSTURL } from "../../backend/config";

const ProductsList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BACKENDLOCALHOSTURL}/proizvodi`)
      .then((response) => {
        setData(response.data.data.reverse());
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert(err.message);
      });
  }, []);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-center gap-10">
          {loading ? (
            <Spinner />
          ) : (
            data.map((product, index) => (
              <div key={index}>
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"></div>
      </div>
    </div>
  );
};

export default ProductsList;
