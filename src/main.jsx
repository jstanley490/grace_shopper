import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/index.css";
import "./styles/navbar.css";
import "./styles/account-form.css";
import "./styles/cart.css";
import "./styles/listings.css";
import Root from "./root";
import ErrorPage from "./error-page";
import Homepage from "./components/homepage";
import Login from "./components/login";
import Register from "./components/register";
import Cart from "./components/cart";
import Profile from "./components/accounts";
import Merch from "./components/merch";
import Treats from "./components/treats";
import IndividualTreat from "./components/individualTreat";
import IndividualMerch from "./components/individualMerch";
import Accounts from "./components/accounts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/merch/:merchId",
        element: <IndividualMerch />,
      },
      {
        path: "/:treatId",
        element: <IndividualTreat />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/merch",
        element: <Merch />,
      },
      {
        path: "/accounts",
        element: <Accounts />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/treats",
        element: <Treats />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
