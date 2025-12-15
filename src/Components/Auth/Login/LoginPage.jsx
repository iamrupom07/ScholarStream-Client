import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser } = useAuth();
  const handelLogin = (data) => {
    console.log(data);
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.error("Login Error:", error);
      });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 p-4">
      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <div className="card-body p-8 sm:p-10">
          <h2 className="text-3xl font-bold text-center mb-6 text-primary">
            Welcome Back
          </h2>

          <form onClick={handleSubmit(handelLogin)}>
            {/* Email Field */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="you@example.com"
                className="input input-bordered w-full"
              />
              {errors.email?.type === "required" && (
                <span className="text-red-500 text-sm">Email is required</span>
              )}
            </div>

            {/* Password Field */}
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full"
                {...register("password", { required: true })}
              />
              {errors.password?.type === "required" && (
                <span className="text-red-500 text-sm">
                  Password is required
                </span>
              )}
              <label className="label justify-end">
                <a
                  href="#"
                  className="label-text-alt link link-hover text-sm text-primary"
                >
                  Forgot password?
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary btn-block">
                Login
              </button>
            </div>
          </form>

          {/* OR Divider */}
          <div className="divider text-gray-400 my-6">OR</div>

          {/* Social Login Section */}
          <SocialLogin></SocialLogin>
          <p className="text-center text-sm mt-8">
            Don't have an account?
            <a href="#" className="link link-primary ml-1 font-semibold">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
