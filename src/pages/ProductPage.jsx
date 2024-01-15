import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/NavBar";
import Spinner from "../components/Spinner";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Footer from "../components/Footer";
import { BACKENDLOCALHOSTURL } from "../../backend/config";

const ProductPage = () => {
  const [selectedSize, setSelectedSize] = useState("");
  const [ammount, setAmmount] = useState("");
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const handleSizeSelection = (size) => {
    if (selectedSize === size) {
      setSelectedSize(null);
    } else {
      setSelectedSize(size);
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BACKENDLOCALHOSTURL}/proizvodi/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        alert(err.message);
        setLoading(false);
      });
  }, []);

 const handleAddToCart = (e) => {
   e.preventDefault();
   setLoading(true);

   const data = {
     product: product,
     size: selectedSize,
     quantity: ammount,
   };


   const cartData = JSON.parse(localStorage.getItem("cart")) || [];
   cartData.push(data);
   localStorage.setItem("cart", JSON.stringify(cartData));

   
   const now = new Date().getTime();
   const setupTime = localStorage.getItem("setupTime");
   if (setupTime == null) {
     localStorage.setItem("setupTime", now);
   } else {
     if (now - setupTime > 60 * 60 * 1000) {
       // Clear entire localStorage after 1 hour
       localStorage.clear();
       localStorage.setItem("setupTime", now);
     }
   }
   setLoading(false);

   setAmmount("");
   setSelectedSize("");
  };

  
  
  return (
    <div>
      <NavBar />
      <div className="w-full flex justify-center bg-white">
        {loading ? (
          <Spinner />
        ) : (
          <div className="pt-6">
            <div className="flex flex-col md:flex-row mt-6 ">
              <div className="max-w-sm mx-2">
                <Carousel useKeyboardArrows={true} statusFormatter={() => {}}>
                  {product.images &&
                    product.images.map((url, index) => (
                      <div key={index}>
                        <img
                          src={url}
                          className="cursor-pointer p-1 object-cover w-full"
                        />
                      </div>
                    ))}
                </Carousel>
              </div>

              <div className="flex justify-center max-w-sm px-4 pb-16">
                <div>
                  <div>
                    <h1 className="text-2xl font-bold  text-gray-900 ">
                      {product.name}
                    </h1>
                  </div>
                  <p className="text-sm font-bold pt-2 text-gray-900 whitespace-nowrap">
                    {product.price} KM
                  </p>

                  <form className="mt-10" onSubmit={handleAddToCart}>
                    <div className="mt-10 px-3 border-y-[1px] pb-3 border-black">
                      <div className="flex items-center justify-between">
                        <h3 className=" font-medium text-gray-900">
                          Veličina:
                        </h3>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-3">
                        {product.sizes &&
                          product.sizes.map(
                            (size, index) =>
                              size &&
                              size.inStock && (
                                <div key={index}>
                                  <input
                                    type="checkbox"
                                    id={`size-${index}`}
                                    value={size.name}
                                    checked={selectedSize === size.name}
                                    onChange={() =>
                                      handleSizeSelection(size.name)
                                    }
                                    className="hidden"
                                  />
                                  <label
                                    htmlFor={`size-${index}`}
                                    className={`border border-gray-300 rounded-md p-2 cursor-pointer ${
                                      selectedSize === size.name
                                        ? "bg-gray-300"
                                        : ""
                                    }`}
                                  >
                                    {size.name}
                                  </label>
                                </div>
                              )
                          )}
                      </div>
                      <div className="pt-3">
                        <p>Količina:</p>
                        <input
                          onChange={(e) => setAmmount(e.target.value)}
                          value={ammount}
                          type="number"
                          placeholder="max. 100"
                          className="border border-black px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="mt-5 flex lg:w-full items-center whitespace-nowrap justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none"
                    >
                      Dodaj u korpu
                    </button>
                  </form>
                  <div className="py-1">
                    <div>
                      <h3 className="py-3 text font-medium text-gray-900 ">
                        Opis:
                      </h3>

                      <div>
                        <p className="text-gray-900 text-sm">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
