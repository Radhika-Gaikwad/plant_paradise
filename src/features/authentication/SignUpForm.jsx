import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import login from "../../assets/login1.jpg";
import { GiPlantRoots } from "react-icons/gi";

const SignUpForm = () => {
  const [fullName, setFullName] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    if (!password) newErrors.password = "Password is required";
    if (password && password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (confirmPassword !== password)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    // ✅ If no errors, proceed (here you can call API)
    if (Object.keys(newErrors).length === 0) {
      alert("Sign up successful!");
    }
  };

  return (
    <div className="min-h-screen flex w-full justify-between">
      {/* Left side image */}
      <div className="hidden md:block w-[47%]">
        <img src={login} alt="Login Visual" className="w-full h-full object-cover" />
      </div>
      {/* Logo */}
      <div className="absolute top-3 right-4 flex items-center space-x-2">
        <GiPlantRoots className="text-green-900 lg:text-5xl sm:text-5xl text-4xl drop-shadow-md" />
        <span className="font-bold text-green-900 text-lg">Plant Paradise</span>
      </div>
      {/* Signup Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md mx-auto space-y-6">
          <div>
            <h2 className="mt-10 md:text-3xl text-xl font-bold tracking-wide text-gray-900 font-serif">
              Create Your Account
            </h2>
            <p className="mt-1 text-sm text-gray-800 font-light">
              Sign up today and watch your garden dreams bloom 🌸🌱
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-black mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your Name"
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
              )}
            </div>
            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-black mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  placeholder="+91"
                  className="w-1/4 p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter mobile number"
                  className="w-3/4 p-2 border border-gray-300 rounded"
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>
            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-black mb-1">
                Create Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-black mb-1">
                Re-Enter Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full p-2 border border-gray-300 rounded pr-10"
                />
                <span
                  className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="remember" className="accent-green-600 w-4 h-4 rounded" />
              <label htmlFor="remember" className="text-sm">
                Remember Me
              </label>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded"
            >
              Sign Up
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 text-gray-500">
              <div className="flex-grow border-t border-gray-400" />
              <span className="text-sm">Or Sign Up with</span>
              <div className="flex-grow border-t border-gray-400" />
            </div>

            {/* Google Sign Up */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded hover:bg-gray-100"
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
