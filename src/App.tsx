import { RouterProvider } from "react-router-dom";

import { Toaster } from "./components/ui/sonner";

import { router } from "./routes";

import { CategoriesProvider } from "./contexts/CategoryContext";

import "./global.css";

export function App() {
  return (
    <CategoriesProvider>
      <Toaster />
      <RouterProvider router={router} />
    </CategoriesProvider>
  );
}
