import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "./pages/_layouts/app";

import { Dashboard } from "./pages/app/dashboard";
import { Categories } from "./pages/app/categories";
import { Products } from "./pages/app/products";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/products",
        element: <Products />,
      },
    ],
  },
]);
