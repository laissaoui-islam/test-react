import React, {  useEffect , useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios";
import useAuth from "./box/useAuth";
import { useNavigate , useParams} from "react-router-dom";
import { Link } from "react-router-dom";
const Login = () => {
    const {id} =useParams();
    const navigate = useNavigate()
    const  {setUserOne} = useAuth();
    const [formData , setFormData] = useState({
        email:'',
        password:''
    })
    useEffect(()=>{
        if(id === "development" || id === "montage"|| id === "desine"){
            axios.get('http://localhost:3000/users'+id)
        }else{
            navigate("/notFound");
        }
        
    },[])
    const [errors, setErrors] = useState({})
    const [valid, setValid] = useState(true)    
    const handleSubmit= (e) => {
        e.preventDefault();
        let isvalid = true ;
        let validationErrors = {}
        if(formData.email ==="" || formData.email === null){
            isvalid =false;
            validationErrors.email = "email required"+id
        }else if (!/\S+@\S+\.\S+/.test(formData.email)){
            isvalid =false;
            validationErrors.email = "email is not valid"
        }if(formData.password ==="" || formData.password === null){
            isvalid =false;
            validationErrors.password = "password required"
        }else if (formData.password.length < 6){
            isvalid =false;
            validationErrors.password = "password length at least 6 char"
        }
        axios.get('http://localhost:3000/users'+id)
        .then(result => {
            result.data.map(user =>{
                if(user.email === formData.email){
                    if(user.password === formData.password){
                        axios.get('http://localhost:3000/users'+id+'/'+user.email)
                        setUserOne(true );
                        alert('successfully')
                        navigate(`/homeuser/${id}/${user.id}`)
                }else{
                     isvalid =false;
                     validationErrors.password = "wrong password "
                }
            } 
            })
            
        setErrors(validationErrors)
        setValid(isvalid)
        })
            .catch(err => console.log(err))
    }
    return(
        <div className="container">
    <form  class="mt-5 mb-5 border p-4 bg-light shadow" onSubmit={handleSubmit}>
        <h4 class="mb-5 border p-4 bg-light shadow">create your account   </h4>
        {
                // هدا  شرط 
                valid ?(
                     <></> 
                     ):(
                <span className="text-danger">
                    {errors.email};
                    {errors.password} 
                </span>
            )}
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input 
          type="email" 
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
      <p class="text-center mt-3 text-secondary">if you don't have account , plase <a href="/registration" >Registration Now </a>
      </p>
      </div>
    )
}
export default Login