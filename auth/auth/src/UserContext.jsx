import {  createContext , useState } from "react";

const UserContext = createContext();
export const Ppp = ({children})=>{
  const [userOne , setUserOne]= useState()
  return(
    <UserContext.Provider value={{userOne , setUserOne}}>
    {children}
    </UserContext.Provider>
    )
}
export default UserContext
