import React from "react";
//من اجل استدعاء ملف css 
import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from "react-router-dom";
const Navbar = () => {
    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
            <Link className="navbar-brand" to="/">Navbar </Link>
            <Link className="navbar-brand text-danger" to='/' >logout</Link>
            <Link to="/s "className="navbar-brand "> serch      </Link> 
            <Link to="/s "className="navbar-brand "> serch      </Link> 

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="d-flex">
                    <Link to="/login " className=""> login      </Link>             
                    <Link to="/loginvip " className="">   loginvip      </Link>             
                    </form>
                </div>
            </div>
        </nav>
    )
}
export default Navbar




