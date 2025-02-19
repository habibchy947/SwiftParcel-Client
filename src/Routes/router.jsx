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
import DeliveryMenRoute from "./DeliveryMenRoute";
import MyDeliveryList from "@/Pages/DeliveryMen/MyDeliveryList";
import AllUsers from "@/Pages/Admin/AllUsers";
import AllParcels from "@/Pages/Admin/AllParcels";
import AllDeliveryMen from "@/Pages/Admin/AllDeliveryMen";
import MyReviews from "@/Pages/DeliveryMen/MyReviews";
import Support from "@/Pages/Support";
import TeamMembers from "@/Pages/TeamMembers";
import BlogDetails from "@/Pages/BlogDetails";

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
      },
      {
        path: '/support',
        element: <Support/>
      },
      {
        path: '/team',
        element: <TeamMembers/>
      },
      {
        path: '/blog/:id',
        element: <BlogDetails/>,
      },
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
          <AdminRoute>
            <Statistics></Statistics>
          </AdminRoute>
        )
      },
      {
        path: 'allParcels',
        element: (
          <AdminRoute>
            <AllParcels></AllParcels>
          </AdminRoute>
        )
      },
      {
        path: 'allDeliveryMen',
        element: (
          <AdminRoute>
            <AllDeliveryMen/>
          </AdminRoute>
        )
      },
      {
        path: 'allUsers',
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        )
      },
      // delivery men route
      {
        path: 'myDeliveryList',
        element: (
        <DeliveryMenRoute>     
          <MyDeliveryList></MyDeliveryList>
        </DeliveryMenRoute>
        )
      },
      {
        path: 'myReviews',
        element: (
        <DeliveryMenRoute>     
          <MyReviews></MyReviews>
        </DeliveryMenRoute>
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