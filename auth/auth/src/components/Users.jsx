import React, { useEffect , useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios";
import useAuth from "./box/useAuth";
import {  useNavigate , useParams} from "react-router-dom";
const User = () => {
  const {id} =useParams();
  const  {setUserOne} = useAuth();
  const bb = useNavigate();
    const [columns , setColumns] = useState([])
    const [records , setRecords] = useState([])
    useEffect(()=>{
        if(id === "development" || id === "montage"|| id === "desine"){
            axios.get('http://localhost:3000/users'+id)
        .then(res =>{
            setColumns(Object.keys(res.data[0]))
            setRecords(res.data)

        })
        }else{
            bb("/notFound");
        }
        
    },[])
    
        
    return(
        <div className="container mt-5">
            <a onClick={()=>{ 
                bb(`/prodacts/${id}`)}}>prodacts </a>
                 <a onClick={()=>{ 
                    bb(`/prisont/${id}`)}}>prisont</a>
            <table className="table">
                <thead>
                <th>email</th>
                <th>Fname</th>
                <th>Lname</th>
                <th>email</th>
                <th>rank</th>
                <th>actions</th>
                </thead>
                <tbody>
                    {
                        records.map((d,i) => (
                            <tr key={i}>                                
                                <td>{d.id}</td>
                                <td>{d.fname}</td>
                                <td>{d.lname}</td>
                                <td>{d.email}</td>
                                <td>{d.rank}</td>
                                <td>
                                

                                <a onClick={()=>{
                                            setUserOne(true);
                                            bb(`/uusers/users${id}/${d.id}`)
                                }}  className="btn btn-sm btn-success">Update</a>
                                                                    

                                <a onClick={ e=> handleSubmit(d.id  ,id  )
                                           } className="btn btn-sm ms-1 btn-danger">Delet</a>
                                </td>
                                </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
    function handleSubmit(idd ,  x ){
            const conf =window.confirm("do you want to delet");
        if(conf){
            axios.delete('http://localhost:3000/users'+x+'/'+idd)
            .then(res => {
                alert('record has deleted just refrech');
                alert(`/login/${x}`)

            })
        }
        
        
    }
}
export default User