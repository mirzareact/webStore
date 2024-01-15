import { useState, useEffect } from "react";
import imgOne from "../images/1.jpg";
import imgTwo from "../images/2.jpg";
import imgThree from "../images/3.jpg";

const NaseUsluge = () => {
  const images = [imgOne, imgTwo, imgThree];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div>
      <div className="m-10 flex justify-center flex-col md:flex-row relative h-lvh">
        <div className="flex items-center justify-center w-full md:w-1/2 overflow-hidden">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Slika ${index + 1}`}
              className={`w-full absolute ${
                index === currentImage ? "opacity-100" : "opacity-0"
              } transition-opacity duration-500 ease-in-out`}
              style={{
                zIndex: index === currentImage ? 1 : 0,
                maxWidth: "30%",
              }}
            />
          ))}
        </div>
        <div className=" flex md:w-1/2 justify-center items-center">
          <div className="mt-10">
            <h1 className="text-5xl font-bold text-green_blue-600 text-center">
              Naše usluge
            </h1>
            <p className="p-10 text-xl">
              INKOS d.o.o Kakanj je preduzeće koja posluje dugi niz godina na
              polju proizvodnje i prodaje radne odjeće i obuće. Osnovana 2008.
              godine sa više od 40 zaposlenih, uključujući ozbiljne i odgovorne
              kooperante, uspijeva odgovoriti potrebama kupaca u svakom
              trenutku. Pored osnovne djelatnosti INKOS d.o.o. je kompanija koja
              vrši prijevoz rasutih tereta sa licencom međunarodnog cestovnog
              prijevoza.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NaseUsluge;
