import { Navigate } from "react-router-dom";
import App from "./App.jsx";
import Error from "./Error/Error.jsx";
import Home from "./Home/Home.jsx";
import Shop from "./Shop/Shop.jsx";
import Cart from "./Cart/Cart.jsx";
import Checkout from "./Checkout/Checkout.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Navigate to="/home" /> },
      { path: "/home", element: <Home /> },
      { path: "/shop", element: <Shop /> },
      { path: "/cart", element: <Cart /> },
      { path: "/checkout", element: <Checkout /> },
    ],
  },
];

export default routes;
