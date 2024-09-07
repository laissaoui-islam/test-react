import React, { useEffect , useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios";
import { Link } from "react-router-dom";
const Home = () => {
    const [columns , setColumns] = useState([])
    const [records , setRecords] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:3000/coment')
        .then(res =>{
            setColumns(Object.keys(res.data[0]))
            setRecords(res.data)

        })
    },[])
    const [formData , setFormData] = useState({
        fname:'',
        email:'',
        coment:''
    })
    
    const [errors, setErrors] = useState({})
    const [valid, setValid] = useState(true)
    const handleSubmit= (e) => {
        e.preventDefault();
        let isvalid = true ;
        let validationErrors = {}
        if(formData.fname ==="" || formData.fname === null){
            isvalid =false;
            validationErrors.fname = "First name required"
        }if(formData.coment ==="" || formData.coment === null){
            isvalid =false;
            validationErrors.coment = "coment name required"
        }else if (formData.coment.length < 20){
            isvalid =false;
            validationErrors.password = "coment length at least 20 char"
        }if(formData.email ==="" || formData.email === null){
            isvalid =false;
            validationErrors.email = "email required"
        }else if (!/\S+@\S+\.\S+/.test(formData.email)){
            isvalid =false;
            validationErrors.email = "email is not valid"
        }
            
        
            
        
        axios.get('http://localhost:3000/coment')
        .then(res => {
            res.data.map(user =>{
                if( user.email === formData.email){
                    isvalid = false;
                    validationErrors.email = "this enail is commented"

                }
            })
        setErrors(validationErrors)
        setValid(isvalid)
            if(isvalid === false){
                alert("error")
            } else{
                axios.post('http://localhost:3000/coment',formData)
            .then(result => {
                    alert('comment successfully ')
            })
            .catch(err => console.log(err))
            }
            
        })
            
    }
    
    return(
        <div>

<div style={{height:"200px" , color:"red", background:"#000"}}><h2>هنا ديرلنا بداية الموقع و دير فيها كم تحب </h2></div>
<div style={{height:"200px" , color:"red", background:"#fff"}}><h2>هنا تعريف للشركة تاعنا و الخدمات التي تقدمهم</h2></div>
<div  style={{height:"200px" , color:"red" , background:"#000" , display:"-webkit-flex" , padding:"30px"}}>
<Link to="prisont/desine"><div  style={{height:"20px" ,  color:"#fff" , background:"red" , margin:"30px" , padding:"30px"}}>ديزاين</div></Link>
<Link to="prisont/montage"><div  style={{height:"20px" ,  color:"#fff" , background:"red", margin:"30px" , padding:"30px"}}>منتاج</div></Link>
<Link to="prisont/development"><div  style={{height:"20px" , color:"#fff" , background:"red", margin:"30px" , padding:"30px"}}>تطوير</div></Link>
</div>




            <div className="container">
    <form  class="mt-5 mb-5 border p-4 bg-light shadow" onSubmit={handleSubmit}>
        <h4 class="mb-5 border p-4 bg-light shadow">create your account</h4>
        {
                // هدا  شرط 
                valid ? (<></>):(
                <span className="text-danger">
                    {errors.fname}; {errors.coment}; {errors.email};
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
          <label for="exampleInputEmail1" name="fname" class="form-label">your conemt </label>
        <textarea class="form-control" onChange={e => setFormData ({...formData, coment: event.target.value})}></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
        <div id="info"></div>
      </form>
      </div>
            <div className="container">
                    {
                        records.map((d,i) => (
                            <div key={i}>
                                <h2>{d.fname}</h2>
                                <h4>{d.email}</h4>
                                <td>{d.coment}</td>
                                </div>
                        ))
                    }
                </div>
<div className="container" style={{width:"200px",height:"200px" , color:"red"}}><h1>نهاية التي في اخر الصفحة و النافبار عدللاعليه براحتك</h1></div>

        </div>
    )
}
export default Home