import React, { useEffect , useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios";
import useAuth from "./box/useAuth";
import {  useNavigate , useParams} from "react-router-dom";
import { Link } from "react-router-dom";
const Pp = () => {
  const {id} =useParams();
  const  {setUserOne} = useAuth();
  const bb = useNavigate();
    const [columns , setColumns] = useState([])
    const [records , setRecords] = useState([])
    useEffect(()=>{
        if(id === "development" || id === "montage"|| id === "desine"){
            axios.get('https://abl-innovativeservices.netlify.app/db.json/users'+id)
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
                    <tr>
                    <th>First name</th>
                    <th>last name</th>
                    <th>email</th>
                    <th>rank</th>
                        {
                       // columns.map((c, i) => (
                          //      <th key={i}>{c}</th>
                  //  ))
                  }
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        records.map((d,i) => (
                            <tr key={i}>                                
                                <td>{d.fname}</td>
                                <td>{d.lname}</td>
                                <td>{d.email}</td>
                                <td>{d.rank}</td>
                                </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}
export default Pp