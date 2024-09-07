import React, { useEffect, useState } from "react";
import axios from "axios"
import useAuth from "./box/useAuth";
import { useParams , useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Homeuser = () => {
    const  {setUserOne} = useAuth();
    const {id} =useParams();
    const {y} =useParams();
    const [data, setdata] =useState([])
    const navigate = useNavigate()
    useEffect(() => {
        axios.get('http://localhost:3000/users'+id)
        .then(res => {
          let n = 0;
          res.data.map(user =>{
              if( user.id === y){
                n++
                axios.get('http://localhost:3000/users'+id+'/'+y)
        .then(res => {
          setdata(res.data)
        })
          .catch(err=> console.log(err))
              }
            })
            if(n < 1){
                navigate("/NotFound")
            }
          })
  
        
          
      }, [])

      const [columns , setColumns] = useState([])
      const [records , setRecords] = useState([])
      useEffect(()=>{
          axios.get('http://localhost:3000/post'+id)
          .then(res =>{
              setColumns(Object.keys(res.data[0]))
              setRecords(res.data)
  
          })
      },[])
      function click(){
        setUserOne(true);
        navigate(`/posting/${id}/${y}`)
    }function clickkk(){
        setUserOne(true);
        navigate(`/updateuser/users${id}/${y}`)
    }
        return(
        <div>
                    <div className="container mt-5">
                    <div className="text-end"><a onClick={click}  className="btn btn-primary">posting</a> <a onClick={clickkk}  className="btn btn-primary">uplod connte</a></div>
                    <table className="table">
                <thead>
                    <tr>
                        {
                        columns.map((c, i) => (
                                <th key={i}>{c}</th>
                    ))}
                        <tr>{data.email}</tr>
                    </tr>
                </thead>
                <tbody>
                    {
                        records.map((d,i) => (
                            <tr key={i}>
                                <td>{d.id}</td>
                                <td>{d.email}</td>
                                <td>{d.titel}</td>
                                <td>{d.description}</td>
                                <td>{d.image}</td>

                                
                                <td>
                                

                                <a onClick={()=>{
                                        if(d.email === data.email ){
                                            setUserOne(true);
                                            navigate(`/updatepost/post${id}/${d.id}`)
                                        }else{
                                            alert("is nat your post")
                                        }
                                }}  className="btn btn-sm btn-success">Update</a>
                                                                    

                                <a onClick={ e=> handleSubmit(d.id , data.email , d.email ,id  )
                                           } className="btn btn-sm ms-1 btn-danger">Delet</a>
                                </td>
                                </tr>
                        ))
                    }
                </tbody>
            </table>
            </div>
            </div>
        )
        function handleSubmit(idd , email , emai , x ){
            if (email === emai){
                const conf =window.confirm("do you want to delet");
            if(conf){
                axios.delete('http://localhost:3000/post'+x+'/'+idd)
                .then(res => {
                    alert('record has deleted just refrech');
                    navigate(`/login/${x}`)
    
                })
            }
            }else{
                alert("is not your post")
            }
            
        }
}
export default Homeuser