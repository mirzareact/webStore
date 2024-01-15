import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";
import { MdDelete } from "react-icons/md";
import { FaLink } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import ImageModal from "../components/ImageModal";
import { BACKENDLOCALHOSTURL } from "../../backend/config";

const ListProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const [articleIdToDelete, setArticleIdToDelete] = useState(null); // Store article ID to delete
  const [showModalImage, setShowModalImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const openModalImage = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowModalImage(true);
  };

  const closeModal = () => {
    setShowModalImage(false);
  };

  const showModalToDelete = (id) => {
    setShowModal(true);
    setArticleIdToDelete(id);
  };

  const hideModal = () => {
    setShowModal(false);
    setArticleIdToDelete(null);
  };

  const confirmDelete = () => {
    if (articleIdToDelete) {
      deleteArticle(articleIdToDelete);
    }
  };

  const deleteArticle = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${BACKENDLOCALHOSTURL}/proizvodi/${id}`);
      setLoading(false);
      window.location.reload(false);
    } catch (err) {
      setLoading(false);
      alert(err);
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BACKENDLOCALHOSTURL}/proizvodi`)
      .then((response) => {
        setData(response.data.data.reverse());
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert(err.message);
      });
  }, []);

    
  return (
    <div>
      {showModal && (
        <div className="font-link fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <p className="mb-4">
              Da li ste sigurni da želite obrisati proizvod?
            </p>
            <div className="flex justify-between">
              <button
                className="bg-blue-500 text-white rounded-md px-3 py-1"
                onClick={hideModal}
              >
                Poništi
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white rounded-md px-3 py-1"
              >
                Obriši
              </button>
            </div>
          </div>
        </div>
      )}
      {loading ? (
        <Spinner />
      ) : (
        <table className="font-link border-separate border-spacing-2 overflow-x-auto">
          <thead className="rounded">
            <tr>
              <th className="border rounded-md p-1 border-slate-600 ">ID</th>
              <th className="border rounded-md p-1 border-slate-600 ">Naziv</th>
              <th className="border rounded-md p-1 border-slate-600  ">
                Cijena
              </th>
              <th className="border rounded-md p-1 border-slate-600  ">Opis</th>
              <th className="border rounded-md p-1 border-slate-600  ">
                Slike
              </th>
              <th className="border rounded-md p-1 border-slate-600  ">
                U zalihama
              </th>
              <th className="border rounded-md p-1 border-slate-600  ">Link</th>
              <th className="border rounded-md p-1 border-slate-600 ">
                Operacije
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((product) => {
              return (
                <tr key={product._id} className="h-8">
                  <td className="border border-slate-700 rounded-md text-center">
                    <p className="p-1">{product.productID}</p>
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    <p className="p-1">{product.name}</p>
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    <p className="p-1">{product.price}</p>
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    <p className="p-1">Vidi u edit dijelu</p>
                  </td>
                  <td className="border flex border-slate-700 justify-center rounded-md text-center">
                    {product.images.map((imageUrl, i) => (
                      <div key={i}>
                        <img
                          src={imageUrl}
                          onClick={() => openModalImage(imageUrl)}
                          className="h-16 p-[3px] cursor-pointer"
                        />
                        {showModalImage && (
                          <ImageModal
                            imageUrl={selectedImage}
                            onClose={closeModal}
                          />
                        )}
                      </div>
                    ))}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    <p className="p-1">
                      {product.sizes &&
                        product.sizes.map(
                          (size, index) =>
                            size &&
                            size.inStock && (
                              <span key={index}>{size.name}, </span>
                            )
                        )}
                    </p>
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    <p className="p-1 flex justify-center">
                      <Link to={`/proizvodi/${product._id}`}>
                        <FaLink />
                      </Link>
                    </p>
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    <div className="flex justify-center gap-4">
                      <Link to={`/admin-panel/proizvodi/${product._id}/edit`}>
                        <MdModeEdit
                          className="cursor-pointer"
                          style={{ color: "yellow" }}
                        />
                      </Link>
                      <button onClick={() => showModalToDelete(product._id)}>
                        <MdDelete
                          className="cursor-pointer"
                          style={{ color: "red" }}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListProduct;
