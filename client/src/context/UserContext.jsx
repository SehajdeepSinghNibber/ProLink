import { createContext, useContext, useEffect, useState } from "react"
import { authDataContext } from "./AuthContext";
import axios from "axios";

export const userDataContext = createContext();

const UserContext = ({children}) => {

    const [userData,setUserData] = useState(null)
    const [isLoading,setIsLoading] = useState(true)

    const value = {
        userData,
        setUserData,
        isLoading,
    };
    const {serverUrl} = useContext(authDataContext);

    useEffect(()=>{
        const getCurrentUser = async () =>{
            try {
                const result = await axios.get(`${serverUrl}/api/user/currentuser`,{withCredentials:true});
                setUserData(result.data)
            } catch (error) {
                console.log(error);
                setUserData(null)
            }
            finally{
                 setIsLoading(false);
            }
        }

        getCurrentUser()
    },[serverUrl])

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  )
}

export default UserContext
