import React, { useEffect , useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios";
import useAuth from "./box/useAuth";
import {  useNavigate , useParams} from "react-router-dom";
import { Link } from "react-router-dom";
const Post = () => {
  const {id} =useParams();
  const  {setUserOne} = useAuth();
  const bb = useNavigate();
    const [columns , setColumns] = useState([])
    const [records , setRecords] = useState([])
    useEffect(()=>{
        if(id === "development" || id === "montage"|| id === "desine"){
            axios.get('http://localhost:3000/post'+id)
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
            
            <table className="table">
                <thead>
                    <tr>
                    <th>id</th>
                    <th>email</th>
                    <th>titel</th>
                    <th>description</th>
                    <th>image</th>
                    <th>actions</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        records.map((d,i) => (
                            <tr >                                
                                <td>{d.id}</td>
                                <td>{d.email}</td>
                                <td>{d.titel}</td>
                                <td>{d.description}</td>
                                <td><img src={d.image} alt="هناك خطاء ما" /></td>
                                <td>
                                <a onClick={()=>{
                                            setUserOne(true);
                                            bb(`/upost/post${id}/${d.id}`)
                                        
                                }}  className="btn btn-sm btn-success">Update</a>
                                                                    

                                <a onClick={ e=> handleSubmit(d.id , id  )
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
            axios.delete('http://localhost:3000/post'+x+'/'+idd)
            .then(res => {
                alert('record has deleted just refrech');
                navigate(`/login/${x}`)

            })
        }
        
    }
}
export default Post