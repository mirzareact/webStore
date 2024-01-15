import { useRoutes } from 'react-router-dom'
import './App.css'

import Home from './pages/Home';
import ProductPage from "./pages/ProductPage"
import AdminPage from './pages/AdminPage';
import EditProduct from './components/EditProduct';
import ONama from "./pages/ONama"
import Kontakt from './pages/Kontakt';

function App() {
  const routeResult = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/proizvodi/:id", element: <ProductPage /> },
    { path: "/admin-panel", element: <AdminPage /> },
    {
      path: "admin-panel/proizvodi/:id/edit",
      element: <EditProduct />,
    },
    {
      path: "o-nama",
      element: <ONama />,
    },
    {
      path: "kontakt",
      element: <Kontakt />,
    },
  ]);

  return routeResult;
}

export default App
