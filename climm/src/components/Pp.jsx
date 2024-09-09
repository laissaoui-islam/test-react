import React, { useEffect , useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios";
import {  useNavigate , useParams} from "react-router-dom";
const Pp = () => {
  const {id} =useParams();
  const bb = useNavigate();
    const [columns , setColumns] = useState([])
    const [records , setRecords] = useState([])
    useEffect(()=>{
        if(id === "development" || id === "montage"|| id === "desine"){
            try{
                const res =  axios.get('/.netlify/functions/data?section=users'+id);
                    setColumns(Object.keys(res.data[0]))
                    setRecords(res.data)
        
            }catch (error){
                console.error('Error jhggh', error)
            }
        
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
                        records.map((data,i) => (
                            <tr key={i}>                                
                                <td>{data.fname}</td>
                                <td>{data.lname}</td>
                                <td>{data.email}</td>
                                <td>{data.rank}</td>
                                </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}
export default Pp