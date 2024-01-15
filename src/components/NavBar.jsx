import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { PiBagSimple } from "react-icons/pi";
import logo from "../images/logo.png"
import { useState, useEffect } from "react";
import Checkout from "./Checkout";
const NavBar = () => {

  const [checkoutModal, setCheckoutModal] = useState(false)
  
  const handleModal = () => {
    setCheckoutModal(true);
  }

  const handleModalClose = () => {
    setCheckoutModal(false)
  }

  useEffect(() => {
  if (checkoutModal) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
}, [checkoutModal]);
    
    return (
      <div>
        {checkoutModal ? <Checkout handleModalClose={handleModalClose} checkoutModal={checkoutModal} /> : null}
        <div className="flex w-full items-center justify-around py-4 font-link border-b-[1px] border-green_blue-200">
          <div>
            <Link to={"/"} className="font-bold uppercase">
              <img className="max-w-[100px]" src={logo} />
            </Link>
          </div>
          <div className="flex items-center">
            <div className="pl-1 flex justify-end text-3xl gap-1">
              <p className="cursor-pointer" onClick={handleModal}>
                <PiBagSimple />
              </p>
            </div>
          </div>
        </div>
      </div>
    );
};

export default NavBar;
