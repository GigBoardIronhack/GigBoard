import { useState, useContext } from "react";
import { loginService } from "../services/auth.service";
import { AuthContext } from "../contexts/AuthContext";

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
    <div className=" bg-white dark:bg-[#101C29] min-h-screen flex items-center justify-center">
    <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        src="../public/0307.webm"
      >
        
      </video>
    <div className="container mx-auto px-4 z-10">
      <form onSubmit={handleSubmit} className="bg-[#004e64] container mx-auto px-8 p-6 rounded-lg shadow-lg w-full max-w-md">
        <div>
          <h1 className="text-2xl font-semibold text-white mb-4 text-center transition-all   p-4 text-1xl sm:text-2xl lg:text-3xl">Bienvenido a GigBoard</h1>
          <label htmlFor="email" className="block mb-2">
            <input
              type="text"
              id="email"
              name="email"
              onChange={handleChange}
              className="w-full p-2 border border-[#d76a03] rounded "
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
              className="w-full p-2 border border-[#d76a03] rounded "
              placeholder="password"
            />
          </label>
        </div>
        <button type="submit" className="w-full p-2 bg-[#d76a03] text-white rounded hover:bg-[#e3b505]">
          Login
        </button>
        {error && (
          <div className="alert alert-danger mt-2 text-[#e3b505]" role="alert">
            {error}
          </div>
        )}
      </form>
      </div>
    </div>
  );
};

export default Login;