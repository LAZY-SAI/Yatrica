import { useState, useRef } from "react";
const InputField = ({ type, placeholder, value, onChange, icon }) => (
    <div className="relative w-full max-w-xs">
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        {icon}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        required
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-4 py-3 border-b border-gray-300 focus:ring-0 focus:border-indigo-600 outline-none text-gray-700 transition duration-200 text-base"
      />
    </div>
  );

const Signup = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  // Login State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Signup State
  const [username, setUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const [slideDirection, setSlideDirection] = useState(null);
  const [imageSide, setImageSide] = useState("right");
  const imgRef = useRef(null);

  const handleSlide = (targetSide) => {
    if (imgRef.current) {
      imgRef.current.classList.remove("slide-left", "slide-right");

      void imgRef.current.offsetWidth;
    }

    if (targetSide === "left") {
      setSlideDirection("slide-left");
      setImageSide("left");
    } else {
      setSlideDirection("slide-right");
      setImageSide("right");
    }

    setTimeout(() => setSlideDirection(null), 750);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      console.log("Logging in with:", email, password);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (username && signupEmail && signupPassword) {
      console.log("Signing up with:", username, signupEmail, signupPassword);
    }
  };

  

  if (loggedIn) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-indigo-500 font-sans">
        <div className="p-12 bg-white rounded-3xl shadow-2xl text-center">
          <h1 className="text-4xl font-extrabold text-indigo-600">
            Successfully Logged In!
          </h1>
          <p className="mt-4 text-gray-600">Welcome to your dashboard.</p>
          <button
            className="mt-6 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition"
            onClick={() => setLoggedIn(false)}
          >
            Log Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 font-sans">
      <div className="w-[54rem] h-[44rem] bg-white rounded-3xl shadow-2xl grid grid-cols-2 relative overflow-hidden">
        {/* LEFT PANEL ) */}
        <div
          className={`flex flex-col justify-center items-center p-12 transition-colors duration-700 ${
            imageSide === "left"
              ? "text-white bg-indigo-600"
              : "text-gray-800 bg-white"
          }`}
        >
          {imageSide === "left" ? (
            // PROMO CONTENT 
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon="📧"
                />
                <InputField
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon="🔒"
                />
                <button
                  type="submit"
                  className="w-full max-w-xs px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-md transition duration-300 hover:bg-indigo-700 mt-4"
                >
                  Log In
                </button>
              </form>
              <a  className="ml-40">  Forgot password?</a>
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

        {/* RIGHT PANEL (SIGNUP CONTENT) */}
        <div
          className={`flex flex-col justify-center items-center p-12 transition-colors duration-700 ${
            imageSide === "right"
              ? "text-white bg-indigo-600"
              : "text-gray-800 bg-white"
          }`}
        >
          {imageSide === "right" ? (
            // PROMO CONTENT 
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
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  icon="👤"
                />
                <InputField
                  type="email"
                  placeholder="Email Address"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  icon="📧"
                />
                <InputField
                  type="password"
                  placeholder="Password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  icon="🔒"
                />
                <button
                  type="submit"
                  className="w-full max-w-xs px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-md transition duration-300 hover:bg-indigo-700 mt-4"
                >
                  Sign Up
                </button>
              </form>
              <p className="text-gray-600 mb-4">Already have an account?</p>
              <button
                className="px-6 py-2 border border-indigo-600 text-indigo-600 font-semibold rounded-full hover:bg-indigo-50/20 transition duration-300"
                onClick={() => handleSlide("right")}
              >
                Log In
              </button>
            </>
          )}
        </div>

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
                  : 
                  imageSide === "right"
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
