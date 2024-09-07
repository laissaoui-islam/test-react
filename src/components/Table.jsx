import React from "react";
import useAuth from "./box/useAuth";
import "bootstrap/dist/css/bootstrap.min.css"
import {  useNavigate } from "react-router-dom";
const Table = () => {
    const  {setUserOne} = useAuth();
    const pp = "post"  
    const uu = "users"  
    const mm = "montage"  
    const dev = "development"  
    const des = "desine"  
    const bb = useNavigate();
  function click(){
    setUserOne(true);
    bb("/Registration")
}
function ck( x , y){
    setUserOne(true);
    bb(`/${x}/${y}`)
}
        
    return(
        <div className="container mt-5">

<div className="text-end"><a onClick={click}   className="btn btn-primary">add</a></div>
<div className="text-end"><a onClick={e=> ck( pp , des ) } className="btn btn-primary">POSTS desine</a>
<a onClick={e=> ck( pp , mm ) }  className="btn btn-primary">POSTS montage</a>
<a onClick={e=> ck( pp , dev ) }  className="btn btn-primary">POSTS development</a></div>
<div className="text-end"><a onClick={e=> ck( uu , des ) } className="btn btn-primary">USERS desine</a>
<a onClick={e=> ck( uu , mm ) } className="btn btn-primary">USERS montage</a>
<a onClick={e=> ck( uu , dev ) }   className="btn btn-primary">USERS development</a></div>
            
        </div>
    );
    
}
export default Table