import pdf from "../documents/pravila_privatnosti.pdf"
import logo from "../images/logo.png";

const Footer = () => {


  return (
    <div className="w-full dark:bg-gray-900">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center uppercase text-2xl font-semibold whitespace-nowrap dark:text-white">
              <img
                className="max-w-[100px] bg-transparent"
                src={logo}
                style={{ filter: "invert(1)" }}
              />
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a
                href="/o-nama"
                className="hover:underline me-4 md:me-6 cursor-pointer"
              >
                O nama
              </a>
            </li>
            <li>
              <a
                target="_blank"
                className="hover:underline me-4 md:me-6 cursor-pointer"
                href={pdf}
              >
                Politika privatnosti
              </a>
            </li>
            <li>
              <a href="/kontakt" className="hover:underline cursor-pointer">
                Kontakt
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a href="/" className="hover:underline">
            "Inkos" Export - Import d.o.o Kakanj
          </a>
          . Sva prava zadržana. Napravio:{" "}
          <a
            href="https://www.linkedin.com/in/mirza-hod%C5%BEi%C4%87-7157aa229/"
            className="hover:underline"
          >
            Mirza Hodžić
          </a>
        </span>
      </div>
    </div>
  );
};

export default Footer;
