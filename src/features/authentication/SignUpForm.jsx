// SignUpForm.jsx
import React, { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import login from "../../assets/login1.jpg";
import { GiPlantRoots } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
//import { signupUser, resetSignup } from "./signupSlice";
import { validateSignup } from "./signupValidation";
import { showToast } from "../../utils/showToast";
import { useNavigate } from "react-router-dom";
const SignUpForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.signup);

const navigate = useNavigate();

useEffect(() => {
  if (success) {
    showToast("Account created successfully!", "success");

    dispatch(resetSignup());

    setTimeout(() => {
      navigate("/login"); 
    }, 2000);
  }

  if (error) {
    showToast(`Signup failed: ${error}`, "error");
  }
}, [success, error, dispatch, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const values = { fullName, email, phone, gender, password, confirmPassword };
    const validationErrors = validateSignup(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const signupData = {
        name: fullName,
        email,
        mobile: phone,
        gender,
        password,
        confirmPassword,
      };
      dispatch(signupUser(signupData));
    }
  };


  // inside SignUpForm.jsx

// 🔹 Validate individual field
const handleChange = (field, value) => {
  // update state
  if (field === "fullName") setFullName(value);
  if (field === "email") setEmail(value);
  if (field === "phone") setPhone(value);
  if (field === "gender") setGender(value);
  if (field === "password") setPassword(value);
  if (field === "confirmPassword") setConfirmPassword(value);

  // validate this field only
  const newErrors = validateSignup({
    fullName,
    email,
    phone,
    gender,
    password,
    confirmPassword,
    [field]: value, // override updated field
  });

  setErrors((prev) => ({
    ...prev,
    [field]: newErrors[field], // only update the error of the changed field
  }));
};


  return (
    <div className="min-h-screen flex w-full justify-between">
      {/* Left side image */}
      <div className="hidden md:block w-[47%]">
        <img src={login} alt="Login Visual" className="w-full object-fill h-full" />
      </div>

      {/* Logo */}
      <div className="absolute top-3 right-4 flex items-center space-x-2">
        <GiPlantRoots className="text-green-900  lg:text-5xl sm:text-4xl text-3xl drop-shadow-md" />
        <span className="font-bold text-green-900 text-lg">Plant Paradise</span>
      </div>

      {/* Signup Form */}
      <div className="mt-7 w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md mx-auto space-y-6">
          <div>
            <h2 className="md:text-3xl text-xl font-bold tracking-wide text-gray-900 font-serif">
              Create Your Account
            </h2>
            <p className="mt-1 text-sm text-gray-800 font-light">
              Join us to explore plants and gardening tips 🌱
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
      onChange={(e) => handleChange("fullName", e.target.value)}
      placeholder="Enter your Name"
      className="w-full p-2 border border-gray-300 rounded"
    />
    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
  </div>

  {/* Email */}
  <div>
    <label className="block text-sm font-semibold text-black mb-1">
      Email <span className="text-red-500">*</span>
    </label>
    <input
      type="email"
      value={email}
      onChange={(e) => handleChange("email", e.target.value)}
      placeholder="Enter your email"
      className="w-full p-2 border border-gray-300 rounded"
    />
    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
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
        onChange={(e) => setCountryCode(e.target.value)} // keep as is
        placeholder="+91"
        className="w-1/4 p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        value={phone}
        onChange={(e) => handleChange("phone", e.target.value)}
        placeholder="Enter mobile number"
        className="w-3/4 p-2 border border-gray-300 rounded"
      />
    </div>
    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
  </div>

  {/* Gender */}
  <div>
    <label className="block text-sm font-semibold text-black mb-1">
      Gender <span className="text-red-500">*</span>
    </label>
    <select
      value={gender}
      onChange={(e) => handleChange("gender", e.target.value)}
      className="w-full p-2 border border-gray-300 rounded"
    >
      <option value="">Select Gender</option>
      <option value="Female">Female</option>
      <option value="Male">Male</option>
      <option value="Other">Other</option>
    </select>
    {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
  </div>

  {/* Password */}
  <div>
    <label className="block text-sm font-semibold text-black mb-1">Create Password</label>
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => handleChange("password", e.target.value)}
        placeholder="Enter your password"
        className="w-full p-2 border border-gray-300 rounded pr-10"
      />
      <span
        className="absolute right-3 top-3 cursor-pointer text-gray-600"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
      </span>
    </div>
    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
  </div>

  {/* Confirm Password */}
  <div>
    <label className="block text-sm font-semibold text-black mb-1">Re-Enter Password</label>
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        value={confirmPassword}
        onChange={(e) => handleChange("confirmPassword", e.target.value)}
        placeholder="Confirm your password"
        className="w-full p-2 border border-gray-300 rounded pr-10"
      />
      <span
        className="absolute right-3 top-3 cursor-pointer text-gray-600"
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
    <label htmlFor="remember" className="text-sm">Remember Me</label>
  </div>

  {/* Sign Up Button */}
  <button
    type="submit"
    disabled={loading}
    className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded"
  >
    {loading ? "Signing Up..." : "Sign Up"}
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