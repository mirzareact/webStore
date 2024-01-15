import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { FaRegCopyright } from "react-icons/fa";

const BurgerMenu = ({ isOpen, onClose }) => {
  const [openMenu, setOpenMenu] = useState(isOpen);

  useEffect(() => {
    setOpenMenu(isOpen);
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  const handleBackgroundClick = (e) => {
    if (e.target.classList.contains("bg-opacity-0")) {
      onClose();
    }
  };
  if (!isOpen) return null;

  return (
    <div
      onClick={handleBackgroundClick}
      className={`fixed top-0 left-0 w-full h-full  bg-black bg-opacity-0 z-50 overflow-hidden transition-transform duration-300 transform ${
        openMenu ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="transform transition-all duration-300 fixed left-0 h-full w-1/2 bg-white w-[calc(100% / 3)] p-4 pt-3 rounded shadow-lg overflow-y-auto">
        <div className="flex justify-end text-2xl">
          <button onClick={onClose}>
            <IoCloseSharp style={{ color: "red" }} />
          </button>
        </div>

        <div className="block pl-3">
          <div className="block gap-5 text-xl pt-10 items-center font-semibold">
            <Link to={"/muskarci"} className="hover:underline">
              Muškarci
            </Link>
            <br />
            <Link to={"/zene"} className="hover:underline">
              Žene
            </Link>
            <br />
            <Link to={"/djeca"} className="hover:underline">
              Djeca
            </Link>
            <br />
            <Link to={"/o-nama"} className="hover:underline">
              O nama
            </Link> <br />
            <Link to={"/kontakt"} className="hover:underline">
              Kontakt
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full text-center pb-4">
          <div className="flex w-full text-center items-center justify-center gap-1">
            <h1 className="text-xl">INKOS KAKANJ</h1> <FaRegCopyright className="mb-1"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;
