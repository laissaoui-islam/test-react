import React, {  useState   } from "react";
import useAuth from "./box/useAuth";
import { useNavigate , Link } from "react-router-dom";
const Loginvip = () => {
  const  {setUserOne} = useAuth();
  const bb = useNavigate();
  const [formData , setFormData] = useState({
    email:'',
    password:''
})
  const [valid, setValid] = useState(true)
  function handleSubmit(e){
    e.preventDefault();
    let isvalid = false ;
    if(import.meta.env.VITE_EMAIL === formData.email  && import.meta.env.VITE_PASSWORD === formData.password){
      setUserOne(true);
      isvalid = true; 
      alert("successfully")
      bb("/table")
    }else{
      isvalid = false;
      alert("no" )
    }
    setValid(isvalid)

  }
  return(
    <div className="container">
<form  class="mt-5 mb-5 border p-4 bg-light shadow" onSubmit={handleSubmit}>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Email address   {}</label>
      <input 
      type="TEXT" 
      class="form-control" 
      name="email"  
      id="exampleInputEmail1" 
      aria-describedby="emailHelp"
      onChange={(event) => setFormData ({...formData, email: event.target.value})}
      />
    </div>
    
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password</label>
      <input 
      type="password" 
      class="form-control" 
      name="password"  
      id="exampleInputPassword1"
      onChange={(event) => setFormData ({...formData, password: event.target.value})}
      />
    </div>
    <button type="submit" class="btn btn-primary">login</button>
  </form>
  <p class="text-center mt-3 text-secondary">if you don't have account , plase <Link  href="/" >Registration Now </Link >
  </p>
  </div>
)

}
export default Loginvip

