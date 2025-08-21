import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import login from "../../assets/login1.jpg";
import { GiPlantRoots } from "react-icons/gi";

const LoginForm = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};

    if (!mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log("Login Successful", { mobile, password });
      // Replace with your authentication logic
      navigate("/"); // Redirect after login
    }
  };

  return (
    <div className="h-screen flex w-full justify-between">
      {/* Left Image */}
      <div className="hidden md:block w-[47%]">
        <img
          src={login}
          alt="Login Visual"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Logo */}
      <div className="absolute top-3 right-4 flex items-center space-x-2">
        <GiPlantRoots className="text-green-900 lg:text-5xl sm:text-5xl text-4xl drop-shadow-md" />
        <span className="font-bold text-green-900 text-lg">Plant Paradise</span>
      </div>
      <div></div>
      <div></div>
      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md mx-auto space-y-6">
          <div>
            <h2 className="mt-10 md:text-3xl text-xl font-bold tracking-wide text-gray-900 font-serif">
              Welcome Back..!
            </h2>
            <p className="mt-1 text-sm text-gray-800 font-light">
              Back to nature, back to home 🌳
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Mobile */}
            <div>
              <label className="block text-sm font-semibold text-black mb-1">
                Enter Phone No. <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value="+91"
                  readOnly
                  className="w-1/4 p-2 border border-gray-300 rounded bg-gray-100"
                />
                <input
                  type="text"
                  placeholder="Enter mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-3/4 p-2 border border-gray-300 rounded"
                />
              </div>
              {errors.mobile && (
                <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-black mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded pr-10"
                />
                <span
                  className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
              <div className="text-right mt-1">
                <a
                  href="#"
                  className="text-sm text-[#6B72D6] hover:underline"
                >
                  Forgot your Password?
                </a>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center space-x-2">
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
              className="w-full py-2 bg-green-700 text-white font-semibold rounded"
            >
              Login
            </button>

            {/* OR Divider */}
            <div className="flex items-center gap-3 text-gray-500 ">
              <div className="flex-grow border-t border-solid border-gray-400" />
              <span className="text-sm">Or Login with</span>
              <div className="flex-grow border-t border-solid border-gray-400" />
            </div>

            {/* Google Login */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded"
            >
              <FcGoogle size={22} />
              <span className="text-sm font-semibold">Sign in with Google</span>
            </button>

            {/* Register Link */}
            <p className="text-center text-sm mt-2">
              Don’t have any account?{" "}
              <Link to="/signup" className="text-green-500 hover:underline">
                Register Here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
