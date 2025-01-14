import MainLayout from "@/Layouts/MainLayout";
import ErrorPage from "@/Pages/ErrorPage";
import Home from "@/Pages/Home";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage></ErrorPage>,
      element: <MainLayout></MainLayout>,
      children: [
        {
          path: '/',
          element: <Home></Home>
        }
      ]
    },
  ]);

export default router