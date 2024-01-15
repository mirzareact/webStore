import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import Spinner from "./Spinner";
import CartProduct from "./CartProduct";
import getStripe from "./getStripe";
import { BACKENDLOCALHOSTURL } from "../../backend/config";

const Checkout = ({ handleModalClose, checkoutModal }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalToPay, setTotalToPay] = useState(0);

  const calculateTotal = (cartItems) => {
    let total = 0;

    cartItems.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    return total;
  };

  useEffect(() => {
    const fetchCartData = async () => {
      setLoading(true);

      try {
        const storedCartData = localStorage.getItem("cart");
        if (storedCartData) {
          const parsedCartData = JSON.parse(storedCartData);
          setData(parsedCartData);

          const initialTotal = calculateTotal(parsedCartData);
          setTotalToPay(initialTotal);
        }
      } catch (error) {
        console.error("Error in localStorage:", error.message);
      }

      setLoading(false);
    };

    fetchCartData();
  }, []);

  const handleRemoveItem = (itemToRemove) => {
    const updatedCartData = data.filter((item) => item !== itemToRemove);

    const newTotal = calculateTotal(updatedCartData);
    setTotalToPay(newTotal);

    setData(updatedCartData);
    localStorage.setItem("cart", JSON.stringify(updatedCartData));
  };
console.log(data);
  const handlePay = async () => {
    const stripe = await getStripe();
    
    const lineItems = data.map((item) => ({
      price: item.product.productID,
      quantity: item.quantity,
    }));

    const response = await fetch(`${BACKENDLOCALHOSTURL}/checkout-stripe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lineItems: lineItems,
      }),
    });

    const session = await response.json();

    // Redirect to Checkout using the retrieved session ID
    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };

  const handleModalCloseClick = () => {
    document.body.style.overflow = "auto";
    handleModalClose();
  };

  return (
    <div
      className={`fixed top-0 right-0 w-full h-full bg-black bg-opacity-50 z-40 transition-all duration-500 transform ${
        checkoutModal ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="fixed top-0 right-0 min-w-96 h-full z-50 bg-white rounded shadow-lg overflow-y-auto">
        <div className="text-3xl font-extralight py-5 px-8 flex justify-end">
          <IoClose onClick={handleModalCloseClick} className="cursor-pointer" />
        </div>
        <div className="text-black text-3xl p-5 font-extralight">
          {loading ? (
            <Spinner />
          ) : (
            <div>
              {data.length==0  ? (
                <div>Korpa je prazna</div>
              ) : (
                <div>
                  {data.map((product, index) => (
                    <CartProduct
                      key={index}
                      product={product}
                      onRemove={handleRemoveItem}
                    />
                  ))}

                  <div className="mt-10 text-xl border-t-[2px] border-black">
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center">
                        <h1 className="p-3">Ukupno: </h1>
                        <h1>{totalToPay} KM</h1>
                      </div>
                      <div>
                        <button
                          onClick={handlePay}
                          className="py-2 px-4 mr-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                        >
                          Plati
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
