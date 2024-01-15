import { useState, useEffect } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { FaImages } from "react-icons/fa";
import Spinner from "./Spinner";
import { useParams, useNavigate } from "react-router-dom";
import { BACKENDLOCALHOSTURL } from "../../backend/config";

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [productID, setProductID] = useState(product.productID || "")
  const [name, setName] = useState(product.name || "");
  const [price, setPrice] = useState(product.price || "");
  const [description, setDescription] = useState(product.description || "");
  const [images, setImages] = useState(product.images || []);
  const [sizes, setSizes] = useState(product.sizes || []);
  const [loading, setLoading] = useState(false);

  const velicine = ["39", "40", "41", "42", "43", "44", "45", "46"];

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BACKENDLOCALHOSTURL}/proizvodi/${id}`)
      .then((response) => {
        setProduct(response.data);
        setProductID(response.data.productID);
        setName(response.data.name);
        setPrice(response.data.price);
        setDescription(response.data.description);
        setImages(response.data.images);
        setSizes(response.data.sizes);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  const handleEdit = (e) => {
    e.preventDefault();
    const data = {
      productID: productID,
      name: name,
      price: price,
      description: description,
      images: images,
      sizes: sizes,
    };
    setLoading(true);
    axios
      .put(`${BACKENDLOCALHOSTURL}/proizvodi/${product._id}`, data)
      .then(() => {
        alert("Uspjesno izmjenjeno");
        setLoading(false);
      })
      .catch((err) => {
        alert(err.message);
        setLoading(false);
      });

    navigate("/admin-panel");
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
   setSizes((prevSizes) => {
     const updatedSizes = [...prevSizes]; // Create a copy of the sizes array
     updatedSizes[sizeIndex] = { ...updatedSizes[sizeIndex], inStock }; // Update the specific size object
     return updatedSizes; // Return the updated array to setSizes
   });
 };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
  });
  return (
    <div className="flex justify-center">
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <h1 className="text-center font-bold text-4xl pt-5">
            Izmjeni proizvod
          </h1>
          <div className="max-w-4xl m-10">
            <form className="space-y-4" onSubmit={handleEdit}>
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
                        className="cursor-pointer"
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
                Izmjeni proizvod
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProduct;
