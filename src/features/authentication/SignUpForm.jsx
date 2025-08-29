import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import login1 from "../../assets/login1.jpg";
import { GiPlantRoots } from "react-icons/gi";
import {Link} from "react-router-dom";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex w-full justify-between">
      {/* Left Side Image */}
      <div className="hidden md:block w-[47%]">
        <img
          src={login1}
          alt="Login Visual"
          className="w-full object-fill h-full"
        />
      </div>

      {/* Logo */}
      <div className="absolute top-3 right-4 flex items-center space-x-2">
        <GiPlantRoots className="text-green-900 lg:text-5xl sm:text-4xl text-3xl drop-shadow-md" />
        <span className="font-bold text-green-900 text-lg">Plant Paradise</span>
      </div>

      {/* Right Side Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md mx-auto space-y-6">
          <div>
            <h2 className="md:text-3xl text-xl font-bold tracking-wide text-gray-900 font-serif">
              Welcome..!
            </h2>
            <p className="mt-1 text-sm text-gray-800 font-light">
              Enter to get unlimited access to data & information
            </p>
          </div>

          <form className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-black mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your Name"
                  className="w-full p-2 border border-gray-300 rounded pr-10"
                />
              </div>
            </div>

            {/* Phone No. */}
            <div>
              <label className="block text-sm font-semibold text-black mb-1">
                Enter Phone No. <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="+91"
                  className="w-1/4 p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  placeholder="Enter mobile number"
                  className="w-3/4 p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-black mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your Email"
                  className="w-full p-2 border border-gray-300 rounded pr-10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-black mb-1">
                Create Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full p-2 border border-gray-300 rounded pr-10"
                />
                <span
                  className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-600 font-light">
                  Must be atleast 8 characters
                </p>
              </div>
            </div>

            {/* Re-enter Password */}
            <div>
              <label className="block text-sm font-semibold text-black mb-1">
                Re-Enter Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full p-2 border border-gray-300 rounded pr-10"
                />
                <span
                  className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-600 font-light">
                  Must be atleast 8 characters
                </p>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center space-x-2 mt-2">
              <input
                type="checkbox"
                id="remember"
                className="accent-[#6B72D6] w-4 h-4 rounded border-[#6B72D6]"
              />
              <label htmlFor="remember" className="text-sm">
                Remember Me
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 bg-green-600 text-white font-semibold rounded"
            >
              Login
            </button>

            {/* OR Sign Up with Google */}
            <div className="flex items-center gap-3 text-gray-500 ">
              <div className="flex-grow border-t border-solid border-gray-400" />
              <span className="text-sm">Or Sign Up with</span>
              <div className="flex-grow border-t border-solid border-gray-400" />
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded"
            >
              <FcGoogle size={22} />
              <span className="text-sm font-semibold">Sign Up with Google</span>
            </button>

            {/* Already have account */}
            <p className="text-center text-sm mt-2">
              Already have an account?{" "}
             <Link to="/login" className="text-green-600 font-semibold hover:underline">
              Login
             </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;