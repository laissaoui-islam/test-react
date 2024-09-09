import React, { useEffect , useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios";
import useAuth from "./box/useAuth";
import {  useNavigate , useParams} from "react-router-dom";
import { Link } from "react-router-dom";
const Ppp = () => {
  const {id} =useParams();
  const  {setUserOne} = useAuth();
  const bb = useNavigate();
    const [columns , setColumns] = useState([])
    const [records , setRecords] = useState([])
    useEffect(()=>{
        if(id === "development" || id === "montage"|| id === "desine"){
            axios.get('../../.netlify/functions/data?section=post'+id)
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
                    <th>email</th>
                    <th>titel</th>
                    <th>description</th>
                    <th>image</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        records.map((d,i) => (
                            <tr >                                
                                <td>{d.email}</td>
                                <td>{d.titel}</td>
                                <td>{d.description}</td>
                                <td><img src={d.image} alt="هناك خطاء ما" /></td>
                                </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}
export default Ppp