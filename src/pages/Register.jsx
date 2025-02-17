/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import {  updateUser } from "../services/user.service";
import { createUser } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext"; 



const Register = ({ isEditing }) => {
  const { isAuthLoaded, currentUser, setCurrentUser } = useContext(AuthContext);
  console.log(currentUser)
  const [userData, setUserData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    cif: currentUser?.cif || "",
    imageUrl: currentUser?.imageUrl || "",
    role: currentUser?.role
  });
  const [userRole, setUserRole] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadData = new FormData();

    uploadData.append("name", userData.name);
    uploadData.append("imageUrl", userData.imageUrl);
    uploadData.append("email", userData.email);
    if(!isEditing){
      uploadData.append("password", userData.password);
    }
    uploadData.append("role", userData.role);
    if (userData.role === "promoter") {
      uploadData.append("promoterRole", userData.promoterRole);
      uploadData.append("promoterCapacity", userData.promoterCapacity);
    }
    uploadData.append("cif", userData.cif);

    try {
      if(isEditing){
        console.log(uploadData.get("email"))
        const updatedUser = await updateUser(uploadData)
        console.log(updateUser)
        setCurrentUser(updatedUser)
        navigate("/dashboard")
       return
      }
      await createUser(uploadData);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  if (!isAuthLoaded) {
    return 'loading'
  }

  if (currentUser && !isEditing) {
    return 'Fuera de mi puta vista'
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
        {!isEditing &&(
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
          <option selected disabled>--Select an Option--</option>
          <option value="agency">Agency</option>
          <option value="promoter">Promoter</option>
        </select>
          )} 
        
        {userRole === "promoter" && (
          <div>
            <select name="promoterRole" id="promoterRole" onChange={handleChange}
          value={userData.promoterRole}>
              <option value="club">Club</option>
              <option value="festival">Festival</option>
              <option value="specialEvent">Special Event</option>
            </select>
            <label htmlFor="promoterCapacity">
              <input
                type="number"
                name="promoterCapacity"
                id="promoterCapacity"
                onChange={handleChange}
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
            <label htmlFor="imageUrl" className="form-label">
              Image URL
            </label>
            <input
              type="file"
              id="imageUrl"
              name="imageUrl"
              onChange={handleChange}
              required
            />
            <button type="submit">{isEditing ? "Edit" : "Register"}</button>
          </div>
        
      </form>
    </div>
  );
};

export default Register;
