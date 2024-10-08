import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ProductPage from "./pages/Product/ProductPage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import ProductDetailPage from "./pages/Product/ProductDetail.jsx";
import Confirmation from "./pages/Product/Confirmation.jsx";
import OrderPage from "./pages/user/OrderPage.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    children: [
      {
        element: <HomePage />,
        path: "/",
      },
      {
        element: <ProductPage />,
        path: "/product",
      },
      {
        element:<ProductDetailPage/>,
        path:"/product/:name"
      },
      {
        element:<Confirmation/>,
        path:"/confirmation"
      },
      {
        element:<OrderPage/>,
        path:"/order"
      }
    ],
  },
  {
    element: <LoginPage />,
    path: "/login",
  },
  {
    element: <RegisterPage />,
    path: "/register",
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
