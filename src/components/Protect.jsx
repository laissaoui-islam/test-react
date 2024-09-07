import React from "react";
import { Outlet , Navigate } from "react-router-dom";
import useAuth from "./box/useAuth";

const Protect = () => {
    const  {userOne} = useAuth();
    return (userOne) ? <Outlet/>  : <Navigate to={"/login"}/>
}
export default Protect