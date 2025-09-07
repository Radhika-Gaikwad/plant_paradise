import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "./authSlice";
import { GiPlantRoots } from "react-icons/gi";
import login from "../../assets/login1.jpg";
import { FcGoogle } from "react-icons/fc";
import { showToast } from "../../utils/showToast";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  // ✅ Regex patterns
  const emailRegex = /^\S+@\S+\.\S+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  // at least 8 chars, 1 letter & 1 number

  const validateField = (name, value) => {
    let error = "";

    if (name === "email") {
      if (!value.trim()) error = "Email is required";
      else if (!emailRegex.test(value)) error = "Invalid email format";
    }

    if (name === "password") {
      if (!value.trim()) error = "Password is required";
      else if (!passwordRegex.test(value))
        error = "Min 8 chars, at least 1 letter & 1 number";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const emailError = !email.trim()
    ? "Email is required"
    : !emailRegex.test(email)
    ? "Invalid email format"
    : "";

  const passwordError = !password.trim()
    ? "Password is required"
    : !passwordRegex.test(password)
    ? "Min 8 chars, at least 1 letter & 1 number"
    : "";

  setErrors({ email: emailError, password: passwordError });

  if (emailError || passwordError) return;

  try {
    const result = await dispatch(loginUser({ email, password })).unwrap();

    showToast("Logged in successfully", "success");

    // ✅ Save token
    localStorage.setItem("token", result?.data?.token);

    // ✅ Save user
    const user = result?.data?.user;
    if (user) {
      localStorage.setItem("userId", user._id); // 🔹 Corrected
      localStorage.setItem(
        "user",
        JSON.stringify({
          userId: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        })
      );
    }

    // ✅ Navigate based on role
    if (user?.role === 1) {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  } catch (err) {
    showToast(err?.message || "Login failed", "error");
  }
};


  return (
    <div className="h-screen flex w-full justify-between">
      {/* Left Image */}
      <div className="hidden md:block w-[45%]">
        <img
          src={login}
          alt="Login Visual"
          className="w-full h-screen object-fill"
        />
      </div>

      {/* Logo */}
      <div className="absolute top-3 right-4 flex items-center space-x-2">
        <GiPlantRoots className="text-green-900 lg:text-5xl sm:text-5xl text-4xl drop-shadow-md" />
        <span className="font-bold text-green-900 text-lg">Plant Paradise</span>
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md mx-auto space-y-6">
          <h2 className="md:text-3xl text-xl font-bold tracking-wide text-gray-900 font-serif">
            Welcome Back..!
          </h2>
          <p className="text-sm text-gray-800 font-light">
            Access exclusive plant collections and gardening wisdom 🌼
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-black mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateField("email", e.target.value);
                }}
                className={`w-full p-2 border rounded ${errors.email ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
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
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validateField("password", e.target.value);
                  }}
                  className={`w-full p-2 border rounded pr-10 ${errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
              <div className="text-right mt-1">
                <a href="#" className="text-sm text-[#6B72D6] hover:underline">
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
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* OR Divider */}
            <div className="flex items-center gap-3 text-gray-500">
              <div className="flex-grow border-t border-gray-400" />
              <span className="text-sm">Or Login with</span>
              <div className="flex-grow border-t border-gray-400" />
            </div>

            {/* Google Login */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded hover:bg-gray-100"
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