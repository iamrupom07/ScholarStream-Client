import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "https://scholar-stream-server-tau.vercel.app",
});

const useAxiosSecure = () => {
  const { user, signOutUser } = useAuth();
  const nagivate = useNavigate();
  useEffect(() => {
    // intercept request to add auth token
    const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;

      return config;
    });

    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
        const stausCode = error.status;
        if (stausCode === 401 || stausCode === 403) {
          signOutUser().then(() => {
            nagivate("/login");
          });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user]);
  return axiosSecure;
};

export default useAxiosSecure;
