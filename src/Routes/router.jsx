import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import HomePage from "../Pages/Home/HomePage/HomePage";
import LoginPage from "../Components/Auth/Login/LoginPage";
import RegisterPage from "../Components/Auth/Register/RegisterPage";
import AllScholarshipsPage from "../Pages/AllScholarshipsPage/AllScholarshipsPage";
import PrivateRoute from "./PrivateRoute";
import ScholarshipDetailsPage from "../Pages/ScholarshipDetailsPage/ScholarshipDetailsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        loader: () => fetch("http://localhost:3000/featured-scholarships"),
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
        loader: () => fetch("http://localhost:3000/scholarships"),
        Component: AllScholarshipsPage,
      },
      {
        path: "/scholarship",
        element: (
          <PrivateRoute>
            <ScholarshipDetailsPage></ScholarshipDetailsPage>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
