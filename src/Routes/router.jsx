import DashboardLayout from "@/Layouts/DashboardLayout";
import MainLayout from "@/Layouts/MainLayout";
import ErrorPage from "@/Pages/ErrorPage";
import Home from "@/Pages/Home";
import Login from "@/Pages/Login";
import SignUp from "@/Pages/SignUp";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import BookParcel from "@/Pages/User/BookParcel";
import MyParcel from "@/Pages/User/MyParcel";
import MyProfile from "@/Pages/User/MyProfile";
import AdminRoute from "./AdminRoute";
import Statistics from "@/Pages/Admin/Statistics";
import UpdateParcel from "@/Pages/User/UpdateParcel";
import CheckOut from "@/Pages/User/CheckOut";
import PaymentSuccess from "@/Pages/User/PaymentSuccess";

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
      // admin route
      {
        path: 'statistics',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Statistics></Statistics>
            </AdminRoute>
          </PrivateRoute>
        )
      },
      // user route
      {
        path: 'bookParcel',
        element: (
          <PrivateRoute>
            <BookParcel></BookParcel>
          </PrivateRoute>
        )
      },
      {
        path: 'myParcel',
        element: (
          <PrivateRoute>
            <MyParcel></MyParcel>
          </PrivateRoute>
        )
      },
      {
        path: 'updateParcel/:id',
        element: (
          <PrivateRoute>
            <UpdateParcel></UpdateParcel>
          </PrivateRoute>
        )
      },
      {
        path: 'checkout/:id',
        element: (
          <PrivateRoute>
            <CheckOut></CheckOut>
          </PrivateRoute>
        )
      },
      {
        path: 'paymentSuccess',
        element: (
          <PrivateRoute>
            <PaymentSuccess></PaymentSuccess>
          </PrivateRoute>
        )
      },
      {
        path: 'myProfile',
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        )
      },
      // deliveryMen route
    ]
  }
]);

export default router