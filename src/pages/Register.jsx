/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { updateUser } from "../services/user.service";
import { createUser } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";

const Register = ({ isEditing }) => {
  const { isAuthLoaded, currentUser, setCurrentUser, getCurrentUser } = useContext(AuthContext);
  const [isFormValid, setIsFormValid] = useState(false);
  const [backendErrors, setBackendErrors] = useState({});

  const [userData, setUserData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    password: currentUser?.password || "",
    cif: currentUser?.cif || "",
    imageUrl: currentUser?.imageUrl || null,
    role: currentUser?.role || "",
    promoterRole: currentUser?.promoterRole || "club",
    promoterCapacity: currentUser?.promoterCapacity || null,
  });
  const [userRole, setUserRole] = useState(userData.role || "");
  useEffect(() => {
    const isValid =
      userData.name.trim() !== "" &&
      userData.email.trim() !== "" &&
      userData.cif.trim() !== "" &&
      userData.role !== "" &&
      (typeof userData.imageUrl === "string" || userData.imageUrl instanceof File) &&
      (!isEditing ? userData.password.trim() !== "" : true);
    setIsFormValid(isValid);
  }, [userData, isEditing]);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
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
        const updatedUser = await updateUser(uploadData);
        setCurrentUser(updatedUser);
        await getCurrentUser()
       
        navigate("/dashboard");
        return;
      }
      await createUser(uploadData);
      navigate("/login");
    } catch (error) {
      console.log(error.message)
      setBackendErrors(error);
      if(error.message === "Image error"){
        setBackendErrors(error)
      }
    }
  };
  if (!isAuthLoaded) {
    return "loading";
  }
  if (currentUser && !isEditing) {
    return "No puedes registrarte otra vez";
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
      <form onSubmit={handleSubmit} className="bg-[#004E64] container mx-auto px-8 p-6 rounded-lg shadow-lg w-full max-w-md">
      <h1 className="text-2xl font-semibold text-white mb-4 text-center">Registro</h1>
        <FloatLabel>
          <InputText
            type="text"
            name="name"
            id="name"
            onChange={handleChange}
            value={userData.name}
            className={`w-full p-2 mb-5 dark:bg-[#101C29] border rounded ${backendErrors?.errors?.name ? "border-red-500" : "border-[#D76A03]"}`}
          />
          <label htmlFor="name" className="block mb-2">
          name</label>
           {backendErrors?.errors?.name && <p className="text-red-500  text-sm mt-1">{backendErrors?.errors?.name}</p>}
        </FloatLabel>
        <FloatLabel>
          <InputText
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            value={userData.email}
            className={`w-full p-2 mb-5 dark:bg-[#101C29] border rounded ${backendErrors?.errors?.email ? "border-red-500" : "border-[#D76A03]"}`}
          />
          <label htmlFor="email" className="block mb-2">Email
        </label>
  {backendErrors?.errors?.email && <p className="text-red-500 text-sm mt-1">{backendErrors?.errors?.email}</p>}
        </FloatLabel>
        {!isEditing && (
          <FloatLabel>
            <InputText
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              value={userData.password}
              className={`w-full p-2 mb-5 dark:bg-[#101C29] border rounded ${backendErrors?.errors?.password ? "border-red-500" : "border-[#D76A03]"}`}
            />
            <label htmlFor="password" className="block mb-2">password</label>
            {backendErrors?.errors?.password && <p className="text-red-500 text-sm mt-1">{backendErrors?.errors?.password}</p>}
            </FloatLabel>
        )}
        {!isEditing && (
          <select
            name="role"
            id="role"
            onChange={handleOptionChange}
            value={userData.role || ""}
            className="w-full p-2 border border-[#D76A03] rounded mb-2 "
          >
            <option value="" disabled>
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
              className="w-full p-2 border border-[#D76A03] rounded mb-2 "
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
                value={userData.promoterCapacity ?? ""}
                className={"w-full p-2 mt-2 border rounded "}
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
                className={`w-full p-2 border rounded ${backendErrors?.errors?.cif ? "border-red-500" : "border-[#D76A03]"}`}
              />
                {backendErrors?.errors?.cif && <p className="text-red-500 text-sm mt-1">{backendErrors?.errors?.cif}</p>}
            </label>
          )}
          <label htmlFor="imageUrl" className="block mb-2 dark:bg-[#101C29]">
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
              type="file"
              id="imageUrl"
              name="imageUrl"
              onChange={handleChange}
              className={`w-full p-2 border rounded ${backendErrors?.message ? "border-red-500" : "border-[#D76A03]"}`}
            />
            {backendErrors?.message && <p className="text-red-500 text-sm mt-1">Formato de imagen no valido. La imagen debe de ser jpg, png, o jpeg.</p>}
          </label>
          <button
            type="submit"
            className={`w-full p-2 rounded text-white ${isFormValid ? "bg-[#D76A03] hover:bg-[#E3B505]" : "bg-gray-400 cursor-not-allowed"}`}
            disabled={!isFormValid}
          >
            {isEditing ? "Editar" : "Registrarse"}
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};
export default Register;