import { useState, useContext } from "react";
import { loginService } from "../services/auth.service";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState(null);
  const { login, isAuthLoaded, currentUser } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = await loginService(formData);
      login(loginUser.accessToken);
    } catch (error) {
      setError(error.message);
    }
  };

  if (!isAuthLoaded) {
    return "loading";
  }

  if (isAuthLoaded && currentUser) {
    return "Ya estas logueado";
  }

  return (
    <div className="bg-white dark:bg-[#101C29] min-h-screen flex items-center justify-center">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        src="../public/0307.webm"
      ></video>
      <div className="container mx-auto px-4 z-10">
        <form
          onSubmit={handleSubmit}
          className="bg-gradient-to-b from-[#f64aff] via-[#7c3aed] to-[#1e293b] container mx-auto px-8 p-6 rounded-lg shadow-lg w-full max-w-md"
        >
          <div>
            <h1 className="text-2xl font-semibold text-white mb-4 text-center transition-all p-4 text-1xl sm:text-2xl lg:text-3xl">
              Welcome to GigBoard
            </h1>
            <label htmlFor="email" className="block mb-2">
              <input
                type="text"
                id="email"
                name="email"
                onChange={handleChange}
                className="w-full p-2 border border-[#7c3aed] rounded"
                placeholder="email"
              />
            </label>
          </div>
          <div>
            <label htmlFor="password" className="block mb-2">
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                className="w-full p-2 border border-[#7c3aed] rounded"
                placeholder="password"
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-[#7c3aed] text-white rounded hover:bg-[#936ed4]"
          >
            Login
          </button>
          {error && (
            <div className="alert alert-danger mt-2 text-[#e3b505]" role="alert">
              {error}
            </div>
          )}
          <div className="mt-4 text-center">
            <p className="text-white">Still not registered?</p>
            <Link
              to="/register"
              className="mt-2 inline-block px-4 py-2 text-[#7c3aed] bg-white rounded hover:bg-gray-200 transition"
            >
              Sign up here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
