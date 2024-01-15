import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Kontakt = () => {
  return (
    <div className="w-full bg-fawn-400 pb-5">
      <h1 className="text-5xl font-bold text-white text-right pr-10 pt-3">
        Kontakt
      </h1>
      <div className="flex justify-around m-10">
        <div>
          <h1 className="text-xl">Radno vrijeme:</h1>
          Ponedjeljak: 07:00 - 15:30 <br /> Utorak: 07:00 - 15:30 <br />{" "}
          Srijeda: 07:00 - 15:30 <br /> Četvrtak: 07:00 - 15:30 <br /> Petak:
          07:00 - 15:30 <br /> Subota: Zatvoreno <br /> Nedjelja: Zatvoreno
        </div>
        <div>
          <p className="flex items-center gap-1">
            <FaLocationDot />
            Bratstva Jedinstva bb, Kakanj, Bosnia and Herzegovina
          </p>
          <p className="flex items-center gap-1 ">
            <FaPhoneAlt />
            032 558-946
          </p>
          <p className="flex items-center gap-1 ">
            <MdOutlineEmail />
            inkoskakanj@gmail.com
          </p>
        </div>
        <div className="flex text-5xl items-center gap-1 ">
          <a
            href="https://www.facebook.com/inkoskakanj?locale=hr_HR"
            className="hover:opacity-70"
          >
            <FaFacebookSquare />
          </a>
          <a
            href="https://www.instagram.com/inkoskakanj/?hl=en"
            className="hover:opacity-70"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Kontakt;
