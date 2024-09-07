import { useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
const S = () => {
    const[value,  setValue]= useState()
    const[data, setData] = useState([])
    const onchange = async (e) =>{
        setValue(e.target.value)
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        const data = await response.json()
        setData(data)
    }
    return(
        <div>
        <div className="app">
            <div className="search">
                <div>
                    <input type="search"  onChange={onchange} value={value}/>
                    <button><Link href={`/reselt/${value}`}>search</Link></button>
                </div>
                <div className="dropdown-content">
                    {
                        value &&
                        data.filter(item => item.title.startsWith(value) && item.title !==value).slice(0,5)
                        .map(item => <div key={item.id} onClick={(e) => setValue(item.title)}>
                            {item.title} <hr />
                        </div>)
                    }
                </div>
            </div>
            
            </div></div>
    )
}
export default S