import DashboardLayout from "@/Layouts/DashboardLayout";
import MainLayout from "@/Layouts/MainLayout";
import ErrorPage from "@/Pages/ErrorPage";
import Home from "@/Pages/Home";
import Login from "@/Pages/Login";
import SignUp from "@/Pages/SignUp";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import BookParcel from "@/Pages/User/BookParcel";

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
    // dashboard
    {
      path: '/dashboard',
      element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
      children: [
        {
          path: 'bookParcel',
          element: <BookParcel></BookParcel>
        }
      ]
    }
  ]);

export default router