/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { updateUser } from "../services/user.service";
import { createUser } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { InputNumber } from 'primereact/inputnumber';
import { FloatLabel } from 'primereact/floatlabel';


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
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          <input
            type="text"
            placeholder="name"
            name="name"
            id="name"
            onChange={handleChange}
            value={userData.name}
          />
        </label>
        <label htmlFor="email">
          <input
            type="email"
            placeholder="email"
            name="email"
            id="email"
            onChange={handleChange}
            value={userData.email}
          />
        </label>
        {!isEditing && (
          <label htmlFor="password">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              onChange={handleChange}
              value={userData.password}
            />
          </label>
        )}

        {!isEditing && (
          <select
            name="role"
            id="role"
            onChange={handleOptionChange}
            value={userData.role}
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
            >
              <option value="club">Club</option>
              <option value="festival">Festival</option>
              <option value="specialEvent">Special Event</option>
            </select>
            
            <label htmlFor="promoterCapacity">
            
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
              />
            </label>
         
          </div>
        )}
        <div>
          {userRole && (
            <label htmlFor="cif">
              <input
                type="text"
                name="cif"
                placeholder="CIF"
                id="cif"
                onChange={handleChange}
                value={userData.cif}
              />
            </label>
          )}
          <label htmlFor="imageUrl">
            {userData.imageUrl && (
              <div>
                <p>Imagen actual:</p>
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
              style={{ width: "132px", marginRight: "30px"}}
            />
          </label>

          <button  type="submit">{isEditing ? "Edit" : "Register" }</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
