import { Children } from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const API_URI = import.meta.env.VITE_API_URI;

// InputField Component
const InputField = ({
  type,
  placeholder,
  value,
  onChange,
  icon,
  name,
  error,
  suffix,
}) => (
  <div className="relative w-full max-w-xs h-16">
    <span className="absolute left-3 top-5 text-gray-400">{icon}</span>

    <input
      type={type}
      placeholder={placeholder}
      required
      value={value}
      onChange={onChange}
      name={name}
      className="w-full pl-10 pr-10 py-3 border-b border-gray-300 focus:ring-0 focus:border-indigo-600 outline-none text-gray-700 transition duration-200 text-base"
    />

    {suffix && (
      <span className="absolute right-3 top-5 cursor-pointer text-gray-500 hover:text-indigo-600 transition-colors">
        {suffix}
      </span>
    )}

    {error && (
      <p className="text-red-500 text-sm mt-1 text-left absolute w-full top-full">
        {error}
      </p>
    )}
  </div>
);

// Signup Component
const Signup = () => {
  const navigate = useNavigate();
  //const [loggedIn, setLoggedIn] = useState(false);

  // Login State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup State
  const [username, setUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const [slideDirection, setSlideDirection] = useState(null);
  const [imageSide, setImageSide] = useState("left");
  const imgRef = useRef(null);
  const [interactionDisable, setIntercationDisable] = useState(false);
  const [errors, setErrors] = useState({});

  const [showPass, setShowPass] = useState(false);
  const handleSlide = (targetSide) => {
    if (imgRef.current) {
      imgRef.current.classList.remove("slide-right", "slide-left");

      void imgRef.current.offsetWidth;
    }
    setIntercationDisable(true);

    if (targetSide === "left") {
      setSlideDirection("slide-left");
      setImageSide("left");
    } else {
      setSlideDirection("slide-right");
      setImageSide("right");
    }

    setTimeout(() => {
      setSlideDirection(null);
      setIntercationDisable(false);
      setErrors({}); // Clear errors on slide change

      // Clear all input states when sliding for a fresh form view
      setLoginEmail("");
      setLoginPassword("");
      setUsername("");
      setSignupEmail("");
      setSignupPassword("");
    }, 750);
  };

  const validateForm = (isLogin) => {
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (isLogin) {
      // LOGIN VALIDATION
      if (!loginEmail.trim()) {
        newErrors.email = "Email cannot be empty.";
      } else if (!emailRegex.test(loginEmail)) {
        newErrors.email = "Invalid Email format ";
      }

      if (!loginPassword.trim()) {
        newErrors.password = "Password cannot be empty.";
      }
    } else {
      // SIGNUP VALIDATION
      if (!username.trim()) {
        newErrors.username = "Username cannot be empty.";
      }

      if (!signupEmail.trim()) {
        newErrors.signupEmail = "Email cannot be empty.";
      } else if (!emailRegex.test(signupEmail)) {
        newErrors.signupEmail = "Invalid Email format (must be @gmail.com).";
      }

      if (!signupPassword.trim()) {
        newErrors.signupPassword = "Password cannot be empty.";
      } else if (signupPassword.length < 6) {
        newErrors.signupPassword = "Password must be at least 6 characters.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const notifyLogin = () =>
  //   toast.success("Successfully Logged In!", {
  //     position: "top-right",
  //     autoClose: 2000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });

  // const notifySignup = () =>
  //   toast.success("Successfully signed up!", {
  //     position: "top-right",
  //     autoClose: 2000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });

  // handleLogin
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm(true)) {
      return;
    }

    try {
      // sending request
      const res = await fetch(`${API_URI}/auth`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          emailOrUsername: loginEmail,
          password: loginPassword,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.message || `Login failed with status: ${res.status}`
        );
      }

      // Success path
      const data = await res.json();
      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
        console.log("token stored successfully");
      }
      toast.success("Logged-in Successfully!");

      if (data.role === "admin") navigate("/admin");

      if (data.role === "user") navigate("/userdash");
    } catch (error) {
      console.error("Login Error:", error.message);
      toast.error(
        error.message ||
          "Login failed due to a network error. Please try again.",
        {
          style: { backgroundColor: "rgb(239, 68, 68)", color: "white" },
        }
      );
    }
  };

  // signup
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validateForm(false)) {
      return;
    }

    try {
      // sending request
      const res = await fetch(`${API_URI}/signup`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username,
          email: signupEmail,
          password: signupPassword,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `Sign-up failed with status`);
      }
      
      const data = await res.json();
      toast.success(data.message || "Signed-up Successfully! Redirecting...");

      setTimeout(() => {
        // notifySignup();
        navigate("/admindash");
      }, 2000);
    } catch (error) {
      console.error("Signup Error",error);
      toast.error(
      
          "Sign-up failed due to a network error. Please try again.",
        {
          style: { backgroundColor: "rgb(239, 68, 68)", color: "white" },
        }
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 font-sans z-50">
      <ToastContainer position="top-right" />
      <div
        className={`w-[54rem] h-[44rem] bg-white rounded-3xl shadow-2xl grid grid-cols-2 relative overflow-hidden ${
          interactionDisable ? "pointer-events-none" : ""
        }`}
      >
        {/* LEFT PANEL  */}
        <div
          className={`flex flex-col justify-center items-center p-12 transition-colors duration-700 ${
            imageSide === "left"
              ? "text-white bg-indigo-600"
              : "text-gray-800 bg-white  "
          }`}
        >
          {imageSide === "left" ? (
            <>
              <h2 className="text-4xl font-extrabold mb-4">New Here?</h2>
              <p className="mb-10 text-center text-lg text-indigo-200">
                Join us and start your journey!
              </p>
              <button
                className="px-8 py-3 bg-white text-indigo-600 font-bold rounded-full shadow-lg transition duration-300 hover:shadow-xl hover:bg-gray-50"
                onClick={() => handleSlide("right")}
              >
                Sign Up
              </button>
            </>
          ) : (
            // LOGIN FORM
            <>
              <h2 className="text-4xl font-extrabold mb-8 text-indigo-600">
                Welcome Back!
              </h2>
              <form
                onSubmit={handleLogin}
                className="flex flex-col gap-6 w-full items-center mb-8"
              >
                <InputField
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  icon="📧"
                  error={errors.email}
                />
                <InputField
                  type={showPass ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  icon="🔒"
                  error={errors.password}
                  suffix={
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                    >
                      {showPass ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  }
                />

                <button
                  type="submit"
                  className="w-full max-w-xs px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-md transition duration-300 hover:bg-indigo-700 mt-4"
                >
                  Log In
                </button>
              </form>
              <a
                href="#"
                className="mb-4 text-sm text-indigo-600 hover:text-indigo-700 transition duration-300"
              >
                Forgot password?
              </a>
              <p className="text-gray-600 mb-4">Don't have an account?</p>
              <button
                className="px-6 py-2 border border-indigo-600 text-indigo-600 font-semibold rounded-full hover:bg-indigo-50/20 transition duration-300"
                onClick={() => handleSlide("left")}
              >
                Create Account
              </button>
            </>
          )}
        </div>

        {/* RIGHT PANEL  */}
        <div
          className={`flex flex-col justify-center items-center p-12 transition-colors duration-700 ${
            imageSide === "right"
              ? "text-white bg-indigo-600"
              : "text-gray-800 bg-white"
          }`}
        >
          {imageSide === "right" ? (
            <>
              <h2 className="text-4xl font-extrabold mb-4">
                Already a Member?
              </h2>
              <p className="mb-10 text-center text-lg text-indigo-200">
                Please log in to your existing account.
              </p>
              <button
                className="px-8 py-3 bg-white text-indigo-600 font-bold rounded-full shadow-lg transition duration-300 hover:shadow-xl hover:bg-gray-50"
                onClick={() => handleSlide("left")}
              >
                Log In
              </button>
            </>
          ) : (
            // SIGNUP FORM
            <>
              <h2 className="text-4xl font-extrabold mb-8 text-indigo-600">
                Create Account
              </h2>
              <form
                onSubmit={handleSignup}
                className="flex flex-col gap-6 w-full items-center mb-8"
              >
                <InputField
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  icon="👤"
                  error={errors.username}
                />
                <InputField
                  type="email"
                  placeholder="Email Address"
                  name="signupEmail"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  icon="📧"
                  error={errors.signupEmail}
                />
                <InputField
                  type={showPass ? "text" : "password"}
                  placeholder="Password"
                  name="signupPassword"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  icon="🔒"
                  error={errors.signupPassword}
                  suffix={
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                    >
                      {showPass ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  }
                />

                <button
                  type="submit"
                  className="w-full max-w-xs px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-md transition duration-300 hover:bg-indigo-700 mt-4"
                >
                  Sign Up
                </button>
              </form>

              <button
                type="button"
                className="w-full max-w-xs px-8 py-3 bg-green-800 text-white font-bold rounded-xl shadow-md transition duration-300 hover:bg-green-700 mt-4"
              >
                Continue as Guest
              </button>
              <p className="text-gray-600 mb-4 mt-8">
                Already have an account?
              </p>
              <button
                className="px-6 py-2 border border-indigo-600 text-indigo-600 font-semibold rounded-full hover:bg-indigo-50/20 transition duration-300"
                onClick={() => handleSlide("right")}
              >
                Log In
              </button>
            </>
          )}
        </div>

        {/* SLIDING PANEL */}
        <div className="absolute inset-0 z-50 flex items-center pointer-events-none">
          <span
            ref={imgRef}
            alt="Dynamic"
            className={`
              object-cover w-1/2 h-full rounded-3xl shadow-xl transition-all duration-300 bg-indigo-700 text-white flex flex-col items-center justify-center p-12 text-center
              ${
                slideDirection === "slide-left"
                  ? "slide-left"
                  : slideDirection === "slide-right"
                  ? "slide-right"
                  : imageSide === "right"
                  ? "start-right"
                  : "start-left"
              }
            `}
          >
            {imageSide === "right" ? (
              <>
                <h2 className="text-4xl font-extrabold mb-4">Welcome Back!</h2>
                <p className="mb-10 text-center text-lg text-indigo-200">
                  Sign in to access your account.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-4xl font-extrabold mb-4">New Here?</h2>
                <p className="mb-10 text-center text-lg text-indigo-200">
                  Join us and start your journey!
                </p>
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
