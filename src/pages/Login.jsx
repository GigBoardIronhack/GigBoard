import { useState, useContext } from "react";
import { loginService } from "../services/auth.service";
import { AuthContext } from "../contexts/AuthContext";


const Login = () => {

  const [formData, setFormData]= useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState(null)
  const { login, isAuthLoaded, currentUser } = useContext(AuthContext);

  const handleChange = (e) =>{
    const {name, value}= e.target
    setFormData((prevState)=>({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const loginUser = await loginService(formData)
     login(loginUser.accessToken)
     
    }catch(error){
      setError(error.message)
    }
  }
  if (!isAuthLoaded) {
    return 'loading'
  }

  if (isAuthLoaded && currentUser) {
    return 'Ya estas logueado'
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div >
        <label htmlFor="email">
          <input type="text"
           id="email"
           name="email"
             onChange={handleChange}/>
        </label>
      </div>
      <div>
        <label htmlFor="password">
          <input type="password"
           id="password" 
           name="password"         
           onChange={handleChange}/>
        </label>
      </div>
      <button type="submit">Login</button>
      {error && <div className="alert alert-danger" role="alert">
          {error}
        </div>}
  
      </form>
    </div>
  )
}

export default Login