import { Navigate } from "react-router-dom";
import App from "./App.jsx";
import ErrorPage from "./ErrorPage.jsx";
import Homepage from "./Homepage.jsx";
import Products from "./Products.jsx";
import Cart from "./Cart.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="/homepage" /> },
      { path: "/homepage", element: <Homepage /> },
      { path: "/products", element: <Products /> },
      { path: "/cart", element: <Cart /> },
    ],
  },
];

export default routes;
