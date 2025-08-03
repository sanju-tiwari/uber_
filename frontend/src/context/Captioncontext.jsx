import React, { createContext, useContext, useState } from 'react'
import { useEffect } from 'react'
import axios from "axios"

export const Captiondatacontext = createContext()

function Captioncontext({children}) {
  const [captiondata, setCaptiondata] = useState(null)
  const [loading , setloading] = useState(true)
  useEffect(()=>{
     const fetchingdata = async()=>{
          try {
   const token = localStorage.getItem("token")
   if(!token){
    console.log("token was found in caption ")
      setloading(false)
          return
   }    
   if(token){
    const res = await axios.get("http://localhost:3000/caption/profile" , {
      headers:{Authorization : `Bearer ${token}`}
    })
    if(res?.data && res?.data?.caption){
      setCaptiondata(res?.data?.user)
      setloading(false)
     }else{
      setloading(false)
     }  
   }
  } catch (error) {
    console.log(error.message)
  }finally{
    setloading(false)
  }
     }

  fetchingdata()

  },[] )

     if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      <Captiondatacontext.Provider value={{captiondata , setCaptiondata}} >
        {children}
      </Captiondatacontext.Provider>

      
    </div>
  )
}

export default Captioncontext
