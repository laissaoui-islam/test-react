import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios"
import useAuth from "./box/useAuth";
import { useNavigate } from "react-router-dom";

const Registration = () => {
    const  {setUserOne} = useAuth();
    const [formData , setFormData] = useState({
        fname:'',
        lname:'',
        email:'',
        rank:'',
        password:'',
        cpassword:''
    })
    
    const [errors, setErrors] = useState({})
    const [valid, setValid] = useState(true)
    const navigate = useNavigate()
    const handleSubmit= (e) => {
        e.preventDefault();
        let isvalid = true ;
        let validationErrors = {}
        if(formData.fname ==="" || formData.fname === null){
            isvalid =false;
            validationErrors.fname = "First name required"
        }if(formData.lname ==="" || formData.lname === null){
            isvalid =false;
            validationErrors.lname = "last name required"
        }if(formData.rank ==="" || formData.rank === null){
            isvalid =false;
            validationErrors.rank = " rank required"
        }if(formData.password ==="" || formData.password === null){
            isvalid =false;
            validationErrors.password = "password required"
        }else if (formData.password.length < 6){
            isvalid =false;
            validationErrors.password = "password length at least 6 char"
        }if(formData.cpassword !== formData.password){
            isvalid = false;
            validationErrors.cpassword = "password not match"
        }if(formData.email ==="" || formData.email === null){
            isvalid =false;
            validationErrors.email = "email required"
        }else if (!/\S+@\S+\.\S+/.test(formData.email)){
            isvalid =false;
            validationErrors.email = "email is not valid"
        }
            
        
            
        
        axios.get('http://localhost:3000/users'+id)
        .then(res => {
            res.data.map(user =>{
                if( user.email === formData.email){
                    isvalid = false;
                    validationErrors.email = "enail used"

                }
            })
        setErrors(validationErrors)
        setValid(isvalid)
            if(isvalid === false){
                alert("error")
            } else{
                axios.post('http://localhost:3000/users'+id,formData)
            .then(result => {
                    setUserOne(true);
                    alert('registred successfully go to the kogin new pales sr')
                    navigate("/table")          
                  })
            .catch(err => console.log(err))
            }
            
        })
            
    }
    return(
        <div className="container">
    <form  class="mt-5 mb-5 border p-4 bg-light shadow" onSubmit={handleSubmit}>
        <h4 class="mb-5 border p-4 bg-light shadow">create your account</h4>
        {
                // هدا  شرط 
                valid ? (<></>):(
                <span className="text-danger">
                    {errors.fname}; {errors.lname}; {errors.email};{errors.rank} ;
                    {errors.password} ;{errors.cpassword} 
                </span>
            )}
        <div class="mb-3">
          <label for="exampleInputEmail1" name="fname" class="form-label">name </label>
          <input type="text" 
          class="form-control" 
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onChange={e => setFormData ({...formData, fname: event.target.value})}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">last name</label>
          <input 
          type="text" 
          class="form-control" 
          name="lname"  
          id="exampleInputEmail1" 
          aria-describedby="emailHelp"
          onChange={e => setFormData ({...formData, lname: event.target.value})}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input 
          type="email" 
          class="form-control" 
          name="email"  
          id="exampleInputEmail1" 
          aria-describedby="emailHelp"
          onChange={e => setFormData ({...formData, email: event.target.value})}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">rank</label>
          <select  class="form-control" onChange={e => setFormData ({...formData, rank: event.target.value})}>
          <option value=""> </option>
          <option value="T">T </option>
          <option value="PT">PT</option>
          <option value="P">P</option>
          <option value="F">F</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input 
          type="password" 
          class="form-control" 
          name="password"  
          id="exampleInputPassword1"
          onChange={e => setFormData ({...formData, password: event.target.value})}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Confirm Password</label>
          <input 
          type="password" 
          class="form-control" 
          name="confirmpassword" 
          id="exampleInputPassword1"
          onChange={event => setFormData ({...formData, cpassword: event.target.value})}
          />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
        <div id="info"></div>
      </form>
      <p class="text-center mt-3 text-secondary">if you have account , plase <a href="/login" >Login Now </a>
      </p>
      </div>

    )
}
export default Registration