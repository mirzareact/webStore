import AddProduct from "../components/AddProduct";
import ListProducts from "../components/ListProducts";

const AdminPage = () => {
  return (
    <div className="flex w-full justify-center mt-5">
      <div className="mb-3 sm:mb-0">
        <AddProduct />
      </div>
      <div>
        <ListProducts />
      </div>
    </div>
  );
};

export default AdminPage;
