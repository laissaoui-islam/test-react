import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams , useNavigate } from "react-router-dom";
const Upost = () => {
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
    event.preventDefault()    
    let isvalid = true ;
    let validationErrors = {}
    if(data.titel ==="" || data.titel === null){
        isvalid =false;
        validationErrors.titel = "First name required"
    }if(data.description ==="" || data.description === null){
        isvalid =false;
        validationErrors.description = "last name required"
    }if(data.image ==="" || data.image === null){
        isvalid =false;
        validationErrors.image = "name image required"
    }else if (data.image.length > 30){
      isvalid =false;
      validationErrors.image = "we nade chort link"
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
                {errors.titel}; {errors.description}; {errors.image};
            </span>
        )}
        <div class="mb-3">
          <label for="exampleInputEmail1" name="fname" class="form-label">titel </label>
          <input type="text" 
          class="form-control" 
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          value={data.titel}
          onChange={e => setdata ({...data, titel: e.target.value})}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">description</label>
          <input 
          type="text" 
          class="form-control " 
          style={{height:"80px"}}
          aria-describedby="emailHelp"
          value={data.description}
          onChange={e => setdata ({...data, description: e.target.value})}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">name of image</label>
          <input 
          type="text" 
          class="form-control" 
          name="password"  
          id="exampleInputPassword1"
          value={data.image}
          onChange={e => setdata ({...data, image: e.target.value})}
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
export default Upost