import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaImages } from "react-icons/fa";
import axios from "axios";
import Spinner from "./Spinner";
import { Buffer } from "buffer";
Buffer.from("anything", "base64");
import { BACKENDLOCALHOSTURL } from "../../backend/config";

const CreateArticleForm = () => {
  const [productID, setProductID] = useState("")
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);

  const velicine = ["39", "40", "41", "42", "43", "44", "45", "46"];

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      productID: productID,
      name: name,
      price: price,
      description: description,
      images: images,
      sizes: sizes,
    };
    console.log(data);
    axios
      .post(`${BACKENDLOCALHOSTURL}/proizvodi`, data)
      .then(() => {
        alert("Uspjesno");
        setLoading(false);
      })
      .catch((err) => {
        alert(err.message);
        setLoading(false);
      });
    setProductID("")
    setName("");
    setPrice("");
    setDescription("");
    setImages([]);
    setSizes([{}]);
  };

  const handleDrop = (acceptedFiles) => {
    acceptedFiles.map((file, index) => {
      const reader = new FileReader();

      reader.onload = () => {
        setImages((prevImages) => {
          const updatedImages = [...prevImages];
          updatedImages[index] = reader.result;
          return updatedImages;
        });
      };

      reader.readAsDataURL(file);
    });
    };
    
     const handleSizeChange = (sizeIndex, inStock) => {
       const updatedSizes = [...sizes];
       updatedSizes[sizeIndex] = { name: velicine[sizeIndex], inStock };
       setSizes(updatedSizes);
     };

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop });

  return (
    <div className="font-link max-w-md min-w-[350px] p-6 bg-white rounded-md shadow-md">
      <h2 className="text-xl mb-4 font-semibold">Dodaj novi proizvod</h2>
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">ID:</label>
            <input
              type="text"
              value={productID}
              onChange={(e) => setProductID(e.target.value)}
              placeholder="Unesi id"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Naziv:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Unesi naziv"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Cijena:</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Unesi cijenu"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Opis:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Unesi opis"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Veličine:</label>
            {velicine.map((e, index) => (
              <div key={index}>
                <label className="flex">
                  {<p className="text-xl pr-2">{e}: </p>}

                  <input
                    type="checkbox"
                    checked={sizes[index]?.inStock || false}
                    onChange={(event) =>
                      handleSizeChange(index, event.target.checked)
                    }
                  />
                </label>
              </div>
            ))}
          </div>
          <div {...getRootProps()} className="flex items-center space-x-2">
            <label className="block mb-1 font-medium">Slike:</label>
            <div className="cursor-pointer border border-gray-300 rounded-md p-2 flex items-center">
              <input {...getInputProps()} />
              <FaImages className="mr-2" />
              <span>Ubaci slike</span>
            </div>
          </div>
          <div>
            {images.length > 0 && (
              <div>
                <h3 className="font-medium mt-4 mb-2">Ubačene slike:</h3>
                <div className="grid grid-cols-2 gap-4">
                  {images.map((base64String, index) => (
                    <img
                      key={index}
                      src={base64String}
                      alt={`Uploaded ${index}`}
                      className="w-full h-auto rounded-md"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md transition duration-300"
          >
            Dodaj proizvod
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateArticleForm;
