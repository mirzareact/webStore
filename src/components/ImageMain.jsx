import mainImage from "../images/main.jpg"

const ImageMain = () => {
  return (
    <div className=" flex w-full justify-center items-center h-screen">
      <div className="max-w-96">
        <img
          src={mainImage}
          alt="Zgrada firme Inkos Kakanj d.o.o"
          className="mx-auto opacity-0 transform -translate-y-10 transition-opacity duration-1000 ease-in-out delay-300"
          onLoad={(e) => {
            e.target.classList.remove("opacity-0");
            e.target.classList.add("opacity-100", "translate-y-0");
          }}
        />
      </div>
    </div>
  );
}

export default ImageMain