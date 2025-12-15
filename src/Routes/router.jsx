import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import HomePage from "../Pages/Home/HomePage/HomePage";
import LoginPage from "../Components/Auth/Login/LoginPage";
import RegisterPage from "../Components/Auth/Register/RegisterPage";
import AllScholarshipsPage from "../Pages/AllScholarshipsPage/AllScholarshipsPage";

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
    ],
  },
]);
