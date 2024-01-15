import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import imgOne from "../images/1.jpg";
import imgTwo from "../images/2.jpg";
import imgThree from "../images/3.jpg";
import mainImage from "../images/main.jpg";

const Galerija = () => {
  const images = [mainImage, imgOne, imgTwo, imgThree];

  return (
    <div className="w-full">
      <div className="pl-10 text-5xl text-fawn-400 font-bold">Galerija</div>
      <div className="flex justify-center">
        <div className=" m-10 max-w-2xl gap-3">
          <Carousel useKeyboardArrows={true} statusFormatter={() => {}}>
            {images &&
              images.map((url, index) => (
                <div key={index}>
                  <img
                    src={url}
                    className="cursor-pointer p-1 object-cover w-full"
                  />
                </div>
              ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Galerija;
