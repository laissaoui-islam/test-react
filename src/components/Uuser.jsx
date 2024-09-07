import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams , useNavigate } from "react-router-dom";
const Uuser = () => {
  const {id} =useParams();
  const {y} =useParams();
  const [data, setdata] =useState([])
    const navigate = useNavigate()
    useEffect(() => {
        axios.get('http://localhost:3000/'+id)
        .then(res => {
          let n = 0;
          res.data.map(user =>{
              if( user.id === y){
                n++
                axios.get('http://localhost:3000/'+id+'/'+y)
        .then(res => {
          setdata(res.data)
        })
          .catch(err=> console.log(err))
              }
            })
            if(n < 1){
              navigate('/NotFound')
  
            }
          })
        }, [])
    const [errors, setErrors] = useState({})
    const [valid, setValid] = useState(true)
    function handleSubmit (event){
      event.preventDefault();
      let isvalid = true ;
      let validationErrors = {}
      if(data.fname ==="" || data.fname === null){
        isvalid =false;
        validationErrors.fname = "First name required"
    }if(data.lname ==="" || data.lname === null){
      isvalid =false;
      validationErrors.lname = "last name required"
  }if(data.rank ==="" || data.rank === null){
    isvalid =false;
    validationErrors.lname = "last name required"
}if(data.password ==="" || data.password === null){
        isvalid =false;
        validationErrors.password = "password required"
    }else if (data.password.length < 6){
        isvalid =false;
        validationErrors.password = "password length at least 6 char"
    }if(data.cpassword !== data.password){
        isvalid = false;
        validationErrors.cpassword = "password not match"
    }
    setErrors(validationErrors)
    setValid(isvalid)
            if(isvalid === false){
                alert("error")
            } else{
        axios.put('http://localhost:3000/'+id+'/'+y,data)
        .then(result => {
            alert('data is updated');
        })
      }
    }
    return(
        
      <div className="container">
      <form  class="mt-5 mb-5 border p-4 bg-light shadow" onSubmit={handleSubmit}>
          <h4 class="mb-5 border p-4 bg-light shadow">create your account</h4>
          {
                // هدا  شرط 
                valid ? (<></>):(
                <span className="text-danger">
                    {errors.fname}; {errors.lname};{errors.rank} ;
                    {errors.password} ;{errors.cpassword} 
                </span>
            )}
          
          <div class="mb-3">
            <label for="exampleInputEmail1" name="fname" class="form-label">name </label>
            <input type="text" 
            class="form-control" 
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={data.fname}
            onChange={e => setdata ({...data, fname: e.target.value})}
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
            value={data.lname}
            onChange={e => setdata ({...data, lname: e.target.value})}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">rank</label>
            <select  class="form-control"
            onChange={e => setdata ({...data, rank: e.target.value})}>
          <option value="t">{data.rank} </option>
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
            onChange={e => setdata ({...data, password: e.target.value})}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Confirm Password</label>
            <input 
            type="password" 
            class="form-control" 
            name="confirmpassword" 
            id="exampleInputPassword1"
            onChange={e => setdata ({...data, cpassword: e.target.value})}
            />
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
          <div id="info"></div>
        </form>
      </div>
    
    )
}
export default Uuser