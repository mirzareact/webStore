import Title from "../components/Title";
import ImageMain from "../components/ImageMain";
import NaseUsluge from "../components/NaseUsluge";
import Galerija from "../components/Galerija";
import Kontakt from "../components/Kontakt";

const ONama = () => {
  return (
    <div className="">
      <div className="lg:flex">
        <div className="pl-10">
          <Title />
        </div>
        <div className="w-full">
          <ImageMain />
        </div>
      </div>
      <div>
        <NaseUsluge />
      </div>
      <div>
        <Galerija />
      </div>
      <div>
        <Kontakt />
      </div>
    </div>
  );
};

export default ONama;
