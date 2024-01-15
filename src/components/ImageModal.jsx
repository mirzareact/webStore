import { IoClose } from "react-icons/io5";

const ImageModal = ({ imageUrl, onClose }) => {
  return (
    <div
      className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center"
    >
      <div
        className="absolute top-0 left-0 w-full h-full bg-black opacity-75"
        onClick={onClose}
      ></div>
      <button
        className="absolute top-2 z-50 right-2 p-2 cursor-pointer rounded-full text-3xl"
        onClick={onClose}
      >
        <IoClose style={{ color: "gray" }} />
      </button>
      <div className="flex justify-center items-center h-full z-10">
        <img src={imageUrl} className="object-contain h-full max-w-full" />
      </div>
    </div>
  );
};

export default ImageModal;
