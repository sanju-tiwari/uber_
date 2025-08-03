import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect } from "react"

export const Logout = ()=>{
    const navigate = useNavigate()

    useEffect(()=>{
        const token = localStorage.getItem("token")
        const handlelogout = async()=>{
            try {
                 const res = await axios.get("http://localhost:3000/user/logout" , {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                 } )
                    if(res.status === 200 || res.status === 201) {
                        localStorage.removeItem("token");
                        navigate("/user-login");
                        console.log("Logout successful");
                    }else {
                        console.error("Logout failed");
                    }
            } catch (error) {
                console.error("Logout failed", error.message);
            }
        }

        handlelogout()


    } , [navigate] )

 return (
    <h1 className="text-2xl text-black">
      Logging out...
    </h1>
  );


}