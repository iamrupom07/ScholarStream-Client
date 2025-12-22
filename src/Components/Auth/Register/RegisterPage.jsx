import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const location = useLocation();
  const Navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { registerUser, upadteUserProfile } = useAuth();

  // 2. Form Submission Handler
  const handelRegistration = (data) => {
    console.log("Registration Data Submitted:", data);
    const profileImg = data.photo[0];
    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        // updateProfile
        const formData = new FormData();
        formData.append("image", profileImg);
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_HOST
        }`;
        axios
          .post(image_API_URL, formData)
          .then((res) => {
            const photoURL = res.data.data.display_url;

            const userInfo = {
              email: data.email,
              displayName: data.name,
              photoURL: photoURL,
            };

            // create user profile
            axiosSecure.post("/users", userInfo).then((res) => {
              if (res.data.insertedId) {
                console.log("User profile created in DB");
              }
            });

            const userProfile = {
              displayName: data.name,
              photoURL: photoURL,
            };
            upadteUserProfile(userProfile)
              .then(() => {
                console.log("User profile updated successfully");
                Navigate(location?.state || "/");
              })
              .catch((error) => {
                console.error("Profile Update Error:", error);
              });
          })
          .catch((err) => {
            console.error("Image Upload Error:", err);
          });
      })
      .catch((error) => {
        console.error("Registration Error:", error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 p-4">
      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <div className="card-body p-8 sm:p-10">
          <h2 className="text-3xl font-bold text-center mb-6 text-primary">
            Create an Account
          </h2>

          <form onSubmit={handleSubmit(handelRegistration)}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="John Doe"
                {...register("name")}
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input
                type="file"
                {...register("photo")}
                className="file-input file-input-neutral w-full"
              />
            </div>
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
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                })}
                placeholder="••••••••"
                className="input input-bordered w-full mb-2"
              />
              {errors.password?.type === "required" && (
                <span className="text-red-500 text-sm">
                  Password is required{" "}
                </span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="text-red-500 text-sm">
                  Password must need to be more than 6 character{" "}
                </span>
              )}
              {errors.password?.type === "maxLength" && (
                <span className="text-red-500 text-sm">
                  Password must need to be less than 20 character
                </span>
              )}
              {errors.password?.type === "pattern" && (
                <span className="text-red-500 text-sm">
                  Password must have one uppercase, one number and one special
                  character
                </span>
              )}
              <br />
              <label className="label justify-end ">
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
                Register
              </button>
            </div>
          </form>

          {/* OR Divider */}
          <div className="divider text-gray-400 my-6">OR</div>

          {/* Social Login Section */}
          <SocialLogin></SocialLogin>

          <p className="text-center text-sm mt-8">
            Already have an account?
            <Link
              state={location?.state}
              to={"/login"}
              className="link link-primary ml-1 font-semibold"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
