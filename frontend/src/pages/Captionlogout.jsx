import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Captionlogout(){
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
   
    useEffect(()=>{
    const handlelogout = async()=>{
    
     try {
           const res = await axios.get("http://localhost:3000/caption/logout" , {
        headers:{
            Authorization: `Bearer ${token}`
        }
     } )   
     if(res.status === 200 || res.status === 201) {
                        localStorage.removeItem("token");
                        navigate("/caption-login");
                        console.log("Logout successful");
                    }else {
                        console.error("Logout failed");
                    }
             
     } catch (error) {
        console.log(error.message)
     }
       }
    handlelogout()
    } , [navigate] )

  return (
    <div>
      <h1>
        logout..
      </h1>
    </div>
  )
}

export default Captionlogout
