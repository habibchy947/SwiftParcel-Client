import MainLayout from "@/Layouts/MainLayout";
import ErrorPage from "@/Pages/ErrorPage";
import Home from "@/Pages/Home";
import Login from "@/Pages/Login";
import SignUp from "@/Pages/SignUp";
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
        },
        {
          path: 'signUp',
          element: <SignUp></SignUp>
        },
        {
          path: 'login',
          element: <Login></Login>
        }
      ]
    },
  ]);

export default router