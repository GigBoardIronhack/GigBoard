/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { updateUser } from "../services/user.service";
import { createUser } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Register = ({ isEditing }) => {
  const { isAuthLoaded, currentUser, setCurrentUser } = useContext(AuthContext);
  console.log(currentUser);
  const [userData, setUserData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    cif: currentUser?.cif || "",
    imageUrl: currentUser?.imageUrl || null,
    role: currentUser?.role,
    promoterRole: currentUser?.promoterRole || "club",
    promoterCapacity: currentUser?.promoterCapacity || null,
  });
  const [userRole, setUserRole] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadData = new FormData();

    uploadData.append("name", userData.name);
    if (userData.imageUrl instanceof File) {
      uploadData.append("imageUrl", userData.imageUrl);
    }
    uploadData.append("email", userData.email);
    if (!isEditing) {
      uploadData.append("password", userData.password);
    }
    uploadData.append("role", userData.role);
    let promoterCapacity = userData.promoterCapacity ;
    if(promoterCapacity === null){
      promoterCapacity = 0;
    }

    if (userData.role === "promoter") {
      uploadData.append("promoterRole", userData.promoterRole);
      uploadData.append("promoterCapacity", promoterCapacity);
    }
    uploadData.append("cif", userData.cif);

    try {
      if (isEditing) {
        console.log(uploadData.get("email"));
        const updatedUser = await updateUser(uploadData);
        console.log(updateUser);
        setCurrentUser(updatedUser);
        navigate("/dashboard");
        return;
      }
      await createUser(uploadData);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  if (!isAuthLoaded) {
    return "loading";
  }

  if (currentUser && !isEditing) {
    return "Fuera de mi puta vista";
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handleOptionChange = (e) => {
    const value = e.target.value;
    setUserRole(value);
    setUserData((prevState) => ({
      ...prevState,
      role: value,
    }));
  };
  const handlePromoterChange = (e) => {
    const value = e.target.value;
    setUserData((prevState) => ({
      ...prevState,
      promoterRole: value,
    }));
  };

  return (
    <div className="bg-white dark:bg-[#101C29] min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-[#004e64] p-6 rounded-lg shadow-lg w-full max-w-md">
        <label htmlFor="name" className="block mb-2">
          <input
            type="text"
            placeholder="name"
            name="name"
            id="name"
            onChange={handleChange}
            value={userData.name}
            className="w-full p-2 border border-[#d76a03] rounded text-gray-400"
          />
        </label>
        <label htmlFor="email" className="block mb-2">
          <input
            type="email"
            placeholder="email"
            name="email"
            id="email"
            onChange={handleChange}
            value={userData.email}
            className="w-full p-2 border border-[#d76a03] rounded text-gray-400"
          />
        </label>
        {!isEditing && (
          <label htmlFor="password" className="block mb-2">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              onChange={handleChange}
              value={userData.password}
              className="w-full p-2 border border-[#d76a03] rounded text-gray-400"
            />
          </label>
        )}

        {!isEditing && (
          <select
            name="role"
            id="role"
            onChange={handleOptionChange}
            value={userData.role}
            className="w-full p-2 border border-[#d76a03] rounded mb-2 text-gray-400"
          >
            <option selected disabled>
              --Select an Option--
            </option>
            <option value="agency">Agency</option>
            <option value="promoter">Promoter</option>
          </select>
        )}

        {(userRole === "promoter" || (isEditing && currentUser?.role === "promoter")) && (
          <div>
            <select
              name="promoterRole"
              id="promoterRole"
              onChange={handlePromoterChange}
              value={userData.promoterRole}
              className="w-full p-2 border border-[#d76a03] rounded mb-2 text-gray-400"
            >
              <option value="club">Club</option>
              <option value="festival">Festival</option>
              <option value="specialEvent">Special Event</option>
            </select>
            
            <label htmlFor="promoterCapacity" className="block mb-2">
              <input
                type="number"
                name="promoterCapacity"
                id="promoterCapacity"
                placeholder="Capacidad"
                onChange={handleChange}
                required
                min={0}
                pattern="[1-9][0-9]*"
                value={userData.promoterCapacity}
                className="w-full p-2 border border-[#d76a03] rounded"
              />
            </label>
          </div>
        )}
        <div>
          {userRole && (
            <label htmlFor="cif" className="block mb-2">
              <input
                type="text"
                name="cif"
                placeholder="CIF"
                id="cif"
                onChange={handleChange}
                value={userData.cif}
                className="w-full p-2 border border-[#d76a03] rounded text-gray-400"
              />
            </label>
          )}
          <label htmlFor="imageUrl" className="block mb-2">
            {userData.imageUrl && (
              <div className="mb-2 flex justify-center">
                <img
                  src={
                    typeof userData.imageUrl === "string"
                      ? userData.imageUrl
                      : URL.createObjectURL(userData.imageUrl)
                  }
                  alt="Imagen actual"
                  width="100"
                />
              </div>
            )}
            <input
              multiple
              type="file"
              id="imageUrl"
              name="imageUrl"
              onChange={handleChange}
              className="w-full p-2 border border-[#d76a03] rounded text-gray-400"
            />
          </label>

          <button type="submit" className="w-full p-2 bg-[#d76a03] text-white rounded hover:bg-[#e3b505]">
            {isEditing ? "Edit" : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
