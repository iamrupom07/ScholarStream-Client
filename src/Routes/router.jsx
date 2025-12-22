import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import HomePage from "../Pages/Home/HomePage/HomePage";
import LoginPage from "../Components/Auth/Login/LoginPage";
import RegisterPage from "../Components/Auth/Register/RegisterPage";
import AllScholarshipsPage from "../Pages/AllScholarshipsPage/AllScholarshipsPage";
import PrivateRoute from "./PrivateRoute";
import ScholarshipDetailsPage from "../Pages/ScholarshipDetailsPage/ScholarshipDetailsPage";
import DashboardLayout from "../Layouts/DashboardLayout";
import DashboardMainContent from "../Pages/Dashboard/DashboardMainContent/DashboardMainContent";
import MyProfilePage from "../Pages/Dashboard/Profile/MyProfilePage";
import AppliedScholarshipsPage from "../Pages/Dashboard/AppliedScholarshipsPage/AppliedScholarshipsPage";
import ApplyScholarship from "../Pages/ApplyScholarshipPage/ApplyScholarship";
import PaymentSuccess from "../Components/Payment/PaymentSuccess";
import PaymentHistory from "../Components/Payment/PaymentHistory";
import UserManagement from "../Pages/Dashboard/UserManagement/UserManagement";
import AdminRoute from "./AdminRoute";
import AdminOverview from "../Pages/Dashboard/AdminOverview/AdminOverview";
import MyApplications from "../Pages/Dashboard/MyApplications/MyApplications";
import AdminModeratorRoute from "./AdminModeratorRoute";
import MyReviews from "../Pages/Dashboard/MyReviews/MyReviews";
import PaymentCancel from "../Components/Payment/PaymentCancel";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,

        Component: HomePage,
      },
      {
        path: "/login",
        Component: LoginPage,
      },
      {
        path: "/register",
        Component: RegisterPage,
      },
      {
        path: "/all-scholarships",

        Component: AllScholarshipsPage,
      },
      {
        path: "/scholarship/:id",

        element: (
          <PrivateRoute>
            <ScholarshipDetailsPage></ScholarshipDetailsPage>
          </PrivateRoute>
        ),
      },
      {
        path: "/scholarship/application/:id",
        loader: ({ params }) =>
          fetch(
            `https://scholar-stream-server-b2arci1hp-rupom-s-projects.vercel.app/scholarships/${params.id}`
          ),
        Component: ApplyScholarship,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardMainContent,
      },
      {
        path: "/dashboard/myprofile",
        Component: MyProfilePage,
      },
      {
        path: "/dashboard/applied-scholarships",
        element: (
          <AdminModeratorRoute>
            <AppliedScholarshipsPage></AppliedScholarshipsPage>
          </AdminModeratorRoute>
        ),
      },
      {
        path: "/dashboard/my-applications",
        Component: MyApplications,
      },
      {
        path: "/dashboard/payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "/dashboard/payment-cancel",
        Component: PaymentCancel,
      },
      {
        path: "/dashboard/payment-history",
        Component: PaymentHistory,
      },
      {
        path: "/dashboard/my-reviews",
        Component: MyReviews,
      },
      {
        path: "/dashboard/user-management",
        element: (
          <AdminRoute>
            <UserManagement></UserManagement>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/admin-stats",
        element: (
          <AdminRoute>
            <AdminOverview></AdminOverview>
          </AdminRoute>
        ),
      },
    ],
  },
]);
