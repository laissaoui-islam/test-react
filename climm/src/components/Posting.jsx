import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios"
import useAuth from "./box/useAuth";
import { useParams , useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Posting = () => { 
    const  {setUserOne} = useAuth();
    const {id} =useParams();
    const {y} =useParams();
    const [data, setdata] =useState([])
    const navigate = useNavigate()
    useEffect(() => {
        axios.get('../../.netlify/functions/data?section=users'+id)
        .then(res => {
          let n = 0;
          res.data.map(user =>{
              if( user.id === y){
                n++
                axios.get('../../.netlify/functions/data?section=users'+id+'/'+y)
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


    const [formData , setFormData] = useState({
    email:'',
    titel:'',
    description:'',
    image:''
})

const [errors, setErrors] = useState({})
const [valid, setValid] = useState(true)
const handleSubmit= (e) => {
    e.preventDefault();
    let isvalid = true ;
    let validationErrors = {}
    if(formData.titel ==="" || formData.titel === null){
        isvalid =false;
        validationErrors.titel = "First name required"
    }if(formData.description ==="" || formData.description === null){
        isvalid =false;
        validationErrors.description = "last name required"
    }if(formData.image ==="" || formData.image === null){
        isvalid =false;
        validationErrors.image = "name image required"
    }else if (formData.image.length > 30){
      isvalid =false;
      validationErrors.image = "we nade chort link"
  }if(formData.email ==="" || formData.email === null){
        isvalid =false;
        validationErrors.email = "email required"
    }else if(formData.email !== data.email ){
        isvalid =false;
        validationErrors.email = "email is not your"
    }
        
    
        
    
    
    setErrors(validationErrors)
    setValid(isvalid)
        if(isvalid === false){
            alert("error")
        } else{
            axios.post('../../.netlify/functions/data?section=post'+id,formData)
        .then(result => {
                alert('registred successfully go to the kogin new pales sr')
                setUserOne(true);
                navigate(`/homeuser/${id}/${y}`)
        })
        .catch(err => console.log(err))
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
                {errors.titel}; {errors.description}; {errors.image};{errors.email};
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
      onChange={e => setFormData ({...formData, email: event.target.value})}
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" name="fname" class="form-label">titel </label>
      <input type="text" 
      class="form-control" 
      id="exampleInputEmail1"
      aria-describedby="emailHelp"
      onChange={e => setFormData ({...formData, titel: event.target.value})}
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">description</label>
      <input 
      type="text" 
      class="form-control " 
      style={{height:"80px"}}
      aria-describedby="emailHelp"
      onChange={e => setFormData ({...formData, description: event.target.value})}
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">name of image</label>
      <input 
      type="text" 
      class="form-control" 
      name="password"  
      id="exampleInputPassword1"
      onChange={e => setFormData ({...formData, image: event.target.value})}
      />
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
    <div id="info"></div>
  </form>
  <p class="text-center mt-3 text-secondary">if you have account , plase <Link href="/login" >Login Now </Link>
  </p>
  </div>

)
}

export default Posting
    
   